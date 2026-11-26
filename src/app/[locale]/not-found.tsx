"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  buildLocalePath,
  DEFAULT_LOCALE,
  getDictionary,
  isValidLocale,
} from "@/lib/i18n";

export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const rawLocale = typeof params?.locale === "string" ? params.locale : "";
  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return (
    <section className="dtai-section pt-[160px] pb-28">
      <div className="dtai-container flex flex-col items-center text-center">
        <p className="dtai-eyebrow">404</p>
        <h1 className="dtai-h1 mt-4">{dict.common.notFoundTitle}</h1>
        <p
          className="mt-4 max-w-[520px] text-[16px] leading-[1.6]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {dict.common.notFoundDesc}
        </p>
        <Link href={buildLocalePath(locale)} className="dtai-btn-primary mt-8">
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span>{dict.common.backHome}</span>
        </Link>
      </div>
    </section>
  );
}
