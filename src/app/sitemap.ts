import type { MetadataRoute } from "next";
import { getSiteUrl, LOCALES } from "@/lib/i18n";
import { SERVICES } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      changeFrequency: "weekly",
      priority: 1.0,
    });

    entries.push({
      url: `${siteUrl}/${locale}/xizmatlar`,
      changeFrequency: "weekly",
      priority: 0.85,
    });

    for (const service of SERVICES) {
      entries.push({
        url: `${siteUrl}/${locale}/xizmatlar/${service.slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
