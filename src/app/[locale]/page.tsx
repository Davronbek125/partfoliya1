import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConceptSection } from "@/components/sections/concept-section";
import { DiagnosticSection } from "@/components/sections/diagnostic-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { PackagesSection } from "@/components/sections/packages-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StandardsSection } from "@/components/sections/standards-section";
import { buildPageMetadata, getDictionary, isValidLocale } from "@/lib/i18n";
import { buildHomeJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildPageMetadata(
    locale,
    "",
    dict.meta.home.title,
    dict.meta.home.description
  );
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const jsonLd = buildHomeJsonLd(locale, dict);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection locale={locale} dict={dict} />
      <ConceptSection dict={dict} />
      <ServicesSection locale={locale} dict={dict} />
      <IndustriesSection locale={locale} dict={dict} />
      <ProcessSection locale={locale} dict={dict} />
      <PackagesSection locale={locale} dict={dict} />
      <StandardsSection dict={dict} />
      <FaqSection dict={dict} />
      <DiagnosticSection locale={locale} dict={dict} />
      <FinalCtaSection locale={locale} dict={dict} />
    </>
  );
}
