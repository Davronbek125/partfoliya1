"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  ariaLabel?: string;
  onSelect?: () => void;
}

export function switchLocaleInPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && LOCALES.includes(segments[1] as Locale)) {
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }
  return `/${targetLocale}`;
}

export function LanguageSwitcher({
  currentLocale,
  ariaLabel = "Language",
  onSelect,
}: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${currentLocale}`;

  const handlePersist = (locale: Locale) => {
    try {
      window.localStorage.setItem("lang-preference", locale);
    } catch {
      // Ignore storage failures
    }
    onSelect?.();
  };

  return (
    <div
      className="inline-flex items-center gap-3"
      role="navigation"
      aria-label={ariaLabel}
    >
      {LOCALES.map((loc) => {
        const isActive = loc === currentLocale;
        const targetHref = switchLocaleInPath(pathname, loc);
        return (
          <Link
            key={loc}
            href={targetHref}
            onClick={() => handlePersist(loc)}
            aria-current={isActive ? "true" : undefined}
            className="relative py-1 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200"
            style={{
              color: isActive
                ? "var(--color-text-primary)"
                : "var(--color-text-muted)",
            }}
          >
            {loc}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ backgroundColor: "var(--color-accent-blue)" }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}

