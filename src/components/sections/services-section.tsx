"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ServiceIcon } from "@/components/service-icon";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";
import { SERVICES } from "@/lib/services-data";

interface ServicesSectionProps {
  locale: Locale;
  dict: Dictionary;
  showHeading?: boolean;
}

export function ServicesSection({
  locale,
  dict,
  showHeading = true,
}: ServicesSectionProps) {
  return (
    <section id="services" className="dtai-section border-t">
      <div className="dtai-container">
        {showHeading && (
          <div className="max-w-[680px]">
            <p className="dtai-eyebrow">{dict.services.eyebrow}</p>
            <h2 className="dtai-h2 mt-3">{dict.services.title}</h2>
            <p
              className="mt-4 text-[16px] leading-[1.6] md:text-[17px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {dict.services.subtitle}
            </p>
          </div>
        )}

        <div className={`${showHeading ? "mt-12" : ""} grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4`}>
          {SERVICES.map((service, index) => {
            const copy = dict.services.items[service.id];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <SpotlightCard className="h-full rounded-[var(--radius-lg)]">
                  <Link
                    href={buildLocalePath(locale, `/xizmatlar/${service.slug}`)}
                    className="dtai-card group relative flex h-full flex-col justify-between p-8"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span style={{ color: "var(--color-accent-blue)" }}>
                          <ServiceIcon id={service.id} size={40} />
                        </span>
                        <span
                          className="dtai-mono-tag"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {service.num}
                        </span>
                      </div>

                      <h3
                        className="mt-4 text-[20px] font-semibold leading-[1.3]"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {copy.title}
                      </h3>

                      <p
                        className="mt-2 text-[15px] leading-[1.5]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {copy.desc}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {service.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="dtai-mono-tag rounded-md border px-2 py-0.5"
                            style={{
                              borderColor: "var(--color-border)",
                              backgroundColor: "var(--color-bg-base)",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors"
                      style={{ color: "var(--color-accent-blue-text)" }}
                    >
                      <span>{dict.common.details}</span>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
