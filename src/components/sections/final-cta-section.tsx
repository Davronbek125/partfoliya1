"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";

interface FinalCtaSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function FinalCtaSection({ locale, dict }: FinalCtaSectionProps) {
  return (
    <section
      className="relative border-t py-20 md:py-24 theme-surface-transition"
      style={{
        background: "var(--color-final-cta-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="dtai-container flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[28px] font-semibold leading-[1.18] md:text-[40px]"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          {dict.finalCta.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-[560px] text-[16px] leading-[1.6] md:text-[17px]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {dict.finalCta.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <Link
            href={buildLocalePath(locale, "#diagnostic")}
            className="dtai-btn-primary"
          >
            <span>{dict.finalCta.cta}</span>
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

