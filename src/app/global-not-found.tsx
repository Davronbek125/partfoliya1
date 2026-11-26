import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";
import { inter, spaceGrotesk } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "404 | DT&AI",
  description: "Sahifa topilmadi",
};

const FOWT_THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('theme-preference');var t=s||'system';var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.setAttribute('data-theme',r);}catch(e){}})();`;

export default function GlobalNotFound() {
  const dict = getDictionary("uz");

  return (
    <html
      lang="uz"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: FOWT_THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <p className="dtai-eyebrow">404</p>
        <h1 className="dtai-h1 mt-4">{dict.common.notFoundTitle}</h1>
        <p
          className="mt-4 max-w-[520px] text-[16px] leading-[1.6]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {dict.common.notFoundDesc}
        </p>
        <Link href="/uz" className="dtai-btn-primary mt-8">
          {dict.common.backHome}
        </Link>
      </body>
    </html>
  );
}

