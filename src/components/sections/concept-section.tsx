"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  CheckCircle2,
  CreditCard,
  Database,
  FileSpreadsheet,
  FileText,
  Layers,
  LayoutDashboard,
  MessageSquare,
  MinusCircle,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import type { Dictionary } from "@/lib/i18n";

interface ConceptSectionProps {
  dict: Dictionary;
}

const RAIL_ICONS = [
  LayoutDashboard,
  ShoppingBag,
  Users,
  Bot,
  BarChart3,
] as const;

function NodeBadge({
  ref,
  icon: Icon,
  label,
  highlighted = false,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  icon: LucideIcon;
  label: string;
  highlighted?: boolean;
}) {
  return (
    <div
      ref={ref}
      className={`flex min-w-0 items-center gap-1.5 sm:gap-2 rounded-xl border text-[11px] sm:text-[12px] md:text-[13px] font-medium ${
        highlighted ? "px-2 sm:px-3 py-2 sm:py-2.5" : "px-2 sm:px-3 py-1.5 sm:py-2"
      }`}
      style={{
        backgroundColor: "var(--color-surface-raised)",
        borderColor: highlighted
          ? "var(--color-accent-blue)"
          : "var(--color-border)",
        color: highlighted
          ? "var(--color-text-primary)"
          : "var(--color-text-secondary)",
      }}
    >
      <Icon
        size={15}
        strokeWidth={1.5}
        className="shrink-0"
        style={{
          color: highlighted
            ? "var(--color-accent-blue)"
            : "var(--color-text-muted)",
        }}
      />
      <span className="truncate">{label}</span>
    </div>
  );
}

export function ConceptSection({ dict }: ConceptSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const graphRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const in0Ref = useRef<HTMLDivElement>(null);
  const in1Ref = useRef<HTMLDivElement>(null);
  const in2Ref = useRef<HTMLDivElement>(null);
  const in3Ref = useRef<HTMLDivElement>(null);
  const out0Ref = useRef<HTMLDivElement>(null);
  const out1Ref = useRef<HTMLDivElement>(null);
  const out2Ref = useRef<HTMLDivElement>(null);

  const [railExpanded, setRailExpanded] = useState(false);
  const [railPaused, setRailPaused] = useState(false);
  const [activeNavIdx, setActiveNavIdx] = useState(0);
  const [compareMode, setCompareMode] = useState<"before" | "after">("after");

  useEffect(() => {
    if (railPaused || prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setRailExpanded((prev) => !prev);
      setActiveNavIdx((prev) => (prev + 1) % RAIL_ICONS.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [railPaused, prefersReducedMotion]);

  const activeView =
    dict.concept.dashboard.views[activeNavIdx] ??
    dict.concept.dashboard.views[0];
  const kpis = activeView?.kpis ?? [];
  const feed = activeView?.feed ?? [];

  return (
    <section className="dtai-section border-t">
      <div className="dtai-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 lg:col-span-5"
          >
            <p className="dtai-eyebrow">{dict.concept.eyebrow}</p>
            <h2 className="dtai-h2 mt-3">{dict.concept.title}</h2>
            <p
              className="mt-6 max-w-[700px] text-[17px] leading-[1.7] md:text-[20px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {dict.concept.text}
            </p>

            {/* Deterministic Before vs After comparison switcher */}
            <div
              className="dtai-surface-bevel mt-8 rounded-2xl border p-4 sm:p-5"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <LayoutGroup id="concept-comparison">
                <div
                  role="tablist"
                  className="inline-flex rounded-full border p-1"
                  style={{
                    backgroundColor: "var(--color-bg-base)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  {(["before", "after"] as const).map((mode) => {
                    const active = compareMode === mode;
                    const label =
                      mode === "before"
                        ? dict.concept.comparison.beforeLabel
                        : dict.concept.comparison.afterLabel;
                    return (
                      <button
                        key={mode}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setCompareMode(mode)}
                        className="relative rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors"
                        style={{
                          color: active
                            ? "var(--color-on-accent)"
                            : "var(--color-text-secondary)",
                        }}
                      >
                        {active && (
                          <motion.span
                            layoutId="concept-compare-pill"
                            transition={{
                              duration: 0.25,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                            className="absolute inset-0 -z-10 rounded-full"
                            style={{ backgroundImage: "var(--gradient-primary)" }}
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={compareMode}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 flex flex-col gap-2.5"
                >
                  {(compareMode === "before"
                    ? dict.concept.comparison.beforePoints
                    : dict.concept.comparison.afterPoints
                  ).map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[14px] leading-[1.5]"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {compareMode === "before" ? (
                        <MinusCircle
                          size={16}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0"
                          style={{ color: "var(--color-text-muted)" }}
                        />
                      ) : (
                        <CheckCircle2
                          size={16}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0"
                          style={{ color: "var(--color-accent-cyan)" }}
                        />
                      )}
                      <span>{point}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-7"
          >
            {/* Chaos -> System AnimatedBeam Node Graph */}
            <div
              ref={graphRef}
              className="dtai-surface-bevel relative overflow-hidden rounded-2xl border p-3.5 sm:p-5 md:p-6 theme-surface-transition"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="relative z-10 grid grid-cols-3 items-center gap-2 sm:gap-4 md:gap-6">
                <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
                  <NodeBadge
                    ref={in0Ref}
                    icon={FileSpreadsheet}
                    label={dict.concept.chaosNodes[0] ?? "Excel"}
                  />
                  <NodeBadge
                    ref={in1Ref}
                    icon={MessageSquare}
                    label={dict.concept.chaosNodes[1] ?? "Chats"}
                  />
                  <NodeBadge
                    ref={in2Ref}
                    icon={FileText}
                    label={dict.concept.chaosNodes[2] ?? "Docs"}
                  />
                  <NodeBadge
                    ref={in3Ref}
                    icon={CreditCard}
                    label={dict.concept.chaosNodes[3] ?? "Payments"}
                  />
                </div>

                <div className="flex min-w-0 justify-center">
                  <div
                    ref={centerRef}
                    className="flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-3 sm:px-4 sm:py-4 text-center"
                    style={{
                      backgroundColor: "var(--color-surface-raised)",
                      borderColor: "var(--color-accent-blue)",
                      boxShadow: "var(--shadow-card-hover)",
                    }}
                  >
                    <div
                      className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundImage: "var(--gradient-primary)",
                        color: "var(--color-on-accent)",
                      }}
                    >
                      <Layers size={18} strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.02em]"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {dict.concept.centerNode}
                    </span>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
                  <NodeBadge
                    ref={out0Ref}
                    icon={Database}
                    label={dict.concept.outputNodes[0] ?? "CRM / ERP"}
                    highlighted
                  />
                  <NodeBadge
                    ref={out1Ref}
                    icon={Bot}
                    label={dict.concept.outputNodes[1] ?? "AI Agent"}
                    highlighted
                  />
                  <NodeBadge
                    ref={out2Ref}
                    icon={Activity}
                    label={dict.concept.outputNodes[2] ?? "Dashboard"}
                    highlighted
                  />
                </div>
              </div>

              <AnimatedBeam
                containerRef={graphRef}
                fromRef={in0Ref}
                toRef={centerRef}
                curvature={-22}
                delay={0}
                duration={3.5}
                pathColor="var(--color-border)"
                pathOpacity={0.8}
                gradientStartColor="var(--color-accent-blue)"
                gradientStopColor="var(--color-accent-violet)"
              />
              <AnimatedBeam
                containerRef={graphRef}
                fromRef={in1Ref}
                toRef={centerRef}
                curvature={-22}
                delay={0.35}
                duration={3.5}
                pathColor="var(--color-border)"
                pathOpacity={0.8}
                gradientStartColor="var(--color-accent-blue)"
                gradientStopColor="var(--color-accent-violet)"
              />
              <AnimatedBeam
                containerRef={graphRef}
                fromRef={in2Ref}
                toRef={centerRef}
                curvature={22}
                delay={0.7}
                duration={3.5}
                pathColor="var(--color-border)"
                pathOpacity={0.8}
                gradientStartColor="var(--color-accent-blue)"
                gradientStopColor="var(--color-accent-violet)"
              />
              <AnimatedBeam
                containerRef={graphRef}
                fromRef={in3Ref}
                toRef={centerRef}
                curvature={22}
                delay={1.05}
                duration={3.5}
                pathColor="var(--color-border)"
                pathOpacity={0.8}
                gradientStartColor="var(--color-accent-blue)"
                gradientStopColor="var(--color-accent-violet)"
              />

              <AnimatedBeam
                containerRef={graphRef}
                fromRef={centerRef}
                toRef={out0Ref}
                curvature={-18}
                delay={0.6}
                duration={3.5}
                pathColor="var(--color-border)"
                pathOpacity={0.8}
                gradientStartColor="var(--color-accent-blue)"
                gradientStopColor="var(--color-accent-cyan)"
              />
              <AnimatedBeam
                containerRef={graphRef}
                fromRef={centerRef}
                toRef={out1Ref}
                curvature={0}
                delay={0.95}
                duration={3.5}
                pathColor="var(--color-border)"
                pathOpacity={0.8}
                gradientStartColor="var(--color-accent-blue)"
                gradientStopColor="var(--color-accent-cyan)"
              />
              <AnimatedBeam
                containerRef={graphRef}
                fromRef={centerRef}
                toRef={out2Ref}
                curvature={18}
                delay={1.3}
                duration={3.5}
                pathColor="var(--color-border)"
                pathOpacity={0.8}
                gradientStartColor="var(--color-accent-blue)"
                gradientStopColor="var(--color-accent-cyan)"
              />
            </div>

            {/* Live CRM/ERP Dashboard Demo with interactive modules + Icon Rail */}
            <div
              onMouseEnter={() => {
                setRailPaused(true);
                setRailExpanded(true);
              }}
              onMouseLeave={() => {
                setRailPaused(false);
              }}
              className="dtai-surface-bevel overflow-hidden rounded-2xl border theme-surface-transition"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="flex items-center justify-between border-b px-4 py-3"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: "var(--color-accent-blue)" }}
                  />
                  <span
                    className="text-[13px] font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {dict.concept.dashboard.workspace}
                  </span>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-accent-cyan)",
                    backgroundColor: "var(--color-surface-raised)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-accent-cyan)" }}
                  />
                  {dict.concept.dashboard.status}
                </span>
              </div>

              {/* Mobile module strip */}
              <div
                className="dtai-no-scrollbar flex sm:hidden gap-1.5 overflow-x-auto border-b px-3 py-2"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface-raised)",
                }}
              >
                {dict.concept.dashboard.navItems.map((label, idx) => {
                  const Icon = RAIL_ICONS[idx] ?? LayoutDashboard;
                  const isActive = idx === activeNavIdx;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setRailPaused(true);
                        setActiveNavIdx(idx);
                      }}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium"
                      style={{
                        backgroundColor: isActive
                          ? "var(--color-accent-tint)"
                          : "transparent",
                        color: isActive
                          ? "var(--color-accent-blue-text)"
                          : "var(--color-text-secondary)",
                      }}
                    >
                      <Icon size={14} strokeWidth={1.5} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex min-h-[236px]">
                <aside
                  onClick={() => setRailExpanded((prev) => !prev)}
                  style={{
                    width: railExpanded ? 200 : 64,
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-surface-raised)",
                    transition: "width 250ms ease-out",
                  }}
                  className="hidden sm:flex shrink-0 cursor-pointer flex-col gap-1 border-r p-3 overflow-hidden"
                  aria-label="Dashboard modules"
                >
                  {dict.concept.dashboard.navItems.map((label, idx) => {
                    const Icon = RAIL_ICONS[idx] ?? LayoutDashboard;
                    const isActive = idx === activeNavIdx;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRailPaused(true);
                          setActiveNavIdx(idx);
                          setRailExpanded(true);
                        }}
                        aria-pressed={isActive}
                        className="flex h-9 items-center gap-3 rounded-lg px-2.5 text-left text-[13px] font-medium whitespace-nowrap transition-colors"
                        style={{
                          backgroundColor: isActive
                            ? "var(--color-accent-tint)"
                            : "transparent",
                          color: isActive
                            ? "var(--color-accent-blue-text)"
                            : "var(--color-text-secondary)",
                        }}
                      >
                        <Icon size={18} strokeWidth={1.5} className="shrink-0" />
                        <span
                          style={{
                            opacity: railExpanded ? 1 : 0,
                            transition: "opacity 200ms ease-out",
                          }}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </aside>

                <div className="flex flex-1 flex-col gap-4 p-4 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeNavIdx}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                        {kpis.map((kpi) => (
                          <div
                            key={kpi.label}
                            className="rounded-xl border p-3"
                            style={{
                              backgroundColor: "var(--color-surface-raised)",
                              borderColor: "var(--color-border)",
                            }}
                          >
                            <p
                              className="truncate text-[11px] font-medium"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {kpi.label}
                            </p>
                            <div className="mt-1 flex items-baseline justify-between gap-2">
                              <span
                                className="text-[18px] font-bold md:text-[20px]"
                                style={{
                                  fontFamily: "var(--font-display)",
                                  color: "var(--color-text-primary)",
                                }}
                              >
                                {kpi.value}
                              </span>
                              <span
                                className="text-[11px] font-semibold"
                                style={{ color: "var(--color-accent-cyan)" }}
                              >
                                {kpi.delta}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        className="rounded-xl border p-3"
                        style={{
                          backgroundColor: "var(--color-bg-base)",
                          borderColor: "var(--color-border)",
                        }}
                      >
                        <p
                          className="text-[11px] font-semibold uppercase tracking-[0.04em]"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {dict.concept.dashboard.feedTitle}
                        </p>
                        <ul className="mt-2 flex flex-col gap-2">
                          {feed.map((row) => (
                            <li
                              key={`${row.source}-${row.action}`}
                              className="flex items-center justify-between gap-2 text-[12px]"
                            >
                              <div className="min-w-0 truncate">
                                <span
                                  className="font-semibold"
                                  style={{ color: "var(--color-text-primary)" }}
                                >
                                  {row.source}:
                                </span>{" "}
                                <span style={{ color: "var(--color-text-secondary)" }}>
                                  {row.action}
                                </span>
                              </div>
                              <span
                                className="shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                                style={{
                                  borderColor: "var(--color-border)",
                                  color: "var(--color-accent-blue-text)",
                                }}
                              >
                                {row.state}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
