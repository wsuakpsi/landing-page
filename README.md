# wsuakpsi-landing

Basic static landing page for wsuakpsi.org. Links out to the Eboard Portal
and Brother Portal (hosted separately in the `akpsi-portal` repo).

## Structure

- `index.html` — the page
- `style.css` — styling
- `logo.svg` — placeholder logo, swap for the real chapter logo

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
