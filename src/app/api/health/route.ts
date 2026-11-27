import { NextResponse } from "next/server";
import { getLeadRepository } from "@/lib/server/leads-repository";
import { isTelegramConfigured } from "@/lib/server/telegram";

export async function GET() {
  try {
    const repo = getLeadRepository();
    const dbOk = repo.ping();

    return NextResponse.json(
      {
        success: true,
        status: dbOk ? "ok" : "degraded",
        database: dbOk ? "connected" : "error",
        telegramConfigured: isTelegramConfigured(),
        timestamp: new Date().toISOString(),
      },
      { status: dbOk ? 200 : 503 }
    );
  } catch (error) {
    console.error(
      "Healthcheck failed:",
      error instanceof Error ? error.message : "UnknownError"
    );
    return NextResponse.json(
      {
        success: false,
        status: "error",
        database: "disconnected",
        telegramConfigured: isTelegramConfigured(),
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
