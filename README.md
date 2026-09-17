# wsuakpsi-landing

Static information site for wsuakpsi.org — hero, about, core values, event
pillars, rush process, leadership, FAQ, and contact — with portal links in
the nav. The Eboard and Brother portals are hosted separately in the
`akpsi-portal` repo.

## Structure

- `index.html` — the page
- `style.css` — styling
- `site.js` — parallax, scroll-reveal, counters, mobile nav, footer year (kept external so the page's CSP can disallow inline scripts)
- `logo.jpg` — the chapter logo (same file the portals use)
- `fonts/` — self-hosted Fraunces (display serif) and Instrument Sans (body), variable woff2. Self-hosted so the CSP can stay `font-src 'self'`.

## Design vocabulary

Sharp 0px corners, no drop shadows, high-contrast colour blocks and
overlapping layers. Navy monochrome (`--navy-0` … `--navy-3`) with one
accent, rose gold (`--rose`). One light "paper" block for the values list.
Film grain + fine grid + large asymmetric ambient lights for atmosphere.
The only animation is the page-load sequence on the hero and nav
(`.load` / `.is-loaded`); nothing fades in on scroll. Parallax on the
`[data-parallax]` layers only.

## Content to keep current

- Rush dates: the "Fall & Spring rush dates" box in `index.html` points people to Instagram / email. Update the copy each semester if you want dates on the page.
- Contact: `mailto:wsuakpsi15@gmail.com` and `https://www.instagram.com/wsuakpsi` — change both in the Contact section if the chapter's handles change.
- Leadership: positions only, no names, so it never goes stale. Add names if you want, they're plain HTML in the `#leadership` section.

## Portal links

- Eboard Portal: https://eboard.wsuakpsi.com
- Brother Portal: https://brother.wsuakpsi.com

## Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy

Static site — deploy to any static host (Vercel, Netlify, GitHub Pages, S3, etc.)
by pointing it at this directory. No build step required.
