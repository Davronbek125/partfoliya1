import React from "react";
import { ContactChannels } from "@/components/contact-channels";
import { DiagnosticForm } from "@/components/sections/diagnostic-form";
import type { Dictionary, Locale } from "@/lib/i18n";

interface DiagnosticSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function DiagnosticSection({ locale, dict }: DiagnosticSectionProps) {
  return (
    <section id="diagnostic" className="dtai-section border-t">
      <div className="dtai-container">
        <div className="max-w-[680px]">
          <p className="dtai-eyebrow">{dict.diagnostic.eyebrow}</p>
          <h2 className="dtai-h2 mt-3">{dict.diagnostic.title}</h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] md:text-[17px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {dict.diagnostic.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DiagnosticForm locale={locale} dict={dict} />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* How DT&AI follows up with the client */}
            <div
              className="rounded-2xl border p-6 md:p-8 theme-surface-transition"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-[18px] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)",
                }}
              >
                {dict.diagnostic.workflowTitle}
              </h3>

              <ol className="mt-5 flex flex-col gap-5">
                {dict.diagnostic.workflowSteps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-3.5">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        borderColor: "var(--color-accent-blue)",
                        backgroundColor: "var(--color-accent-tint)",
                        color: "var(--color-accent-blue)",
                      }}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <p
                        className="text-[15px] font-semibold leading-[1.35]"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="mt-1 text-[13px] leading-[1.55]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Direct contact channels */}
            <div
              className="rounded-2xl border p-6 md:p-8 theme-surface-transition"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-[18px] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)",
                }}
              >
                {dict.contactPage.infoTitle}
              </h3>
              <p
                className="mt-1.5 mb-5 text-[14px] leading-[1.6]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {dict.contactPage.infoNote}
              </p>
              <ContactChannels
                labels={dict.contactPage.channels}
                copyLabels={{
                  copy: dict.common.copyLabel,
                  copied: dict.common.copied,
                }}
                variant="cards"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
