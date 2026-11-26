import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  breadcrumbs?: readonly BreadcrumbItem[];
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="pt-[112px] pb-12 md:pt-[144px] md:pb-16">
      <div className="dtai-container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[13px] font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.label}>
                {index > 0 && <ChevronRight size={14} strokeWidth={1.5} />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--color-text-primary)" }}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {eyebrow && <p className="dtai-eyebrow">{eyebrow}</p>}

        <h1 className="dtai-h1 mt-3 max-w-[920px]">{title}</h1>

        <p
          className="mt-5 max-w-[740px] text-[16px] leading-[1.65] md:text-[18px]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}

