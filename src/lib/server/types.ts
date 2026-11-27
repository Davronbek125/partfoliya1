export type LeadStatus = "new" | "contacted" | "qualified" | "archived";

export type TelegramDeliveryStatus = "pending" | "sent" | "failed" | "skipped";

export type SupportedLanguage = "uz" | "ru" | "en";

export interface DiagnosticLead {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  telegramStatus: TelegramDeliveryStatus;
  telegramError: string | null;
  industry: string;
  challenge: string;
  interest: string;
  teamSize: string;
  contactName: string;
  contactPhone: string | null;
  contactTelegram: string | null;
  company: string | null;
  selectedContext: string | null;
  notes: string | null;
  language: SupportedLanguage;
  clientIpHash: string;
}

export interface CreateLeadInput {
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
  clientIpHash: string;
}

export interface LeadListQuery {
  status?: LeadStatus;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
  telegramFailed: number;
}

export interface PaginatedLeadsResult {
  items: DiagnosticLead[];
  total: number;
  limit: number;
  offset: number;
  stats: LeadStats;
}

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, unknown>;
}
