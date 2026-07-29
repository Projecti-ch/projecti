# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust
your instincts, and ship with confidence. Without them, vibe coding is just yolo
coding. With them, it's a superpower.

## Framework

[Playwright](https://playwright.dev) (`@playwright/test`), Chromium only.

This is a static marketing site. Almost nothing here is a pure function worth unit
testing, and the bugs that actually reach production are layout and copy bugs that
only a real browser at a real viewport size can catch. So the suite is browser
tests, and there is no unit-test layer by design.

## Running

```bash
npm run test
```

```bash
npm run test:ui
```

`playwright.config.ts` starts the server itself (`npm run build && npm run start`)
and waits for `http://localhost:3000`. You do not need a dev server running. Tests
run against the **production build** on purpose: `next dev` injects the dev overlay
and compiles on first request, which shifts both layout and timing.

If a server is already on port 3000 it gets reused locally. Note that a stale
`next start` renames its process to `next-server`, so `pkill -f "next start"` will
not find it. Use `pkill -f next-server` and confirm with
`lsof -nP -iTCP:3000 -sTCP:LISTEN`.

## CMS_URL is required

The suite runs against a production build, and `generateStaticParams` in
`/projekte/[slug]` and `/ressourcen/[slug]` fetches the CMS at build time.
`src/lib/cms.ts` rethrows on a failed fetch, so **the build hard-fails when the
CMS is unreachable** — it does not degrade to an empty list.

Locally that comes from `.env.local` (gitignored). In CI it comes from the
`CMS_URL` repository secret. Without it, `.github/workflows/test.yml` fails at the
build step with `Failed to collect page data for /ressourcen/[slug]`.

## Layers

| Layer | Present | Where |
|---|---|---|
| Unit | no, by design | — |
| Integration | no, by design | — |
| E2E / visual regression | yes | `e2e/` |

## What is covered

**`e2e/client-logos-above-fold.spec.ts`** — the client-logo strip must be fully
visible in the opening viewport across six desktop resolutions, with no scroll. It
asserts both halves of that: the `FadeIn` wrapper carries `.visible` on load, and
the logo tile plus its image clear the fold geometrically. A separate test asserts
that below-the-fold blocks are still hidden at load, so a future "fix" cannot make
everything visible at once and quietly delete the scroll animation.

**`e2e/typography.spec.ts`** — every page must use Swiss guillemets `«…»` and must
contain no straight ASCII quotes, no German low quotes `„`, and no curly `"` in
rendered prose. Guillemets must be balanced.

## Conventions

- Test files live in `e2e/` and are named `<feature>.spec.ts`.
- Assert on real behaviour, never `toBeDefined()`. Measure what the user sees:
  bounding boxes, computed styles, rendered text.
- Parameterise across viewports with a `for` loop over a const array rather than
  duplicating test bodies.
- Comment *why* a test exists, especially when it guards a specific past bug.
- Never import secrets or API keys into a test.

## Adding tests

- New function → write a test for it.
- Bug fix → write the regression test **first**, confirm it fails against the
  unfixed code, then fix. A regression test that passes before the fix is worthless.
- New conditional → cover both branches.
- Never commit code that makes an existing test fail.
