# 06 — To'liq Vizual Spesifikatsiya

> Bu fayl — eng batafsil, "pixel-perfect" qo'llanma. Har bir bo'lim, har bir element uchun aniq joylashuv, shrift, o'lcham va rang ko'rsatilgan. CSS o'zgaruvchi nomlari `03-dizayn-tizimi.md` bilan bir xil.

**Breakpoint'lar**: Desktop ≥ 1280px | Tablet 768–1279px | Mobil < 768px

---

## §11.1 Yuqori navigatsiya (Header)

| Xususiyat | Qiymat |
|---|---|
| Balandlik | 80px (desktop) / 64px (mobil) |
| Pozitsiya | `position: fixed; top: 0;` boshida shaffof fon, scroll > 40px dan keyin `--color-surface` + `backdrop-filter: blur(12px)` |
| Logo (chap chekka) | Space Grotesk, 700, 20px, `--color-text-primary` |
| Nav linklar | Inter, 500, 15px, letter-spacing +0.01em, `--color-text-secondary`; hover/faol → `--color-text-primary` + pastida 2px aksent chiziq (Liquid Bulge) |
| Til almashtirgich (UZ/RU/EN) | Nav linklardan keyin, inline segment; Inter 600, 13px, UPPERCASE, letter-spacing +0.04em; faol til `--color-text-primary` + 1px underline `--color-accent-blue`; nofaol `--color-text-muted`; segmentlar orasi 12px |
| Tema tugmasi | Eng o'ng chekkada, til almashtirgichdan 24px masofada; 3 ikon (quyosh/oy/monitor) 18px, aylana 36px diametr; faol holat fon `--color-surface-raised`, ikon `--color-accent-blue` |
| Yon padding | 80px (desktop) / 20px (mobil) |
| Mobilda | Nav linklar yashiriladi, o'rniga hamburger ikonkasi (24px) o'ng tomonda, til+tema tugmalari hamburger menyu ichiga ko'chadi |

---

## §11.2 Hero bo'limi

| Element | Shrift / O'lcham | Rang | Joylashuv |
|---|---|---|---|
| Yuqori bo'sh joy | — | — | padding-top: 180px (desktop) / 140px (mobil) |
| Eyebrow | Inter, 600, 13px, UPPERCASE, letter-spacing +0.08em | `--color-accent-blue` | Markazda, H1'dan 16px yuqorida |
| H1 | Space Grotesk, 700, 72px/1.05 (desktop); 36px/1.1 (mobil) | `--color-text-primary`; oxirgi so'z `--gradient-primary` (text-fill) | Markazda, max-width 900px |
| Subtitle | Inter, 400, 18px/1.6 (desktop); 16px/1.6 (mobil) | `--color-text-secondary` | Markazda, max-width 600px, H1'dan 24px pastda |
| CTA qator | — | — | Subtitle'dan 40px pastda, markazda, gap 16px |
| Asosiy CTA | Inter, 600, 16px | oq matn, fon `--gradient-primary` | padding 16px/32px, radius `--radius-md` (12px), Glow Pulse |
| Ikkinchi CTA | Inter, 600, 16px | `--color-text-primary`, shaffof fon, border 1px `--color-border` | padding 16px/32px, radius 12px |
| Fon qatlami | — | — | Dot-grid tekstura (opacity 5%) + Chaos→Order yig'ilish animatsiyasi |

---

## §11.3 Konsepsiya bo'limi (Chaos → Order)

| Element | Shrift / O'lcham | Rang | Joylashuv |
|---|---|---|---|
| Bo'lim padding | — | — | 128px vertikal (desktop) / 64px (mobil) |
| Asosiy paragraf | Inter, 400, 20px/1.7 | `--color-text-secondary` | Markazda, max-width 700px |
| Node-graf diagramma | — | Chiziqlar `--color-border`, faol nuqtalar `--color-accent-blue` | Desktop: 2 ustun (45% matn / 55% diagramma); Mobil: ustma-ust, diagramma yuqorida |

---

## §11.4 Xizmatlar bo'limi (8 karta)

| Xususiyat | Qiymat |
|---|---|
| Grid | 4 ustun (desktop) / 2 (tablet) / 1 (mobil), gap 24px |
| Karta | fon `--color-surface`, radius 16px, border 1px `--color-border`, padding 32px |
| Tartib raqami (01–08) | Inter, 600, 13px, `--color-text-muted`, karta yuqori-o'ng burchagida |
| Ikonka | 40x40px, chiziqli 1.5px, `--color-accent-blue`, yuqori chapda |
| Sarlavha | Space Grotesk, 600, 20px, `--color-text-primary`, ikonkadan 16px pastda |
| Tavsif | Inter, 400, 15px/1.5, `--color-text-secondary`, sarlavhadan 8px pastda |
| Hover | `translateY(-4px)`, fon `--color-surface-raised`, `box-shadow: var(--shadow-card-hover)`, transition 0.25s ease-out |

---

## §11.5 Sohalar bo'yicha interaktiv tanlagich

| Xususiyat | Qiymat |
|---|---|
| Chip | Inter, 500, 14px; padding 10px/20px; radius 999px; fon `--color-surface`; border 1px `--color-border` |
| Faol chip | fon `--gradient-primary` + Liquid Bulge (0.3s spring), matn oq |
| Joylashuv | Gorizontal scroll (mobil) / wrap grid (desktop), gap 12px |
| Natija paneli | fade-in + slide-up 12px (0.3s), fon `--color-surface`, radius 16px, padding 24px; ichidagi teglar — kichik pill, Inter 500 13px, border `--color-accent-blue` |

---

## §11.6 Jarayon — 5 bosqichli timeline

| Element | Shrift / O'lcham | Rang | Joylashuv |
|---|---|---|---|
| Bosqich doirasi | Space Grotesk, 600, 18px | border 2px `--color-accent-blue`, fon `--color-surface` | 48px diametr, chap (desktop) / yuqori (mobil) |
| Ulovchi chiziq | — | baza `--color-border` → scroll bilan `--gradient-primary`ga to'ladi | 2px qalinlik |
| Bosqich sarlavhasi | Space Grotesk, 600, 22px, `--color-text-primary` | doiradan 24px o'ngda |
| Bosqich tavsifi | Inter, 400, 16px/1.6, `--color-text-secondary` | sarlavhadan 8px pastda |
| Bosqichlar orasi | — | — | 64px (desktop) / 40px (mobil) |

---

## §11.7 Paketlar bo'limi (4 karta)

| Xususiyat | Qiymat |
|---|---|
| Grid | 4 (desktop) / 2 (tablet) / 1 (mobil, stack), gap 24px |
| Karta | fon `--color-surface`, radius 20px, border 1px `--color-border`, padding 40px/32px |
| "AI BUSINESS" kartasi | border 2px `--color-accent-blue` + glow-soya; badge "Tavsiya etiladi" yuqorida (gradient fon, oq matn, radius 999px, padding 4px/12px, Inter 600 11px UPPERCASE) |
| Paket nomi | Space Grotesk, 700, 24px, UPPERCASE, letter-spacing +0.02em, `--color-text-primary` |
| Tagline | Inter, 400, 15px, `--color-text-secondary`, margin-top 8px |
| Tarkib ro'yxati | Inter, 400, 14px/1.6; har band oldida 4px nuqta `--color-accent-blue`; margin-top 24px |
| Tijoriy model | Inter, 600, 13px UPPERCASE, `--color-text-muted`; margin-top 24px, border-top 1px `--color-border` |
| CTA tugma | Inter, 600, 16px, 100% kenglik, radius 12px, margin-top 24px |

---

## §11.8 Diagnostika so'rovnomasi

| Element | Shrift / O'lcham | Rang | Joylashuv |
|---|---|---|---|
| Konteyner | — | fon `--color-surface`, radius 24px | max-width 640px, padding 48px (desktop) / 24px (mobil); yonida aloqa kanallari va 24 soatlik javob jarayoni |
| Progress (5 segment) | — | bajarilgan `--color-accent-blue`, qolgan `--color-border` | balandlik 4px, radius 999px, konteyner tepasida |
| Savol sarlavhasi | Space Grotesk, 600, 26px, `--color-text-primary` | progress'dan 32px pastda |
| Javob variantlari | Inter, 500, 15px | 2x2 grid (desktop) / 1 ustun (mobil), gap 12px, padding 20px, radius 12px, border 1px `--color-border` |
| Tanlangan variant | — | border 2px `--color-accent-blue` + fon tint `rgba(59,130,246,0.08)` | — |
| Navigatsiya tugmalari | Inter, 600, 15px | "Orqaga" shaffof `--color-text-secondary`; "Keyingisi" gradient + Glow Pulse; oxirgi savolda "Yuborish" + Load & Success | konteyner pastida, ikki chekkada |

---

## §11.9 Yakuniy CTA bo'limi

| Element | Shrift / O'lcham | Rang | Joylashuv |
|---|---|---|---|
| Fon | — | `--color-surface-raised` yoki gradient-tint qorong'u fon | to'liq kenglik, padding 96px vertikal |
| H2 | Space Grotesk, 600, 40px (desktop) / 28px (mobil), `--color-text-primary` | markazda |
| Subtitle | Inter, 400, 17px/1.6, `--color-text-secondary` | markazda, max-width 560px, H2'dan 16px pastda |
| CTA tugma | Inter, 600, 16px, fon `--gradient-primary`, Glow Pulse | markazda, subtitle'dan 32px pastda |

---

## §11.10 Footer

| Element | Shrift / O'lcham | Rang | Joylashuv |
|---|---|---|---|
| Fon | — | `--color-bg-base` (Deep Base) | to'liq kenglik, padding-top 64px, padding-bottom 32px |
| Ustunlar (3) | — | — | 1) Logo+tagline, 2) Nav linklar, 3) Til almashtirgich + aloqa |
| Logo | Space Grotesk, 700, 18px, `--color-text-primary` | 1-ustun yuqorisida |
| Tagline | Inter, 400, 14px/1.5, `--color-text-secondary`, max-width 280px | logotipdan 12px pastda |
| Ustun sarlavhalari | Inter, 600, 13px UPPERCASE, letter-spacing +0.04em, `--color-text-muted` | har ustun yuqorisida |
| Link qatorlari | Inter, 400, 14px, `--color-text-secondary`, hover `--color-text-primary` | har biri orasida 12px |
| Ajratgich chiziq | 1px `--color-border` | ustunlar va copyright orasida |
| Copyright | Inter, 400, 13px, `--color-text-muted` | markazda, ajratgichdan 24px pastda |

---

## §11.11 Umumiy tipografik shkala (tezkor ma'lumotnoma)

| Daraja | Shrift | Og'irlik | Desktop | Mobil |
|---|---|---|---|---|
| H1 | Space Grotesk | 700 | 72px/1.05 | 36px/1.1 |
| H2 | Space Grotesk | 600 | 40–44px | 28px |
| H3 | Space Grotesk | 600 | 20–26px | 18–20px |
| Asosiy matn | Inter | 400 | 16–18px/1.6 | 15–16px/1.6 |
| Kichik/label | Inter | 500–600 | 13–15px | 12–14px |
| Tugma matni | Inter | 600 | 15–16px | 15px |

---

## §11.12 Rang qo'llanilishi — yakuniy jamlanma (Dark Mode)

| Rang | Hex | Qayerda |
|---|---|---|
| Deep Base | #0A0E14 | Asosiy fon, Footer |
| Surface | #12161F | Kartalar, so'rovnoma konteyneri |
| Surface Raised | #1A1F2B | Hover, header scroll foni |
| Border | #252B38 | Chiziqlar, chegaralar |
| Gradient | #3B82F6→#7C5CFC | CTA, H1 aksent, badge |
| Glow Cyan | #5EEAD4 | Muvaffaqiyat holati |
| Text Primary | #F5F7FA | Sarlavhalar |
| Text Secondary | #9CA7B8 | Tavsif matni |
| Text Muted | #5C6578 | Label, raqam, copyright |

Light Mode uchun mos ranglar `03-dizayn-tizimi.md` §1 dan olinadi — struktura va o'lchamlar ikkala rejimda bir xil qoladi, faqat rang qiymatlari almashadi.

---

## Qo'shimcha — Responsive moslashuv qoidalari (umumlashtirilgan)

| Qoida | Desktop | Mobil |
|---|---|---|
| Konteyner yon padding | 80px | 20px |
| Bo'limlar orasidagi masofa | 128px | 64px |
| Grid ustunlar (kartalar) | 4 | 1 (ba'zan 2, tablet uchun) |
| H1 o'lchami | 72px | 36px |
| Nav ko'rinishi | To'liq linklar | Hamburger menyu (Reveal animatsiyasi) |
| Timeline yo'nalishi | Vertikal, chap tomonda doiralar | Vertikal, yuqorida doiralar (kichikroq, 36px) |
