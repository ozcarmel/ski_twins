# Ski Twins / סקי עם התאומים

Ski and snowboard travel by Liron and Oz Carmel. Destination planning guides, rental and accommodation tips, and an interactive DIY trip budget.

**Live website:** https://ozcarmel.github.io/ski_twins/

## Files

- `index.html` — Hebrew-first page shell and metadata.
- `style.css` — desktop and mobile styles.
- `app.js` — bilingual interface, destination search, guides and budget download.
- `i18n.js` — Hebrew and English interface copy.
- `articles.js`, `articles-he.js` — all nine guides and their Hebrew translations.
- `budget.mjs` — the original calculation formula and illustrative comparison inputs.
- `assets/` — local photographs and the site icon.
- `.nojekyll` — serves this static site without Jekyll processing.

The root remains a buildless static site for the existing GitHub Pages configuration. No server credentials or backend are required. All calculation happens in the visitor's browser. npm dependencies are development tools only; fonts and icons are served locally.

## Preview locally

From this directory:

```sh
python -m http.server 4173
```

Open http://localhost:4173/.

For development with live reload, use Node 22+:

```sh
npm ci
npm run dev
```

`npm test` runs checks covering budget calculations, planner isolation, sharing and generated guides. `npm run test:browser` runs the bilingual Chromium review after `npx playwright install chromium`. Pull requests run these checks in GitHub Actions and attach screenshots plus `results.json` as a review artifact. `npm run build` creates an optional static `dist/` bundle with all dynamically referenced assets. GitHub Pages can continue serving the repository root without a build change.

## Redesign review

The selected direction is **2 — The Family Winter Edit**: warm cream, plum typography, coral actions, family photography and editorial destination cards. The redesign is published on the existing GitHub Pages site. See `design-qa.md` for evidence and review screenshots.

Comparison amounts are explicitly illustrative scenarios, not current resort prices or booking offers. The default comparison uses four people, six nights and five ski days. Each scenario can be opened in the existing calculator. Georgia is marked as coming soon because the original site has no Georgia guide.

## Publish updates

GitHub Pages publishes the root directory of the `main` branch. Commit and push changes to `main`; GitHub runs the Pages build and deployment automatically. See the repository's Actions tab for progress, and Settings → Pages for the live URL.

Relative asset paths support the `/ski_twins/` project path. If the domain or repository name changes, update the canonical and social metadata in `index.html` and the downloaded-plan URL in `app.js`.

## Editorial status

Destination pages are explicitly labelled planning guides and include official sources. Firsthand reviews, named rental/accommodation recommendations and social profile URLs should be added when supplied by Liron and Oz. Do not replace these with invented ratings or visits.

Photo credits appear in the site's Privacy & photography guide. Third-party photographs retain their respective ownership; inclusion in this repository does not grant a separate licence to reuse them.

The new family hero is AI-generated editorial imagery and is not presented as a photograph of the twins or a specific resort. All original photographs remain in the repository. The twin-peaks logo reuses the supplied brand geometry. Heebo is licensed under SIL OFL and Phosphor icons under MIT; licence copies are in `assets/fonts/` and `assets/icons/`.


## Two independent holiday engines

`#alpine-planner` only includes published ski-area sizes strictly greater than 200 km. It retains three holiday bases each in Italy, Austria and France: Val Gardena/Sellaronda, Cervinia/Zermatt and Sestriere/Vialattea; Ischgl, Saalbach and St. Anton; Val Thorens, La Plagne and Les Arcs. This is an editorial selection, not a verified national top-three popularity ranking. La Plagne and Les Arcs share Paradiski and are labelled as two bases in one area.

`#value-planner` includes areas up to and including 200 km regardless of country, ordered by illustrative total cost. France, Austria, Italy and Switzerland are represented as well as Bulgaria, Romania and Georgia. Smaller does not necessarily mean cheaper: Livigno, Campiglio and Sölden now belong to this track by size. Les Contamines, Brandnertal and Grimentz–Zinal add alternatives. Both tracks serve all group types and retain independent profiles.

`resorts.mjs` owns numeric `pisteKm`, bilingual area names, size-source URLs and review dates. `engineForKm` derives classification; unknown/nonpositive sizes are not eligible. Use the accessible area covered by the proposed pass, never the sum of disconnected resorts on a regional pass. Published provider totals can use different measurement conventions and are not live open-piste counts. Livigno explicitly notes its ski-bus connection. Each card and guide shows the measured scope and source. Size sources reviewed 24 November 2026; previous demand evidence remains separately dated.

The workflow adapts profile → budget → itinerary → preparation ideas from [QuantumLynx travel-planner](https://github.com/QuantumLynx/claude-skills/blob/main/plugins/travel-planner/skills/travel-planner/SKILL.md). This is an original browser implementation, not a hosted AI agent. No live supplier, snow or availability requests occur. Ordinary values stay in page memory and survive language changes. Shared links restore the included planner inputs on opening or reloading.

All rates in `resorts.mjs` are illustrative planning assumptions, **not researched current prices**. Accommodation is per room/unit/night multiplied by the entered unit count. Verify occupancy. All travellers use the same pass/rental rate; child discounts need actual quotes. Evening spending is entered per adult per night, is shown separately in the planner breakdown and included in extras on transfer to the existing calculator. Group budgets and per-person totals are both shown. Calculator edits do not change the planner's original comparison.

The planner reserves arrival and departure days, with exact ski/rest-day counts. `npm test` checks engine isolation, country constraints, ordering, evening costs, lodging units, date rollover and invalid inputs. `npm run build` verifies the production bundle. `npm run test:browser` covers layout, isolated planner state, downloads, calculator transfer and original guide links in CI.

## Destination discovery and sharing

`resorts/` contains bilingual guides for both tracks, preserving previous guide URLs. Run `npm run generate:guides` (also run before build) after data changes. Each guide links to its current planner track, includes area size and source, and has reciprocal language links and a canonical URL in `sitemap.xml`. Popularity metrics, where available, are context rather than selection criteria and must not be combined into a global score. Suitability is an editorial assessment.

Plan sharing uses native sharing where supported, clipboard copy otherwise, and a selectable-link fallback. Profile values are stored in the URL fragment (not the HTTP query); shared links include group composition, child ages, dates and budget. No profile persistence or third-party analytics was added. A copied plan is a snapshot of planner inputs, not subsequent standalone-calculator edits. All imported profiles are validated. Plain guide links prefill a destination without inventing dates.

Search engines can discover the static guides, but indexing and ranking are not guaranteed. Submit the sitemap in an owner-verified Google Search Console property when available. Because this is a GitHub project site, a robots.txt inside `/ski_twins/` would not control the origin; none is added. Social accounts still need real account URLs supplied by the owners. No paid campaigns or external messages were started.
