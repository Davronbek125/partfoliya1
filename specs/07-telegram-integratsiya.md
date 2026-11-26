# 07 — Telegram Bot Integratsiyasi (Diagnostika so'rovnomasi)

> `#diagnostic` bo'limidagi 4 savollik so'rovnoma javoblari Telegram botga yuboriladi. Bu fayl — ushbu integratsiyani xavfsiz va to'g'ri amalga oshirish bo'yicha qo'llanma.

## 1. Muhim xavfsizlik qoidasi

**Bot tokenini hech qachon frontend (brauzer) kodida ochiq saqlamang.** Agar so'rovnoma javoblari to'g'ridan-to'g'ri brauzerdan Telegram API'ga (`api.telegram.org`) yuborilsa va token JavaScript faylida bo'lsa — har qanday tashrif buyuruvchi "View Source" orqali tokenni ko'rib, botni egallab olishi yoki spam yuborishi mumkin.

**To'g'ri yondashuv**: forma ma'lumotlari avval **kichik backend oraliq qatlam (serverless function)**ga yuboriladi, u esa tokenni xavfsiz muhitda (server tomonida, environment variable sifatida) saqlab, Telegram API'ga so'rovni shu yerdan amalga oshiradi.

## 2. Tavsiya etilgan arxitektura

```
[Sayt forma] → POST /api/send-diagnostic → [Serverless function] → Telegram Bot API → [Admin chat/guruh]
```

**Platformaga qarab variantlar** (loyiha qayerda joylashtirilishiga bog'liq):

| Hosting | Serverless yechim |
|---|---|
| Vercel | `/api/send-diagnostic.js` (Vercel Serverless Function) |
| Netlify | `/.netlify/functions/send-diagnostic.js` |
| Cloudflare Pages | Cloudflare Worker (`functions/api/send-diagnostic.js`) |
| O'z serveri (VPS) | Oddiy Node.js/Express endpoint |

Loyihaning qayerda joylashtirilishi hali aniq bo'lmasa — **Vercel** tavsiya etiladi (bepul tarif, statik sayt + serverless function bir joyda, deploy juda sodda).

## 3. Bot yaratish bosqichlari (mijoz/agent tomonidan bajariladi)

1. Telegram'da **@BotFather** bilan suhbat boshlanadi.
2. `/newbot` buyrug'i yuboriladi, bot uchun nom va username belgilanadi (masalan: `DigitalTransformAI_Bot`).
3. BotFather **Bot Token** beradi (masalan: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`) — bu maxfiy, hech kimga berilmaydi.
4. Javoblar yuboriladigan joy aniqlanadi:
   - **Variant A**: Shaxsiy chat — admin botga `/start` yozadi, so'ng o'z `chat_id`'sini aniqlaydi (masalan `@userinfobot` orqali).
   - **Variant B** (tavsiya etiladi): Guruh/kanal — bot guruhga qo'shiladi, guruh admin qiladi, guruh `chat_id`si aniqlanadi (odatda manfiy raqam, masalan `-1001234567890`).
5. Token va chat_id **environment variables** sifatida serverga saqlanadi:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   TELEGRAM_CHAT_ID=-1001234567890
   ```

## 4. Serverless function — mantiqiy sxema (psevdokod, til-agnostik)

```
FUNCTION handle_request(request):
    IF request.method != "POST":
        RETURN error(405, "Method not allowed")

    data = parse_json(request.body)

    # Validatsiya — barcha 4 savol va mijozning aloqa ma'lumotlari to'ldirilganmi
    IF NOT (data.industry AND data.challenge AND data.interest AND data.team_size):
        RETURN error(400, "Missing fields")
    IF NOT (data.contact_name AND (data.contact_phone OR data.contact_telegram)):
        RETURN error(400, "Missing contact info")

    # Oddiy spam-himoya (ixtiyoriy, lekin tavsiya etiladi)
    IF rate_limit_exceeded(request.ip):
        RETURN error(429, "Too many requests")

    message_text = format_message(data)

    telegram_response = POST(
        url = "https://api.telegram.org/bot" + ENV.TELEGRAM_BOT_TOKEN + "/sendMessage",
        body = {
            chat_id: ENV.TELEGRAM_CHAT_ID,
            text: message_text,
            parse_mode: "HTML"
        }
    )

    IF telegram_response.ok:
        RETURN success(200, {status: "sent"})
    ELSE:
        LOG_ERROR(telegram_response)
        RETURN error(502, "Failed to send")
```

## 5. Telegramga yuboriladigan xabar formati (shablon)

```
🆕 <b>Yangi diagnostika so'rovi</b>

👤 <b>Mijoz:</b> {contact_name}
🏢 <b>Kompaniya:</b> {company}
📞 <b>Telefon:</b> {contact_phone}
✈️ <b>Telegram:</b> @{contact_telegram}

📊 <b>Soha:</b> {industry}
⚠️ <b>Asosiy muammo:</b> {challenge}
💡 <b>Qiziqtirgan yechim:</b> {interest}
👥 <b>Jamoa hajmi:</b> {team_size}

🌐 <b>Til:</b> {language}
🕐 <b>Vaqt:</b> {timestamp}
```

## 6. Frontend tomondagi chaqiruv (fetch misoli)

```js
async function submitDiagnostic(answers) {
  try {
    const response = await fetch('/api/send-diagnostic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        industry: answers.q1,
        challenge: answers.q2,
        interest: answers.q3,
        team_size: answers.q4,
        language: currentLanguage, // 'uz' | 'ru' | 'en'
      }),
    });

    if (!response.ok) throw new Error('Failed');

    // Load & Success animatsiyasini ishga tushirish (02-animatsiyalar.md, #7)
    showSuccessState();
  } catch (err) {
    showErrorState(); // foydalanuvchiga "Xatolik yuz berdi, qayta urinib ko'ring" ko'rsatish
  }
}
```

## 7. Xatolik holatlari uchun UX

| Holat | Foydalanuvchiga ko'rsatiladigan xabar (UZ) |
|---|---|
| Tarmoq xatosi / server javob bermadi | "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki to'g'ridan-to'g'ri Telegram orqali bog'laning." |
| Validatsiya xatosi (savol javobsiz qoldirilgan) | "Iltimos, barcha savollarga javob bering." |

RU/EN tarjimalari `05-kontent-uz-ru-en.md` formatiga mos qo'shiladi (`diagnostic.error_network`, `diagnostic.error_validation` kalitlari sifatida).

## 8. Keyingi bosqich (agent uchun amaliy vazifa)

1. Mijozdan haqiqiy Bot Token va Chat ID so'rash (yoki yangi bot yaratishda yordam berish).
2. Tanlangan hosting platformasiga mos serverless function yozish (yuqoridagi psevdokod asosida).
3. `.env` faylini `.gitignore`ga qo'shish — token hech qachon repozitoriyga tushmasligi kerak.
4. Production'da deploy qilishdan oldin environment variables hosting panelida (Vercel/Netlify dashboard) qo'lda kiritiladi.
