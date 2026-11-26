"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BackgroundDotGrid } from "@/components/background-dot-grid";
import { CommandPalette } from "@/components/command-palette";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Dictionary, Locale } from "@/lib/i18n";

interface SiteShellProps {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}

export function SiteShell({ locale, dict, children }: SiteShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-screen flex-col">
      <a href="#main-content" className="dtai-skip-link">
        {dict.common.skipToContent}
      </a>
      <BackgroundDotGrid />
      <SiteHeader
        locale={locale}
        dict={dict}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      />
      <CommandPalette locale={locale} dict={dict} />
      <motion.div
        animate={
          isMenuOpen
            ? prefersReducedMotion
              ? { opacity: 0.72 }
              : { scale: 0.95, opacity: 0.72 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-1 flex-col origin-top"
      >
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
      </motion.div>
    </div>
  );
}
