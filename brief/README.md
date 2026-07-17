# Handoff: NUSE Club Digital Business Card (Linktree-style)

## Overview
A single-page mobile "digital business card" for the NUSE club (Naresuan University Student Entrepreneur) — like Linktree. Shows the club logo, name, short intro, a primary CTA to join the club (Google Form), a secondary link about board-member recruitment, social links (Facebook / Instagram / TikTok), and a small photo gallery. Target stack: **Nuxt**, deployed on **Vercel**.

## About the Design Files
The bundled `NUSE Card.dc.html` is a **design reference built in HTML** — a high-fidelity prototype of look, motion, and copy, not production code to copy verbatim. Recreate this design as a proper Nuxt page/component using Vue SFCs, scoped/module CSS (or Tailwind if the project uses it), and Nuxt's asset/image handling — do not just embed the HTML file. Since there's no existing Nuxt codebase yet, choose sensible conventions (composition API, `<script setup>`, a couple of small components) and keep it simple — this is a one-page site.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, and animation are final for the chosen direction (option **3a**, "DIY scrapbook" style — see the `#t3`/`#3a` section in the HTML file, the last one added). Ignore the other explored options in the file (`#t1`, `#t2` and their sub-options `1a/1b/1c/2a`) — they're earlier iterations kept for history, not to be built.

## Screen: Club Card (single view)
Purpose: club visitor lands here, reads a one-line intro, taps to join via Google Form, optionally taps through to board-recruitment info, and follows the club's socials.

### Layout
- Single column, mobile-first, centered content, max content width ~340px (design fine at ~375–414px viewport, i.e. typical phone width). No fixed device frame — build as a normal responsive page that centers this column with some vertical padding on wider (desktop) viewports.
- Background: soft diagonal gradient, warm peach → cream → pale blue → cream (`linear-gradient(160deg, #fef3e8 0%, #f7f2e8 35%, #eaf1fb 70%, #f7f2e8 100%)`), overlaid with a very subtle dot-grid texture (radial-gradient dots, `rgba(18,24,74,.06)`, 1px dot, 14px grid).
- Decorative rotated color blocks (soft orange circle, light-blue rounded square, navy rounded square) positioned absolutely near the corners at low opacity (0.1–0.55) for depth — purely decorative, no interaction.
- A few small "confetti" dots (orange/navy/light-blue, 8–11px, rounded square or circle) scattered near the top and lower-middle, gently floating/rotating (see Animations).

### Vertical structure (top → bottom)
1. **Cover photo** — full-width rounded rect (radius 10px), height ~132px, with a diagonal color overlay (orange → transparent → navy, `linear-gradient(120deg, rgba(232,98,12,.30) 0%, transparent 55%, rgba(18,24,74,.35) 100%)`) on top of the photo. Two small rotated "washi tape" rectangles (54×22px, light-blue and orange, ~85% opacity, rotated -8°/+9°) sit at the top-left/top-right corners, straddling the cover's top edge, to look taped down.
2. **Avatar / logo** — circular, 96px, white background with 6px padding around the club logo image (`nuse-logo.png`), positioned overlapping the bottom of the cover photo (pulled up ~40px), centered horizontally. A dashed navy ring (2.5px dashed, 50% opacity) sits just outside it and slowly rotates side to side. A small rounded "sticker" badge reading "รุ่นที่ 1 ✦" (orange bg, white text, Mali font 700 10.5px) sits at the bottom-right of the avatar, rotated -8°, with a hard offset shadow, gently wiggling.
3. **Title block**, centered:
   - "NUSE" — Noto Serif Thai, 700, 36px, color `#12184a`.
   - A short hand-drawn-style squiggle underline (simple SVG wave path, orange stroke `#e8620c`, 2.4px, ~90×12px) directly under the title.
   - "ชมรมผู้ประกอบการรุ่นเยาว์" — Sarabun 600, 14px, `#12184a`.
   - "Naresuan University Student Entrepreneur" — Sarabun 500, 9.5px, uppercase, letter-spacing 1.5px, `rgba(18,24,74,.45)`.
   - Intro paragraph (Sarabun 400, 14px/1.6, `rgba(18,24,74,.75)`, centered, max-width 270px): "ยินดีต้อนรับสู่ NUSE รุ่นที่ 1 คุณสามารถร่วมสร้างอนาคตของชมรมไปรับเราได้ที่นี่!"
4. **Primary CTA button** — full width, link to the Google Form. Padding 15px, border-radius 14px, text "สมัครเข้าชมรม ✎", Sarabun 700 15px, white text. Background: orange gradient `linear-gradient(120deg, #e8620c 0%, #f2954f 60%, #e8620c 100%)`. Border 2.5px solid `#12184a`. Hard offset shadow `4px 4px 0 #12184a` (no blur — pop-art style). Slight rotation -0.6°.
5. **Secondary text link** (board-member recruitment) — plain text, no background/pill: "🖇 เปิดรับสมัครบอร์ดบริหาร · ดูรายละเอียดในกลุ่ม", Mali 600 12px, color `#12184a`, dashed underline (`border-bottom: 1.5px dashed rgba(18,24,74,.4)`), links to the **same Google Form** (the form contains the club-group invite link where full recruitment details are posted).
6. **Divider** — "ติดตามเรา" (Mali 600 12px, `#12184a`) centered between two dashed horizontal rules (`repeating-linear-gradient` dash pattern, `rgba(18,24,74,.3)`).
7. **Social row** — 3 circular icon buttons, 48px, gap 16px, each rotated a few degrees (-6°/+5°/-4°) with a small hard offset shadow (3px 3px 0, tinted to match bg): Facebook (navy bg `#12184a`) and TikTok (navy bg) icons white; Instagram (orange bg `#e8620c`) icon white outline. Link to the three real profile URLs (see Assets).
8. **Photo gallery** — heading "📌 คลังภาพกิจกรรม" (Mali 700 13px, `#12184a`, rotated -1°). Row of 3 "polaroid" cards: white background, padding 8px/8px/12px (bottom heavier), each holding an 82×82px square photo plus a small handwritten-style caption below it (Mali 600 9.5px, `#12184a`: "แคมป์ #1", "Workshop", "Meetup" — placeholder captions, swap for real photos/captions). Cards rotated -5°/+4°/-3° with hard offset shadows tinted navy/orange/navy, middle card offset down 10px for a scattered look.

### Animations
- **Confetti dots**: float + rotate loop, `translateY(0→-8px→0)` + `rotate(0→12deg→0)`, 6–8s ease-in-out infinite, staggered delays (0s/0.5s/1s/1.4s).
- **Dashed avatar ring**: gentle rotate wiggle, `rotate(-4deg → 4deg)`, 9s ease-in-out infinite.
- **"รุ่นที่ 1" sticker**: wiggle, `rotate(6deg → -2deg)`, 7s ease-in-out infinite.
- No hover/focus states beyond default link color changes — this is a static mobile card, not an app; standard `:hover`/`:focus-visible` affordances on links/buttons are still expected for accessibility (underline or slight opacity change).

## State Management
None — fully static content page. No client-side state, forms, or data fetching needed. All CTAs are plain outbound links (`<a href>` / `target="_blank" rel="noopener"` recommended for external links).

## Design Tokens
- **Colors**: orange `#e8620c` (brand primary/accent), navy `#12184a` (brand ink/secondary), light blue `#9dc4f0` and pale blue `#dbe9fb` (brand tertiary, from the club's existing identity guideline), cream/background `#f7f2e8` / `#fef3e8` / `#eaf1fb`.
- **Typography**: "Noto Serif Thai" (weights 500/600/700) for the wordmark/headline; "Sarabun" (400/500/600/700) for body and buttons; "Mali" (500/600/700) for playful/handwritten accents (captions, stickers, dividers, secondary link). All loaded from Google Fonts.
- **Radius**: 10px (cover photo), 14px (CTA button), 999px (pill/circle elements).
- **Shadows**: hard offset shadows only (no blur) for the pop-art/DIY feel, e.g. `4px 4px 0 #12184a`, `3px 3px 0 rgba(...)`, `2px 2px 0 rgba(...)`.

## Assets
- `assets/nuse-logo.png` — club logo (arrow mark + "NUSE" wordmark + Thai/English subtitle), cropped from the club's Corporate Identity Guidelines sheet. Used at small size inside a circular avatar with `object-fit: contain` on a white background (the source file is a wide horizontal lockup, not pre-cropped to a mark — don't crop it into a circle photo-style, it clips the wordmark).
- **Cover photo** and the **3 gallery photos** are currently placeholders (drag-and-drop image slots in the prototype) — swap for real club event photos before shipping.
- **Real links to wire up**:
  - Join form (primary CTA + board-recruitment link): `https://forms.gle/MY1fv81Xjja41Kbh6`
  - Facebook: `https://www.facebook.com/profile.php?id=61587395073703`
  - Instagram: `https://www.instagram.com/nuse_club/`
  - TikTok: `https://www.tiktok.com/@nuse.club`
- Social icons are simple inline SVG paths (Facebook "f" glyph, Instagram rounded-square+circle, TikTok note mark) — recreate as SVG components or swap for an icon library already used in the target codebase.

## Files
- `NUSE Card.dc.html` — full design-exploration file. **Only build the section with `id="3a"` inside `<section id="t3">`** — the rest is earlier iteration history, kept for context only.
- `assets/nuse-logo.png` — club logo crop described above.
