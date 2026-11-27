import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import type {
  CreateLeadInput,
  DiagnosticLead,
  LeadListQuery,
  LeadStats,
  LeadStatus,
  PaginatedLeadsResult,
  SupportedLanguage,
  TelegramDeliveryStatus,
} from "./types";

export interface LeadRepository {
  create(input: CreateLeadInput): DiagnosticLead;
  findById(id: string): DiagnosticLead | null;
  findAll(query?: LeadListQuery): PaginatedLeadsResult;
  updateLead(
    id: string,
    patch: { status?: LeadStatus; notes?: string | null }
  ): DiagnosticLead | null;
  updateTelegramDelivery(
    id: string,
    telegramStatus: TelegramDeliveryStatus,
    telegramError?: string | null
  ): DiagnosticLead | null;
  deleteById(id: string): boolean;
  getStats(): LeadStats;
  ping(): boolean;
}

interface LeadRow {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  telegram_status: string;
  telegram_error: string | null;
  industry: string;
  challenge: string;
  interest: string;
  team_size: string;
  contact_name: string;
  contact_phone: string | null;
  contact_telegram: string | null;
  company: string | null;
  selected_context: string | null;
  notes: string | null;
  language: string;
  client_ip_hash: string;
}

function mapRowToLead(row: LeadRow): DiagnosticLead {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status as LeadStatus,
    telegramStatus: row.telegram_status as TelegramDeliveryStatus,
    telegramError: row.telegram_error,
    industry: row.industry,
    challenge: row.challenge,
    interest: row.interest,
    teamSize: row.team_size,
    contactName: row.contact_name,
    contactPhone: row.contact_phone,
    contactTelegram: row.contact_telegram,
    company: row.company,
    selectedContext: row.selected_context,
    notes: row.notes,
    language: row.language as SupportedLanguage,
    clientIpHash: row.client_ip_hash,
  };
}

function resolveDatabasePath(explicitPath?: string): string {
  if (explicitPath) return explicitPath;

  const envPath = process.env.DATABASE_PATH?.trim();
  if (envPath) return envPath;

  const defaultDir = path.join(process.cwd(), "data");
  try {
    mkdirSync(defaultDir, { recursive: true });
    return path.join(defaultDir, "leads.db");
  } catch {
    return path.join(tmpdir(), "dtai-leads.db");
  }
}

export class SqliteLeadRepository implements LeadRepository {
  private readonly db: DatabaseSync;

  constructor(dbPath?: string) {
    const resolved = resolveDatabasePath(dbPath);
    if (resolved !== ":memory:") {
      mkdirSync(path.dirname(resolved), { recursive: true });
    }
    this.db = new DatabaseSync(resolved);
    this.initSchema();
  }

  private initSchema(): void {
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS diagnostic_leads (
        id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        telegram_status TEXT NOT NULL DEFAULT 'pending',
        telegram_error TEXT,
        industry TEXT NOT NULL,
        challenge TEXT NOT NULL,
        interest TEXT NOT NULL,
        team_size TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        contact_phone TEXT,
        contact_telegram TEXT,
        company TEXT,
        selected_context TEXT,
        notes TEXT,
        language TEXT NOT NULL DEFAULT 'uz',
        client_ip_hash TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_diagnostic_leads_created_at
        ON diagnostic_leads (created_at DESC);

      CREATE INDEX IF NOT EXISTS idx_diagnostic_leads_status
        ON diagnostic_leads (status);
    `);
  }

  create(input: CreateLeadInput): DiagnosticLead {
    const id = `DT-${randomUUID().slice(0, 8).toUpperCase()}`;
    const now = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO diagnostic_leads (
        id, created_at, updated_at, status, telegram_status, telegram_error,
        industry, challenge, interest, team_size,
        contact_name, contact_phone, contact_telegram, company, selected_context,
        notes, language, client_ip_hash
      ) VALUES (?, ?, ?, 'new', 'pending', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?)
    `);

    stmt.run(
      id,
      now,
      now,
      input.industry,
      input.challenge,
      input.interest,
      input.teamSize,
      input.contactName,
      input.contactPhone,
      input.contactTelegram,
      input.company,
      input.selectedContext,
      input.language,
      input.clientIpHash
    );

    const created = this.findById(id);
    if (!created) {
      throw new Error("Failed to read back created diagnostic lead");
    }
    return created;
  }

  findById(id: string): DiagnosticLead | null {
    const stmt = this.db.prepare(
      `SELECT * FROM diagnostic_leads WHERE id = ? LIMIT 1`
    );
    const row = stmt.get(id) as LeadRow | undefined;
    return row ? mapRowToLead(row) : null;
  }

  findAll(query: LeadListQuery = {}): PaginatedLeadsResult {
    const limit = Math.min(Math.max(query.limit ?? 25, 1), 100);
    const offset = Math.max(query.offset ?? 0, 0);

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (query.status) {
      conditions.push("status = ?");
      params.push(query.status);
    }

    if (query.search) {
      const pattern = `%${query.search.trim()}%`;
      conditions.push(
        `(contact_name LIKE ? OR company LIKE ? OR contact_phone LIKE ? OR contact_telegram LIKE ? OR industry LIKE ?)`
      );
      params.push(pattern, pattern, pattern, pattern, pattern);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countStmt = this.db.prepare(
      `SELECT COUNT(*) AS count FROM diagnostic_leads ${whereClause}`
    );
    const countRow = countStmt.get(...params) as { count: number } | undefined;
    const total = Number(countRow?.count ?? 0);

    const listStmt = this.db.prepare(
      `SELECT * FROM diagnostic_leads ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    );
    const rows = listStmt.all(...params, limit, offset) as unknown as LeadRow[];

    return {
      items: rows.map(mapRowToLead),
      total,
      limit,
      offset,
      stats: this.getStats(),
    };
  }

  updateLead(
    id: string,
    patch: { status?: LeadStatus; notes?: string | null }
  ): DiagnosticLead | null {
    const existing = this.findById(id);
    if (!existing) return null;

    const nextStatus = patch.status ?? existing.status;
    const nextNotes = patch.notes !== undefined ? patch.notes : existing.notes;
    const now = new Date().toISOString();

    const stmt = this.db.prepare(`
      UPDATE diagnostic_leads
      SET status = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `);
    stmt.run(nextStatus, nextNotes, now, id);

    return this.findById(id);
  }

  updateTelegramDelivery(
    id: string,
    telegramStatus: TelegramDeliveryStatus,
    telegramError: string | null = null
  ): DiagnosticLead | null {
    const now = new Date().toISOString();
    const stmt = this.db.prepare(`
      UPDATE diagnostic_leads
      SET telegram_status = ?, telegram_error = ?, updated_at = ?
      WHERE id = ?
    `);
    stmt.run(telegramStatus, telegramError, now, id);
    return this.findById(id);
  }

  deleteById(id: string): boolean {
    const stmt = this.db.prepare(`DELETE FROM diagnostic_leads WHERE id = ?`);
    const result = stmt.run(id);
    return Number(result.changes) > 0;
  }

  getStats(): LeadStats {
    const rows = this.db
      .prepare(
        `SELECT status, COUNT(*) AS count FROM diagnostic_leads GROUP BY status`
      )
      .all() as unknown as { status: string; count: number }[];

    const byStatus: Record<LeadStatus, number> = {
      new: 0,
      contacted: 0,
      qualified: 0,
      archived: 0,
    };

    let total = 0;
    for (const row of rows) {
      const count = Number(row.count);
      total += count;
      if (row.status in byStatus) {
        byStatus[row.status as LeadStatus] = count;
      }
    }

    const failedRow = this.db
      .prepare(
        `SELECT COUNT(*) AS count FROM diagnostic_leads WHERE telegram_status = 'failed'`
      )
      .get() as { count: number } | undefined;

    return {
      total,
      byStatus,
      telegramFailed: Number(failedRow?.count ?? 0),
    };
  }

  ping(): boolean {
    const row = this.db.prepare(`SELECT 1 AS ok`).get() as
      | { ok: number }
      | undefined;
    return row?.ok === 1;
  }

  close(): void {
    this.db.close();
  }
}

const globalForRepo = globalThis as unknown as {
  __dtaiLeadRepo?: LeadRepository;
};

export function getLeadRepository(): LeadRepository {
  if (!globalForRepo.__dtaiLeadRepo) {
    globalForRepo.__dtaiLeadRepo = new SqliteLeadRepository();
  }
  return globalForRepo.__dtaiLeadRepo;
}
