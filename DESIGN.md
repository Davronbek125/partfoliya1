# DESIGN.md — Digital Transformation & AI Solutions (DT&AI)

## 1. Visual Direction & Concept
- **Concept**: "Chaos → System" (*Tartibsizlikdan tizimga*). Scattered business workflows converge into one unified management dashboard.
- **Aesthetic**: High-trust B2B "tech-noir" (Linear, Vercel, Stripe standard). Crisp geometry, hairline borders, zero stock photography, zero playful emojis.
- **Background Texture**: Full-page `DotPattern` at `5%` opacity (`--pattern-dot-grid-opacity: 0.05`).

## 2. Color Tokens
### Dark Mode (Default / `[data-theme="dark"]`)
- `--color-bg-base`: `#0A0E14`
- `--color-surface`: `#12161F`
- `--color-surface-raised`: `#1A1F2B`
- `--color-border`: `#252B38`
- `--color-accent-blue`: `#3B82F6`
- `--color-accent-violet`: `#7C5CFC`
- `--color-accent-cyan`: `#5EEAD4`
- `--color-text-primary`: `#F5F7FA`
- `--color-text-secondary`: `#9CA7B8`
- `--color-text-muted`: `#5C6578`
- `--gradient-primary`: `linear-gradient(135deg, #3B82F6 0%, #7C5CFC 100%)`

### Light Mode (`[data-theme="light"]`)
- `--color-bg-base`: `#F7F8FA`
- `--color-surface`: `#FFFFFF`
- `--color-surface-raised`: `#F0F2F5`
- `--color-border`: `#E2E5EA`
- `--color-accent-blue`: `#2563EB`
- `--color-accent-violet`: `#6D3EF5`
- `--color-accent-cyan`: `#0D9488`
- `--color-text-primary`: `#0F1420`
- `--color-text-secondary`: `#5C6578`
- `--color-text-muted`: `#9CA7B8`
- `--gradient-primary`: `linear-gradient(135deg, #2563EB 0%, #6D3EF5 100%)`

## 3. Typography & Scale
- **Display Font (`--font-display`)**: `Space Grotesk` (600, 700) — H1 (`72px/1.05` desktop, `36px/1.1` mobile), H2 (`44px` / `28px`), H3 (`24px` / `20px`), Logo (`DT&AI`).
- **Body Font (`--font-body`)**: `Inter` (400, 500, 600) — Body (`17px/1.6` desktop, `16px/1.6` mobile), Uppercase labels (`13px`, `+0.04em`), Buttons (`16px`, weight 600).

## 4. Layout, Spacing & Radius
- **Base Unit**: `8px` scale (`4, 8, 16, 24, 32, 48, 64, 96, 128`).
- **Container**: `max-width: 1280px`, horizontal padding `80px` (desktop) / `20px` (mobile).
- **Section Spacing**: `128px` vertical (desktop) / `64px` (mobile); `scroll-margin-top: 96px`.
- **Radii**: `8px` (badges), `12px` (buttons/inputs), `16px` (service cards), `20px` (package cards), `24px` (diagnostic form), `999px` (pills).

## 5. Component & Motion Rules
- **Icons**: `lucide-react` strictly with `strokeWidth={1.5}` (`40px` service icons, `18–24px` UI/nav icons).
- **UI Primitives**: Use `shadcn/ui` base components styled with CSS variables above, enhanced with Magic UI (`DotPattern`, `BorderBeam` on the featured `AI BUSINESS` card, `AnimatedBeam` in the Concept node graph).
- **Motion**: Standard UI transitions `≤ 400ms` (`cubic-bezier(0.16, 1, 0.3, 1)` ease-out; `cubic-bezier(0.34, 1.56, 0.64, 1)` spring for Liquid Bulge tabs). Wrap root in `<MotionConfig reducedMotion="user">`.

