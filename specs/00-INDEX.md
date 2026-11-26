# 00 — INDEX — Loyiha Hujjatlari

**Loyiha**: Digital Transformation & AI Solutions — korporativ sayt
**Konsepsiya**: "Tartibsizlikdan tizimga" (Chaos → System)
**Tillar**: UZ (standart) / RU / EN
**Rejim**: System (standart: `prefers-color-scheme`) / Dark / Light

Ushbu papkadagi fayllar agent (dasturchi yoki Claude Code kabi AI kodlash vositasi) saytni noldan qurishi uchun yetarli bo'lgan to'liq spesifikatsiyani tashkil qiladi. Fayllar bir-biriga bog'liq — CSS o'zgaruvchi nomlari va bo'lim raqamlari barcha fayllarda bir xil ishlatiladi.

## O'qish va ishlatish tartibi

| # | Fayl | Nima uchun | Qachon ishlatiladi |
|---|---|---|---|
| 1 | `01-konsepsiya-va-struktura.md` | Umumiy g'oya, sahifa bo'limlari ro'yxati, navigatsiya | Loyihani boshlashdan oldin, umumiy rasmni tushunish uchun |
| 2 | `02-animatsiyalar.md` | Har bir effekt: qayerda, qanday, qancha vaqtda | Interaktivlik/animatsiya qatlamini qo'shish bosqichida |
| 3 | `03-dizayn-tizimi.md` | CSS o'zgaruvchilar, rang, shrift, komponent, ikon tizimi | Loyiha boshida — global stil fayllarini (`:root`, design tokens) yaratishda |
| 4 | `04-tema-tizimi.md` | Dark/Light/System ishlash mantig'i, tayyor JS kodi | Tema almashtirish funksionalligini yozishda |
| 5 | `05-kontent-uz-ru-en.md` | Barcha matnlar, 3 tilda, `i18n` kalitlari bilan | `uz.json`/`ru.json`/`en.json` fayllarini tayyorlashda |
| 6 | `06-vizual-spesifikatsiya.md` | Har bir bo'lim uchun pixel-perfect joylashuv, o'lcham, rang | Har bir komponentni qurish paytida, "qo'lda ushlab" ishlatiladigan asosiy qo'llanma |
| 7 | `07-telegram-integratsiya.md` | Diagnostika so'rovnomasini Telegram botga ulash | Backend/serverless qismini yozishda |
| 8 | `08-sahifa-xaritasi-va-marshrutlash.md` | **Yangi**: to'liq ko'p sahifali struktura, URL'lar, har sahifa tarkibi | Loyihani boshlashdan oldin — `01`dan ko'ra ustuvor, chunki sayt turini belgilaydi |
| 9 | `09-xizmat-sahifalari-kontenti.md` | **Yangi**: 8 ta xizmat sahifasining to'liq UZ/RU/EN matnlari, meta-teglar, mos sohalar | `/xizmatlar/{slug}` sahifalarini va ularning `uz/ru/en.json` kalitlarini yaratishda |

## Tezkor faktlar (agent uchun eslatma)

- **Brend nomi**: Digital Transformation & AI Solutions (header'da qisqa shakli — `DT&AI`)
- **Sayt turi**: **Gibrid korporativ sayt** — Bosh sahifa (`/{locale}/`) to'liq keng qamrovli landing sifatida barcha bo'limlarni (`#services`, `#industries`, `#process`, `#packages`, `#diagnostic`) o'z ichiga oladi, qo'shimcha ravishda 8 ta xizmat uchun alohida batafsil sahifalar (`/{locale}/xizmatlar/{slug}`) va umumiy katalog (`/{locale}/xizmatlar`) mavjud. Jami 3 til × 10 sahifa = 30 URL
- **Shriftlar**: Space Grotesk (sarlavhalar) + Inter (matn)
- **Asosiy rang**: Electric Blue (#3B82F6) → Signal Violet (#7C5CFC) gradient
- **Freymvork**: Next.js (App Router, TypeScript), hosting — Vercel
- **Ikon to'plami**: Lucide
- **Standart til**: UZ (brauzer tiliga qarab aniqlanmaydi)
- **Standart tema**: System (foydalanuvchi qurilmasiga moslashadi)
- **Forma backend**: Telegram Bot API, serverless function orqali (token frontend'da hech qachon ko'rinmaydi)

## Hali ochiq qolgan masalalar

- Aloqa ma'lumotlari (qo'shilgan): Telefon `+998 93 735 63 06`, Telegram `@ab123455`, Email `orishboevdavronbek@gmail.com`, Instagram `@da_vron1427`, GitHub `https://github.com/Davronbek125/` (ofis manzili ixtiyoriy)
- Haqiqiy Telegram Bot Token va Chat ID — `dt-ai-site/.env.local` ga kiritilgan
- Narxlar — paketlar bo'limida hozircha ko'rsatilmaydi, faqat tijoriy model nomi beriladi
- (Ixtiyoriy) "Biz haqimizda" sahifasi — kompaniya haqida ma'lumot berilgach qo'shiladi
- RU/EN matnlarni ona tilida so'zlashuvchi tomonidan tekshirish tavsiya etiladi
