"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { setDiagnosticContext } from "@/lib/diagnostic-context";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";
import { PACKAGE_KEYS } from "@/lib/services-data";

interface PackagesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function PackagesSection({ locale, dict }: PackagesSectionProps) {
  return (
    <section id="packages" className="dtai-section border-t">
      <div className="dtai-container">
        <div className="max-w-[680px]">
          <p className="dtai-eyebrow">{dict.packages.eyebrow}</p>
          <h2 className="dtai-h2 mt-3">{dict.packages.title}</h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] md:text-[17px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {dict.packages.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PACKAGE_KEYS.map((key, index) => {
            const item = dict.packages.items[key];
            const isFeatured = key === "ai_business";
            const badge = "badge" in item ? item.badge : undefined;
            const anchorId = key.replace("_", "-");
            const ctaHref = buildLocalePath(locale, "#diagnostic");

            return (
              <SpotlightCard
                key={key}
                className="flex h-full rounded-[20px]"
              >
                <motion.article
                  id={anchorId}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    scrollMarginTop: "96px",
                    backgroundColor: "var(--color-surface)",
                    borderColor: isFeatured
                      ? "var(--color-accent-blue)"
                      : "var(--color-border)",
                    boxShadow: isFeatured
                      ? "var(--shadow-surface-bevel), var(--shadow-card-hover)"
                      : "var(--shadow-surface-bevel)",
                  }}
                  className={`relative flex h-full w-full flex-col justify-between rounded-[20px] px-6 py-8 xl:px-8 xl:py-10 transition-[transform,background-color,box-shadow] duration-250 hover:-translate-y-1 ${
                    isFeatured ? "border-2" : "border"
                  }`}
                >
                  {isFeatured && (
                    <BorderBeam
                      size={90}
                      duration={6}
                      borderWidth={2}
                      colorFrom="var(--color-accent-blue)"
                      colorTo="var(--color-accent-violet)"
                    />
                  )}

                  <div>
                    {badge && (
                      <span
                        className="mb-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.04em]"
                        style={{
                          backgroundImage: "var(--gradient-primary)",
                          color: "var(--color-on-accent)",
                        }}
                      >
                        {badge}
                      </span>
                    )}

                  <h3
                    className="text-[24px] font-bold uppercase tracking-[0.02em]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    className="mt-2 text-[15px] leading-[1.5]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.tagline}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[14px] leading-[1.6]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--color-accent-blue)" }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <div
                    className="border-t pt-4 text-[13px] font-semibold uppercase tracking-[0.04em]"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {item.model}
                  </div>

                  <Link
                    href={ctaHref}
                    onClick={() =>
                      setDiagnosticContext({
                        label: item.name,
                        packageKey: key,
                      })
                    }
                    className={`mt-6 w-full ${
                      isFeatured ? "dtai-btn-primary" : "dtai-btn-secondary"
                    }`}
                  >
                    <span>{item.cta}</span>
                  </Link>
                </div>
                </motion.article>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
