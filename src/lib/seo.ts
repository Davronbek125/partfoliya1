import { CONTACT_CHANNELS } from "@/lib/contact";
import { buildLocalePath, getSiteUrl, type Dictionary, type Locale } from "@/lib/i18n";
import type { ServiceDefinition } from "@/lib/services-data";

export function buildHomeJsonLd(locale: Locale, dict: Dictionary) {
  const siteUrl = getSiteUrl();
  const localeUrl = `${siteUrl}${buildLocalePath(locale)}`;
  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === "email");
  const phoneChannel = CONTACT_CHANNELS.find((c) => c.id === "phone");
  const socialLinks = CONTACT_CHANNELS.filter((c) => c.external).map((c) => c.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: dict.common.brandFull,
        alternateName: dict.common.brandShort,
        url: siteUrl,
        email: emailChannel?.display,
        telephone: phoneChannel?.display,
        sameAs: socialLinks,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: phoneChannel?.display,
            email: emailChannel?.display,
            contactType: "sales",
            availableLanguage: ["Uzbek", "Russian", "English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: localeUrl,
        name: dict.common.brandFull,
        description: dict.meta.home.description,
        inLanguage: locale,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };
}

export function buildServiceJsonLd(
  locale: Locale,
  dict: Dictionary,
  service: ServiceDefinition
) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${buildLocalePath(locale, `/xizmatlar/${service.slug}`)}`;
  const serviceCopy = dict.services.items[service.id];
  const detailCopy = dict.servicePages[service.id];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceCopy.title,
        description: detailCopy.lead,
        url: pageUrl,
        inLanguage: locale,
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        serviceType: serviceCopy.title,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dict.nav.home,
            item: `${siteUrl}${buildLocalePath(locale)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dict.servicePage.breadcrumbServices,
            item: `${siteUrl}${buildLocalePath(locale, "/xizmatlar")}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: serviceCopy.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
