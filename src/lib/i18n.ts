import type { Metadata } from "next";
import uz from "@/i18n/uz.json";
import ru from "@/i18n/ru.json";
import en from "@/i18n/en.json";

export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";

export type Dictionary = typeof uz;

const dictionaries: Record<Locale, Dictionary> = {
  uz,
  ru,
  en,
};

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured.replace(/\/+$/, "");
  }
  return "https://dtai.uz";
}

export function buildLocalePath(locale: Locale, subPath = ""): string {
  const normalized = subPath.startsWith("/") ? subPath : subPath ? `/${subPath}` : "";
  return `/${locale}${normalized}`;
}

export function buildAlternates(subPath = ""): Metadata["alternates"] {
  const normalized = subPath.startsWith("/") ? subPath : subPath ? `/${subPath}` : "";
  return {
    languages: {
      uz: `/uz${normalized}`,
      ru: `/ru${normalized}`,
      en: `/en${normalized}`,
      "x-default": `/uz${normalized}`,
    },
  };
}

const OG_LOCALES: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

export function buildPageMetadata(
  locale: Locale,
  subPath: string,
  title: string,
  description: string
): Metadata {
  const canonical = buildLocalePath(locale, subPath);
  return {
    title,
    description,
    alternates: {
      canonical,
      ...buildAlternates(subPath),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((loc) => loc !== locale).map(
        (loc) => OG_LOCALES[loc]
      ),
      type: "website",
      siteName: "Digital Transformation & AI Solutions",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

