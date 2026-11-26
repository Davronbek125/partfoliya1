"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Compass,
  Copy,
  Globe,
  Monitor,
  Moon,
  Search,
  Send,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { switchLocaleInPath } from "@/components/language-switcher";
import { ServiceIcon } from "@/components/service-icon";
import { useTheme } from "@/components/theme-provider";
import { CONTACT_CHANNELS } from "@/lib/contact";
import { buildLocalePath, LOCALES, type Dictionary, type Locale } from "@/lib/i18n";
import { SERVICES } from "@/lib/services-data";

export const COMMAND_PALETTE_OPEN_EVENT = "dtai-open-command-palette";

export function openCommandPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT));
}

interface CommandPaletteProps {
  locale: Locale;
  dict: Dictionary;
}

interface CommandItem {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
}

export function CommandPalette({ locale, dict }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname() || `/${locale}`;
  const prefersReducedMotion = useReducedMotion();
  const { setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closePalette = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    document.body.style.overflow = "";
    if (restoreFocus && previousFocusRef.current?.isConnected) {
      const target = previousFocusRef.current;
      window.requestAnimationFrame(() => target.focus());
    }
  }, []);

  const navigateTarget = useCallback(
    (href: string) => {
      setIsOpen(false);
      document.body.style.overflow = "";
      const isHome = (pathname.replace(/\/+$/, "") || `/${locale}`) === `/${locale}`;
      if (isHome && href.includes("#")) {
        const hashId = href.split("#")[1];
        const target = hashId ? document.getElementById(hashId) : null;
        if (target) {
          window.history.replaceState(null, "", href);
          window.requestAnimationFrame(() => {
            target.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "start",
            });
          });
          return;
        }
      }
      router.push(href);
    },
    [locale, pathname, prefersReducedMotion, router]
  );

  const items = useMemo<CommandItem[]>(() => {
    const sections: CommandItem[] = [
      {
        id: "sec-services",
        group: dict.command.groupSections,
        label: dict.services.title,
        hint: "#services",
        icon: <Compass size={16} strokeWidth={1.5} />,
        run: () => navigateTarget(buildLocalePath(locale, "#services")),
      },
      {
        id: "sec-industries",
        group: dict.command.groupSections,
        label: dict.industries.title,
        hint: "#industries",
        icon: <Compass size={16} strokeWidth={1.5} />,
        run: () => navigateTarget(buildLocalePath(locale, "#industries")),
      },
      {
        id: "sec-process",
        group: dict.command.groupSections,
        label: dict.process.title,
        hint: "#process",
        icon: <Compass size={16} strokeWidth={1.5} />,
        run: () => navigateTarget(buildLocalePath(locale, "#process")),
      },
      {
        id: "sec-packages",
        group: dict.command.groupSections,
        label: dict.packages.title,
        hint: "#packages",
        icon: <Compass size={16} strokeWidth={1.5} />,
        run: () => navigateTarget(buildLocalePath(locale, "#packages")),
      },
      {
        id: "sec-faq",
        group: dict.command.groupSections,
        label: dict.faq.title,
        hint: "#faq",
        icon: <Compass size={16} strokeWidth={1.5} />,
        run: () => navigateTarget(buildLocalePath(locale, "#faq")),
      },
      {
        id: "sec-diagnostic",
        group: dict.command.groupSections,
        label: dict.diagnostic.title,
        hint: "#diagnostic",
        icon: <Compass size={16} strokeWidth={1.5} />,
        run: () => navigateTarget(buildLocalePath(locale, "#diagnostic")),
      },
    ];

    const services: CommandItem[] = SERVICES.map((service) => ({
      id: `srv-${service.id}`,
      group: dict.command.groupServices,
      label: `${service.num} · ${dict.services.items[service.id].title}`,
      hint: service.techTags.join(" · "),
      icon: <ServiceIcon id={service.id} size={16} />,
      run: () => navigateTarget(buildLocalePath(locale, `/xizmatlar/${service.slug}`)),
    }));

    const contactItems: CommandItem[] = CONTACT_CHANNELS.slice(0, 3).map((ch) => ({
      id: `contact-${ch.id}`,
      group: dict.command.groupContact,
      label: `${dict.contactPage.channels[ch.id]}: ${ch.display}`,
      hint: copiedKey === ch.id ? dict.common.copied : dict.common.copyLabel,
      icon:
        copiedKey === ch.id ? (
          <Check size={16} strokeWidth={2} />
        ) : ch.id === "telegram" ? (
          <Send size={16} strokeWidth={1.5} />
        ) : (
          <Copy size={16} strokeWidth={1.5} />
        ),
      run: () => {
        navigator.clipboard?.writeText(ch.display).catch(() => { });
        setCopiedKey(ch.id);
        window.setTimeout(() => setCopiedKey(null), 1500);
      },
    }));

    const prefItems: CommandItem[] = [
      {
        id: "theme-dark",
        group: dict.command.groupPreferences,
        label: dict.theme.dark,
        icon: <Moon size={16} strokeWidth={1.5} />,
        run: () => {
          setTheme("dark");
          setIsOpen(false);
        },
      },
      {
        id: "theme-light",
        group: dict.command.groupPreferences,
        label: dict.theme.light,
        icon: <Sun size={16} strokeWidth={1.5} />,
        run: () => {
          setTheme("light");
          setIsOpen(false);
        },
      },
      {
        id: "theme-system",
        group: dict.command.groupPreferences,
        label: dict.theme.system,
        icon: <Monitor size={16} strokeWidth={1.5} />,
        run: () => {
          setTheme("system");
          setIsOpen(false);
        },
      },
      ...LOCALES.filter((l) => l !== locale).map((loc) => ({
        id: `lang-${loc}`,
        group: dict.command.groupPreferences,
        label: loc.toUpperCase(),
        icon: <Globe size={16} strokeWidth={1.5} />,
        run: () => {
          try {
            window.localStorage.setItem("lang-preference", loc);
          } catch {
            // ignore
          }
          setIsOpen(false);
          router.push(switchLocaleInPath(pathname, loc));
        },
      })),
    ];

    return [...sections, ...services, ...contactItems, ...prefItems];
  }, [copiedKey, dict, locale, navigateTarget, pathname, router, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        (item.hint && item.hint.toLowerCase().includes(q))
    );
  }, [items, query]);

  const activeIndex =
    filtered.length > 0 ? Math.min(selectedIndex, filtered.length - 1) : 0;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => {
          if (prev) {
            document.body.style.overflow = "";
            const target = previousFocusRef.current;
            if (target?.isConnected) {
              window.requestAnimationFrame(() => target.focus());
            }
            return false;
          }
          previousFocusRef.current = document.activeElement as HTMLElement | null;
          return true;
        });
        setQuery("");
        setSelectedIndex(0);
      }
    };
    const onOpenEvent = () => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
      setQuery("");
      setSelectedIndex(0);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const selectedOption = listRef.current?.querySelector<HTMLElement>(
      '[aria-selected="true"]'
    );
    selectedOption?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen]);

  const handlePaletteKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
      return;
    }
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.run();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          onKeyDown={handlePaletteKeyDown}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closePalette()}
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--color-backdrop)",
              backdropFilter: "blur(6px)",
            }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.command.buttonLabel}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="dtai-surface-bevel relative z-10 w-full max-w-[600px] overflow-hidden rounded-2xl border"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border-strong)",
              boxShadow: "var(--shadow-drawer)",
            }}
          >
            <div
              className="flex items-center gap-3 border-b px-4 py-3.5"
              style={{ borderColor: "var(--color-border)" }}
            >
              <Search
                size={18}
                strokeWidth={1.5}
                style={{ color: "var(--color-accent-blue)" }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={dict.command.placeholder}
                className="flex-1 bg-transparent text-[15px] outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
              <button
                type="button"
                onClick={() => closePalette()}
                aria-label={dict.common.menuClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg border transition-colors hover:border-[var(--color-accent-blue)]"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-muted)",
                }}
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p
                  className="py-10 text-center text-[14px]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {dict.command.empty}
                </p>
              ) : (
                <ul ref={listRef} role="listbox" className="flex flex-col gap-0.5">
                  {filtered.map((item, idx) => {
                    const isSelected = idx === activeIndex;
                    const showGroupHeader =
                      idx === 0 || filtered[idx - 1]?.group !== item.group;
                    return (
                      <React.Fragment key={item.id}>
                        {showGroupHeader && (
                          <li
                            role="presentation"
                            className="px-3 pt-2.5 pb-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {item.group}
                          </li>
                        )}
                        <li role="option" aria-selected={isSelected}>
                          <button
                            type="button"
                            onMouseEnter={() => setSelectedIndex(idx)}
                            onClick={item.run}
                            className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                            style={{
                              backgroundColor: isSelected
                                ? "var(--color-accent-tint)"
                                : "transparent",
                              color: isSelected
                                ? "var(--color-text-primary)"
                                : "var(--color-text-secondary)",
                            }}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                className="shrink-0"
                                style={{
                                  color: isSelected
                                    ? "var(--color-accent-blue-text)"
                                    : "var(--color-text-muted)",
                                }}
                              >
                                {item.icon}
                              </span>
                              <span className="truncate text-[14px] font-medium">
                                {item.label}
                              </span>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              {item.hint && (
                                <span
                                  className="dtai-mono-tag hidden sm:inline"
                                  style={{ color: "var(--color-text-muted)" }}
                                >
                                  {item.hint}
                                </span>
                              )}
                              {isSelected && (
                                <ArrowRight
                                  size={14}
                                  strokeWidth={1.5}
                                  style={{ color: "var(--color-accent-blue-text)" }}
                                />
                              )}
                            </div>
                          </button>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              )}
            </div>

            <div
              className="flex items-center justify-between border-t px-4 py-2 text-[11px]"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface-raised)",
                color: "var(--color-text-muted)",
              }}
            >
              <span className="dtai-mono-tag">{dict.command.navHint}</span>
              <span className="dtai-mono-tag">{dict.command.escHint}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
