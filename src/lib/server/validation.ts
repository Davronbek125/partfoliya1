import type { LeadStatus, SupportedLanguage } from "./types";

export const VALID_LANGUAGES = new Set<SupportedLanguage>(["uz", "ru", "en"]);
export const VALID_LEAD_STATUSES = new Set<LeadStatus>([
  "new",
  "contacted",
  "qualified",
  "archived",
]);

const MAX_FIELD_LENGTH = 200;

export interface DiagnosticPayloadInput {
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

export interface ValidatedDiagnosticInput {
  industry: string;
  challenge: string;
  interest: string;
  teamSize: string;
  contactName: string;
  contactPhone: string | null;
  contactTelegram: string | null;
  company: string | null;
  selectedContext: string | null;
  language: SupportedLanguage;
}

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number; isHoneypot?: boolean };

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function normalizeField(
  value: unknown,
  maxLen = MAX_FIELD_LENGTH
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLen) return null;
  return trimmed;
}

export function normalizeTelegramHandle(raw: string | null): string | null {
  if (!raw) return null;
  const stripped = raw
    .replace(/^https?:\/\/(t\.me|telegram\.me)\//i, "")
    .replace(/^@+/, "")
    .trim();
  if (!stripped) return null;
  return `@${stripped}`;
}

export function validateDiagnosticPayload(
  raw: unknown
): ValidationResult<ValidatedDiagnosticInput> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, error: "Invalid JSON payload", status: 400 };
  }

  const body = raw as DiagnosticPayloadInput;

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return { ok: false, error: "Invalid request", status: 400, isHoneypot: true };
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
  const language: SupportedLanguage = VALID_LANGUAGES.has(
    languageRaw as SupportedLanguage
  )
    ? (languageRaw as SupportedLanguage)
    : "uz";

  if (!industry || !challenge || !interest || !teamSize) {
    return { ok: false, error: "Missing fields", status: 400 };
  }

  if (!contactName || contactName.length < 2) {
    return { ok: false, error: "Missing contact info", status: 400 };
  }

  const hasValidPhone = Boolean(contactPhone && contactPhone.length >= 3);
  const hasValidTelegram = Boolean(contactTelegram && contactTelegram.length >= 3);
  if (!hasValidPhone && !hasValidTelegram) {
    return { ok: false, error: "Missing contact info", status: 400 };
  }

  return {
    ok: true,
    data: {
      industry,
      challenge,
      interest,
      teamSize,
      contactName,
      contactPhone,
      contactTelegram,
      company,
      selectedContext,
      language,
    },
  };
}

export function validateLeadPatchPayload(raw: unknown): ValidationResult<{
  status?: LeadStatus;
  notes?: string | null;
}> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, error: "Invalid JSON payload", status: 400 };
  }

  const body = raw as { status?: unknown; notes?: unknown };
  const result: { status?: LeadStatus; notes?: string | null } = {};

  if (body.status !== undefined) {
    if (
      typeof body.status !== "string" ||
      !VALID_LEAD_STATUSES.has(body.status as LeadStatus)
    ) {
      return { ok: false, error: "Invalid lead status", status: 400 };
    }
    result.status = body.status as LeadStatus;
  }

  if (body.notes !== undefined) {
    if (body.notes === null || body.notes === "") {
      result.notes = null;
    } else if (typeof body.notes === "string") {
      const trimmed = body.notes.trim();
      if (trimmed.length > 1000) {
        return { ok: false, error: "Notes too long (max 1000 chars)", status: 400 };
      }
      result.notes = trimmed || null;
    } else {
      return { ok: false, error: "Invalid notes format", status: 400 };
    }
  }

  if (result.status === undefined && result.notes === undefined) {
    return { ok: false, error: "No valid fields to update", status: 400 };
  }

  return { ok: true, data: result };
}
