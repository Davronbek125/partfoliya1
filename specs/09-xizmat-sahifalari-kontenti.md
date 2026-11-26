# 09 — Xizmat Sahifalari Kontenti (UZ / RU / EN)

> `/{locale}/xizmatlar/{slug}` sahifalari uchun to'liq matnlar. Sahifa tuzilishi `08-sahifa-xaritasi-va-marshrutlash.md` §3.3 bo'yicha: **Mini-hero → Nimalarni o'z ichiga oladi → Kimlar uchun mos → CTA bloki → Shuningdek qarang**.
>
> **Manba va qoida**: funksiyalar ro'yxati asl katalog (`IT_xizmatlari_katalogi...pdf`) asosida, uning doirasidan chiqmasdan yozilgan. Katalogning sotuv qoidasiga rioya qilinadi — *"texnik imkoniyat, muddat yoki natija bo'yicha tasdiqlanmagan va'dalar berilmaydi"*: matnlarda aniq muddat, foiz yoki natija kafolati yo'q. Bunday raqamlar keyin (haqiqiy loyihalar bo'lgach) qo'shiladi.
>
> Xizmat **nomlari** (H1) `05-kontent-uz-ru-en.md` dagi `services.01 … services.08` kalitlaridan olinadi — bu yerda takrorlanmaydi. Soha nomlari esa `industries.*` kalitlaridan olinadi.

---

## 0. Kontent identifikatorlari (ID → slug → nom kaliti)

| ID | Slug (URL) | Nom kaliti (`05` fayl) |
|---|---|---|
| `ai` | `ai-sun-iy-intellekt` | `services.01` |
| `web` | `web-development` | `services.02` |
| `mobile` | `mobile-app-development` | `services.03` |
| `telegram` | `telegram-bot-development` | `services.04` |
| `erp_crm` | `erp-crm` | `services.05` |
| `automation` | `business-automation` | `services.06` |
| `systemization` | `business-systemization` | `services.07` |
| `integration` | `it-integration` | `services.08` |

**Tavsiya etilgan i18n kalit tuzilishi** (`uz.json` / `ru.json` / `en.json`):

```json
{
  "service_page": { "features_title": "...", "cta_title": "..." },
  "service_pages": {
    "ai": {
      "meta": { "title": "...", "description": "..." },
      "lead": "...",
      "features": [ { "title": "...", "desc": "..." } ],
      "industries": ["trade", "pharmacy"],
      "related": ["erp-crm", "telegram-bot-development"]
    }
  }
}
```

`industries` va `related` — tilga bog'liq bo'lmagan massivlar (kalit/slug), shuning uchun ular faqat bir marta, tillardan alohida ko'rsatilgan.

---

## 1. Barcha xizmat sahifalari uchun umumiy matnlar (`service_page.*`)

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `service_page.breadcrumb_services` | Xizmatlar | Услуги | Services |
| `service_page.features_title` | Nimalarni o'z ichiga oladi | Что входит | What's included |
| `service_page.industries_title` | Kimlar uchun mos | Для кого подходит | Who it's for |
| `service_page.industries_note` | Yechim sizning faoliyat turingiz va mavjud dasturlaringizga moslashtiriladi. | Решение адаптируется под вашу сферу деятельности и существующие программы. | The solution is adapted to your line of business and existing software. |
| `service_page.cta_title` | Bu yechim sizga kerakmi? | Нужно ли вам это решение? | Is this the right solution for you? |
| `service_page.cta_text` | 60 soniyalik diagnostika orqali ehtiyojingizni aniqlaymiz va sizga mos 1–3 ta yechim taklif qilamiz. | С помощью 60-секундной диагностики определим ваши потребности и предложим 1–3 подходящих решения. | Through a 60-second diagnostic we'll identify your needs and suggest 1–3 suitable solutions. |
| `service_page.cta_button` | Diagnostikadan boshlash | Начать с диагностики | Start with diagnostics |
| `service_page.related_title` | Shuningdek qarang | Смотрите также | See also |
| `service_page.back_to_all` | Barcha xizmatlar | Все услуги | All services |

---

## 2. Xizmat sahifalari

### 2.1 `ai` — AI & Sun'iy intellekt yechimlari

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | AI va sun'iy intellekt yechimlari \| DT&AI | ИИ и решения на основе искусственного интеллекта \| DT&AI | AI & Artificial Intelligence Solutions \| DT&AI |
| `meta.description` | AI agent, AI sotuv menejeri, AI call center va boshqa yechimlar: muloqot, tahlil va takrorlanuvchi vazifalarni avtomatlashtiring. | ИИ-агенты, ИИ-менеджер по продажам, ИИ-колл-центр и другие решения: автоматизируйте общение, анализ и рутинные задачи. | AI agents, AI sales manager, AI call center and more: automate communication, analysis, and repetitive tasks. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Sun'iy intellekt biznesingizdagi muloqot, tahlil va takrorlanuvchi vazifalarni o'z zimmasiga oladi: mijozlarga tezkor javob beradi, ma'lumotlarni tartibga soladi va xodimlaringiz vaqtini muhim ishlarga bo'shatadi. Yechim sizning jarayonlaringiz va mavjud dasturlaringizga moslab ishlab chiqiladi. | Искусственный интеллект берёт на себя общение, анализ и рутинные задачи: быстро отвечает клиентам, упорядочивает данные и освобождает время сотрудников для важных дел. Решение разрабатывается под ваши процессы и существующие программы. | Artificial intelligence takes over communication, analysis, and repetitive tasks: it answers customers quickly, organizes data, and frees your team's time for what matters. The solution is built around your processes and existing software. |

**Nimalarni o'z ichiga oladi** (`features[]`, tartib bilan)

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | AI Agent | ИИ-агент | AI Agent |
| 1 | `desc` | Mijozlar yoki xodimlar bilan muloqot qiladigan, belgilangan vazifalarni bajaradigan virtual agent. | Виртуальный агент, который общается с клиентами или сотрудниками и выполняет заданные задачи. | A virtual agent that talks to customers or employees and carries out defined tasks. |
| 2 | `title` | AI Sales Manager | ИИ-менеджер по продажам | AI Sales Manager |
| 2 | `desc` | Murojaatlarni qabul qiladi, mijoz savollariga javob beradi va sotuv jarayonini qo'llab-quvvatlaydi. | Принимает обращения, отвечает на вопросы клиентов и поддерживает процесс продаж. | Handles inquiries, answers customer questions, and supports the sales process. |
| 3 | `title` | AI Customer Support | ИИ-поддержка клиентов | AI Customer Support |
| 3 | `desc` | Mijozlarga tezkor yordam va tez-tez beriladigan savollarga javob. | Быстрая помощь клиентам и ответы на частые вопросы. | Fast customer help and answers to frequently asked questions. |
| 4 | `title` | AI Call Center | ИИ-колл-центр | AI Call Center |
| 4 | `desc` | Ovozli qo'ng'iroqlarni qabul qilish va yo'naltirish uchun AI yechimlari. | ИИ-решения для приёма и маршрутизации голосовых звонков. | AI solutions for answering and routing voice calls. |
| 5 | `title` | AI HR Assistant | ИИ-помощник HR | AI HR Assistant |
| 5 | `desc` | Nomzodlar ma'lumotlarini saralaydi va HR jarayonlariga ko'maklashadi. | Отбирает данные кандидатов и помогает в HR-процессах. | Screens candidate information and supports HR processes. |
| 6 | `title` | AI Business Analyst | ИИ-бизнес-аналитик | AI Business Analyst |
| 6 | `desc` | Biznes ma'lumotlarini tahlil qiladi va rahbariyat uchun xulosalar tayyorlaydi. | Анализирует бизнес-данные и готовит выводы для руководства. | Analyzes business data and prepares insights for management. |
| 7 | `title` | AI Voice Assistant | ИИ-голосовой ассистент | AI Voice Assistant |
| 7 | `desc` | Ovoz orqali berilgan buyruq va so'rovlarni qayta ishlaydi. | Обрабатывает голосовые команды и запросы. | Processes voice commands and requests. |
| 8 | `title` | AI Document Processing | ИИ-обработка документов | AI Document Processing |
| 8 | `desc` | Hujjatlardan ma'lumot ajratadi, tasniflaydi va qayta ishlaydi. | Извлекает данные из документов, классифицирует и обрабатывает их. | Extracts, classifies, and processes information from documents. |
| 9 | `title` | AI Integration | ИИ-интеграция | AI Integration |
| 9 | `desc` | AI funksiyalarini mavjud dastur va ish jarayonlariga ulaydi. | Подключает ИИ-функции к существующим программам и рабочим процессам. | Connects AI features to your existing software and workflows. |

**Kimlar uchun mos** — `industries`: `["trade", "pharmacy", "clinics", "ecommerce", "education", "services"]`
**Shuningdek qarang** — `related`: `["erp-crm", "telegram-bot-development", "business-automation"]`

---

### 2.2 `web` — Web Development

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | Veb-sayt va veb-platformalar ishlab chiqish \| DT&AI | Разработка сайтов и веб-платформ \| DT&AI | Web Development — Websites & Platforms \| DT&AI |
| `meta.description` | Korporativ saytlar, internet-do'konlar, SaaS platformalar va shaxsiy kabinetlar. Biznesingizga moslab ishlab chiqamiz. | Корпоративные сайты, интернет-магазины, SaaS-платформы и личные кабинеты. Разрабатываем под ваш бизнес. | Corporate websites, online stores, SaaS platforms, and customer portals. Built around your business. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Kompaniyangiz, xizmatingiz yoki mahsulotingiz uchun internet orqali ishlaydigan sayt va platformalar ishlab chiqamiz — qulay, tartibli va biznesingiz bilan birga kengaytirish mumkin bo'lgan. | Разрабатываем сайты и веб-платформы для вашей компании, услуги или продукта — удобные, упорядоченные и готовые расти вместе с бизнесом. | We build websites and web platforms for your company, service, or product — user-friendly, well-structured, and ready to grow with your business. |

**Nimalarni o'z ichiga oladi**

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | Korporativ veb-saytlar va Landing sahifalar | Корпоративные сайты и лендинги | Corporate websites & landing pages |
| 1 | `desc` | Kompaniyani taqdim etuvchi saytlar va bitta aniq maqsadga yo'naltirilgan sahifalar. | Сайты, представляющие компанию, и страницы под одну чёткую цель. | Sites that present your company and pages built around one clear goal. |
| 2 | `title` | Internet-do'konlar va marketplace | Интернет-магазины и маркетплейсы | Online stores & marketplaces |
| 2 | `desc` | Onlayn savdo uchun do'konlar va ko'p sotuvchili platformalar. | Магазины для онлайн-торговли и платформы с несколькими продавцами. | Stores for selling online and multi-vendor platforms. |
| 3 | `title` | SaaS platformalar | SaaS-платформы | SaaS platforms |
| 3 | `desc` | Obuna asosida ishlaydigan servislar va platformalar. | Сервисы и платформы, работающие по подписке. | Subscription-based services and platforms. |
| 4 | `title` | Shaxsiy kabinetlar, portallar va Dashboard | Личные кабинеты, порталы и дашборды | Accounts, portals & dashboards |
| 4 | `desc` | Mijozlar va xodimlar uchun shaxsiy kabinet, portal va boshqaruv panellari. | Личные кабинеты, порталы и панели управления для клиентов и сотрудников. | Personal accounts, portals, and control panels for customers and staff. |
| 5 | `title` | Buyurtma, bron qilish va yozilish tizimlari | Системы заказов, бронирования и записи | Ordering, booking & appointment systems |
| 5 | `desc` | Buyurtma berish, joy bron qilish va xizmatga yozilish uchun onlayn tizimlar. | Онлайн-системы для оформления заказов, бронирования и записи на услуги. | Online systems for placing orders, making reservations, and booking appointments. |
| 6 | `title` | Maxsus web-platformalar | Индивидуальные веб-платформы | Custom web platforms |
| 6 | `desc` | Mijoz ehtiyojiga mos individual ishlab chiqiladigan platformalar. | Платформы, разрабатываемые под конкретные потребности клиента. | Platforms developed around a client's specific needs. |

**Kimlar uchun mos** — `industries`: `["ecommerce", "services", "education", "clinics", "restaurant", "trade"]`
**Shuningdek qarang** — `related`: `["mobile-app-development", "erp-crm", "it-integration"]`

---

### 2.3 `mobile` — Mobile App Development

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | Mobil ilovalar ishlab chiqish (Android va iOS) \| DT&AI | Разработка мобильных приложений (Android и iOS) \| DT&AI | Mobile App Development (Android & iOS) \| DT&AI |
| `meta.description` | Buyurtma, yetkazib berish, ta'lim, fintech va korporativ mobil ilovalar — Android va iOS uchun. | Мобильные приложения для заказов, доставки, обучения, финтеха и корпоративных задач — для Android и iOS. | Mobile apps for ordering, delivery, education, fintech, and corporate needs — for Android and iOS. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Android va iOS qurilmalari uchun biznesingiz vazifalariga mos mobil ilovalar yaratamiz — buyurtma qabul qilishdan tortib to'lov va maxsus korporativ yechimlargacha. | Создаём мобильные приложения для Android и iOS под задачи вашего бизнеса — от приёма заказов до платежей и специальных корпоративных решений. | We build Android and iOS apps around your business tasks — from taking orders to payments and custom corporate solutions. |

**Nimalarni o'z ichiga oladi**

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | Android va iOS ilovalar | Приложения для Android и iOS | Android & iOS apps |
| 1 | `desc` | Ikkala platforma uchun mobil ilovalar. | Мобильные приложения для обеих платформ. | Mobile apps for both platforms. |
| 2 | `title` | Internet-do'kon va buyurtma ilovalari | Приложения для интернет-магазинов и заказов | Online store & ordering apps |
| 2 | `desc` | Mahsulot sotish va buyurtma qabul qilish uchun ilovalar. | Приложения для продажи товаров и приёма заказов. | Apps for selling products and taking orders. |
| 3 | `title` | Yetkazib berish, taxi va transport ilovalari | Приложения для доставки, такси и транспорта | Delivery, taxi & transport apps |
| 3 | `desc` | Yetkazib berish, taxi va transport xizmatlari uchun ilovalar. | Приложения для служб доставки, такси и перевозок. | Apps for delivery, taxi, and transport services. |
| 4 | `title` | Ta'lim platformalari va o'quv ilovalari | Образовательные платформы и учебные приложения | Education platforms & learning apps |
| 4 | `desc` | Onlayn o'qitish va o'quv jarayonlari uchun ilovalar. | Приложения для онлайн-обучения и учебных процессов. | Apps for online learning and study processes. |
| 5 | `title` | Fintech va to'lov ilovalari | Финтех и платёжные приложения | Fintech & payment apps |
| 5 | `desc` | To'lov va moliyaviy xizmatlar bilan bog'liq ilovalar. | Приложения, связанные с платежами и финансовыми услугами. | Apps related to payments and financial services. |
| 6 | `title` | Korporativ va maxsus ilovalar | Корпоративные и специальные приложения | Corporate & custom apps |
| 6 | `desc` | Kompaniyaning ichki ehtiyojlari va maxsus biznes vazifalari uchun ilovalar. | Приложения для внутренних нужд компании и особых бизнес-задач. | Apps for a company's internal needs and specialized business tasks. |

**Kimlar uchun mos** — `industries`: `["ecommerce", "logistics", "education", "restaurant", "services", "trade"]`
**Shuningdek qarang** — `related`: `["web-development", "telegram-bot-development", "it-integration"]`

---

### 2.4 `telegram` — Telegram Bot Development

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | Telegram bot yaratish \| DT&AI | Разработка Telegram-ботов \| DT&AI | Telegram Bot Development \| DT&AI |
| `meta.description` | Savdo, buyurtma va to'lov uchun Telegram botlar, CRM bilan integratsiya, shu jumladan AI botlar. | Telegram-боты для продаж, заказов и оплаты, интеграция с CRM, в том числе боты на основе ИИ. | Telegram bots for sales, orders, and payments, with CRM integration — including AI-powered bots. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Telegram — mijozlaringiz allaqachon bo'lgan joy. Savdo, buyurtma, to'lov va aloqa jarayonlarini Telegram bot orqali avtomatlashtiramiz, kerak bo'lsa AI va CRM bilan ulaymiz. | Telegram — это место, где ваши клиенты уже есть. Автоматизируем продажи, заказы, оплату и общение через Telegram-бота, при необходимости подключая ИИ и CRM. | Telegram is where your customers already are. We automate sales, orders, payments, and communication through a Telegram bot, connecting AI and CRM when needed. |

**Nimalarni o'z ichiga oladi**

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | AI bilan ishlaydigan botlar | Боты на основе ИИ | AI-powered bots |
| 1 | `desc` | Savollarga tabiiy tilda javob beradigan sun'iy intellektli Telegram botlar. | Telegram-боты с искусственным интеллектом, отвечающие на вопросы на естественном языке. | AI Telegram bots that answer questions in natural language. |
| 2 | `title` | Savdo, buyurtma va do'kon botlari | Боты для продаж, заказов и магазинов | Sales, order & store bots |
| 2 | `desc` | Mahsulot ko'rsatish, buyurtma qabul qilish va savdo qilish uchun botlar. | Боты для показа товаров, приёма заказов и торговли. | Bots for showcasing products, taking orders, and selling. |
| 3 | `title` | To'lov va hisob-kitob botlari | Боты для приёма платежей и расчётов | Payment & billing bots |
| 3 | `desc` | To'lovlarni qabul qilish va hisob-kitoblarni yuritish uchun botlar. | Боты для приёма оплаты и ведения расчётов. | Bots for accepting payments and handling settlements. |
| 4 | `title` | CRM bilan integratsiyalangan botlar | Боты, интегрированные с CRM | CRM-integrated bots |
| 4 | `desc` | Murojaatlar va mijoz ma'lumotlari to'g'ridan-to'g'ri CRM tizimiga tushadi. | Обращения и данные клиентов попадают прямо в CRM-систему. | Inquiries and customer data flow straight into your CRM. |
| 5 | `title` | Ro'yxatdan o'tkazish, test va ta'lim botlari | Боты для регистрации, тестов и обучения | Registration, quiz & learning bots |
| 5 | `desc` | Ro'yxatga olish, test o'tkazish va o'qitish uchun botlar. | Боты для регистрации, проведения тестов и обучения. | Bots for sign-ups, running quizzes, and teaching. |
| 6 | `title` | Xabarnoma, monitoring va korporativ botlar | Боты уведомлений, мониторинга и корпоративные боты | Notification, monitoring & corporate bots |
| 6 | `desc` | Xabar yuborish, holatni kuzatish va ichki korporativ vazifalar uchun botlar. | Боты для рассылки уведомлений, отслеживания состояния и внутренних корпоративных задач. | Bots for sending notifications, tracking status, and internal corporate tasks. |

**Kimlar uchun mos** — `industries`: `["restaurant", "ecommerce", "education", "trade", "services", "clinics"]`
**Shuningdek qarang** — `related`: `["ai-sun-iy-intellekt", "erp-crm", "business-automation"]`

---

### 2.5 `erp_crm` — ERP & CRM

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | ERP va CRM tizimlari \| DT&AI | ERP и CRM системы \| DT&AI | ERP & CRM Systems \| DT&AI |
| `meta.description` | Savdo, ombor, moliya, HRM va filiallarni yagona boshqaruv tizimiga birlashtiruvchi ERP va CRM yechimlari. | ERP и CRM для объединения продаж, склада, финансов, HRM и филиалов в единую систему управления. | ERP and CRM solutions that unite sales, inventory, finance, HRM, and branches in one management system. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Biznesingizning turli bo'limlarini yagona ma'lumotlar va boshqaruv muhitiga birlashtiramiz: mijozlar, savdo, ombor, moliya va xodimlar bir tizimda ko'rinadi, rahbar esa umumiy holatni bitta panelda kuzatadi. | Объединяем разные отделы бизнеса в единую среду данных и управления: клиенты, продажи, склад, финансы и сотрудники — в одной системе, а руководитель видит общую картину на одной панели. | We bring your business's departments into one data and management environment: customers, sales, inventory, finance, and staff live in one system, while management sees the full picture on a single dashboard. |

**Nimalarni o'z ichiga oladi**

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | ERP | ERP | ERP |
| 1 | `desc` | Resurslar, operatsiyalar va ichki jarayonlarni boshqarish. | Управление ресурсами, операциями и внутренними процессами. | Management of resources, operations, and internal processes. |
| 2 | `title` | CRM | CRM | CRM |
| 2 | `desc` | Mijozlar, murojaatlar, sotuvlar va munosabatlarni boshqarish. | Управление клиентами, обращениями, продажами и отношениями. | Management of customers, inquiries, sales, and relationships. |
| 3 | `title` | Savdo, buyurtma va mijozlar bazasi | Продажи, заказы и клиентская база | Sales, orders & customer base |
| 3 | `desc` | Savdo, buyurtmalar va mijozlar bazasini yagona joyda yuritish. | Ведение продаж, заказов и клиентской базы в одном месте. | Keeping sales, orders, and your customer base in one place. |
| 4 | `title` | Ombor va inventar hisobi | Складской учёт и инвентаризация | Warehouse & inventory tracking |
| 4 | `desc` | Mahsulot qoldig'i va inventar hisobini yuritish. | Ведение учёта остатков товара и инвентаря. | Tracking product stock and inventory. |
| 5 | `title` | Moliya va buxgalteriya integratsiyasi | Интеграция с финансами и бухгалтерией | Finance & accounting integration |
| 5 | `desc` | Moliya va buxgalteriya tizimlari bilan ulanish. | Связь с финансовыми и бухгалтерскими системами. | Connection with financial and accounting systems. |
| 6 | `title` | HRM | HRM | HRM |
| 6 | `desc` | Xodimlar, ish vaqti va ish haqi jarayonlarini boshqarish. | Управление сотрудниками, рабочим временем и процессами начисления зарплаты. | Management of employees, working hours, and payroll processes. |
| 7 | `title` | Logistika, xarid va ta'minot | Логистика, закупки и снабжение | Logistics, procurement & supply |
| 7 | `desc` | Logistika, xarid va ta'minotni boshqarish. | Управление логистикой, закупками и снабжением. | Management of logistics, purchasing, and supply. |
| 8 | `title` | Filiallar va savdo nuqtalari | Филиалы и точки продаж | Branches & points of sale |
| 8 | `desc` | Bir nechta filial va savdo nuqtalarini yagona tizimdan boshqarish. | Управление несколькими филиалами и точками продаж из одной системы. | Managing several branches and points of sale from one system. |
| 9 | `title` | Rahbar uchun yagona Dashboard | Единый дашборд для руководителя | Unified executive dashboard |
| 9 | `desc` | Rahbar uchun yagona analitik panel. | Единая аналитическая панель для руководителя. | A single analytics panel for management. |

**Kimlar uchun mos** — `industries`: `["trade", "manufacturing", "pharmacy", "logistics", "construction", "education", "clinics"]`
**Shuningdek qarang** — `related`: `["business-automation", "it-integration", "business-systemization"]`

---

### 2.6 `automation` — Business Automation

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | Biznes jarayonlarini avtomatlashtirish \| DT&AI | Автоматизация бизнес-процессов \| DT&AI | Business Process Automation \| DT&AI |
| `meta.description` | Hisobotlar, buyurtmalar, bildirishnomalar va takrorlanuvchi vazifalarni avtomatlashtirish. | Автоматизация отчётов, заказов, уведомлений и повторяющихся задач. | Automation of reports, orders, notifications, and repetitive tasks. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Takrorlanuvchi, qo'lda bajariladigan ishlarni dasturga topshiramiz: hisobotlar o'zi shakllanadi, buyurtmalar kuzatiladi, bildirishnomalar o'z vaqtida yuboriladi. Xodimlaringiz esa e'tiborini muhim vazifalarga qaratadi. | Передаём рутинную ручную работу программам: отчёты формируются сами, заказы отслеживаются, уведомления приходят вовремя. А сотрудники сосредотачиваются на важных задачах. | We hand repetitive manual work over to software: reports build themselves, orders are tracked, notifications go out on time. Your team focuses on what matters. |

**Nimalarni o'z ichiga oladi**

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | Takrorlanuvchi vazifalarni avtomatlashtirish | Автоматизация повторяющихся задач | Repetitive task automation |
| 1 | `desc` | Har kuni qo'lda bajariladigan ishlarni avtomatik rejimga o'tkazish. | Перевод ежедневной ручной работы в автоматический режим. | Moving daily manual work into automatic mode. |
| 2 | `title` | Savdo va mijozlar bilan ishlash jarayonlari | Процессы продаж и работы с клиентами | Sales & customer workflows |
| 2 | `desc` | Savdo va mijozlar bilan aloqa bosqichlarini avtomatlashtirish. | Автоматизация этапов продаж и общения с клиентами. | Automating the stages of sales and customer communication. |
| 3 | `title` | Hisobotlarni avtomatik shakllantirish | Автоматическое формирование отчётов | Automatic reporting |
| 3 | `desc` | Hisobotlar o'zi tayyorlanadi va kerakli kishilarga yuboriladi. | Отчёты готовятся сами и отправляются нужным людям. | Reports are prepared automatically and sent to the right people. |
| 4 | `title` | Xodimlar faoliyatini monitoring qilish | Мониторинг работы сотрудников | Staff activity monitoring |
| 4 | `desc` | Xodimlar faoliyati holatini kuzatish va nazorat qilish. | Отслеживание и контроль активности сотрудников. | Tracking and oversight of staff activity. |
| 5 | `title` | Buyurtmalarni qayta ishlash va kuzatish | Обработка и отслеживание заказов | Order processing & tracking |
| 5 | `desc` | Buyurtmalarni qayta ishlash va holatini kuzatish. | Обработка заказов и отслеживание их статуса. | Processing orders and tracking their status. |
| 6 | `title` | Tashqi servislar, API va to'lov tizimlari | Внешние сервисы, API и платёжные системы | External services, APIs & payments |
| 6 | `desc` | Tashqi servislar, API va to'lov tizimlari bilan integratsiya. | Интеграция с внешними сервисами, API и платёжными системами. | Integration with external services, APIs, and payment systems. |
| 7 | `title` | Bildirishnoma, eslatma va tasdiqlash | Уведомления, напоминания и согласования | Notifications, reminders & approvals |
| 7 | `desc` | Bildirishnomalar, eslatmalar va tasdiqlash jarayonlari. | Уведомления, напоминания и процессы согласования. | Notifications, reminders, and approval flows. |

**Kimlar uchun mos** — `industries`: `["trade", "manufacturing", "logistics", "ecommerce", "services", "construction"]`
**Shuningdek qarang** — `related`: `["erp-crm", "ai-sun-iy-intellekt", "it-integration"]`

---

### 2.7 `systemization` — Business Systemization

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | Biznesni tizimlashtirish: audit, SOP, KPI \| DT&AI | Систематизация бизнеса: аудит, SOP, KPI \| DT&AI | Business Systemization: Audit, SOPs, KPIs \| DT&AI |
| `meta.description` | Biznes diagnostikasi, reglamentlar, SOP va KPI tizimini yaratish hamda raqamli boshqaruvga o'tkazish. | Диагностика бизнеса, регламенты, SOP и KPI, а затем переход на цифровое управление. | Business diagnostics, regulations, SOPs, and KPIs — then a move to digital management. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Ba'zan muammo dasturda emas — jarayonlarning o'zida. Biznesingizni noldan tahlil qilamiz, vazifalar va mas'uliyatlarni belgilaymiz, reglament va KPI tizimini yaratamiz, so'ngra uni raqamli boshqaruvga o'tkazamiz. | Иногда проблема не в программе, а в самих процессах. Мы анализируем бизнес с нуля, определяем задачи и ответственность, создаём регламенты и систему KPI, а затем переводим всё в цифровое управление. | Sometimes the problem isn't the software — it's the processes themselves. We analyze your business from scratch, define tasks and responsibilities, create regulations and a KPI system, then move it all into digital management. |

**Nimalarni o'z ichiga oladi**

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | Biznes diagnostikasi va audit | Диагностика и аудит бизнеса | Business diagnostics & audit |
| 1 | `desc` | Mavjud jarayonlarni o'rganish va audit qilish. | Изучение и аудит существующих процессов. | Studying and auditing your existing processes. |
| 2 | `title` | Biznes model va tashkiliy struktura | Бизнес-модель и организационная структура | Business model & organizational structure |
| 2 | `desc` | Biznes modeli va tashkiliy tuzilmani shakllantirish. | Формирование бизнес-модели и организационной структуры. | Shaping the business model and organizational structure. |
| 3 | `title` | Jarayonlar, vazifalar va mas'uliyatlar | Процессы, задачи и ответственность | Processes, tasks & responsibilities |
| 3 | `desc` | Ish jarayonlari, vazifalar va mas'uliyatlarni aniq belgilash. | Чёткое определение рабочих процессов, задач и ответственности. | Clearly defining workflows, tasks, and accountability. |
| 4 | `title` | Ichki reglamentlar va SOP hujjatlari | Внутренние регламенты и документы SOP | Internal regulations & SOP documents |
| 4 | `desc` | Ichki reglamentlar va standart ish yo'riqnomalarini (SOP) ishlab chiqish. | Разработка внутренних регламентов и стандартных рабочих инструкций (SOP). | Developing internal regulations and standard operating procedures (SOPs). |
| 5 | `title` | KPI va samaradorlikni baholash tizimi | Система KPI и оценки эффективности | KPI & performance evaluation system |
| 5 | `desc` | KPI va xodimlar samaradorligini baholash tizimini yaratish. | Создание системы KPI и оценки эффективности сотрудников. | Creating a KPI and employee performance evaluation system. |
| 6 | `title` | Sotuv bo'limi va mijozlar bilan ishlash tizimi | Система отдела продаж и работы с клиентами | Sales department & customer-handling system |
| 6 | `desc` | Sotuv bo'limi va mijozlar bilan ishlash tizimini yo'lga qo'yish. | Выстраивание системы отдела продаж и работы с клиентами. | Setting up the sales department and customer-handling system. |
| 7 | `title` | Moliyaviy nazorat va boshqaruv hisobotlari | Финансовый контроль и управленческая отчётность | Financial control & management reports |
| 7 | `desc` | Moliyaviy nazorat va boshqaruv hisobotlarini tashkil etish. | Организация финансового контроля и управленческой отчётности. | Organizing financial control and management reporting. |
| 8 | `title` | Raqamli boshqaruvga o'tish | Переход на цифровое управление | Move to digital management |
| 8 | `desc` | Biznesni raqamli boshqaruv tizimiga o'tkazish. | Перевод бизнеса на цифровую систему управления. | Moving the business onto a digital management system. |

**Kimlar uchun mos** — `industries`: `["manufacturing", "trade", "construction", "services", "logistics", "education"]`
**Shuningdek qarang** — `related`: `["erp-crm", "business-automation", "ai-sun-iy-intellekt"]`

---

### 2.8 `integration` — IT Integration & Technical Support

**Meta (SEO)**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `meta.title` | IT integratsiya va texnik qo'llab-quvvatlash \| DT&AI | ИТ-интеграция и техническая поддержка \| DT&AI | IT Integration & Technical Support \| DT&AI |
| `meta.description` | API, to'lov tizimlari, 1C integratsiyasi, server va cloud sozlash, kiberxavfsizlik va texnik yordam. | API, платёжные системы, интеграция с 1С, настройка серверов и облака, кибербезопасность и поддержка. | APIs, payment systems, 1C integration, server and cloud setup, cybersecurity, and technical support. |

**Mini-hero**

| Kalit | UZ | RU | EN |
|---|---|---|---|
| `lead` | Alohida yaxshi ishlaydigan dasturlar ham bir-biri bilan ma'lumot almashmasa, qo'shimcha qo'l mehnatini keltirib chiqaradi. Biz dasturlar, to'lov tizimlari, 1C va serverlarni o'zaro ulaymiz va ularni texnik jihatdan qo'llab-quvvatlaymiz. | Даже хорошие программы по отдельности создают лишнюю ручную работу, если не обмениваются данными друг с другом. Мы связываем программы, платёжные системы, 1С и серверы между собой и обеспечиваем их техническую поддержку. | Even good standalone programs create extra manual work when they don't exchange data. We connect your software, payment systems, 1C, and servers — and keep them technically supported. |

**Nimalarni o'z ichiga oladi**

| # | Kalit | UZ | RU | EN |
|---|---|---|---|---|
| 1 | `title` | Dasturlarni o'zaro integratsiya qilish | Интеграция программ между собой | Software-to-software integration |
| 1 | `desc` | Turli dasturlarni bir-biri bilan ma'lumot almashadigan qilib ulash. | Связывание разных программ для обмена данными. | Linking different programs so they exchange data. |
| 2 | `title` | API ishlab chiqish va ulash | Разработка и подключение API | API development & connection |
| 2 | `desc` | API ishlab chiqish va mavjud API xizmatlarini ulash. | Разработка API и подключение существующих API-сервисов. | Building APIs and connecting existing API services. |
| 3 | `title` | To'lov tizimlari va hisob-kitob servislari | Платёжные системы и расчётные сервисы | Payment systems & billing services |
| 3 | `desc` | To'lov tizimlari va hisob-kitob servislarini integratsiya qilish. | Интеграция платёжных систем и расчётных сервисов. | Integrating payment systems and billing services. |
| 4 | `title` | 1C va boshqa hisob tizimlari | 1С и другие учётные системы | 1C & other accounting systems |
| 4 | `desc` | 1C va boshqa hisob tizimlari bilan integratsiya. | Интеграция с 1С и другими учётными системами. | Integration with 1C and other accounting systems. |
| 5 | `title` | Server, ma'lumotlar bazasi va cloud | Серверы, базы данных и облако | Servers, databases & cloud |
| 5 | `desc` | Server, ma'lumotlar bazasi va cloud infratuzilmani sozlash. | Настройка серверов, баз данных и облачной инфраструктуры. | Setting up servers, databases, and cloud infrastructure. |
| 6 | `title` | Kiberxavfsizlik | Кибербезопасность | Cybersecurity |
| 6 | `desc` | Kiberxavfsizlik bo'yicha texnik yechimlar. | Технические решения в области кибербезопасности. | Technical solutions for cybersecurity. |
| 7 | `title` | Texnik qo'llab-quvvatlash va rivojlantirish | Техническая поддержка и развитие | Technical support & development |
| 7 | `desc` | Dasturiy mahsulotlarni texnik qo'llab-quvvatlash va rivojlantirish. | Техническая поддержка и развитие программных продуктов. | Technical support and ongoing development of software products. |

**Kimlar uchun mos** — `industries`: `["trade", "logistics", "ecommerce", "manufacturing", "pharmacy", "clinics"]`
**Shuningdek qarang** — `related`: `["erp-crm", "business-automation", "web-development"]`

---

## 3. Agent uchun amaliy eslatmalar

1. **Soha nomlari** (`industries` massividagi kalitlar) `05-kontent-uz-ru-en.md`dagi `industries.*` jadvalidan olinadi (masalan `trade` → "Savdo va distribyutsiya"). Har bir soha elementi `/sohalar` sahifasiga havola bo'lishi mumkin.
2. **"Shuningdek qarang"** bloki — `related` massividagi slug'lar bo'yicha 3 ta kichik xizmat kartasi (ikonka + nom + 1 qatorli tavsif, `services.0X` kalitlaridan) ko'rsatiladi; bosilsa tegishli xizmat sahifasiga olib boradi.
3. **Funksiyalar ro'yxati vizuali**: `06-vizual-spesifikatsiya.md` §11.4 dagi karta uslubi qayta ishlatiladi (ikonka, sarlavha = `title`, tavsif = `desc`), grid — 3 ustun (desktop) / 2 (tablet) / 1 (mobil). Ikonkalar Lucide to'plamidan, mazmuniga mos tanlanadi.
4. **Meta-teglar**: `meta.title` → `<title>` va `og:title`; `meta.description` → `<meta name="description">` va `og:description`. Har bir sahifada `hreflang` (uz/ru/en) qo'yiladi.
5. **Tarjima sifati**: RU/EN matnlar UZ asl nusxasi mazmuniga sodiq yozilgan; nashrdan oldin ona tilida so'zlashuvchi tomonidan tekshirib chiqilishi tavsiya etiladi (ayniqsa RU, ish yuritish terminologiyasi uchun).
6. **Kelajakdagi kengaytma**: haqiqiy loyihalar paydo bo'lgach, har bir xizmat sahifasiga "Namuna loyiha / Case study" bloki qo'shiladi — hozircha bu blok yo'q (portfolio mavjud emas).
