import type { DiagnosticLead } from "./types";
import { escapeHtml } from "./validation";

export interface TelegramSendResult {
  ok: boolean;
  messageId?: number;
  error?: string;
  statusCode?: number;
}

export function isTelegramConfigured(): boolean {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  return Boolean(botToken && chatId);
}

export function formatDiagnosticTelegramMessage(lead: DiagnosticLead): string {
  const timestamp = new Date(lead.createdAt).toLocaleString("en-GB", {
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
    `🆕 <b>Yangi diagnostika so'rovi</b> · <code>#${escapeHtml(lead.id)}</code>`,
    "",
    `👤 <b>Mijoz:</b> ${escapeHtml(lead.contactName)}`,
  ];

  if (lead.company) {
    lines.push(`🏢 <b>Kompaniya:</b> ${escapeHtml(lead.company)}`);
  }
  if (lead.contactPhone) {
    lines.push(`📞 <b>Telefon:</b> ${escapeHtml(lead.contactPhone)}`);
  }
  if (lead.contactTelegram) {
    lines.push(`✈️ <b>Telegram:</b> ${escapeHtml(lead.contactTelegram)}`);
  }
  if (lead.selectedContext) {
    lines.push(`📌 <b>Yo'nalish:</b> ${escapeHtml(lead.selectedContext)}`);
  }

  lines.push(
    "",
    `📊 <b>Soha:</b> ${escapeHtml(lead.industry)}`,
    `⚠️ <b>Asosiy muammo:</b> ${escapeHtml(lead.challenge)}`,
    `💡 <b>Qiziqtirgan yechim:</b> ${escapeHtml(lead.interest)}`,
    `👥 <b>Jamoa hajmi:</b> ${escapeHtml(lead.teamSize)}`,
    "",
    `🌐 <b>Til:</b> ${escapeHtml(lead.language.toUpperCase())}`,
    `🕐 <b>Vaqt:</b> ${escapeHtml(timestamp)} (Tashkent)`
  );

  return lines.join("\n");
}

export async function sendTelegramNotification(
  messageText: string
): Promise<TelegramSendResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return {
      ok: false,
      error: "Telegram integration is not configured on the server.",
      statusCode: 500,
    };
  }

  try {
    const response = await fetch(
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

    if (!response.ok) {
      let description = `HTTP ${response.status}`;
      try {
        const errPayload = (await response.json()) as {
          description?: unknown;
        };
        if (typeof errPayload?.description === "string") {
          description = errPayload.description;
        }
      } catch {
        // Ignore parse failures on Telegram error body
      }
      return {
        ok: false,
        error: description,
        statusCode: 502,
      };
    }

    const payload = (await response.json()) as {
      result?: { message_id?: number };
    };
    return {
      ok: true,
      messageId: payload.result?.message_id,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.name : "UnknownError",
      statusCode: 502,
    };
  }
}
