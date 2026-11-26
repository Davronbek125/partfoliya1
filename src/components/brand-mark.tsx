import React, { useId } from "react";

interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * Geometric SVG emblem depicting scattered nodes converging into a unified core.
 */
export function BrandMark({ size = 26, className }: BrandMarkProps) {
  const gradId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="2"
          y1="2"
          x2="26"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--color-accent-blue)" />
          <stop offset="100%" stopColor="var(--color-accent-violet)" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="7"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        strokeWidth="1.25"
      />
      <path
        d="M7.5 8.5L14 14M7.5 19.5L14 14M20.5 14H14"
        stroke="var(--color-accent-blue)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="7.5" cy="8.5" r="1.9" fill="var(--color-text-secondary)" />
      <circle cx="7.5" cy="19.5" r="1.9" fill="var(--color-text-secondary)" />
      <circle cx="20.5" cy="14" r="2.1" fill="var(--color-accent-cyan)" />
      <circle cx="14" cy="14" r="3.1" fill={`url(#${gradId})`} />
    </svg>
  );
}
