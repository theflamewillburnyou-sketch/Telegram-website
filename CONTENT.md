# Midnight Society — Production copy, wireframes & image prompts

## A) SEO

**Title (41 chars):** Midnight Society | Curated Market Alerts

**Meta (≤155):** Join Midnight Society for AI-filtered stock, crypto & commodities alerts. Major moves only—signal over noise. Join free on Telegram.

**Primary keywords:** market news telegram · stock crypto commodities alerts · curated market signals · midnight society

---

## A) Page copy

### 1. Hero
- **Brand:** Midnight Society
- **H1:** Major market moves. Nothing else.
- **Support:** A quieter Telegram channel for people who choose signal over noise across stocks, crypto, and commodities.
- **Primary CTA:** Join the Channel on Telegram → https://t.me/MidnightMarkets
- **Secondary:** Open the bot for preferences → https://t.me/MidnightSocietyNewsBot
- **Proof line:** Major alerts only · AI-filtered · Growing member base

### 2. Problem
- **H2:** Endless feeds steal your edge
- Market news never stops. Most Telegram channels and timelines reward volume: headlines stacked on headlines until attention frays and real moves get buried. Information overload is not more intelligence—it is less clarity.
- If your edge depends on noticing what matters, noise is the tax you cannot afford.

### 3. Solution / What you get
- **H2:** A signal filter for major alerts only
- Midnight Society is market news on Telegram without the theater. We post curated market signals when stocks, crypto, or commodities make a move worth your attention—then we stay quiet.
- **Major moves** — Alerts reserved for material events—not routine chatter.
- **Cross-asset coverage** — Stocks, crypto, and commodities in one calm channel.
- **AI-filtered clarity** — Noise screened out so belonging feels selective, not loud.

### 4. How it works
- **H2:** Three steps. One quieter room.
1. Join the channel — Open Midnight Society on Telegram and join. One decision. Immediate access.
2. Optional: start the bot — Set preferences so alerts better match the markets you watch.
3. Get curated alerts — Receive major-move posts when they clear the filter—then enjoy the quiet.

### 5. Who it’s for
- **H2:** People who choose signal over noise
- Midnight Society is for those who take pride in a sharper room—not a louder one.
- Operators who treat attention as capital
- Investors who want major moves without the circus
- Builders who check markets, then get back to work
- Anyone proud to be selective with what they read

### 6. Trust strip
Transparent filtering. No spam theater. Not financial advice—curated market information for awareness only. Always do your own research.

### 7. Final CTA
- **H2:** Join the quieter room
- Free to join. Telegram required. Curated alerts—not another noisy feed. One clear action.
- CTA + bot link repeated

### 8. FAQ
See `src/lib/site.ts` (schema-ready Q&As on page).

---

## B) Wireframes (per section)

1. **Hero** — Full-bleed night skyline; brand largest; H1 below; one sentence; gold primary button + text bot link; proof chips under CTA; no cards.
2. **Problem** — Two-column: copy left, signal-vs-noise image right; single H2 + two paragraphs.
3. **Solution** — Full-width band; H2 + intro; three hairline-top columns (not cards).
4. **How it works** — Wide strip illustration; numbered 01–03 row beneath.
5. **Who it’s for** — Image left / identity list right (stack on mobile).
6. **Trust** — Narrow centered disclaimer strip.
7. **Final CTA** — Centered band; soft gold radial; button thumb-reachable.
8. **FAQ** — Accordion list; FAQPage JSON-LD.

---

## C) Image generation prompts

### 1. Hero background (16:9 + 1:1 crop)
**Subject:** Nocturnal financial district skyline after market close; quiet empty wet streets; sparse warm office lights.  
**Mood:** Quiet confidence, exclusive calm.  
**Lighting:** Soft gold window glow against deep navy/charcoal sky; subtle fog.  
**Palette:** Midnight navy, charcoal, soft gold accents.  
**Composition:** Wide cinematic; dark negative space in lower third for text.  
**Negative:** no logos, no unreadable fake text, no purple neon, no crowded trading floor, no people, no crypto symbols, no tickers.  
**Variants:** 16:9 hero; 1:1 center-crop for mobile story.

### 2. Signal vs noise (16:9 + 1:1)
**Subject:** Split conceptual — chaotic blurred headline streams left; single sharp gold vertical light beam right.  
**Mood:** Clarity cutting through overload.  
**Lighting:** Dim fog left; focused gold beam right.  
**Palette:** Charcoal, slate gray, soft gold.  
**Composition:** Vertical split, editorial grain.  
**Negative:** no logos, no readable fake text, no purple neon, no trading-floor chaos, no faces.  
**Variants:** 16:9 section; 1:1 for ads.

### 3. How-it-works strip (16:9 + 1:1)
**Subject:** Three minimal framed scenes on navy: phone joining channel → preference dials → single clean alert card.  
**Mood:** Minimal, premium, process clarity.  
**Lighting:** Soft gold accents on dark field.  
**Palette:** Navy, charcoal, gold linework.  
**Composition:** Horizontal three-panel with thin gold connectors.  
**Negative:** no logos, no unreadable UI text, no purple neon, no emoji, no crowded dashboards.  
**Variants:** 16:9 (or 21:9) strip; 1:1 stacked for mobile.

### 4. Identity lifestyle (16:9 + 1:1)
**Subject:** Young professional at night desk, face not required/visible; laptop soft glow; city window.  
**Mood:** Serious, selective, after-hours focus.  
**Lighting:** Soft gold desk lamp; cool city lights.  
**Palette:** Navy room, gold lamp, warm screen.  
**Composition:** Over-shoulder or three-quarter rear; shallow DOF.  
**Negative:** no face obligatory, no logos, no readable screen text, no purple neon, no trading-floor chaos.  
**Variants:** 16:9 landscape; 1:1 portrait crop.

### 5. Open Graph 1200×630
**Subject:** Midnight navy field with distant city silhouette; soft gold hairline; empty center for brand overlay.  
**Mood:** Premium quiet finance.  
**Lighting:** Atmospheric fog; sparse window lights.  
**Palette:** Navy, charcoal, soft gold.  
**Composition:** 1.91:1 social card; center safe zone.  
**Negative:** no logos baked-in, no fake text, no purple neon, no crypto icons, no people.

---

## CTA targets
- Primary: https://t.me/MidnightMarkets
- Bot: https://t.me/MidnightSocietyNewsBot
