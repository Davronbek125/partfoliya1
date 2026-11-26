# 02 — Animatsiyalar Spesifikatsiyasi

> Barcha animatsiyalar 3 ta ilhom-video asosida tanlangan va saytning "Tartibsizlikdan tizimga" konsepsiyasiga moslashtirilgan. Har biri uchun: qayerda ishlatiladi, qanday ishlaydi, timing va easing qiymatlari.

## Umumiy qoidalar

- Hech qanday animatsiya **400ms** dan oshmasin (loop/pulse effektlardan tashqari).
- Standart easing: `ease-out` yoki yengil `spring` (masalan `cubic-bezier(0.34, 1.56, 0.64, 1)` spring uchun, `cubic-bezier(0.16, 1, 0.3, 1)` ease-out uchun).
- Keskin, "sakrab chiquvchi" yoki haddan tashqari o'ynoqi harakatlardan saqlanish kerak (B2B, jiddiy uslub).
- `prefers-reduced-motion: reduce` so'ralganda — barcha dekorativ animatsiyalar o'chiriladi yoki minimal holatga tushiriladi (fade bilan almashtiriladi).

---

## 1. Sahifa yuklanishi — "Chaos → Order" hero animatsiyasi

- **Qayerda**: Hero bo'limi foni, sahifa birinchi ochilganda.
- **Nima bo'ladi**: Ekranning turli nuqtalarida tarqoq holda joylashgan kichik ikonkalar (Excel jadval belgisi, chat pufakchasi, qog'oz hujjat, soat/vaqt belgisi — 5-7 ta element) sahifa yuklangandan so'ng markazga, bir-biriga yaqinlashib, yagona abstrakt "tugun" (node) shakliga yig'iladi.
- **Timing**: umumiy davomiylik 1.2s, `ease-out`, elementlar bir-biridan 0.05–0.1s farq bilan (stagger) harakatlanadi.
- **Holat**: faqat birinchi yuklanishda ishlaydi (keyingi scroll'larda qaytarilmaydi), `sessionStorage` orqali "ko'rsatildi" belgisi qo'yish mumkin.

## 2. Scroll-reveal — Xizmatlar va boshqa kartalar

- **Qayerda**: `#services` kartalari, shuningdek boshqa karta-grid bo'limlar.
- **Nima bo'ladi**: Har bir karta pastdan yuqoriga (translateY: 24px → 0) va shaffoflikdan (opacity: 0 → 1) paydo bo'ladi, foydalanuvchi scroll qilib o'sha joyga yetganda (Intersection Observer orqali, threshold ~0.15).
- **Timing**: har bir karta 0.4s, `ease-out`; kartalar orasida 0.08s stagger (ketma-ket chiqadi, barchasi birdan emas).
- **Bir marta ishlaydi**: element ko'ringandan keyin qayta animatsiya qilinmaydi (`once: true`).

## 3. Liquid Bulge — Navigatsiya va Soha tanlagich

- **Manba**: 1-ilhom video ("Tab Bar" — 6 ta tab-bar effekti ichidan tanlangan).
- **Qayerda**:
  1. Yuqori navigatsiya menyusi — faol bo'lim (nav link) atrofida fon.
  2. `#industries` bo'limidagi soha-tanlagich chiplar — tanlangan chip foni.
- **Nima bo'ladi**: Tanlangan element o'zgarganda, fon (pill/bulge shakl) eski joydan yangi joyga **qattiq chiziq bilan emas, balki organik, "suyuq" tarzda cho'zilib-torayib** o'tadi (morph effekti, SVG path yoki `border-radius` + `scale` animatsiyasi orqali simulyatsiya qilinishi mumkin).
- **Timing**: 0.3s, spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Texnik yondashuv**: eng sodda implementatsiya — ikkita bosqichli transform: (1) fon elementi yo'nalish bo'yicha cho'ziladi (scaleX 1 → 1.15), (2) keyin yangi pozitsiyaga siljib, asl shakliga qaytadi (scaleX 1.15 → 1). Buni CSS transition yoki Framer Motion/GSAP kabi kutubxona bilan amalga oshirish mumkin.

## 4. Reveal — Mobil hamburger-menyu

- **Manba**: 2-ilhom video ("Side Navigation" — 8 uslubdan tanlangan, #3 Reveal).
- **Qayerda**: Mobil ekranda (< 768px) hamburger ikonkasi bosilganda ochiladigan navigatsiya menyusi.
- **Nima bo'ladi**: Asosiy kontent biroz orqaga "siljiydi/kichraydi" (scale: 1 → 0.95, bir oz qorong'ulashadi — overlay opacity 0 → 0.4) va menyu panel chap/o'ng tomondan chuqurlik hissi bilan (box-shadow kuchayishi + translateX) chiqadi — tekis slayd emas.
- **Timing**: 0.35s, `ease-out`.
- **Yopilish**: teskari tartibda, xuddi shu davomiylikda.

## 5. Icon Rail → Expanding — Dashboard-demo paneli

- **Manba**: 2-ilhom video (#4 Icon rail + #5 Expanding uslublarining kombinatsiyasi).
- **Qayerda**: `#services` yoki `#packages` bo'limida ko'rsatiladigan mock CRM/ERP dashboard-demo elementi ichidagi yon panel (sidebar).
- **Nima bo'ladi**: Panel standart holatda faqat ikonkalar bilan ingichka ko'rinishda (64px kenglik) turadi. Sichqoncha ustiga kelganda yoki avtomatik tsikl (har 4s da) orqali panel kengayadi (64px → 200px) va ikonkalar yoniga matn-label chiqadi.
- **Timing**: 0.25s, `ease-out`.
- **Maqsad**: bu shunchaki bezak emas — mijozga qanday mahsulot (real CRM/ERP interfeysi) qurib berilishini jonli ko'rsatadi.

## 6. Glow Pulse — Asosiy CTA tugmalar

- **Manba**: 3-ilhom video ("Button" — 6 uslubdan #3 Glow Pulse).
- **Qayerda**: Barcha asosiy (primary) CTA tugmalar: Hero'dagi "Loyihani boshlash", Final CTA'dagi "Diagnostikadan boshlash" va h.k.
- **Nima bo'ladi**: Tugma atrofida nafis, sekin "nafas olish" kabi yarqirash (box-shadow opacity va blur radiusi davriy ravishda o'sib-pasayadi).
- **Timing**: 2.5s to'liq tsikl, loop, `ease-in-out`. Masalan: `box-shadow: 0 0 20px rgba(59,130,246,0.3)` → `0 0 32px rgba(59,130,246,0.55)` → orqaga.
- **Hover holatida**: pulse to'xtaydi, o'rniga barqaror kuchliroq glow + tugma biroz kattalashadi (scale 1.02).

## 7. Load & Success — Forma/so'rovnoma yuborish tugmasi

- **Manba**: 3-ilhom video (#5 Load & Success).
- **Qayerda**: `#diagnostic` so'rovnomasining oxirgi "Yuborish" tugmasi.
- **Nima bo'ladi**: Bosilgandan so'ng tugma matni yo'qolib, o'rniga aylanuvchi yuklama (spinner) chiqadi (0.6s) → keyin spinner tasdiqlovchi belgiga (✓) aylanadi va tugma fon rangi muvaffaqiyat rangiga (Glow Cyan) o'zgaradi (0.4s) → 1.5s dan so'ng "Rahmat!" xabari (natija ekrani) ko'rsatiladi.
- **Timing**: umumiy ~2.5s (0.6s loading + 0.4s success-morph + 1.5s ko'rsatish).

## 8. Timeline chizig'i — Jarayon bo'limi

- **Qayerda**: `#process` bo'limidagi 5 bosqichli vertikal timeline.
- **Nima bo'ladi**: Timeline'ning vertikal chizig'i boshida kulrang (`Border` rang) holatda, foydalanuvchi scroll qilib pastga tushgan sari chiziq yuqoridan pastga qarab gradient rang (Electric Blue → Signal Violet) bilan "to'ladi" — scroll pozitsiyasiga bog'langan (scroll-linked, Intersection Observer yoki scroll progress hisoblash orqali).
- **Qo'shimcha**: har bir bosqich doirasi o'z navbatiga yetganda (chiziq unga yetib kelganda) kichik scale-pulse bilan "faollashadi" (scale: 1 → 1.15 → 1, 0.3s).

## 9. Hover — Paket va Xizmat kartalari

- **Qayerda**: `#services` va `#packages` kartalari.
- **Nima bo'ladi**: Hover holatida karta 4px yuqoriga ko'tariladi (`translateY(-4px)`), fon rangi bir oz ochilib Surface Raised'ga o'tadi, nozik ko'k tusli soya paydo bo'ladi.
- **Timing**: 0.25s, `ease-out`.

## 10. Tema almashtirish — Cross-fade

- **Qayerda**: Dark/Light/System tugmasi bosilganda, butun sahifa.
- **Nima bo'ladi**: Barcha rang va fon o'zgarishlari qattiq "sakrash" emas, balki kross-fade orqali yumshoq o'tadi; tema ikonkasi (quyosh/oy/monitor) almashganda yengil aylanish (`rotate: -90deg → 0deg`) bilan kuzatiladi.
- **Timing**: 0.3s, `ease-out`.

---

## Animatsiyalar — joylashuv jadvali (qisqa ma'lumotnoma)

| Joy | Animatsiya | Bo'lim |
|---|---|---|
| Hero fon | Chaos → Order yig'ilish | 1 |
| Xizmatlar, boshqa kartalar | Scroll-reveal | 2 |
| Nav menyu / Soha tanlagich | Liquid Bulge | 3 |
| Mobil hamburger-menyu | Reveal | 4 |
| Dashboard-demo sidebar | Icon Rail → Expand | 5 |
| Asosiy CTA tugmalar | Glow Pulse | 6 |
| So'rovnoma submit tugmasi | Load & Success | 7 |
| Jarayon timeline | Scroll-linked chizish | 8 |
| Xizmat/Paket kartalari | Hover ko'tarilish | 9 |
| Tema tugmasi | Cross-fade + rotate | 10 |
