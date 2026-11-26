"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/lib/i18n";

interface FaqSectionProps {
  dict: Dictionary;
}

export function FaqSection({ dict }: FaqSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="dtai-section border-t">
      <div className="dtai-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="dtai-eyebrow">{dict.faq.eyebrow}</p>
            <h2 className="dtai-h2 mt-3">{dict.faq.title}</h2>
            <p
              className="mt-4 max-w-[460px] text-[16px] leading-[1.6] md:text-[17px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {dict.faq.subtitle}
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3">
            {dict.faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `faq-panel-${idx}`;
              const buttonId = `faq-btn-${idx}`;

              return (
                <div
                  key={item.q}
                  className="dtai-surface-bevel overflow-hidden rounded-2xl border transition-colors"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: isOpen
                      ? "var(--color-accent-blue)"
                      : "var(--color-border)",
                  }}
                >
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
                    >
                      <span
                        className="text-[16px] font-semibold leading-[1.4] sm:text-[17px]"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-surface-raised)",
                          color: isOpen
                            ? "var(--color-accent-blue-text)"
                            : "var(--color-text-muted)",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <Plus size={16} strokeWidth={1.75} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="border-t px-5 py-4 sm:px-6 text-[15px] leading-[1.65]"
                          style={{
                            borderColor: "var(--color-border)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
