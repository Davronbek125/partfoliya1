# 03 — Dizayn Tizimi (Design System)

> Bu fayl barcha vizual qoidalarning "yagona haqiqat manbai" (single source of truth). CSS custom properties (o'zgaruvchilar) nomlari shu yerda belgilangan va boshqa fayllarda (`04`, `06`) xuddi shu nomlar bilan ishlatiladi.

## 1. Rang palitrasi — CSS o'zgaruvchilari

### Dark Mode (`[data-theme="dark"]`, va default/root)

```css
--color-bg-base: #0A0E14;        /* Asosiy fon */
--color-surface: #12161F;        /* Kartalar, panellar */
--color-surface-raised: #1A1F2B; /* Hover holat, modal */
--color-border: #252B38;         /* Chiziqlar, ajratgichlar */

--color-accent-blue: #3B82F6;    /* Asosiy aksent */
--color-accent-blue-dark: #2563EB;
--color-accent-violet: #7C5CFC;  /* Gradient juftlik */
--color-accent-cyan: #5EEAD4;    /* Muvaffaqiyat holati */
--color-accent-amber: #F59E0B;   /* Ogohlantirish (ixtiyoriy) */

--color-text-primary: #F5F7FA;
--color-text-secondary: #9CA7B8;
--color-text-muted: #5C6578;

--gradient-primary: linear-gradient(135deg, #3B82F6 0%, #7C5CFC 100%);
```

### Light Mode (`[data-theme="light"]`)

```css
--color-bg-base: #F7F8FA;
--color-surface: #FFFFFF;
--color-surface-raised: #F0F2F5;
--color-border: #E2E5EA;

--color-accent-blue: #2563EB;     /* Dark'dagidan to'qroq — yorug' fonda "yuvilib ketmasligi" uchun */
--color-accent-violet: #6D3EF5;
--color-accent-cyan: #0D9488;

--color-text-primary: #0F1420;
--color-text-secondary: #5C6578;
--color-text-muted: #9CA7B8;

--gradient-primary: linear-gradient(135deg, #2563EB 0%, #6D3EF5 100%);
```

> Har ikkala rejimda ham o'zgarmaydigan narsa: **struktura, spacing, shrift o'lchamlari**. Faqat rang qiymatlari almashadi (qarang: `04-tema-tizimi.md`).

## 2. Tipografika

| Rol | Shrift | Og'irlik | Desktop | Mobil | CSS o'zgaruvchi |
|---|---|---|---|---|---|
| H1 (Hero) | Space Grotesk | 700 | 72px / line-height 1.05 | 36px / 1.1 | `--font-display` |
| H2 (Bo'lim sarlavhasi) | Space Grotesk | 600 | 44px | 28px | `--font-display` |
| H3 (Kichik sarlavha) | Space Grotesk | 600 | 24px | 20px | `--font-display` |
| Asosiy matn | Inter | 400 | 17px / 1.6 | 16px / 1.6 | `--font-body` |
| Kichik matn/label | Inter | 500, letter-spacing +0.04em | 13px, UPPERCASE | 12px | `--font-body` |
| Tugma matni | Inter | 600 | 16px | 15px | `--font-body` |

**Shrift ulash (import)**: Google Fonts orqali — `Space Grotesk` (700, 600 og'irliklar) va `Inter` (400, 500, 600 og'irliklar). Fallback stack: `'Space Grotesk', system-ui, sans-serif` va `'Inter', system-ui, sans-serif`.

```css
--font-display: 'Space Grotesk', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
```

## 3. Grid va bo'shliq tizimi (Spacing)

- **Asos birligi**: 8px — barcha spacing shu ning karralisi bo'lishi kerak: `4, 8, 16, 24, 32, 48, 64, 96, 128`.
- **Konteyner**: max-width `1280px`, markazlashtirilgan (`margin: 0 auto`).
  - Yon padding: `80px` (desktop) / `20px` (mobil).
- **Grid ustunlar**: 12 ustunli, gap `24px` (desktop) / `16px` (mobil).
- **Bo'limlar orasidagi vertikal masofa**: `128px` (desktop) / `64px` (mobil).

CSS o'zgaruvchilar sifatida:
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 96px;
--space-9: 128px;

--container-max-width: 1280px;
--container-padding-desktop: 80px;
--container-padding-mobile: 20px;
```

## 4. Komponentlar

### 4.1 Tugmalar

| Tur | Fon | Matn | Border | Radius | Padding | Animatsiya |
|---|---|---|---|---|---|---|
| Primary (asosiy) | `--gradient-primary` | oq (`#FFFFFF`) | yo'q | 12px | 16px 32px | Glow Pulse |
| Secondary (ikkinchi) | shaffof | `--color-text-primary` | 1px `--color-border` | 12px | 16px 32px | hover: border → accent-blue |
| Form submit | `--gradient-primary` | oq | yo'q | 12px | 16px 32px | Load & Success |

### 4.2 Kartalar

- Fon: `--color-surface`
- Radius: `16px` (xizmat kartalari), `20px` (paket kartalari)
- Border: `1px solid var(--color-border)`
- Ichki padding: `32px` (xizmat), `40px 32px` (paket)
- Hover: fon → `--color-surface-raised`, `translateY(-4px)`, soya `box-shadow: 0 12px 32px rgba(59,130,246,0.15)`

### 4.3 Navigatsiya

- Fon: boshida shaffof, scroll > 40px dan keyin `--color-surface` + `backdrop-filter: blur(12px)`.
- Faol band: Liquid Bulge effekti (qarang `02-animatsiyalar.md`).
- Mobil: hamburger → Reveal ochilishi.

### 4.4 Forma elementlari

- Input fon: `--color-surface`, pastki chiziq uslubi (underline border-bottom 1px `--color-border`).
- Focus holatda: border-bottom rangi `--color-accent-blue` ga o'tadi.
- Tanlov kartalari (Diagnostika so'rovnomasi): katta bosiladigan bloklar, tanlanganda `border: 2px solid var(--color-accent-blue)` + fon tint `rgba(59,130,246,0.08)`.

### 4.5 Ikonografiya

- Uslub: chiziqli (line icons), qalinlik `1.5px`, burchaklar yumaloqlangan.
- **Tanlangan ikon to'plami: Lucide** (`lucide-react` yoki vanilla `lucide` npm paketi). Sabab: ISC ochiq litsenziya, 1500+ dan ortiq izchil chiziqli ikon, faol yangilanadi, sayt uslubidagi 1.5px qalinlikka standart ravishda mos keladi, React/Vue/vanilla JS bilan bir xil darajada oson integratsiya qilinadi.
- O'lcham: `40x40px` (xizmat kartalari ikonkalari), `18-24px` (nav, tugma ichidagi ikonkalar).
- Ishlatiladigan asosiy Lucide ikonlar ro'yxati (boshlang'ich): `sparkles`/`bot` (AI), `globe` (Web), `smartphone` (Mobile), `send` (Telegram Bot), `database` (ERP/CRM), `zap` (Automation), `layout-grid` (Systemization), `plug` (Integration), `sun`/`moon`/`monitor` (tema), `menu`/`x` (hamburger).

## 5. Tasviriy til (Imagery)

- Fotosurat **ishlatilmaydi**.
- O'rniga: chiziqli diagramma/node-graf grafikasi (nuqta + ulanish chiziqlari), haqiqiy UI-ko'rinishidagi dashboard-demo elementlari (soxta screenshot emas, real komponent sifatida qurilgan).
- Fon tekstura: juda past opacity (4-6%) dagi dot-grid naqsh, butun sahifa fonida.

```css
--pattern-dot-grid-opacity: 0.05;
```

## 6. Border-radius shkala (yagona tizim uchun)

```css
--radius-sm: 8px;   /* kichik elementlar, badge */
--radius-md: 12px;  /* tugmalar, inputlar */
--radius-lg: 16px;  /* xizmat kartalari */
--radius-xl: 20px;  /* paket kartalari */
--radius-2xl: 24px; /* so'rovnoma konteyneri */
--radius-pill: 999px; /* chiplar, badge */
```

## 7. Soya (shadow) shkalasi

```css
--shadow-card-hover: 0 12px 32px rgba(59, 130, 246, 0.15);
--shadow-glow-pulse-base: 0 0 20px rgba(59, 130, 246, 0.3);
--shadow-glow-pulse-peak: 0 0 32px rgba(59, 130, 246, 0.55);
```

Light mode uchun soyalar neytral kulrang asosida (`rgba(15, 20, 32, 0.08)` kabi), glow-effektlar yumshoqroq qilinadi — tafsilot `04-tema-tizimi.md`da.
