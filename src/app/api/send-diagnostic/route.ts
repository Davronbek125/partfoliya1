import { NextRequest, NextResponse } from "next/server";
import { getClientIp, hashClientIp } from "@/lib/server/auth";
import { getLeadRepository } from "@/lib/server/leads-repository";
import { SlidingWindowRateLimiter } from "@/lib/server/rate-limit";
import {
  formatDiagnosticTelegramMessage,
  isTelegramConfigured,
  sendTelegramNotification,
} from "@/lib/server/telegram";
import { validateDiagnosticPayload } from "@/lib/server/validation";

const diagnosticRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 60_000,
  maxRequests: 5,
});

export async function POST(request: NextRequest) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const validation = validateDiagnosticPayload(rawBody);
  if (!validation.ok) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: validation.status }
    );
  }

  const clientIp = getClientIp(request);
  if (diagnosticRateLimiter.isLimited(clientIp)) {
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  const repo = getLeadRepository();
  const lead = repo.create({
    ...validation.data,
    clientIpHash: hashClientIp(clientIp),
  });

  if (!isTelegramConfigured()) {
    repo.updateTelegramDelivery(
      lead.id,
      "failed",
      "Telegram integration is not configured on the server."
    );
    console.error("Telegram integration is not configured on the server.");
    return NextResponse.json(
      {
        success: false,
        error: "Service unavailable",
        data: { id: lead.id },
      },
      { status: 500 }
    );
  }

  const messageText = formatDiagnosticTelegramMessage(lead);
  const telegramResult = await sendTelegramNotification(messageText);

  if (!telegramResult.ok) {
    repo.updateTelegramDelivery(
      lead.id,
      "failed",
      telegramResult.error ?? "Unknown Telegram error"
    );
    console.error(
      `Telegram API failed for lead ${lead.id}: ${telegramResult.error ?? "Unknown"}`
    );
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send",
        data: { id: lead.id },
      },
      { status: telegramResult.statusCode ?? 502 }
    );
  }

  repo.updateTelegramDelivery(lead.id, "sent", null);

  return NextResponse.json(
    {
      success: true,
      status: "sent",
      data: {
        id: lead.id,
        telegramStatus: "sent",
      },
    },
    { status: 200 }
  );
}
