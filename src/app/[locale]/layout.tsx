import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, spaceGrotesk } from "@/lib/fonts";
import {
  getDictionary,
  getSiteUrl,
  isValidLocale,
  LOCALES,
} from "@/lib/i18n";

const FOWT_THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('theme-preference');var t=s||'system';var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.setAttribute('data-theme',r);}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: FOWT_THEME_SCRIPT }} />
      </head>
      <body>
        <MotionProvider>
          <ThemeProvider>
            <SiteShell locale={locale} dict={dict}>
              {children}
            </SiteShell>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

