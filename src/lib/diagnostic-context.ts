import type { IndustryKey, PackageKey, ServiceId } from "@/lib/services-data";

export interface DiagnosticContextData {
  label: string;
  industryKey?: IndustryKey;
  serviceId?: ServiceId;
  packageKey?: PackageKey;
}

const STORAGE_KEY = "dtai-diagnostic-context";
const CONTEXT_EVENT = "dtai-diagnostic-context-change";

let cachedRaw: string | null = null;
let cachedParsed: DiagnosticContextData | null = null;

export function setDiagnosticContext(data: DiagnosticContextData | null): void {
  if (typeof window === "undefined") return;
  try {
    if (data) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage access restrictions
  }
  window.dispatchEvent(new Event(CONTEXT_EVENT));
}

export function subscribeDiagnosticContext(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener(CONTEXT_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CONTEXT_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function getDiagnosticContextSnapshot(): DiagnosticContextData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedParsed;
    cachedRaw = raw;
    if (!raw) {
      cachedParsed = null;
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<DiagnosticContextData>;
    if (parsed && typeof parsed.label === "string" && parsed.label.trim()) {
      cachedParsed = {
        label: parsed.label,
        industryKey: parsed.industryKey,
        serviceId: parsed.serviceId,
        packageKey: parsed.packageKey,
      };
      return cachedParsed;
    }
  } catch {
    // Ignore malformed JSON or storage errors
  }
  cachedParsed = null;
  return null;
}

export function getDiagnosticContextServerSnapshot(): DiagnosticContextData | null {
  return null;
}

export function mapContextToDefaultAnswers(
  ctx: DiagnosticContextData | null,
  q1Options: readonly string[],
  q3Options: readonly string[]
): { q1?: string; q3?: string } {
  if (!ctx) return {};

  let q1Index: number | undefined;
  if (ctx.industryKey) {
    if (ctx.industryKey === "trade" || ctx.industryKey === "ecommerce") {
      q1Index = 0;
    } else if (ctx.industryKey === "manufacturing") {
      q1Index = 1;
    } else if (
      ctx.industryKey === "services" ||
      ctx.industryKey === "clinics" ||
      ctx.industryKey === "education" ||
      ctx.industryKey === "restaurant" ||
      ctx.industryKey === "logistics"
    ) {
      q1Index = 2;
    } else {
      q1Index = 3;
    }
  }

  let q3Index: number | undefined;
  if (ctx.serviceId) {
    if (ctx.serviceId === "ai") q3Index = 2;
    else if (
      ctx.serviceId === "web" ||
      ctx.serviceId === "mobile" ||
      ctx.serviceId === "telegram"
    ) {
      q3Index = 0;
    } else {
      q3Index = 1;
    }
  } else if (ctx.packageKey) {
    if (ctx.packageKey === "ai_business") q3Index = 2;
    else if (ctx.packageKey === "start") q3Index = 0;
    else q3Index = 1;
  }

  return {
    q1: q1Index !== undefined ? q1Options[q1Index] : undefined,
    q3: q3Index !== undefined ? q3Options[q3Index] : undefined,
  };
}
