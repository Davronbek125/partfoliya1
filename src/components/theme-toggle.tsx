"use client";

import React, { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme, type ThemePreference } from "@/components/theme-provider";
import type { Dictionary } from "@/lib/i18n";

interface ThemeToggleProps {
  labels: Dictionary["theme"];
  ariaLabel?: string;
}

const OPTIONS: { value: ThemePreference; Icon: typeof Sun }[] = [
  { value: "light", Icon: Sun },
  { value: "dark", Icon: Moon },
  { value: "system", Icon: Monitor },
];

function subscribeNoop() {
  return () => {};
}

export function ThemeToggle({ labels, ariaLabel = "Theme" }: ThemeToggleProps) {
  const { preference, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1 rounded-full border p-1 theme-surface-transition"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {OPTIONS.map(({ value, Icon }) => {
        const isActive = mounted && preference === value;
        const label = labels[value];
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={mounted ? isActive : undefined}
            title={label}
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: isActive
                ? "var(--color-surface-raised)"
                : "transparent",
              color: isActive
                ? "var(--color-accent-blue)"
                : "var(--color-text-muted)",
              outlineColor: "var(--color-accent-blue)",
            }}
          >
            <motion.span
              key={`${value}-${isActive ? "active" : "idle"}`}
              initial={isActive ? { rotate: -90, opacity: 0.7 } : false}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <Icon size={18} strokeWidth={1.5} />
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
