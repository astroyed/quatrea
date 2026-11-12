# Quatrea
Run: `npm install` then `npm run dev`.

- `src/data.js` – all copy, colours, photos, prices, particle type per season (edit here first)
- `src/engine.js` – one animation loop: theme colour blending + mouse tilt
- `src/hooks.js` – `useFrame`, `useInView`, `useRouter` (hash routing + circular wipe)
- `src/components/` – Home (scrollytelling), Season, Atelier, Particles, Nav, Frame, RevealText
- `src/styles.css` – all styling, driven by CSS variables (--bg --ink --ac --l1 --l2)
- `public/images/` – replace the four photos (keep names, or change paths in data.js)
