# PROJECT CONSTITUTION & DESIGN ENFORCEMENT (`AGENTS.md`)

You are a Senior Design Engineer building the corporate website for **Digital Transformation & AI Solutions** (`DT&AI`).
All specification files are located in `/specs` (`00-INDEX.md` through `09-xizmat-sahifalari-kontenti.md`). They are the SINGLE SOURCE OF TRUTH (`08-sahifa-xaritasi-va-marshrutlash.md` supersedes the earlier single-page plan in `01`). Never invent placeholder text, random colors, or generic AI templates.

## 1. CORE AESTHETIC & ANTI-SLOP RULES
- **Creative Concept**: "Chaos → System" (*Tartibsizlikdan tizimga*). Scattered business processes (spreadsheets, chats, paper docs) visually organize into one unified intelligent system.
- **Visual Direction**: Serious, high-trust B2B "tech-noir" inspired by Linear, Vercel, and Stripe.
- **STRICT PROHIBITIONS**:
  - NO stock photography or raster images anywhere. Use crisp SVG node-graphs, dot-grid textures, Lucide line icons (`strokeWidth={1.5}`), and real interactive UI mockups (live CRM/ERP dashboard component).
  - NO playful startup illustrations, NO emojis in UI/copy, NO generic purple-pink AI gradients outside the exact `--gradient-primary` token.
  - NO hardcoded colors (`#hex` or Tailwind default palette like `bg-slate-900`). Always use the exact CSS custom properties defined in `specs/03-dizayn-tizimi.md`.
  - NO pricing numbers in the Packages section — show only the commercial model labels from `specs/05-kontent-uz-ru-en.md`.
  - NEVER expose `TELEGRAM_BOT_TOKEN` or `TELEGRAM_CHAT_ID` on the client side.

## 2. DESIGN TOKENS & TYPOGRAPHY (`specs/03-dizayn-tizimi.md`)
- **Fonts**: `Space Grotesk` (weights 600, 700 -> `--font-display`) for headings/logos/numbers; `Inter` (weights 400, 500, 600 -> `--font-body`) for body, labels, and buttons.
- **Spacing Scale**: Strictly multiples of 8px (`4, 8, 16, 24, 32, 48, 64, 96, 128`).
- **Container**: `max-width: 1280px`, centered, horizontal padding `80px` (desktop ≥1280px) / `20px` (mobile <768px). Section vertical padding: `128px` (desktop) / `64px` (mobile). Anchor scroll offset: `scroll-margin-top: 96px`.
- **Radius Scale**: `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 16px`, `--radius-xl: 20px`, `--radius-2xl: 24px`, `--radius-pill: 999px`.
- **Background Texture**: Subtle full-page dot-grid pattern at `5%` opacity (`--pattern-dot-grid-opacity: 0.05`).

## 3. THEME & I18N ARCHITECTURE (`specs/04-tema-tizimi.md`, `specs/05-kontent-uz-ru-en.md`)
- **Theme**: Supports `dark`, `light`, and `system` (default if `localStorage.getItem('theme-preference')` is null). Must inject an inline blocking `<script>` in `<head>` before CSS paints to prevent Flash of Wrong Theme (FOWT). Theme switch transitions colors via `300ms ease-out` cross-fade; theme icon rotates `-90deg → 0deg`.
- **Language**: Supports `uz`, `ru`, `en` via locale-prefixed App Router routes (`/{locale}/` comprehensive corporate landing + `/{locale}/xizmatlar/{slug}` service pages, see `specs/08-sahifa-xaritasi-va-marshrutlash.md`). Root `/` MUST ALWAYS redirect to `/uz` on first visit (NEVER auto-detect `navigator.language`). Switching language navigates directly to the same route under the selected locale (and persists preference in `localStorage` `'lang-preference'`).

## 4. MOTION & INTERACTION RULES (`specs/02-animatsiyalar.md`)
- Standard UI transitions MUST NOT exceed `400ms` (except infinite ambient loops like Glow Pulse or Dashboard demo auto-cycle).
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for ease-out; `cubic-bezier(0.34, 1.56, 0.64, 1)` for spring.
- Wrap the app in `<MotionConfig reducedMotion="user">` and respect `@media (prefers-reduced-motion: reduce)`.

