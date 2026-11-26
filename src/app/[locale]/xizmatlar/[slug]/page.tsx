import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/sections/service-detail-view";
import {
  buildPageMetadata,
  getDictionary,
  isValidLocale,
  LOCALES,
} from "@/lib/i18n";
import { buildServiceJsonLd } from "@/lib/seo";
import { getServiceBySlug, SERVICES } from "@/lib/services-data";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SERVICES.map((service) => ({
      locale,
      slug: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/xizmatlar/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const dict = getDictionary(locale);
  const meta = dict.servicePages[service.id].meta;
  return buildPageMetadata(
    locale,
    `/xizmatlar/${service.slug}`,
    meta.title,
    meta.description
  );
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/[locale]/xizmatlar/[slug]">) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }
  const dict = getDictionary(locale);
  const jsonLd = buildServiceJsonLd(locale, dict, service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceDetailView locale={locale} dict={dict} service={service} />
    </>
  );
}

