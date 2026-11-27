"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { BrandMark } from "@/components/brand-mark";
import { openCommandPalette } from "@/components/command-palette";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { buildLocalePath, type Dictionary, type Locale } from "@/lib/i18n";

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
  isMenuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
}

type NavKey = "home" | "services" | "industries" | "process" | "packages" | "contact";

const SECTION_TARGETS: readonly { key: NavKey; sectionId: string }[] = [
  { key: "home", sectionId: "hero" },
  { key: "services", sectionId: "services" },
  { key: "industries", sectionId: "industries" },
  { key: "process", sectionId: "process" },
  { key: "packages", sectionId: "packages" },
  { key: "contact", sectionId: "diagnostic" },
];

export function SiteHeader({
  locale,
  dict,
  isMenuOpen,
  onMenuOpenChange,
}: SiteHeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const normalizedPath = pathname.replace(/\/+$/, "") || `/${locale}`;
  const isHomePage = normalizedPath === `/${locale}`;
  const isServicesSubroute = normalizedPath.startsWith(`/${locale}/xizmatlar`);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHomeKey, setActiveHomeKey] = useState<NavKey>("home");
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  const navItems: readonly {
    key: NavKey;
    label: string;
    href: string;
    sectionId: string;
  }[] = [
    {
      key: "home",
      label: dict.nav.home,
      href: buildLocalePath(locale),
      sectionId: "hero",
    },
    {
      key: "services",
      label: dict.nav.services,
      href: buildLocalePath(locale, "#services"),
      sectionId: "services",
    },
    {
      key: "industries",
      label: dict.nav.industries,
      href: buildLocalePath(locale, "#industries"),
      sectionId: "industries",
    },
    {
      key: "process",
      label: dict.nav.process,
      href: buildLocalePath(locale, "#process"),
      sectionId: "process",
    },
    {
      key: "packages",
      label: dict.nav.packages,
      href: buildLocalePath(locale, "#packages"),
      sectionId: "packages",
    },
    {
      key: "contact",
      label: dict.nav.contact,
      href: buildLocalePath(locale, "#diagnostic"),
      sectionId: "diagnostic",
    },
  ];

  useEffect(() => {
    let rafId = 0;

    const updateScrollState = () => {
      rafId = 0;
      setIsScrolled(window.scrollY > 40);

      if (!isHomePage) return;

      const offsetThreshold = 150;
      let current: NavKey = "home";
      for (const { key, sectionId } of SECTION_TARGETS) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offsetThreshold) {
          current = key;
        }
      }
      setActiveHomeKey(current);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    onMenuOpenChange(false);
  }, [pathname, onMenuOpenChange]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const triggerEl = menuTriggerRef.current;

    const focusTimer = window.setTimeout(() => {
      drawerCloseRef.current?.focus();
    }, 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onMenuOpenChange(false);
        triggerEl?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen, onMenuOpenChange]);

  const activeKey: NavKey = isServicesSubroute
    ? "services"
    : isHomePage
      ? activeHomeKey
      : "home";

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number]
  ) => {
    const wasMenuOpen = isMenuOpen;
    onMenuOpenChange(false);
    if (!isHomePage) return;

    event.preventDefault();
    if (wasMenuOpen) {
      document.body.style.overflow = "";
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    const scrollTarget = () => {
      if (item.key === "home") {
        window.history.replaceState(null, "", buildLocalePath(locale));
        window.scrollTo({ top: 0, behavior });
        setActiveHomeKey("home");
        return;
      }

      const target = document.getElementById(item.sectionId);
      if (target) {
        window.history.replaceState(null, "", item.href);
        target.scrollIntoView({ behavior, block: "start" });
        setActiveHomeKey(item.key);
      }
    };

    if (wasMenuOpen) {
      window.requestAnimationFrame(scrollTarget);
    } else {
      scrollTarget();
    }
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 min-h-16 md:min-h-20 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300"
        style={{
          backgroundColor: isScrolled ? "var(--color-header-blur)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
        }}
      >
        <div className="dtai-container flex h-16 md:h-20 items-center justify-between gap-2">
          <Link
            href={buildLocalePath(locale)}
            onClick={(e) => handleNavClick(e, navItems[0])}
            aria-label={dict.common.brandFull}
            className="inline-flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3 transition-opacity duration-200 hover:opacity-85"
          >
            <BrandMark size={36} className="h-8 w-8 md:h-9 md:w-9 shrink-0" />
            <span
              className="text-[18px] sm:text-[21px] font-bold tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              {dict.common.brandShort}
            </span>
            <span
              className="flex flex-col leading-[1.2] uppercase tracking-[0.04em] sm:tracking-[0.07em] text-[7.5px] sm:text-[9px] xl:text-[10px] font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span>DIGITAL TRANSFORMATION &amp; AI</span>
              <span>SOLUTIONS</span>
            </span>
          </Link>

          <nav
            aria-label={dict.nav.ariaPrimary}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1"
          >
            <LayoutGroup id="header-nav">
              {navItems.map((item) => {
                const active = activeKey === item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    onClick={(e) => handleNavClick(e, item)}
                    className="relative px-1.5 xl:px-2.5 py-2 text-[12.5px] xl:text-[14px] font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-200 hover:text-[var(--color-text-primary)]"
                    style={{
                      color: active
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="header-nav-bulge"
                        transition={{
                          duration: 0.3,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{
                          backgroundColor: "var(--color-surface-raised)",
                          border: "1px solid var(--color-border)",
                        }}
                      />
                    )}
                    <span>{item.label}</span>
                    {active && (
                      <motion.span
                        layoutId="header-nav-underline"
                        transition={{
                          duration: 0.3,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="absolute inset-x-2.5 xl:inset-x-3 bottom-0.5 h-[2px] rounded-full"
                        style={{ backgroundImage: "var(--gradient-primary)" }}
                      />
                    )}
                  </Link>
                );
              })}
            </LayoutGroup>
          </nav>

          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <LanguageSwitcher
              currentLocale={locale}
              ariaLabel={dict.nav.ariaLanguage}
            />
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={dict.command.buttonLabel}
              title={`${dict.command.buttonLabel} (Ctrl+K)`}
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-[var(--color-accent-blue)]"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <ThemeToggle
              labels={dict.theme}
              ariaLabel={dict.nav.ariaTheme}
            />
          </div>

          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => onMenuOpenChange(!isMenuOpen)}
            aria-label={isMenuOpen ? dict.common.menuClose : dict.common.menuOpen}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="flex lg:hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors active:scale-95"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          >
            {isMenuOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onMenuOpenChange(false)}
              className="absolute inset-0"
              style={{ backgroundColor: "var(--color-backdrop)" }}
            />

            <motion.aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={dict.nav.ariaMobile}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex h-dvh w-[86%] max-w-[340px] flex-col justify-between overflow-y-auto overscroll-contain border-l px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow-drawer)",
              }}
            >
              <div>
                <div
                  className="flex items-center justify-between border-b pb-4"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <BrandMark size={32} className="h-8 w-8 shrink-0" />
                    <span
                      className="text-[19px] font-bold tracking-[-0.02em]"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {dict.common.brandShort}
                    </span>
                    <span
                      className="flex flex-col leading-[1.2] uppercase tracking-[0.06em] text-[9px] font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <span>DIGITAL TRANSFORMATION &amp; AI</span>
                      <span>SOLUTIONS</span>
                    </span>
                  </span>
                  <button
                    ref={drawerCloseRef}
                    type="button"
                    onClick={() => {
                      onMenuOpenChange(false);
                      menuTriggerRef.current?.focus();
                    }}
                    aria-label={dict.common.menuClose}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border active:scale-95"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    <X size={22} strokeWidth={1.5} />
                  </button>
                </div>

                <nav aria-label={dict.nav.ariaMobile} className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const active = activeKey === item.key;
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        aria-current={active ? "location" : undefined}
                        onClick={(e) => handleNavClick(e, item)}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-[16px] font-medium transition-colors"
                        style={{
                          backgroundColor: active
                            ? "var(--color-accent-tint)"
                            : "transparent",
                          color: active
                            ? "var(--color-text-primary)"
                            : "var(--color-text-secondary)",
                          border: active
                            ? "1px solid var(--color-accent-blue)"
                            : "1px solid transparent",
                        }}
                      >
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div
                className="flex flex-col gap-5 border-t pt-5"
                style={{ borderColor: "var(--color-border)" }}
              >
                <button
                  type="button"
                  onClick={() => {
                    onMenuOpenChange(false);
                    openCommandPalette();
                  }}
                  className="flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-[14px] font-medium transition-colors hover:border-[var(--color-accent-blue)]"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Search size={15} strokeWidth={1.5} />
                    <span>{dict.command.buttonLabel}</span>
                  </span>
                  <span className="dtai-mono-tag">Ctrl+K</span>
                </button>
                <div className="flex items-center justify-between">
                  <LanguageSwitcher
                    currentLocale={locale}
                    ariaLabel={dict.nav.ariaLanguage}
                    onSelect={() => onMenuOpenChange(false)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[12px] font-medium uppercase tracking-[0.04em]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {dict.theme.system} / {dict.theme.dark} / {dict.theme.light}
                  </span>
                  <ThemeToggle
                    labels={dict.theme}
                    ariaLabel={dict.nav.ariaTheme}
                  />
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
