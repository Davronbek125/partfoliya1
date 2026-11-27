"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Command } from "lucide-react";
import { openCommandPalette } from "@/components/command-palette";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[112px] pb-16 md:pt-[180px] md:pb-28"
    >
      {/* Hero foreground copy — visible immediately on SSR for fast LCP */}
      <div className="dtai-container relative z-10 flex flex-col items-center text-center">
        <p className="dtai-eyebrow">{dict.hero.eyebrow}</p>

        <h1 className="dtai-h1 mt-4 max-w-[900px]">
          {dict.hero.title}{" "}
          <span className="dtai-gradient-text">{dict.hero.titleAccent}</span>
        </h1>

        <p
          className="mt-6 max-w-[600px] text-[16px] leading-[1.6] md:text-[18px]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {dict.hero.subtitle}
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href={buildLocalePath(locale, "#diagnostic")}
            className="dtai-btn-primary w-full sm:w-auto"
          >
            <span>{dict.hero.ctaPrimary}</span>
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
          <Link
            href={buildLocalePath(locale, "#services")}
            className="dtai-btn-secondary w-full sm:w-auto"
          >
            <span>{dict.hero.ctaSecondary}</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={openCommandPalette}
          className="mt-6 inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors hover:border-[var(--color-accent-blue)] hover:text-[var(--color-text-primary)] active:scale-[0.98]"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <Command size={14} strokeWidth={1.5} />
          <span className="dtai-mono-tag hidden sm:inline">Ctrl+K</span>
          <span className="hidden sm:inline">·</span>
          <span>{dict.command.buttonLabel}</span>
        </button>
      </div>
    </section>
  );
}
