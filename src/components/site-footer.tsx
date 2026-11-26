import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ContactChannels } from "@/components/contact-channels";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const navLinks = [
    { label: dict.nav.home, href: buildLocalePath(locale) },
    { label: dict.nav.services, href: buildLocalePath(locale, "#services") },
    { label: dict.nav.industries, href: buildLocalePath(locale, "#industries") },
    { label: dict.nav.process, href: buildLocalePath(locale, "#process") },
    { label: dict.nav.packages, href: buildLocalePath(locale, "#packages") },
    { label: dict.nav.contact, href: buildLocalePath(locale, "#diagnostic") },
    { label: dict.common.allServices, href: buildLocalePath(locale, "/xizmatlar") },
  ];

  return (
    <footer
      className="relative z-10 border-t pt-16 pb-8 theme-surface-transition"
      style={{
        backgroundColor: "var(--color-bg-base)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="dtai-container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <Link
              href={buildLocalePath(locale)}
              className="inline-flex items-center gap-2.5 text-[18px] font-bold tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              <BrandMark size={24} />
              <span>{dict.footer.logo}</span>
            </Link>
            <p
              className="mt-2 text-[13px] font-medium"
              style={{ color: "var(--color-accent-blue)" }}
            >
              {dict.common.brandFull}
            </p>
            <p
              className="mt-3 max-w-[280px] text-[14px] leading-[1.5]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h2
              className="text-[13px] font-semibold uppercase tracking-[0.04em]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] transition-colors duration-200 hover:text-[var(--color-text-primary)] hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2
              className="text-[13px] font-semibold uppercase tracking-[0.04em]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {dict.footer.langTitle}
            </h2>
            <div className="mt-4">
              <LanguageSwitcher
                currentLocale={locale}
                ariaLabel={dict.nav.ariaLanguage}
              />
            </div>
            <p
              className="mt-4 max-w-[280px] text-[13px] font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              {dict.footer.contactPlaceholder}
            </p>
            <ContactChannels
              labels={dict.contactPage.channels}
              copyLabels={{
                copy: dict.common.copyLabel,
                copied: dict.common.copied,
              }}
              variant="compact"
            />
            <Link
              href={buildLocalePath(locale, "#diagnostic")}
              className="mt-4 inline-flex items-center text-[14px] font-semibold transition-colors duration-200 hover:underline"
              style={{ color: "var(--color-accent-blue)" }}
            >
              {dict.finalCta.cta} →
            </Link>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-[13px] sm:flex-row"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <p className="text-center sm:text-left">{dict.footer.copyright}</p>
          <a
            href="#main-content"
            className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-[var(--color-text-primary)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span>{dict.common.backToTop}</span>
            <ArrowUp size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
