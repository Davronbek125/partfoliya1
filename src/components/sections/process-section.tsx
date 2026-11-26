"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";

interface ProcessSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProcessSection({ locale, dict }: ProcessSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 55%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const orbTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="dtai-section border-t">
      <div className="dtai-container">
        <div className="max-w-[680px]">
          <p className="dtai-eyebrow">{dict.process.eyebrow}</p>
          <h2 className="dtai-h2 mt-3">{dict.process.title}</h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] md:text-[17px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {dict.process.subtitle}
          </p>
        </div>

        <div className="mt-12 max-w-[780px]">
          <div ref={timelineRef} className="relative">
            <div
              aria-hidden="true"
              className="absolute top-5 bottom-8 left-[17px] w-[2px] md:top-6 md:bottom-10 md:left-[23px]"
              style={{ backgroundColor: "var(--color-border)" }}
            />
            <motion.div
              aria-hidden="true"
              style={{
                scaleY: lineScaleY,
                transformOrigin: "top",
                backgroundImage: "var(--gradient-primary)",
              }}
              className="absolute top-5 bottom-8 left-[17px] w-[2px] md:top-6 md:bottom-10 md:left-[23px]"
            />
            {!prefersReducedMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-5 bottom-8 left-[17px] w-[2px] md:top-6 md:bottom-10 md:left-[23px]"
              >
                <motion.span
                  style={{
                    top: orbTop,
                    backgroundColor: "var(--color-accent-cyan)",
                    boxShadow: "var(--shadow-glow-pulse-peak)",
                  }}
                  className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                />
              </div>
            )}

            <ol className="flex flex-col gap-10 md:gap-16">
              {dict.process.steps.map((step, index) => {
                const deliverable = dict.process.deliverables[index];
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex items-start gap-5 md:gap-6"
                  >
                    <motion.span
                      initial={{ scale: 1 }}
                      whileInView={{ scale: [1, 1.15, 1] }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="dtai-surface-bevel relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[15px] font-semibold md:h-12 md:w-12 md:text-[18px]"
                      style={{
                        fontFamily: "var(--font-display)",
                        borderColor: "var(--color-accent-blue)",
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {index + 1}
                    </motion.span>

                    <div className="flex-1 pt-0.5 md:pt-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3
                          className="text-[20px] font-semibold leading-[1.3] md:text-[22px]"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {step.title}
                        </h3>
                        {deliverable && (
                          <span
                            className="dtai-mono-tag rounded-full border px-2.5 py-0.5"
                            style={{
                              borderColor: "var(--color-border)",
                              backgroundColor: "var(--color-surface)",
                              color: "var(--color-accent-blue-text)",
                            }}
                          >
                            {deliverable}
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-2 text-[15px] leading-[1.6] md:text-[16px]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <div className="mt-12 pl-14 md:pl-[72px]">
            <Link href={buildLocalePath(locale, "#diagnostic")} className="dtai-btn-primary">
              <span>{dict.finalCta.cta}</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
