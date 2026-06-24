# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.0] - 2026-06-24

### Changed
- **Reworked the Results section into two redesign case studies** — a PPT deck rebuild and a poster rework — each a before/after compare slider with its own aspect ratio (no cropping), a description, and design-decision tags. The WMS projects moved to a one-line mention in the Experience timeline. Section/nav relabelled to "改造案例 / Redesigns" and "作品 / Work".
- Hero / Skills / Footer copy trimmed: removed the kicker location line, the gravity hint, and the footer direction label; skill chips now lead with AI Workflow and English.

### Added
- `Compare` now accepts a configurable `aspect` ratio (lets the landscape deck and portrait poster each render uncropped). Slide assets extracted from the case-page PDF via PyMuPDF; all case images optimized to WebP.

### Fixed
- **Theme flicker / React 19 console error**: removed `next-themes` (its client-rendered `<script>` triggers a React 19 "script tag while rendering" warning) in favour of an inline anti-flash script in the root-layout `<head>` plus a CSS-icon toggle button.

## [2.0.0] - 2026-06-16

### Changed
- **Complete redesign — "Magnetic Field" direction.** Replaced the Anthropic warm/parchment theme with a neo-brutalist magenta system (Space Grotesk / Noto Sans SC / JetBrains Mono, hard offset shadows, full-pill borders, dark default → now light). Collapsed to a single scrolling page: magnetic Hero, Results, skill chips, orbit Experience, Contact.
- **Real résumé content** in both `zh`/`en` dictionaries (technical-support & WMS-implementation profile), replacing all placeholder copy.

### Added
- **Cursor-driven physics**: headline characters repel from the cursor and spring back; "gravity" easter-egg; magnetic skill chips / social links / mail button; 3D-tilt result cards. Ported to React hooks (`useMagnetic`, `useTilt`) with a shared `RevealManager`.
- **Before/After compare slider** (drag / keyboard / buttons, nudge-on-view) with real project screenshots (Babypark, Honda · Kawasaki); `babypark_after` optimized to WebP.
- Per-locale **résumé PDF download** in the Hero (`/resume-zh.pdf`, `/resume-en.pdf`).
- Full `prefers-reduced-motion` fallback.
- **CI**: GitHub Actions workflow running `next build` on push/PR to `main`.

### Removed
- Old sections/components (About, Skills cards, sticky-scroll runway, ScrollIndicator, Illustrations, SmoothScroll) and the standalone `/contact` route — now folded into the single page.

## [1.1.0] - 2026-04-21

### Added
- **Dynamic Anthropic-style Logo**: The top-left logo in the `Navbar` now initially shows the full text ("ilovelappland"), and gracefully collapses into a Wolf SVG icon with a polished transition when scrolling down.
- **Complete i18n implementation**: The entire site (Hero, About, Experience, Skills, Footer, Contact) now fully supports dynamic English and Chinese switching via Next.js middleware and dictionaries structure.
- **Google Analytics Integration**: Setup `@next/third-parties` GA4 component allowing standard measurement tracking via `NEXT_PUBLIC_GA_ID` in `.env.local`.

### Changed
- **Dark Mode Aesthetic Refinement**: Updated dark mode background from pure jet black (`#141413`) to a softer, more modern deep navy tone (`#1a1a2e`). Increased the contrast of card borders and card backgrounds to feel more premium and modern.
- **Theme Guarding**: Removed restrictive client-side `mounted` guards resulting in cleaner component structures relying on Next.js native `suppressHydrationWarning`.

### Fixed
- **Dark Mode Button Invisibility**: Fixed a CSS bug where "Contact Me" and "Download Resume" buttons became invisible in dark mode due to matching background colors. The buttons now properly switch off to a custom accent color in Dark Mode.
- **Hydration Mismatches**: Fixed several console errors previously triggered by third-party scripts rendering conditionally in SSR.

## [1.0.0] - Initial Release
### Added
- Setup personal developer portfolio using Next.js 15, React 19, and CSS Modules.
- Implemented core sections: Hero, About, Experience, Skills.
- Formulated modern, minimal, aesthetic user interface using a bespoke design token system (`globals.css`).
