"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ServiceIcon } from "@/components/service-icon";
import { setDiagnosticContext } from "@/lib/diagnostic-context";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";
import {
  getServicesForIndustry,
  INDUSTRY_KEYS,
  type IndustryKey,
} from "@/lib/services-data";

interface IndustriesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function IndustriesSection({ locale, dict }: IndustriesSectionProps) {
  const [selected, setSelected] = useState<IndustryKey>("trade");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeCopy = dict.industries.items[selected];
  const matchedServices = getServicesForIndustry(selected);

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % INDUSTRY_KEYS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + INDUSTRY_KEYS.length) % INDUSTRY_KEYS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = INDUSTRY_KEYS.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextKey = INDUSTRY_KEYS[nextIndex];
      setSelected(nextKey);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section id="industries" className="dtai-section border-t">
      <div className="dtai-container">
        <div className="max-w-[680px]">
          <p className="dtai-eyebrow">{dict.industries.eyebrow}</p>
          <h2 className="dtai-h2 mt-3">{dict.industries.title}</h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] md:text-[17px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {dict.industries.subtitle}
          </p>
        </div>

        {/* Liquid Bulge Interactive Chip Selector with full keyboard navigation */}
        <LayoutGroup id="industries-selector">
          <div
            role="tablist"
            aria-label={dict.industries.title}
            className="dtai-no-scrollbar mt-10 flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0"
          >
            {INDUSTRY_KEYS.map((key, index) => {
              const isActive = key === selected;
              const label = dict.industries.items[key].name;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`industry-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`industry-panel-${key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSelected(key)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className="relative shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    color: isActive
                      ? "var(--color-on-accent)"
                      : "var(--color-text-secondary)",
                    outlineColor: "var(--color-accent-blue)",
                  }}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="industry-chip-bulge"
                      transition={{
                        duration: 0.3,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundImage: "var(--gradient-primary)" }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-20 rounded-full border"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                      }}
                    />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Active Industry Result Panel */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              id={`industry-panel-${selected}`}
              role="tabpanel"
              aria-labelledby={`industry-tab-${selected}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border p-6 md:p-8 theme-surface-transition"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3
                    className="text-[22px] font-semibold md:text-[24px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {activeCopy.name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeCopy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3.5 py-1.5 text-[13px] font-medium"
                        style={{
                          borderColor: "var(--color-accent-blue)",
                          backgroundColor: "var(--color-accent-tint)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={buildLocalePath(locale, "#diagnostic")}
                  onClick={() =>
                    setDiagnosticContext({
                      label: activeCopy.name,
                      industryKey: selected,
                    })
                  }
                  className="dtai-btn-primary shrink-0 self-start lg:self-center"
                >
                  <span>{dict.finalCta.cta}</span>
                  <ArrowRight size={18} strokeWidth={1.5} />
                </Link>
              </div>

              <div
                className="mt-6 border-t pt-6"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-[12px] font-semibold uppercase tracking-[0.04em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {dict.common.recommendedServices}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {matchedServices.map((service) => (
                    <Link
                      key={service.id}
                      href={buildLocalePath(locale, `/xizmatlar/${service.slug}`)}
                      className="flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-colors duration-200 hover:border-[var(--color-accent-blue)]"
                      style={{
                        backgroundColor: "var(--color-surface-raised)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span style={{ color: "var(--color-accent-blue)" }}>
                          <ServiceIcon id={service.id} size={20} />
                        </span>
                        <span
                          className="truncate text-[14px] font-medium"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {dict.services.items[service.id].title}
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        className="shrink-0"
                        style={{ color: "var(--color-text-muted)" }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
