import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesSection } from "@/components/sections/services-section";
import {
  buildLocalePath,
  buildPageMetadata,
  getDictionary,
  isValidLocale,
} from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/xizmatlar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildPageMetadata(
    locale,
    "/xizmatlar",
    dict.meta.services.title,
    dict.meta.services.description
  );
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/xizmatlar">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: buildLocalePath(locale) },
          { label: dict.nav.services },
        ]}
      />
      <ServicesSection
        locale={locale}
        dict={dict}
        showHeading={false}
      />
      <FinalCtaSection locale={locale} dict={dict} />
    </>
  );
}

