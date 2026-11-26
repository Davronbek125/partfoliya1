"use client";

import React, { useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps bento and service cards with a subtle pointer-tracked radial spotlight
 * without triggering React re-renders on pointer move.
 */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`group/spot relative overflow-hidden ${className}`}
    >
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 0%), var(--color-spotlight), transparent 75%)",
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
