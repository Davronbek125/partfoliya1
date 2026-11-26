"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { ServiceIcon } from "@/components/service-icon";
import { PageHeader } from "@/components/sections/page-header";
import { setDiagnosticContext } from "@/lib/diagnostic-context";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";
import {
  getServiceBySlug,
  type IndustryKey,
  type ServiceDefinition,
} from "@/lib/services-data";

interface ServiceDetailViewProps {
  locale: Locale;
  dict: Dictionary;
  service: ServiceDefinition;
}

export function ServiceDetailView({
  locale,
  dict,
  service,
}: ServiceDetailViewProps) {
  const serviceCopy = dict.services.items[service.id];
  const detailCopy = dict.servicePages[service.id];

  const relatedServices = service.related
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is ServiceDefinition => Boolean(item));

  return (
    <>
      <PageHeader
        eyebrow={`${service.num} · ${dict.servicePage.breadcrumbServices}`}
        title={serviceCopy.title}
        subtitle={detailCopy.lead}
        breadcrumbs={[
          { label: dict.nav.home, href: buildLocalePath(locale) },
          {
            label: dict.servicePage.breadcrumbServices,
            href: buildLocalePath(locale, "/xizmatlar"),
          },
          { label: serviceCopy.title },
        ]}
      />

      {/* Features grid (3 cols desktop / 2 tablet / 1 mobile per spec 09) */}
      <section className="dtai-section border-t">
        <div className="dtai-container">
          <div className="flex items-center gap-4">
            <span style={{ color: "var(--color-accent-blue)" }}>
              <ServiceIcon id={service.id} size={36} />
            </span>
            <h2 className="dtai-h2">{dict.servicePage.featuresTitle}</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detailCopy.features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="dtai-card flex flex-col justify-between p-8"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span style={{ color: "var(--color-accent-blue)" }}>
                      <CheckCircle2 size={24} strokeWidth={1.5} />
                    </span>
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className="mt-4 text-[20px] font-semibold leading-[1.3]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="mt-2 text-[15px] leading-[1.55]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Target industries */}
      <section className="dtai-section border-t">
        <div className="dtai-container">
          <div
            className="rounded-2xl border p-6 md:p-10 theme-surface-transition"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <h2 className="dtai-h2">{dict.servicePage.industriesTitle}</h2>
            <p
              className="mt-3 max-w-[680px] text-[16px] leading-[1.6]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {dict.servicePage.industriesNote}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {service.industries.map((indKey: IndustryKey) => (
                <Link
                  key={indKey}
                  href={buildLocalePath(locale, "#industries")}
                  className="rounded-full border px-4 py-2 text-[14px] font-medium transition-colors duration-200 hover:border-[var(--color-accent-blue)]"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {dict.industries.items[indKey].name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section
        className="border-t py-20 md:py-24 theme-surface-transition"
        style={{
          background: "var(--color-final-cta-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="dtai-container flex flex-col items-center text-center">
          <h2
            className="text-[28px] font-semibold leading-[1.18] md:text-[40px]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            {dict.servicePage.ctaTitle}
          </h2>
          <p
            className="mt-4 max-w-[560px] text-[16px] leading-[1.6] md:text-[17px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {dict.servicePage.ctaText}
          </p>
          <div className="mt-8">
            <Link
              href={buildLocalePath(locale, "#diagnostic")}
              onClick={() =>
                setDiagnosticContext({
                  label: serviceCopy.title,
                  serviceId: service.id,
                })
              }
              className="dtai-btn-primary"
            >
              <span>{dict.servicePage.ctaButton}</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="dtai-section border-t">
        <div className="dtai-container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="dtai-h2">{dict.servicePage.relatedTitle}</h2>
            <Link
              href={buildLocalePath(locale, "/xizmatlar")}
              className="dtai-btn-secondary self-start md:self-auto"
            >
              <span>{dict.servicePage.backToAll}</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedServices.map((rel) => {
              const relCopy = dict.services.items[rel.id];
              return (
                <Link
                  key={rel.id}
                  href={buildLocalePath(locale, `/xizmatlar/${rel.slug}`)}
                  className="dtai-card group flex flex-col justify-between p-8"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span style={{ color: "var(--color-accent-blue)" }}>
                        <ServiceIcon id={rel.id} size={32} />
                      </span>
                      <span
                        className="text-[13px] font-semibold"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {rel.num}
                      </span>
                    </div>
                    <h3
                      className="mt-4 text-[20px] font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {relCopy.title}
                    </h3>
                    <p
                      className="mt-2 text-[15px] leading-[1.5]"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {relCopy.desc}
                    </p>
                  </div>

                  <span
                    className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold"
                    style={{ color: "var(--color-accent-blue-text)" }}
                  >
                    <span>{dict.common.details}</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

