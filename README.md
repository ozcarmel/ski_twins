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

`npm test` runs the eight budget regression checks. `npm run test:browser` runs the bilingual Chromium review after `npx playwright install chromium`. Pull requests run these checks in GitHub Actions and attach screenshots plus `results.json` as a review artifact. `npm run build` creates an optional static `dist/` bundle with all dynamically referenced assets. GitHub Pages can continue serving the repository root without a build change.

## Redesign review

The selected direction is **2 — The Family Winter Edit**: warm cream, plum typography, coral actions, family photography and editorial destination cards. The redesign has passed Chromium browser and visual review and stays on a review branch pending publication approval. See `design-qa.md` for evidence and review screenshots.

Comparison amounts are explicitly illustrative scenarios, not current resort prices or booking offers. The default comparison uses four people, six nights and five ski days. Each scenario can be opened in the existing calculator. Georgia is marked as coming soon because the original site has no Georgia guide.

## Publish updates

GitHub Pages publishes the root directory of the `main` branch. Commit and push changes to `main`; GitHub runs the Pages build and deployment automatically. See the repository's Actions tab for progress, and Settings → Pages for the live URL.

Relative asset paths support the `/ski_twins/` project path. If the domain or repository name changes, update the canonical and social metadata in `index.html` and the downloaded-plan URL in `app.js`.

## Editorial status

Destination pages are explicitly labelled planning guides and include official sources. Firsthand reviews, named rental/accommodation recommendations and social profile URLs should be added when supplied by Liron and Oz. Do not replace these with invented ratings or visits.

Photo credits appear in the site's Privacy & photography guide. Third-party photographs retain their respective ownership; inclusion in this repository does not grant a separate licence to reuse them.

The new family hero is AI-generated editorial imagery and is not presented as a photograph of the twins or a specific resort. All original photographs remain in the repository. The twin-peaks logo reuses the supplied brand geometry. Heebo is licensed under SIL OFL and Phosphor icons under MIT; licence copies are in `assets/fonts/` and `assets/icons/`.


## Family holiday planner

Open `#trip-planner` from the navigation or hero. The bilingual planner collects family composition, child ages, dates, ski level, pace, destination and budget. It compares the three existing example scenarios, generates dated arrival/ski/rest/departure entries, and provides preparation and packing lists plus a downloadable text plan. Selected cost inputs can be transferred to the existing calculator.

The workflow is inspired by the profile → budget → itinerary → preparation structure of [QuantumLynx travel-planner](https://github.com/QuantumLynx/claude-skills/blob/main/plugins/travel-planner/skills/travel-planner/SKILL.md). This is an original browser implementation, not an installed or hosted AI agent. It does not use that project's Python scripts or make live price, availability, weather or booking requests. No API key is required; profile values remain in page memory and reset on reload. Switching languages retains the current plan.

Estimates reuse `SCENARIOS` from `budget.mjs`. All travellers currently use the same example rate; child discounts and multi-day pass pricing need actual quotes. The planner reserves arrival and departure days. At least two nights and at most `nights - 1` ski days are required. Budget edits in the separate calculator do not change the planner's original illustrative comparison.

Validation: `npm test` covers budget consistency, date rollover, child ages, invalid inputs and exact ski/rest-day allocation across both paces for trips of 2–30 nights. `npm run build` verifies the static production bundle.
