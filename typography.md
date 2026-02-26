# Projecti — Typography Reference

Stand: Februar 2026

---

## Font Family

**Nohemi** is the sole typeface used across the entire site. It is a geometric display font loaded via self-hosted `.woff` files.

| Weight | Numeric | File |
|--------|---------|------|
| Thin | 100 | `Nohemi-Thin.woff` |
| Light | 300 | `Nohemi-Light.woff` |
| Regular | 400 | `Nohemi-Regular.woff` |
| Medium | 500 | `Nohemi-Medium.woff` |
| SemiBold | 600 | `Nohemi-SemiBold.woff` |
| Bold | 700 | `Nohemi-Bold.woff` |

**CSS variable:** `--font-nohemi: "Nohemi", system-ui, sans-serif`
**Font display:** `swap` (text stays visible during load)
**File location:** `/public/fonts/`

---

## Global Base Styles (`globals.css`)

Applied to the `body` element — the baseline for all text on the site.

| Property | Value |
|----------|-------|
| Font family | Nohemi → system-ui → sans-serif |
| Font weight | 300 (Light) |
| Font size | 16px |
| Line height | 1.65 |
| Color | `#ffffff` (foreground) |
| Background | `#191919` |
| Anti-aliasing | `-webkit-font-smoothing: antialiased` (via Tailwind `antialiased` on `<body>`) |

---

## Letter-Spacing Rules

The general principle: **larger text → tighter spacing, smaller text → more spacing.** Nohemi is a display font and needs opening up at small sizes for readability.

### Headings

| Element | Letter-Spacing | Rationale |
|---------|---------------|-----------|
| `h1` | `-0.02em` | Hero headlines — tight and punchy |
| `h2` | `-0.01em` | Section headings — slightly tight |
| `h3`, `h4` | `0em` | Sub-headings — neutral, no adjustment |

All heading elements also inherit `font-weight: 300` from the global rule (individual components often override this with `font-semibold` or `font-bold` via Tailwind classes).

### Body & Inline Text

| Element | Letter-Spacing | Line Height |
|---------|---------------|-------------|
| `p`, `li`, `blockquote` | `0.03em` | `1.65` |

### UI Elements

| Element | Letter-Spacing |
|---------|---------------|
| `nav a` (navigation links) | `0.02em` |
| Pill buttons (`a` or `button` with `rounded-full`) | `0.03em` |

---

## Component-Level Typography

Specific font sizes, weights, and spacing applied in each component via Tailwind utility classes. These override or extend the global rules above.

### Hero (Startseite)

| Element | Size | Weight | Line Height | Letter-Spacing |
|---------|------|--------|-------------|----------------|
| H1 headline | 26px | bold (700) | 1.15 | -0.01em *(inline override)* |
| Subtext `<p>` | 16px | 300 (Light) | 1.6 | 0.03em *(from global)* |
| CTA button | 14px | 300 (Light) | — | 0.03em *(from global)* |

### Subpage Hero (`SubpageHero.tsx`)

| Element | Size | Weight | Line Height | Letter-Spacing |
|---------|------|--------|-------------|----------------|
| Tag / label `<p>` | 12px | 400 (Regular) | 1.5 | `tracking-widest` ≈ 0.1em |
| H1 headline | 26px | bold (700) | 1.15 → 1.1 (md) | -0.01em *(inline override)* |
| Subheadline `<p>` | 16px | 300 (Light) | 1.6 | 0.03em *(from global)* |
| CTA button | 14px | 300 (Light) | — | 0.03em *(from global)* |

### Section Headings (used across all pages)

| Element | Size | Weight | Line Height | Letter-Spacing |
|---------|------|--------|-------------|----------------|
| H2 section headline | 24px | 600 (SemiBold) | 1.2 | -0.02em *(inline)* |
| H3 card title | 20px | 600 (SemiBold) | 1.3 | -0.02em *(inline)* |
| H3 benefit title | 22px | 600 (SemiBold) | 1.3 | -0.02em *(inline)* |
| Body paragraph `<p>` | 16px | 300 (Light) | 1.6 | 0.03em *(from global)* |
| Numbered accent `<span>` | 22px | 600 (SemiBold) | none | from global h3 context |

> Note: Many H2/H3 components apply their own `tracking-[-0.02em]` inline via Tailwind. These take precedence over the global `h2: -0.01em` / `h3: 0em` rules, which serve as a fallback baseline.

### Navigation (`Nav.tsx`)

| Element | Size | Weight | Line Height | Letter-Spacing |
|---------|------|--------|-------------|----------------|
| Desktop nav links | 15px | 300 (Light) | none | 0.02em *(from global)* |
| Mobile nav links | 18px (`text-lg`) | 300 (Light) | — | 0.02em *(from global)* |
| CTA button | 14px | 300 (Light) | — | 0.03em *(from global)* |

### Footer (`Footer.tsx`)

| Element | Size | Weight | Line Height | Letter-Spacing |
|---------|------|--------|-------------|----------------|
| Column labels (accent) | 12px | 400 (Regular) | 1.5 | `tracking-widest` ≈ 0.1em |
| Footer body text `<p>` / `<a>` | 14px | 300 (Light) | 1.8 | 0.03em *(from global)* |

### Section Divider (`SectionDivider.tsx`)

| Element | Size | Weight | Line Height | Letter-Spacing |
|---------|------|--------|-------------|----------------|
| Section label | 12px | 400 (Regular) | 1.5 | `tracking-widest` ≈ 0.1em |

### RichText (CMS content — `RichText.tsx`)

Used on CMS project and resource detail pages for body content from Payload CMS.

| Element | Size | Weight | Tailwind Class | Letter-Spacing |
|---------|------|--------|----------------|----------------|
| `h1` | 32px | 600 (SemiBold) | `font-semibold` | -0.02em *(from global)* |
| `h2` | 24px | 600 (SemiBold) | `font-semibold` | -0.01em *(from global)* |
| `h3` | 20px | 600 (SemiBold) | `font-semibold` | 0em *(from global)* |
| `h4` | 18px | 600 (SemiBold) | `font-semibold` | 0em *(from global)* |
| `h5` | 16px | 600 (SemiBold) | `font-semibold` | 0em *(from global)* |
| `h6` | 14px | 600 (SemiBold) | `font-semibold` | 0em *(from global)* |
| `p` | inherited | inherited | `mb-4 last:mb-0` | 0.03em *(from global)* |
| `li` | inherited | inherited | list-disc / list-decimal | 0.03em *(from global)* |
| `blockquote` | inherited | inherited | `italic`, accent left border | 0.03em *(from global)* |
| `a` (links) | inherited | inherited | `text-accent underline` | 0.03em *(from global)* |

---

## Colour Tokens for Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-foreground` / `text-white` | `#ffffff` | Primary text, headings |
| `--color-muted` / `text-muted` | `#999999` | Body copy, descriptions, secondary text |
| `--color-tertiary` | `#666666` | Tertiary / very subtle text |
| `--color-accent` / `text-accent` | `#efff00` | Labels, section tags, links, CTA labels |
| `white/80` | `#ffffff` at 80% opacity | Hero subheadlines |
| `white/60` | `#ffffff` at 60% opacity | Footer links, secondary nav |

---

## Special Label Style

Used consistently for section tags, footer column headers, and `SectionDivider` labels:

```css
font-size: 12px;
font-weight: 400 (Regular);
text-transform: uppercase;
letter-spacing: tracking-widest (≈ 0.1em);
line-height: 1.5;
color: #efff00 (accent);
```

Tailwind classes: `text-[12px] font-normal uppercase tracking-widest text-accent leading-[1.5]`

---

## Letter-Spacing Quick Reference

| Context | Value | Where |
|---------|-------|-------|
| Hero H1 | `-0.02em` | `globals.css` + inline Tailwind |
| Subpage H1 | `-0.01em` | Inline Tailwind (`tracking-[-0.01em]`) |
| Section H2 | `-0.01em` global / `-0.02em` inline | Mixed |
| Card H3 | `0em` global / `-0.02em` inline | Mixed |
| Body `p`, `li` | `+0.03em` | `globals.css` |
| Nav links | `+0.02em` | `globals.css` |
| Buttons (pill) | `+0.03em` | `globals.css` |
| Labels / tags | `+0.1em` (`tracking-widest`) | Inline Tailwind |

---

## Source File

All global rules live in one file:
```
src/app/globals.css
```

Component-level overrides use Tailwind utility classes inline within each `.tsx` component file. There is no separate `tailwind.config.ts` — the project uses Tailwind CSS v4 with `@theme inline {}` configuration directly in `globals.css`.
