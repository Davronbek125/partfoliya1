import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const SITE_ROOT = path.resolve(import.meta.dirname, "..");

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(SITE_ROOT, relPath), "utf8"));
}

function collectShapePaths(obj, prefix = "") {
  if (Array.isArray(obj)) {
    const paths = [`${prefix}[len=${obj.length}]`];
    obj.forEach((item, idx) => {
      paths.push(...collectShapePaths(item, `${prefix}[${idx}]`));
    });
    return paths;
  }
  if (obj && typeof obj === "object") {
    const keys = Object.keys(obj).sort();
    const paths = [];
    for (const k of keys) {
      const next = prefix ? `${prefix}.${k}` : k;
      paths.push(next, ...collectShapePaths(obj[k], next));
    }
    return paths;
  }
  return [`${prefix}:${typeof obj}`];
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(clean.slice(offset, offset + 2), 16));
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fgHex, bgHex) {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("DT&AI Corporate Site Verification Suite", () => {
  it("keeps full i18n schema & structure parity across uz, ru, and en", () => {
    const uz = readJson("src/i18n/uz.json");
    const ru = readJson("src/i18n/ru.json");
    const en = readJson("src/i18n/en.json");

    const uzShape = collectShapePaths(uz);
    const ruShape = collectShapePaths(ru);
    const enShape = collectShapePaths(en);

    assert.deepEqual(ruShape, uzShape, "RU dictionary shape must match UZ");
    assert.deepEqual(enShape, uzShape, "EN dictionary shape must match UZ");
  });

  it("enforces no pricing numbers in Packages across all locales", () => {
    for (const locale of ["uz", "ru", "en"]) {
      const dict = readJson(`src/i18n/${locale}.json`);
      const packagesJson = JSON.stringify(dict.packages);
      assert.equal(
        /\$\d|\d+\s?(uzs|sum|so'm|usd|rub|₽)/i.test(packagesJson),
        false,
        `Packages in ${locale}.json must not contain pricing figures`
      );
    }
  });

  it("verifies WCAG AA (>= 4.5:1) color contrast for Dark and Light theme tokens", () => {
    const css = fs.readFileSync(path.join(SITE_ROOT, "src/app/globals.css"), "utf8");
    const lightIdx = css.indexOf('[data-theme="light"]');
    assert.ok(lightIdx > 0, "globals.css must declare [data-theme=\"light\"]");

    const darkCss = css.slice(0, lightIdx);
    const lightCss = css.slice(lightIdx);

    const extractToken = (block, name) => {
      const m = block.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`));
      assert.ok(m, `Missing hex token ${name}`);
      return m[1];
    };

    for (const [mode, block] of [
      ["dark", darkCss],
      ["light", lightCss],
    ]) {
      const surfaces = [
        extractToken(block, "--color-bg-base"),
        extractToken(block, "--color-surface"),
        extractToken(block, "--color-surface-raised"),
      ];
      const textTokens = [
        extractToken(block, "--color-text-primary"),
        extractToken(block, "--color-text-secondary"),
        extractToken(block, "--color-text-muted"),
        extractToken(block, "--color-accent-blue-text"),
        extractToken(block, "--color-accent-cyan"),
        extractToken(block, "--color-accent-amber"),
        extractToken(block, "--color-accent-error"),
      ];

      for (const fg of textTokens) {
        for (const bg of surfaces) {
          const ratio = contrastRatio(fg, bg);
          assert.ok(
            ratio >= 4.5,
            `${mode} mode contrast fail: ${fg} on ${bg} is ${ratio.toFixed(2)}:1 (< 4.5:1)`
          );
        }
      }

      const brandBlue = extractToken(block, "--color-accent-blue");
      for (const bg of surfaces.slice(0, 2)) {
        const ratio = contrastRatio(brandBlue, bg);
        assert.ok(
          ratio >= 4.5,
          `${mode} mode primary blue fail: ${brandBlue} on ${bg} is ${ratio.toFixed(2)}:1 (< 4.5:1)`
        );
      }
    }
  });

  it("ensures service slugs, related links, and contact details are valid", () => {
    const servicesTs = fs.readFileSync(
      path.join(SITE_ROOT, "src/lib/services-data.ts"),
      "utf8"
    );
    const slugs = [...servicesTs.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
    assert.equal(slugs.length, 8, "Expected 8 services");
    assert.equal(new Set(slugs).size, 8, "Service slugs must be unique");

    const relatedArrays = [...servicesTs.matchAll(/related:\s*\[([^\]]+)\]/g)];
    assert.equal(relatedArrays.length, 8);
    for (const match of relatedArrays) {
      const relSlugs = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
      for (const rel of relSlugs) {
        assert.ok(slugs.includes(rel), `Unknown related service slug: ${rel}`);
      }
    }

    const contactTs = fs.readFileSync(
      path.join(SITE_ROOT, "src/lib/contact.ts"),
      "utf8"
    );
    assert.equal(contactTs.includes("gamil.com"), false, "Email must not contain typo");
    assert.ok(contactTs.includes("+998 93 735 63 06"));
    assert.ok(contactTs.includes("orishboevdavronbek@gmail.com"));
  });

  it("enforces zero stock/raster images in public/ and no leaked Telegram secrets in client src", () => {
    const publicDir = path.join(SITE_ROOT, "public");
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      assert.equal(files.length, 0, "public/ should contain no static image files");
    }

    const walkTsx = (dir) => {
      const out = [];
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walkTsx(full));
        else if (
          /\.(ts|tsx)$/.test(entry.name) &&
          !full.includes(`${path.sep}api${path.sep}`) &&
          !full.includes(`${path.sep}lib${path.sep}server${path.sep}`)
        ) {
          out.push(full);
        }
      }
      return out;
    };

    for (const file of walkTsx(path.join(SITE_ROOT, "src"))) {
      const content = fs.readFileSync(file, "utf8");
      assert.equal(
        content.includes("TELEGRAM_BOT_TOKEN") || content.includes("TELEGRAM_CHAT_ID"),
        false,
        `Non-server file must never reference Telegram secrets: ${file}`
      );
      assert.equal(
        content.includes("@/lib/server"),
        false,
        `Client/UI file must never import server-only modules: ${file}`
      );
      assert.equal(
        /<img\b/i.test(content),
        false,
        `No raster <img> allowed in UI file: ${file}`
      );
      assert.equal(
        /\btext-white\b/.test(content),
        false,
        `Use var(--color-on-accent) instead of hardcoded text-white: ${file}`
      );
    }
  });
});
