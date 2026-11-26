"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  Command,
  FileSpreadsheet,
  FileText,
  Layers,
  MessageSquare,
  Unlink,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { openCommandPalette } from "@/components/command-palette";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const CHAOS_POSITIONS = [
  { x: -340, y: -130, rotate: -9, Icon: FileSpreadsheet },
  { x: 320, y: -140, rotate: 8, Icon: MessageSquare },
  { x: -380, y: 20, rotate: -6, Icon: FileText },
  { x: 370, y: 15, rotate: 7, Icon: Clock },
  { x: -270, y: 150, rotate: -5, Icon: Unlink },
  { x: 280, y: 145, rotate: 6, Icon: AlertCircle },
] as const;

const HERO_SESSION_KEY = "dtai-hero-chaos-played";

function subscribeNoop(): () => void {
  return () => {};
}

function getHeroSnapshot(): string {
  try {
    return window.sessionStorage.getItem(HERO_SESSION_KEY) === "1"
      ? "mounted-played"
      : "mounted-fresh";
  } catch {
    return "mounted-fresh";
  }
}

function getHeroServerSnapshot(): string {
  return "server";
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const phase = useSyncExternalStore(
    subscribeNoop,
    getHeroSnapshot,
    getHeroServerSnapshot
  );

  useEffect(() => {
    try {
      window.sessionStorage.setItem(HERO_SESSION_KEY, "1");
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const shouldAnimateIntro = phase === "mounted-fresh" && !prefersReducedMotion;

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[140px] pb-20 md:pt-[180px] md:pb-28"
    >
      {/* Top atmospheric spotlight glow (Linear / Vercel style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{ backgroundImage: "var(--color-hero-ambient)" }}
      />

      {/* Background Chaos -> Order convergence diagram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          key={shouldAnimateIntro ? "intro" : "settled"}
          className="relative h-[420px] w-full max-w-[980px]"
          style={{
            maskImage:
              "radial-gradient(ellipse 78% 72% at 50% 50%, #000 35%, transparent 100%)",
          }}
        >
          <svg
            className="hidden md:block absolute inset-0 h-full w-full opacity-25"
            viewBox="0 0 980 420"
            fill="none"
          >
            <circle
              cx="490"
              cy="210"
              r="116"
              stroke="var(--color-border)"
              strokeDasharray="4 6"
            />
            <circle
              cx="490"
              cy="210"
              r="188"
              stroke="var(--color-border)"
              strokeDasharray="3 8"
            />
          </svg>

          <motion.div
            initial={
              shouldAnimateIntro
                ? { opacity: 0.15, scale: 0.82 }
                : { opacity: 0.35, scale: 1 }
            }
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{
              duration: shouldAnimateIntro ? 0.9 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-1/2 left-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border"
              style={{
                borderColor: "var(--color-accent-blue)",
                backgroundColor: "var(--color-accent-tint)",
                color: "var(--color-accent-blue)",
              }}
            >
              <Layers size={28} strokeWidth={1.5} />
            </div>
          </motion.div>

          {CHAOS_POSITIONS.map((node, index) => {
            const label = dict.hero.chaosItems[index] ?? "";
            const { Icon } = node;
            const targetX = node.x * 0.48;
            const targetY = node.y * 0.48;

            return (
              <motion.div
                key={label}
                initial={
                  shouldAnimateIntro
                    ? { x: node.x, y: node.y, rotate: node.rotate, opacity: 0.65 }
                    : { x: targetX, y: targetY, rotate: 0, opacity: 0.28 }
                }
                animate={{
                  x: targetX,
                  y: targetY,
                  rotate: 0,
                  opacity: 0.28,
                }}
                transition={{
                  duration: shouldAnimateIntro ? 1.15 : 0,
                  delay: shouldAnimateIntro ? index * 0.08 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hidden lg:inline-flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium whitespace-nowrap"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <Icon
                  size={14}
                  strokeWidth={1.5}
                  style={{ color: "var(--color-accent-blue)" }}
                />
                <span>{label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

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
          className="mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] transition-colors hover:border-[var(--color-accent-blue)] hover:text-[var(--color-text-primary)]"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <Command size={13} strokeWidth={1.5} />
          <span className="dtai-mono-tag">Ctrl+K</span>
          <span>·</span>
          <span>{dict.command.buttonLabel}</span>
        </button>
      </div>
    </section>
  );
}
