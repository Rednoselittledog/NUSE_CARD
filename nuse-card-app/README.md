# NUSE Card — Nuxt App

Digital business card (Linktree-style) for the NUSE club, built from the design in
[`../brief`](../brief) (option `3a`, "DIY scrapbook" style).

## Setup

This code was written without running an installer, so dependencies aren't installed yet.
From this folder:

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:3000`).

## Structure

- `pages/index.vue` — assembles the single card page.
- `components/layout/` — `CardShell` (gradient background + centered column) and `BackgroundDecor` (blobs/confetti).
- `components/card/` — `CoverPhoto`, `AvatarLogo`, `ProfileIntro`, `CtaButtons`, `SocialLinks`, `PhotoGallery` (auto-loops over `assets/images/gallery/`), `GalleryItem`.
- `components/ui/ExpandableImage.vue` — reusable image slot used by every photo (cover + gallery). Shows a placeholder when no `src` is given, and opens a full-screen lightbox on click once a real photo is set.
- `components/icons/` — inline SVG icons for Facebook/Instagram/TikTok.
- `constants/links.ts` — the join-form URL and social links (edit here to change links).

## Adding real photos

**Cover photo** (single image): drop the file at `assets/images/cover.jpg` (or `.png`/`.webp`),
then in `pages/index.vue` import it and set `coverPhotoSrc` to it — see the `TODO` comment
there.

**Gallery photos** (any number): just drop image files into `assets/images/gallery/`. That
folder is scanned automatically (`components/card/PhotoGallery.vue` uses `import.meta.glob`),
sorted by filename, and rendered — no code changes needed. Name files so alphabetical order
matches display order (e.g. `01-camp.jpg`, `02-workshop.jpg`, `03-meetup.jpg`).

### Recommended image sizes

Photos are shown small (cover ~132px tall, gallery squares 82×82px) but the *same file* is
also shown full-size when a visitor taps to expand it, and phone screens are high-DPI — so
size for the expanded view, not the thumbnail:

| Photo | Crop / aspect ratio | Recommended min size | Notes |
|---|---|---|---|
| Cover | Landscape, ~2.6:1 | 1200×460px | Displayed with `object-fit: cover`, so anything close to this ratio gets center-cropped to fit — exact pixels don't need to match. |
| Gallery | Square, 1:1 | 800×800px | Same — center-cropped to a square if not already square. |

Keep each file roughly under ~400–500KB (export as JPEG or WebP) so the page stays fast on
mobile data.

## Not implemented

Nothing from the brief's target section (`#3a`) was skipped. The earlier design iterations in
`NUSE Card.dc.html` (`#t1`, `#t2`) were intentionally not built, per the handoff notes.
