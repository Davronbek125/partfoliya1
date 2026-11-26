import { NextRequest, NextResponse } from "next/server";

interface DiagnosticPayload {
  industry?: unknown;
  challenge?: unknown;
  interest?: unknown;
  team_size?: unknown;
  contact_name?: unknown;
  contact_phone?: unknown;
  contact_telegram?: unknown;
  company?: unknown;
  selected_context?: unknown;
  language?: unknown;
  website?: unknown;
}

const VALID_LANGUAGES = new Set(["uz", "ru", "en"]);
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_FIELD_LENGTH = 200;

const rateLimitStore = new Map<string, number[]>();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeField(value: unknown, maxLen = MAX_FIELD_LENGTH): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLen) return null;
  return trimmed;
}

function normalizeTelegramHandle(raw: string | null): string | null {
  if (!raw) return null;
  const stripped = raw
    .replace(/^https?:\/\/(t\.me|telegram\.me)\//i, "")
    .replace(/^@+/, "")
    .trim();
  if (!stripped) return null;
  return `@${stripped}`;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  if (rateLimitStore.size > 500) {
    for (const [key, timestamps] of rateLimitStore.entries()) {
      const active = timestamps.filter((ts) => ts > windowStart);
      if (active.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, active);
      }
    }
  }

  const history = (rateLimitStore.get(ip) ?? []).filter((ts) => ts > windowStart);
  if (history.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, history);
    return true;
  }

  rateLimitStore.set(ip, [...history, now]);
  return false;
}

function formatTelegramMessage(fields: {
  contactName: string;
  contactPhone: string | null;
  contactTelegram: string | null;
  company: string | null;
  selectedContext: string | null;
  industry: string;
  challenge: string;
  interest: string;
  teamSize: string;
  language: string;
}): string {
  const timestamp = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const lines = [
    "🆕 <b>Yangi diagnostika so'rovi</b>",
    "",
    `👤 <b>Mijoz:</b> ${escapeHtml(fields.contactName)}`,
  ];

  if (fields.company) {
    lines.push(`🏢 <b>Kompaniya:</b> ${escapeHtml(fields.company)}`);
  }
  if (fields.contactPhone) {
    lines.push(`📞 <b>Telefon:</b> ${escapeHtml(fields.contactPhone)}`);
  }
  if (fields.contactTelegram) {
    lines.push(`✈️ <b>Telegram:</b> ${escapeHtml(fields.contactTelegram)}`);
  }
  if (fields.selectedContext) {
    lines.push(`📌 <b>Yo'nalish:</b> ${escapeHtml(fields.selectedContext)}`);
  }

  lines.push(
    "",
    `📊 <b>Soha:</b> ${escapeHtml(fields.industry)}`,
    `⚠️ <b>Asosiy muammo:</b> ${escapeHtml(fields.challenge)}`,
    `💡 <b>Qiziqtirgan yechim:</b> ${escapeHtml(fields.interest)}`,
    `👥 <b>Jamoa hajmi:</b> ${escapeHtml(fields.teamSize)}`,
    "",
    `🌐 <b>Til:</b> ${escapeHtml(fields.language.toUpperCase())}`,
    `🕐 <b>Vaqt:</b> ${escapeHtml(timestamp)} (Tashkent)`
  );

  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  let body: DiagnosticPayload;
  try {
    body = (await request.json()) as DiagnosticPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const industry = normalizeField(body.industry);
  const challenge = normalizeField(body.challenge);
  const interest = normalizeField(body.interest);
  const teamSize = normalizeField(body.team_size);
  const contactName = normalizeField(body.contact_name, 120);
  const contactPhone = normalizeField(body.contact_phone, 40);
  const contactTelegram = normalizeTelegramHandle(
    normalizeField(body.contact_telegram, 64)
  );
  const company = normalizeField(body.company, 120);
  const selectedContext = normalizeField(body.selected_context, 120);

  const languageRaw =
    typeof body.language === "string" ? body.language.trim().toLowerCase() : "uz";
  const language = VALID_LANGUAGES.has(languageRaw) ? languageRaw : "uz";

  if (!industry || !challenge || !interest || !teamSize) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!contactName || contactName.length < 2) {
    return NextResponse.json({ error: "Missing contact info" }, { status: 400 });
  }

  const hasValidPhone = Boolean(contactPhone && contactPhone.length >= 3);
  const hasValidTelegram = Boolean(contactTelegram && contactTelegram.length >= 3);
  if (!hasValidPhone && !hasValidTelegram) {
    return NextResponse.json({ error: "Missing contact info" }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    console.error("Telegram integration is not configured on the server.");
    return NextResponse.json({ error: "Service unavailable" }, { status: 500 });
  }

  const messageText = formatTelegramMessage({
    contactName,
    contactPhone,
    contactTelegram,
    company,
    selectedContext,
    industry,
    challenge,
    interest,
    teamSize,
    language,
  });

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        }),
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (!telegramResponse.ok) {
      let description = "Unknown Telegram error";
      try {
        const errPayload = (await telegramResponse.json()) as {
          description?: unknown;
        };
        if (typeof errPayload?.description === "string") {
          description = errPayload.description;
        }
      } catch {
        // Ignore JSON parse failures on error body
      }
      console.error(
        `Telegram API returned HTTP ${telegramResponse.status}: ${description}`
      );
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ status: "sent" }, { status: 200 });
  } catch (error) {
    console.error(
      "Telegram API request failed:",
      error instanceof Error ? error.name : "UnknownError"
    );
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
}
