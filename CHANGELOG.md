# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
