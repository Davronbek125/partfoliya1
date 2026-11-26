# 04 — Tema Tizimi (Dark / Light / System)

## 1. Ishlash tamoyili

1. Sayt birinchi marta ochilganda, foydalanuvchining **hech qanday saqlangan tanlovi yo'q** bo'lsa, tizim sozlamasi (`prefers-color-scheme`) orqali avtomatik aniqlanadi va shunga mos rejim qo'llaniladi.
2. Foydalanuvchi header'dagi tema tugmasi orqali qo'lda **Light** yoki **Dark**'ni tanlasa, bu tanlov `localStorage`ga saqlanadi va keyingi tashriflarda ustunlik qiladi.
3. Agar foydalanuvchi **System** holatini tanlasa (yoki hech qachon qo'lda tanlamagan bo'lsa) — sayt doimiy ravishda `prefers-color-scheme` o'zgarishini kuzatib, mos ravishda avtomatik almashadi (masalan, operatsion tizim kechqurun avtomatik dark rejimga o'tsa, sayt ham birga o'tadi).

## 2. Theme Toggle — ko'rinishi va joylashuvi

- **Joyi**: yuqori navigatsiyaning eng o'ng chetida, til almashtirgichdan keyin (qarang `06-vizual-spesifikatsiya.md` §11.1).
- **Ko'rinishi**: 3 holatli kichik segmentli tugma, chiziqli ikonkalar bilan:
  - ☀️ emas — **Sun icon** (line, Lucide `sun`) → Light
  - **Moon icon** (line, Lucide `moon`) → Dark
  - **Monitor icon** (line, Lucide `monitor`) → System
- Har bir ikon `18px`, aylana ichida `36px` diametrli bosiladigan maydon.
- Faol holat: fon `--color-surface-raised`, ikon rangi `--color-accent-blue`.
- Almashtirilganda: rang/fon **cross-fade** (300ms, `ease-out`) bilan o'zgaradi; ikon almashinuvi yengil `rotate(-90deg → 0deg)` bilan kuzatiladi (qarang `02-animatsiyalar.md` #10).

## 3. Texnik amalga oshirish (implementatsiya tartibi)

### 3.1 HTML/CSS darajasida

```html
<html data-theme="dark"> <!-- yoki "light" -->
```

```css
:root {
  /* Default (fallback) — dark qiymatlari */
  --color-bg-base: #0A0E14;
  /* ... (to'liq ro'yxat 03-dizayn-tizimi.md da) */
}

[data-theme="light"] {
  --color-bg-base: #F7F8FA;
  /* ... (to'liq ro'yxat 03-dizayn-tizimi.md da) */
}
```

### 3.2 JavaScript mantig'i (psevdokod)

```js
const STORAGE_KEY = 'theme-preference'; // qiymatlar: 'light' | 'dark' | 'system'

function getStoredPreference() {
  return localStorage.getItem(STORAGE_KEY); // null bo'lishi mumkin — hali tanlanmagan
}

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const resolved = theme === 'system' ? getSystemPreference() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
}

function initTheme() {
  const stored = getStoredPreference();
  const active = stored || 'system'; // hech narsa saqlanmagan bo'lsa — system
  applyTheme(active);

  // Tizim o'zgarishini kuzatish — FAQAT "system" tanlangan yoki hali tanlanmagan holatda
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const current = getStoredPreference() || 'system';
    if (current === 'system') {
      applyTheme('system');
    }
  });
}

function setTheme(theme) {
  // theme: 'light' | 'dark' | 'system'
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}
```

**Muhim**: agar foydalanuvchi hali hech qachon qo'lda tanlamagan bo'lsa, `localStorage`da hech qanday qiymat yozilmasligi kerak — sayt to'liq tizimga bog'liq holda ishlashi kerak. Faqat foydalanuvchi aniq Light yoki Dark bossagina `localStorage`ga yoziladi.

### 3.3 Flash of Wrong Theme (FOWT) oldini olish

Sahifa yuklanishining eng boshida (`<head>` ichida, inline `<script>` sifatida, CSS yuklanishidan oldin) tema aniqlanishi va `data-theme` atributi o'rnatilishi kerak — aks holda foydalanuvchi bir lahzaga noto'g'ri (masalan light fonda dark matn) holatni ko'rishi mumkin.

```html
<script>
  (function() {
    const stored = localStorage.getItem('theme-preference');
    const theme = stored || 'system';
    const resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.setAttribute('data-theme', resolved);
  })();
</script>
```

## 4. Har bir rejimda o'ziga xos moslashuvlar

| Element | Dark Mode | Light Mode |
|---|---|---|
| Dot-grid fon tekstura | Oq nuqta, opacity ~5% | Kulrang-ko'k nuqta, opacity ~5% |
| Glow Pulse (CTA tugma) | Yorqinroq, kuchliroq porlash (`--shadow-glow-pulse-peak`) | Yumshoqroq, soya-asosli pulse (kuchli glow yorug' fonda "iflos" ko'rinadi) |
| Karta soyasi (hover) | Ko'k tusli nozik glow-soya | An'anaviy neytral kulrang soya, past opacity |
| Hero H1 aksent so'z gradienti | `#3B82F6 → #7C5CFC` (yorqin) | `#2563EB → #6D3EF5` (to'qroq, kontrastni saqlash uchun) |

## 5. Tekshirish ro'yxati (QA checklist, agent uchun)

- [ ] Sahifa birinchi ochilganda tizim sozlamasiga mos rejim ko'rinadimi?
- [ ] Tema tugmasi orqali Light/Dark tanlansa, sahifa yangilanganda ham o'sha tanlov saqlanadimi?
- [ ] System tanlangan holda, OS darajasida tema almashtirilsa, sayt ham avtomatik almashadimi (sahifani yangilamasdan, real vaqtda)?
- [ ] FOWT (noto'g'ri tema yaltirashi) yo'qmi — sahifa yuklanishining birinchi millisekundidan to'g'ri tema ko'rinadimi?
- [ ] Barcha matn/fon juftliklari ikkala rejimda ham WCAG AA kontrast darajasiga (kamida 4.5:1 oddiy matn uchun) javob beradimi?
