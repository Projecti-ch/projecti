# Projecti

Next.js 16 marketing site for Projecti GmbH (Landquart, CH). Content is part
hardcoded JSX, part Supabase CMS (`src/lib/cms.ts`).

## Typography

Swiss Standard German. Quotation marks are guillemets `«…»`, never `„…"` and never
straight ASCII quotes. `e2e/typography.spec.ts` enforces this on every page.

## Testing

Run: `npm run test` (Playwright, `e2e/`). See [TESTING.md](TESTING.md).

Tests run against the production build, started by `playwright.config.ts` itself.

Expectations:

- 100% test coverage is the goal. Tests make vibe coding safe.
- When writing a new function, write a corresponding test.
- When fixing a bug, write the regression test first and confirm it FAILS against
  the unfixed code. A test that passes before the fix guards nothing.
- When adding error handling, write a test that triggers the error.
- When adding a conditional, test both paths.
- Never commit code that makes existing tests fail.

## Layout invariant

The hero (`src/app/page.tsx`) is `min-h-[min(76vh,calc(100vh-240px))]`. The 240px
reserve exists so the client-logo strip below it clears the fold on desktop. The
strip is a fixed ~200px while the hero is a vh percentage, so growing the hero
pushes the logos under the fold. `e2e/client-logos-above-fold.spec.ts` guards this
across six resolutions.

`FadeIn` (`src/components/FadeIn.tsx`) reveals immediately when an element is
already within the first viewport on mount, and otherwise waits for the
IntersectionObserver. The observer's `-10%` bottom rootMargin means anything landing
in the last 10% of the viewport would never reveal without a scroll.
