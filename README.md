# NOYRIS — Landing Page

A premium, animation-rich landing page for NOYRIS built as a proper Vite + React + Tailwind project (not a single-file snippet).

## Stack

- **React 18** + **Vite** — fast dev server, optimized production build
- **Tailwind CSS** — design tokens (colors, fonts, keyframes) defined in `tailwind.config.js`
- **lucide-react** — icon set

## Project structure

```
src/
  assets/            hero photography (hill1.jpg, hill2.jpg)
  hooks/
    useReveal.js         scroll-triggered entrance animations
    useTypewriter.js     cycling text in the hero input
    useCountUp.js        animated stat numbers
    useSectionProgress.js  scroll-linked progress (drives the timeline line draw)
    useParallax.js        rAF-throttled parallax for hero/CTA photography
    useScrollProgress.js  page-wide scroll % for the top progress bar
  components/
    ScrollProgressBar.jsx
    Nav.jsx              crossfades white → black as you scroll off the hero photo
    Hero.jsx             parallax + Ken Burns photo, ghost icons, typewriter CTA
    BrowserMockup.jsx     dark app mockup with live count-up stats
    Marquee.jsx           infinite-scroll ticker of blocked domains
    ChannelCards.jsx       the three blocking surfaces, hover-zoom photo cards
    Capabilities.jsx       editorial alternating rows with ambient blobs
    RuleTypes.jsx          staggered slide-in rule-type table
    HowItWorks.jsx         numbered steps with a scroll-drawn connecting line
    Privacy.jsx
    FinalCTA.jsx
    Footer.jsx
    Reveal.jsx             shared scroll-reveal wrapper (up/left/right/scale)
    MagneticButton.jsx     cursor-following magnetic hover + shine sweep
  App.jsx
  main.jsx
  index.css
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Notes

- All animations respect `prefers-reduced-motion` (see the media query at the bottom of `index.css`).
- The hero and final CTA photography live in `src/assets/` and are imported normally (Vite handles bundling/hashing) — swap them for higher-resolution originals any time.
- Brand tokens (ink, paper, mist, lime, etc.) are centralized in `tailwind.config.js` — change them there to re-theme the whole site.
