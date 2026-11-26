# 08 — Sahifa Xaritasi va Marshrutlash (Multi-page Structure)

> **Muhim**: sayt **gibrid korporativ tuzilma**da ishlaydi — Bosh sahifa (`/{locale}/`) barcha bo'limlarni to'liq hajmda o'z ichiga olgan keng qamrovli korporativ landing (`#services`, `#industries`, `#process`, `#packages`, `#diagnostic`) bo'lib, header havolalari bo'limlarga silliq scroll qiladi; shu bilan birga har bir xizmat yo'nalishi uchun alohida SEO sahifalari (`/{locale}/xizmatlar/{slug}`) va umumiy katalog (`/{locale}/xizmatlar`) mavjud.

## 1. URL strukturasi

Til prefiksi bilan (locale-prefixed routing):

```
/{locale}/                      → To'liq keng qamrovli korporativ landing (barcha bo'limlar + Diagnostika + Aloqa)
/{locale}/xizmatlar             → Xizmatlar — umumiy katalog sahifasi
/{locale}/xizmatlar/{slug}      → Har bir xizmat uchun alohida batafsil sahifa (8 ta)
```

*(Eski `/sohalar`, `/jarayon`, `/paketlar`, `/aloqa` yo'nalishlari mos ravishda `/{locale}#industries`, `#process`, `#packages`, `#diagnostic` bo'limlariga yo'naltiriladi.)*

- `{locale}` qiymatlari: `uz` (standart), `ru`, `en`.
- Foydalanuvchi `/` ga kirsa → avtomatik `/uz/` ga yo'naltiriladi (301 yoki client-side redirect).
- **URL segmentlari (slug'lar) tarjima qilinmaydi** — barcha tillarda bir xil lotin-inglizcha slug ishlatiladi (masalan `/ru/xizmatlar`, `/en/xizmatlar` — sahifa mazmuni rus/ingliz tilida, lekin URL bir xil). Bu soddalik va texnik xizmat ko'rsatish qulayligi uchun tanlangan yondashuv; xohlasangiz, kelajakda har bir til uchun lokalizatsiya qilingan slug'larga (`/en/services`, `/ru/uslugi`) o'tish mumkin.

### Xizmatlar slug'lari (8 ta)

| Slug | Xizmat nomi (UZ) |
|---|---|
| `ai-sun-iy-intellekt` | AI & Sun'iy intellekt yechimlari |
| `web-development` | Web Development |
| `mobile-app-development` | Mobile App Development |
| `telegram-bot-development` | Telegram Bot Development |
| `erp-crm` | ERP & CRM |
| `business-automation` | Business Automation |
| `business-systemization` | Business Systemization |
| `it-integration` | IT Integration & Technical Support |

## 2. Umumiy sayt layout (barcha sahifalarda doimiy)

```
┌─────────────────────────────────────┐
│  HEADER (fixed) — Logo, Nav, Til, Tema │
├─────────────────────────────────────┤
│                                       │
│      Sahifaga xos kontent            │
│                                       │
├─────────────────────────────────────┤
│  FOOTER — Logo, tagline, linklar     │
└─────────────────────────────────────┘
```

Header va Footer barcha sahifalarda **bir xil komponent** (shared layout) — faqat Header'dagi nav'da joriy sahifa (active route) Liquid Bulge effekti bilan belgilanadi (endi scroll-spy emas, balki `current route == nav link` taqqoslash orqali).

## 3. Har bir sahifaning tarkibi

### 3.1 Bosh sahifa `/{locale}/`

Bosh sahifa — **to'liq keng qamrovli korporativ landing**:

| Blok | Tarkibi | Havola / Anchor |
|---|---|---|
| Hero | Asosiy sarlavha, subtitle, 2 CTA | CTA 1 → `#diagnostic`, CTA 2 → `#services` |
| Concept | Chaos→Order node grafi + jonli CRM/ERP dashboard | — |
| Xizmatlar (`#services`) | 8 ta to'liq xizmat kartasi | Har bir karta → `/{locale}/xizmatlar/{slug}` |
| Sohalar (`#industries`) | 10 ta soha bo'yicha interaktiv tanlagich + mos xizmatlar havolasi | Xizmat havolasi → `/{locale}/xizmatlar/{slug}`, CTA → `#diagnostic` |
| Jarayon (`#process`) | 5 bosqichli vertikal scroll-linked timeline | CTA → `#diagnostic` |
| Paketlar (`#packages`) | 4 ta to'liq paket kartasi (`AI BUSINESS` BorderBeam bilan) | CTA → `#diagnostic` |
| Diagnostika va Aloqa (`#diagnostic`) | 4 savollik interaktiv so'rovnoma (Telegram) + bevosita aloqa kanallari (`+998 93 735 63 06`, `@ab123455`, `orishboevdavronbek@gmail.com`, `@da_vron1427`, GitHub) | — |
| Final CTA | O'zgarishsiz | → `#diagnostic` |

### 3.2 Xizmatlar — umumiy ro'yxat `/{locale}/xizmatlar`

- Sarlavha: "Xizmatlarimiz" / tavsif
- 8 ta to'liq karta (ikonka, nomi, tavsif) — grid, `06-vizual-spesifikatsiya.md` §11.4 dagi uslubda
- Har bir karta bosilsa → `/xizmatlar/{slug}`

### 3.3 Har bir xizmat uchun alohida sahifa `/{locale}/xizmatlar/{slug}`

**Yangi kontent tuzilishi kerak** (hozirgi `05-kontent-uz-ru-en.md` faylida faqat 1 qatorli tavsif bor — bu yetarli emas alohida sahifa uchun). Tavsiya etilgan tarkib:

| Blok | Tarkibi |
|---|---|
| Mini-hero | Xizmat nomi (H1), 1-2 qatorli kengaytirilgan tavsif |
| Nima kiradi | Asl katalogdagi har bir xizmat ostidagi bullet-ro'yxat (masalan AI uchun: AI Agent, AI Sales Manager, AI Customer Support va h.k.) — bular hozir faqat UZ tilida asl hujjatda bor, RU/EN tarjima qilinishi kerak |
| Kimlar uchun mos | Tegishli sohalar ro'yxati (`/sohalar`dagi ma'lumotlardan filtrlangan; ro'yxat `09-fayl`da) |
| CTA bloki | "Bu yechim sizga kerakmi?" → `/aloqa` ga olib boruvchi tugma |
| Boshqa xizmatlar | Pastda "Shuningdek qarang" — 2-3 ta bog'liq xizmat kartasi |

> ✅ **Kontent tayyor**: 8 ta xizmat sahifasining to'liq UZ/RU/EN matnlari (meta-teglar, lead, funksiyalar ro'yxati, mos sohalar, bog'liq xizmatlar) `09-xizmat-sahifalari-kontenti.md` faylida.

### 3.4 Sohalar `/{locale}/sohalar`

- To'liq interaktiv tanlagich (10 ta soha) — `06-vizual-spesifikatsiya.md` §11.5 bo'yicha, o'zgarishsiz.
- Qo'shimcha: har bir soha tanlanganda, natija panelida tegishli xizmatlarga ichki havolalar (`/xizmatlar/{slug}`) qo'shiladi.

### 3.5 Jarayon `/{locale}/jarayon`

- To'liq 5 bosqichli timeline — `06-vizual-spesifikatsiya.md` §11.6 bo'yicha, o'zgarishsiz.
- Pastda CTA: "Diagnostikadan boshlash" → `/aloqa`

### 3.6 Paketlar `/{locale}/paketlar`

- To'liq 4 ta karta — `06-vizual-spesifikatsiya.md` §11.7 bo'yicha, o'zgarishsiz.
- Har bir "Batafsil ma'lumot" CTA → `/aloqa` (yoki kelajakda narxlash kiritilganda — to'lov/so'rov sahifasiga)

### 3.7 Aloqa `/{locale}/aloqa`

- Diagnostika so'rovnomasi (4 savol, Telegram botga yuboriladi — `07-telegram-integratsiya.md` bo'yicha)
- Pastda yoki yonida: aloqa ma'lumotlari (telefon `+998 93 735 63 06`, Telegram `@ab123455`, email `orishboevdavronbek@gamil.com`, Instagram `@da_vron1427`, GitHub `https://github.com/Davronbek125/`)

## 4. Header navigatsiyasi — yangilangan xulq-atvor

`06-vizual-spesifikatsiya.md` §11.1 dagi header tashqi ko'rinishi **o'zgarmaydi** (balandlik, shrift, rang, Liquid Bulge animatsiyasi):

- Nav linklar bosh sahifadagi bo'limlarga (`/{locale}`, `/{locale}#services`, `/{locale}#industries`, `/{locale}#process`, `/{locale}#packages`, `/{locale}#diagnostic`) olib boradi va bosh sahifa ichida silliq scroll qiladi.
- Faol band aniqlash mantig'i: bosh sahifada scroll-spy orqali joriy ko'rinib turgan bo'lim, `/xizmatlar*` ichki sahifalarida esa "Yechimlar" bandi Liquid Bulge bilan belgilanadi.
- Til almashtirgich bosilganda — joriy sahifaning **boshqa til versiyasiga** o'tadi (masalan `/uz/xizmatlar/erp-crm` → `/ru/xizmatlar/erp-crm`).

## 5. SEO afzalliklari (shu struktura tanlanganining sababi)

- Har bir xizmat sahifasi o'z meta-title/description'iga ega bo'lishi mumkin (masalan "Telegram Bot Development xizmatlari — Digital Transformation & AI Solutions").
- Google har bir xizmatni alohida sahifa sifatida indekslaydi — qidiruv natijalarida ko'proq "kirish nuqtasi" paydo bo'ladi.
- Har bir sahifa uchun alohida `hreflang` teglar (uz/ru/en versiyalari orasida) qo'yiladi — xalqaro SEO uchun to'g'ri amaliyot.

## 6. Texnik qaror — freymvork (TASDIQLANGAN)

**Next.js** tanlandi (mijoz boshqa afzallik bildirmadi). Sabab: SEO uchun SSG/SSR, tayyor i18n routing, dynamic route'lar (`[locale]/xizmatlar/[slug]`), meta-teglar va `hreflang` uchun qulay vositalar.

Tavsiya etilgan asos:

- **Next.js (App Router)** + **TypeScript**
- Marshrutlash: `app/[locale]/page.tsx`, `app/[locale]/xizmatlar/page.tsx`, `app/[locale]/xizmatlar/[slug]/page.tsx`, `app/[locale]/sohalar/page.tsx`, `app/[locale]/jarayon/page.tsx`, `app/[locale]/paketlar/page.tsx`, `app/[locale]/aloqa/page.tsx`
- Xizmat sahifalari `generateStaticParams()` orqali 8 slug × 3 til = 24 ta statik sahifa sifatida oldindan quriladi
- i18n: `uz.json` / `ru.json` / `en.json` (`05` va `09` fayllar tuzilmasiga mos); standart til `uz`
- Stil: CSS o'zgaruvchilar (`03-dizayn-tizimi.md`) — Tailwind yoki CSS Modules, agent tanlaydi, lekin token nomlari o'zgarmaydi
- Animatsiya: CSS + Framer Motion (yoki GSAP) — `02-animatsiyalar.md`
- Diagnostika backend: Next.js Route Handler (`app/api/send-diagnostic/route.ts`) — `07-telegram-integratsiya.md`dagi serverless funksiya vazifasini shu bajaradi; `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` faqat server environment variables'da
- Hosting: **Vercel** (Next.js bilan eng sodda; `07`dagi tavsiya bilan mos)

## 7. Qabul qilingan qarorlar va qolgan ishlar

**Qabul qilingan:**
1. Ko'p sahifali korporativ struktura (ushbu fayl)
2. Freymvork: Next.js
3. Xizmat sahifalari kontenti: tayyor (`09-xizmat-sahifalari-kontenti.md`)

**Hali ochiq (kodlashni to'xtatmaydi):**
- Aloqa ma'lumotlari, haqiqiy Telegram Bot Token / Chat ID
- (Ixtiyoriy) "Biz haqimizda" sahifasi — hozircha kontent yo'q, kompaniya haqida ma'lumot berilgach qo'shiladi
- RU/EN matnlarni ona tilida so'zlashuvchi tomonidan tekshirish
