# NOYRIS Landing Page — Comprehensive Documentation

This document provides a complete technical and structural overview of the **NOYRIS** landing page application located at `/Users/dipendramule/Downloads/executionmvp-main/landingpage`.

---

## 1. Project Overview & Architecture

NOYRIS is a premium, animation-rich, responsive landing page built for a macOS focus and distraction-blocking application. Unlike simple single-file templates, it is structured as a professional, modular **Vite + React + Tailwind CSS** single-page application.

### Key Technology Stack
- **Framework:** React 18 with Vite (fast dev server, optimized production build).
- **Styling:** Tailwind CSS with centralized design tokens defined in `tailwind.config.js` (custom color tokens like `paper`, `ink`, `navy`, `mist`, `brand`, `lime`, `brandblue`, etc., alongside custom animations like `kenBurns`, `ghostDrift`, `drift`, `blobFloat`, `cursorBlink`).
- **Icons:** `lucide-react`.
- **Interactivity & Animation:** Custom React hooks for scroll progress, parallax motion, typewriter effects, number count-ups, and Intersection Observer-driven reveals (`useReveal`).

---

## 2. Project Directory Structure

```
src/
  assets/            # Hero & section photography (hill1.jpg, hill2.jpg)
  hooks/
    useReveal.js         # Scroll-triggered entrance animations (up/left/right/scale)
    useTypewriter.js     # Cycling text animation in the hero search input
    useCountUp.js        # Animated numeric count-up stats
    useSectionProgress.js  # Scroll-linked progress for timeline drawing
    useParallax.js        # rAF-throttled parallax scroll effect for background photos
    useScrollProgress.js  # Page-wide scroll percentage for the top progress bar
  components/
    ScrollProgressBar.jsx # Thin top progress bar reflecting page scroll depth
    Nav.jsx              # Sticky header with dynamic color crossfade on scroll
    Hero.jsx             # Parallax photography, Ken Burns effect, ghost icons, typewriter CTA
    BrowserMockup.jsx    # Dark desktop app widget with live count-up stats and categories
    Marquee.jsx          # Infinite horizontal ticker of blocked domains/topics
    ChannelCards.jsx     # Three blocking surfaces with hover-zoom photo cards
    Capabilities.jsx     # Editorial alternating rows with ambient glowing blobs
    RuleTypes.jsx        # Staggered slide-in rule-type reference table
    CoinsRewards.jsx     # Gamified focus section detailing coin earnings and quit protection
    HowItWorks.jsx       # Numbered step timeline with scroll-drawn connecting line
    PhotoBand.jsx        # Parallax divider banner with atmospheric quote
    KidsAndPrivacy.jsx   # Kids Mode enforcement and local SQLite privacy details
    Privacy.jsx          # Dedicated privacy commitment card grid
    Pricing.jsx          # Lifetime license pricing card ($29 one-time, no subscription)
    FinalCTA.jsx         # Bottom conversion CTA with parallax hills and download buttons
    Footer.jsx           # Clean footer with logo, copyright, and quick links
    Reveal.jsx           # Shared scroll-reveal wrapper component
    MagneticButton.jsx   # Cursor-following magnetic hover button with shine sweep
    NoyrisLogo.jsx       # SVG brand logo icon
  App.jsx                # Root component assembling all sections in sequential order
  main.jsx               # React DOM entry point
  index.css              # Global styles, Tailwind directives, custom keyframes & reduced-motion rules
```

---

## 3. Detailed Section-by-Section Breakdown

### 3.1. Scroll Progress Bar (`ScrollProgressBar.jsx`)
- **Position:** Fixed at the very top of the viewport (`top-0 z-50`).
- **Function:** Tracks overall page scroll percentage (`useScrollProgress`) and renders a bright lime/brand accent bar that grows horizontally as the user scrolls down the page.

### 3.2. Navigation Bar (`Nav.jsx`)
- **Behavior:** Fixed header (`fixed inset-x-0 top-0 z-50`).
- **Dynamic Styling:** Crossfades from transparent background (with white text and links) over the hero photo to a blurred frosted glass surface (`bg-paper/85 backdrop-blur-xl border-b border-brandblue/40`) with dark ink text once the user scrolls past the hero section.
- **Content:**
  - Brand Logo & Title (`NOYRIS`).
  - Anchor Navigation Links: Product (`#capabilities`), Blocking (`#blocking`), How it works (`#how`), Pricing (`#pricing`), Privacy (`#privacy`).
  - Call to Action: Magnetic "Get started" button linking to `#download`.

### 3.3. Hero Section (`Hero.jsx`)
- **Visuals:** Immersive full-width hero featuring a parallax-enabled (`useParallax`), Ken Burns animated misty green hills photography background (`hill1.jpg`), overlaid with a cinematic atmospheric color gradient and valey fog band.
- **Ghost Icons:** Floating ambient background icons (`Youtube`, `Instagram`, `Music2`, `Hash`) with gentle CSS drift animations.
- **Headline:** *"Stay focused. Automatically."*
- **Interactive Search Input:** Utilizes `useTypewriter` to cycle through realistic blocking examples (`youtube.com/shorts/*`, `instagram.com/reels`, `"trading, crypto"` topic, `@shortformchannel`, `reddit.com/r/all`) with a blinking cursor.
- **Subcopy:** Explains blocking capabilities and local execution.
- **CTAs:** "Get Started" and "See how it works" buttons.
- **Embedded Component:** Renders the `BrowserMockup` widget floating below the headline.

### 3.4. Browser Mockup Widget (`BrowserMockup.jsx`)
- **Design:** Dark-themed macOS window container with window controls (red, yellow, green dots), address bar (`noyris.app`), and subtle borders.
- **Content:**
  - Active session indicator ("Deep Work — API refactor", live pulsing badge).
  - Stat counters using `useCountUp`: **23** Blocked, **12** Active rules, **6** Topics, **48** Coins earned.
  - Category breakdown grid: Social Media, Video & Streaming, Gaming with volume indicators.

### 3.5. Marquee Ticker (`Marquee.jsx`)
- **Design:** Infinite horizontal CSS drift ticker (`animate-drift`).
- **Content:** Scrolling items with icons for YouTube Shorts, Instagram Reels, TikTok, X (Twitter), Twitch, Reddit, and custom topics (`"trading & crypto"`).

### 3.6. Channel Cards (`ChannelCards.jsx`)
- **Heading:** *"Distraction got smarter. Has your blocker?"*
- **Concept:** Highlights that modern feeds find users dynamically, requiring advanced blocking surfaces rather than static domain blocking.
- **Cards (with hover-zoom photography):**
  1. *Sites & apps:* Whole domain, paths, native app bundle IDs.
  2. *Topics & keywords:* 155 curated topics across 27 categories matched against titles, URLs, and search queries.
  3. *Scheduled focus:* Recurring missions across the week without manual toggling.

### 3.7. Capabilities / The Toolkit (`Capabilities.jsx`)
- **Design:** Editorial alternating two-column layout with ambient glowing floating background blobs (`animate-blobFloat`).
- **Capabilities Detailed:**
  - `01 · sessions`: Focus sessions with countdown/stopwatch, hold-to-quit protection, and coin earning.
  - `02 · blocking`: Granular rule matching (domain, URL pattern, app, YouTube channel, topic).
  - `03 · review`: On-device hourly breakdowns, monthly streak heatmaps, and live session feeds.

### 3.8. Rule Types (`RuleTypes.jsx`)
- **Concept:** Granular rule reference table demonstrating precision matching.
- **Table Rows:**
  - **Domain:** `youtube.com` (blocks every subdomain too).
  - **URL pattern:** `youtube.com/shorts/*` (prefix & wildcard matching).
  - **App:** `com.tinyspeck.slackmacgap` (bundle ID or display name).
  - **YouTube channel:** `@mkbhd` (handle or channel ID, block-first).
  - **Topic:** `“anime, gaming, crypto…”` (keyword + phrase matching).

### 3.9. Coins & Rewards / Gamified Focus (`CoinsRewards.jsx`)
- **Concept:** Gamifying discipline and preventing accidental procrastination.
- **Cards:**
  - *Coin Earnings & Streaks:* Accumulating tokens as focus minutes and milestones are logged.
  - *Quit Protection Overlay:* Minimizing to tray instead of quitting; requires a deliberate hold-to-confirm gesture to exit active sessions.

### 3.10. How It Works (`HowItWorks.jsx`)
- **Concept:** Step-by-step timeline of the block decision engine, powered by `useSectionProgress` which draws a vertical progress line down the steps as the user scrolls.
- **Steps:**
  1. *You open a tab or app:* Foreground app & active tab monitoring.
  2. *The rule engine checks it:* Session rules, channel rules, allow/block lists evaluated in order.
  3. *A match stops it cold:* Full-screen overlay naming the triggering rule before page load.
  4. *No match, no interruption:* Logged quietly in the background.
  5. *It shows up in Review:* Local history review with zero cloud upload.

### 3.11. Photo Band (`PhotoBand.jsx`)
- **Design:** Full-width parallax photographic divider (`hill1.jpg`) with gradient atmospheric overlays.
- **Quote:** *"Focus is the whole point — everything else is just a rule."*

### 3.12. Kids Mode & Local Privacy (`KidsAndPrivacy.jsx`)
- **Concept:** Parental control and strict offline architecture.
- **Cards:**
  - *Kids Mode & Strict Enforcement:* Instant silent close on unauthorized apps/websites with 1.5s background polling and PIN/admin bypass protection.
  - *Local SQLite Database:* All logs, schedules, and coins reside in a local `noyris.db` file with zero data collection or ad tracking.

### 3.13. Privacy Commitment (`Privacy.jsx`)
- **Design:** Rounded card grid with ambient blob lighting.
- **Core Pillars:**
  - *Local-only storage:* Encrypted-at-rest SQLite file on disk.
  - *No keylogging:* Reads foreground app, window title, and tab domain only—never keystrokes.
  - *You grant access:* macOS Accessibility permissions explained and revocable anytime.

### 3.14. Pricing (`Pricing.jsx`)
- **Design:** Dark navy card container (`bg-navy`) with glowing ambient backlights and a highlighted badge.
- **Model:** One-time payment, no subscription.
- **Price:** **$29** for a lifetime macOS license (includes all future updates, one license per Mac, 3 days offline capability).
- **Feature Checklist:** Covers app/site/channel blocking, scheduled focus, Kids Mode, review analytics, and lifetime macOS updates.

### 3.15. Final Call to Action (`FinalCTA.jsx`)
- **Design:** Parallax hill photography background (`hill2.jpg`) with a deep blue gradient fade.
- **Headline:** *"Give your afternoon back its door."*
- **Action Buttons:** "Download for Mac" (Primary magnetic CTA) and "Notify me for Windows" (Secondary option).

### 3.16. Footer (`Footer.jsx`)
- **Content:** NOYRIS brand logo, copyright notice (`© 2026 NOYRIS Inc. All rights reserved.`), and quick anchor links to Product, Privacy, and How it works.

---

## 4. Custom Hooks Summary

| Hook Name | Purpose |
| :--- | :--- |
| `useReveal.js` | Uses `IntersectionObserver` to trigger smooth CSS transition classes (`translateY`, `opacity`, `scale`) when elements enter the viewport. |
| `useTypewriter.js` | Cycles through array items character-by-character with realistic typing and deleting delays for the hero search input. |
| `useCountUp.js` | Animates numeric statistics from 0 to target values when scrolled into view. |
| `useSectionProgress.js` | Measures scroll position relative to a section DOM element to drive SVG/CSS line drawing animations (used in the How It Works timeline). |
| `useParallax.js` | Applies a smooth rAF-throttled transform translation to background imagery based on window scroll offset. |
| `useScrollProgress.js` | Calculates total page scroll percentage (`0.0` to `1.0`) to drive the top progress bar. |

---

## 5. Development & Build Commands

To run or build the landing page locally:

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:5173)
npm run dev

# Generate production build in dist/
npm run build

# Preview production build locally
npm run preview
```
