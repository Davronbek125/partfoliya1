# 01 — Konsepsiya va Sayt Strukturasi

> Ushbu fayl loyihaning g'oyaviy asosi va to'liq sahifa strukturasini tasvirlaydi. Boshqa 5 ta fayl (animatsiyalar, dizayn tizimi, tema, kontent, vizual spesifikatsiya) shu konsepsiyaga asoslanib yoziladi — hammasi birgalikda bitta yaxlit loyihani tashkil qiladi.

## 1. Loyiha turi

- **Mijoz**: IT xizmatlari kompaniyasi (Digital Transformation & AI Solutions) — bu kompaniyaning **birinchi** sayti/loyihasi.
- **Maqsad**: Kompaniyani maksimal darajada professional va ishonchli ko'rsatish, portfolio yo'qligini kompensatsiya qiluvchi kuchli taassurot yaratish.
- **Sayt turi**: **Ko'p sahifali (multi-page) korporativ sayt**. Har bir asosiy bo'lim (Xizmatlar, Sohalar, Jarayon, Paketlar, Aloqa) o'z alohida URL'iga ega, shu jumladan har bir xizmat yo'nalishi uchun alohida sahifa. To'liq sahifa xaritasi, URL strukturasi va marshrutlash qoidalari — `08-sahifa-xaritasi-va-marshrutlash.md` faylida. *(Eslatma: loyihaning dastlabki bosqichida bitta sahifali variant ko'rib chiqilgan edi — bu endi eskirgan, 08-fayl ustunlik qiladi.)*

## 2. Katta g'oya (Creative Concept)

**Metafora**: "Tartibsizlikdan tizimga" (Chaos → System).

Sahifa boshida biznesning tarqoq, tartibsiz jarayonlari (Excel fayllar, WhatsApp xabarlari, qog'oz hujjatlar — vizual tarzda "sochilgan" elementlar) ko'rsatiladi. Foydalanuvchi pastga scroll qilgan sari bu elementlar bir-biriga ulanib, tartiblashib, yagona tizim/dashboard ko'rinishiga aylanadi. Bu kompaniyaning asosiy taklifini ("tarqoq jarayonlarni yagona tizimga birlashtirish") vizual tilda ifodalaydi.

**Muhim qoida**: Bu konsepsiya shunchaki bezak emas — u butun sayt bo'ylab (Hero'dan Footer'gacha) izchil davom etishi kerak. Har bir bo'lim "tartibsizlikdan tartibga" g'oyasini o'zicha tarzda aks ettiradi (pastda ko'rsatilgan).

## 3. Dizayn pozitsiyasi

- Jiddiy, ishonchli, "tech-noir" uslub — Linear, Vercel, Stripe singari saytlarning professional ruhida.
- Hech qanday bachkana/o'yinchoq elementlar, ortiqcha emoji, klişe startup illyustratsiyalar YO'Q.
- Dark mode — asosiy (default) uslub, lekin Light va System rejimlar ham to'liq qo'llab-quvvatlanadi (qarang: `04-tema-tizimi.md`).

## 4. To'liq sahifa strukturasi

Bu endi `08-sahifa-xaritasi-va-marshrutlash.md` faylida to'liq tasvirlangan: URL'lar, har bir sahifaning tarkibi, Bosh sahifaning "hub" vazifasi (har bir bo'limning qisqa ko'rinishi + ichki sahifalarga havolalar) va header navigatsiyasining yangi (route-based, anchor-scroll emas) ishlash mantig'i.

Quyidagi bo'limlar (§11.2 – §11.10, `06-vizual-spesifikatsiya.md`da) — har bir **komponentning** vizual qoidalari sifatida saqlanib qoladi, lekin ular endi bitta uzun sahifa emas, balki tegishli alohida sahifalarga joylashtiriladi (masalan §11.6 "Jarayon" komponenti endi `/jarayon` sahifasining asosiy tarkibi).

## 5. Differensiatsiya elementlari (nega bu "oddiy lending" emas)

1. **Interaktiv Diagnostika so'rovnomasi** — mijoz 4 ta savolga javob beradi, natijada shaxsiylashtirilgan taassurot beradi (haqiqiy AI/backend logikasi shart emas — frontend state bilan ham amalga oshiriladi).
2. **Jonli dashboard-demo elementlari** — xizmatlar yoki paketlar bo'limida mock CRM/ERP interfeys parchasi animatsiya bilan "jonli" ko'rinadi (raqamlar o'zgaradi, grafik chizig'i harakatlanadi).
3. **Chaos→Order scroll-hikoyasi** — sahifa yuklanishi va Concept bo'limida ko'rinadigan, butun saytning “imzosi”.
4. **Halol pozitsiya** — "Siz bizning birinchi hamkorimizsiz" degan xabar ENTERPRISE/Final CTA bo'limida ishonch va shaxsiy yondashuv signalini beradi, portfolio yo'qligini yashirmaydi.

## 6. Texnik eslatmalar (agent uchun)

- Sayt **responsive**: Desktop (≥1280px), Tablet (768–1279px), Mobil (<768px) — aniq qiymatlar `06-vizual-spesifikatsiya.md`da.
- Barcha matnlar 3 tilda (`05-kontent-uz-ru-en.md`) — til almashtirish client-side state orqali (sahifa qayta yuklanmasdan) amalga oshiriladi.
- Animatsiyalar ro'yxati va texnik tavsifi — `02-animatsiyalar.md`.
- Rang/shrift/komponent qoidalari — `03-dizayn-tizimi.md`.
- Tema (dark/light/system) mantig'i — `04-tema-tizimi.md`.
- Har bir bo'limning aniq joylashuvi, shrift o'lchami, rangi, spacing qiymatlari — `06-vizual-spesifikatsiya.md` (bu eng batafsil, "pixel-perfect" qo'llanma).

**Ishlash tartibi tavsiyasi**: avval shu faylni o'qib umumiy rasmni tushunish, keyin 03 → 04 → 06 fayllarni asos qilib struktura va stillarni qurish, 05-faylni kontent manbai sifatida, 02-faylni esa animatsiya qatlamini qo'shish bosqichida ishlatish.
