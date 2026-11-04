# Ski Twins

Ski and snowboard travel by Liron and Oz Carmel. Destination planning guides, rental and accommodation tips, and an interactive DIY trip budget.

**Live website:** https://ozcarmel.github.io/ski_twins/

## Files

- `index.html` — the responsive homepage and trip budget form.
- `style.css` — desktop and mobile styles.
- `app.js` — destination search, full guides, checklists and budget calculation/download.
- `assets/` — local photographs and the site icon.
- `.nojekyll` — serves this static site without Jekyll processing.

There are no build dependencies or server credentials. All calculation happens in the visitor's browser.

## Preview locally

From this directory:

```sh
python -m http.server 4173
```

Open http://localhost:4173/.

## Publish updates

GitHub Pages publishes the root directory of the `main` branch. Commit and push changes to `main`; GitHub runs the Pages build and deployment automatically. See the repository's Actions tab for progress, and Settings → Pages for the live URL.

Relative asset paths support the `/ski_twins/` project path. If the domain or repository name changes, update the canonical and social metadata in `index.html` and the downloaded-plan URL in `app.js`.

## Editorial status

Destination pages are explicitly labelled planning guides and include official sources. Firsthand reviews, named rental/accommodation recommendations and social profile URLs should be added when supplied by Liron and Oz. Do not replace these with invented ratings or visits.

Photo credits appear in the site's Privacy & photography guide. Third-party photographs retain their respective ownership; inclusion in this repository does not grant a separate licence to reuse them.
