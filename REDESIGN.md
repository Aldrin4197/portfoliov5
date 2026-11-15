# Portfolio redesign

A Vue portfolio with a handheld-console hero, project selector, profile, and KATHA side quest.

## Content

Seven featured projects: Aadi, Stria, Game Portfolio, Catbalogan City Esports, Color Game + Message Room (Beta), Amari’s Photobooth, and KATHA. Existing ten projects are retained under Earlier builds; career, education, credentials, and events remain in Player history.

Featured project records are in `src/App.vue`; earlier records are in `src/projects.ts`. Supplied screenshots are optimized WebP files in `public/projects/`. Amari’s and KATHA use decorative typographic covers, not screenshots or final game artwork. Only Amari’s has a supplied live URL; the other project dialogs offer an email inquiry instead of invented URLs.

The existing `src/assets/drin.dlr_CV.pdf` contains HTML, not a PDF. Request CV opens email until a valid CV is supplied. The old local-only rating form is replaced with direct contact links.

## Development

- `npm ci`
- `npm run dev`
- `npm run build` (Vue/TypeScript validation and Vite production build)

Category buttons filter the project roster; arrow keys change the selected project when the roster has focus. Project dialogs support Escape, native focus containment, and focus restoration. The explored counter lasts for the current visit. Motion respects the system reduced-motion preference.
