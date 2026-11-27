import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const SITE_ROOT = path.resolve(import.meta.dirname, "..");

function readSource(relPath) {
  return fs.readFileSync(path.join(SITE_ROOT, relPath), "utf8");
}

describe("DT&AI Backend Architecture & Security Suite", () => {
  it("supports node:sqlite in-memory lead persistence and parameterized queries", () => {
    const db = new DatabaseSync(":memory:");
    db.exec(`
      CREATE TABLE diagnostic_leads (
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
    `);

    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT INTO diagnostic_leads (
        id, created_at, updated_at, status, telegram_status,
        industry, challenge, interest, team_size,
        contact_name, contact_phone, contact_telegram, company,
        language, client_ip_hash
      ) VALUES (?, ?, ?, 'new', 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      "DT-TEST0001",
      now,
      now,
      "Savdo",
      "Tarqoq ma'lumotlar",
      "CRM + AI",
      "10-50",
      "Azizbek",
      "+998901234567",
      "@azizbek",
      "Test LLC",
      "uz",
      "hash123"
    );

    const row = db
      .prepare("SELECT * FROM diagnostic_leads WHERE id = ?")
      .get("DT-TEST0001");

    assert.equal(row.contact_name, "Azizbek");
    assert.equal(row.status, "new");
    assert.equal(row.telegram_status, "pending");

    db.prepare(
      "UPDATE diagnostic_leads SET telegram_status = ?, updated_at = ? WHERE id = ?"
    ).run("sent", new Date().toISOString(), "DT-TEST0001");

    const updated = db
      .prepare("SELECT telegram_status FROM diagnostic_leads WHERE id = ?")
      .get("DT-TEST0001");
    assert.equal(updated.telegram_status, "sent");

    db.close();
  });

  it("enforces admin auth on /api/leads and /api/leads/[id] routes", () => {
    const leadsRoute = readSource("src/app/api/leads/route.ts");
    const leadByIdRoute = readSource("src/app/api/leads/[id]/route.ts");
    const authModule = readSource("src/lib/server/auth.ts");

    assert.match(leadsRoute, /requireAdminAuth\(request\)/);
    assert.match(leadByIdRoute, /requireAdminAuth\(request\)/);
    assert.match(authModule, /timingSafeEqual/);
    assert.match(authModule, /status:\s*503/);
    assert.match(authModule, /status:\s*401/);
  });

  it("persists leads before Telegram delivery and never exposes secrets in health/API responses", () => {
    const sendRoute = readSource("src/app/api/send-diagnostic/route.ts");
    const healthRoute = readSource("src/app/api/health/route.ts");

    const createIdx = sendRoute.indexOf("repo.create(");
    const telegramIdx = sendRoute.indexOf("sendTelegramNotification(");
    assert.ok(createIdx !== -1 && telegramIdx !== -1 && createIdx < telegramIdx);

    assert.doesNotMatch(healthRoute, /TELEGRAM_BOT_TOKEN/);
    assert.doesNotMatch(healthRoute, /ADMIN_API_KEY/);
    assert.match(healthRoute, /isTelegramConfigured\(\)/);
  });

  it("keeps database files and .env.local excluded from git in .gitignore", () => {
    const gitignore = readSource(".gitignore");
    assert.match(gitignore, /^\.env\*/m);
    assert.match(gitignore, /^!\.env\.example/m);
    assert.match(gitignore, /^\/data\//m);
    assert.match(gitignore, /^\*\.db$/m);
  });
});
