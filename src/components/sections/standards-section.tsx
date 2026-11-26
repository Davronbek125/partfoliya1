"use client";

import React from "react";
import { BookOpenCheck, Layers, ShieldCheck, Workflow } from "lucide-react";
import { motion } from "motion/react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Dictionary } from "@/lib/i18n";

interface StandardsSectionProps {
  dict: Dictionary;
}

const PILLAR_ICONS = [Layers, ShieldCheck, Workflow, BookOpenCheck] as const;

export function StandardsSection({ dict }: StandardsSectionProps) {
  return (
    <section id="standards" className="dtai-section border-t">
      <div className="dtai-container">
        <div className="max-w-[680px]">
          <p className="dtai-eyebrow">{dict.standards.eyebrow}</p>
          <h2 className="dtai-h2 mt-3">{dict.standards.title}</h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] md:text-[17px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {dict.standards.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {dict.standards.items.map((item, index) => {
            const Icon = PILLAR_ICONS[index] ?? Layers;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <SpotlightCard className="h-full rounded-[var(--radius-lg)]">
                  <div
                    className="dtai-surface-bevel flex h-full flex-col justify-between rounded-[var(--radius-lg)] border p-7 theme-surface-transition"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-xl border"
                          style={{
                            borderColor: "var(--color-border)",
                            backgroundColor: "var(--color-surface-raised)",
                            color: "var(--color-accent-blue)",
                          }}
                        >
                          <Icon size={20} strokeWidth={1.5} />
                        </span>
                        <span
                          className="dtai-mono-tag"
                          style={{ color: "var(--color-accent-blue-text)" }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <h3
                        className="mt-5 text-[18px] font-semibold leading-[1.35]"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="mt-2.5 text-[14px] leading-[1.6]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
