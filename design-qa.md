# Family Winter Edit — design QA

final result: blocked

## Blocking finding

- [P1 / verification blocker] The cloud browser cannot reach the managed local preview. The CLI reports a running preview, but the browser renders `upstream connect error or disconnect/reset before headers. reset reason: connection termination`. Restarting the supported preview after correcting the development server's network-interface enumeration error did not restore browser routing. No network permissions were changed and no alternative browser-control path was used.
- This is not a verified visual handoff. Mobile layout, typography, image crops, controls, browser console and visual fidelity still require browser verification. Do not merge or publish on the strength of the build and calculation tests alone.

## Source and attempted evidence

- Selected visual: option 2, **The Family Winter Edit**.
- Source visual truth: `/workspace/scratch/be9c535bf761/generated_images/exec-435b4cf2-d680-43b4-9969-ff25e5a28d9e.png` (1448 × 1086).
- Intended source content crops: desktop approximately 1030 × 1005; mobile approximately 360 × 1005. These are art-direction references, not an exact browser viewport specification.
- Implementation route attempted: `http://terminal.local:4173/`, Hebrew, default values, homepage.
- Attempted browser viewport: 1363 × 936 screenshot pixels. CSS viewport/density could not be validated against the app because the app did not load.
- Error screenshot: `/workspace/shared/ski-twins-qa/desktop-first.jpg` (1363 × 936). This is infrastructure failure evidence, **not** a rendered implementation screenshot.
- Full-view and focused region comparisons: not possible; no valid implementation image to combine with the source. No fidelity verdict is claimed.

## Required fidelity surfaces

| Surface | Implemented intent | Visual verification |
| --- | --- | --- |
| Typography | Locally hosted Heebo, heavy plum Hebrew headings, lighter body copy | Blocked; wrapping and optical weights unverified |
| Spacing/layout | Diagonal desktop hero, editorial destination layout, stacked mobile sections | Blocked; geometry and overflow unverified |
| Color/tokens | Cream #FFF9F0, plum #392C3E, coral #B94B30, apricot #F9E8D9 | Blocked; browser contrast and balance unverified |
| Images | Generated family hero, preserved original destination photos and source brand geometry | Assets inspected separately; rendered crops unverified |
| Copy/content | Hebrew first, English toggle, exact existing slogan, full guides and illustrative costs | Source integrity checked; browser readability unverified |

## Completed checks

- `npm test`: 8 budget regression tests passed. Original defaults remain €4,060 per group / €1,015 per person; five people gives €4,835 / €967.
- `npm run build`: passed; static destination images, fonts, icons and `.nojekyll` copied into the output.
- JavaScript syntax checks passed for app, translations and both article modules.
- Original English article object compared against the baseline: all 9 articles preserved exactly in the source module. Runtime privacy copy updates the hosting/font description and adds the generated-image disclosure.
- All 9 Hebrew guide routes present; 95 top-level interface translation keys match between languages.
- Original article links preserved: 20 external link occurrences, 16 unique URLs. Hebrew guide sources are derived from those same URLs.
- Invalid comparison values cannot crash the language rerender or show `NaN` as a price.
- Existing GitHub repository and GitHub Pages root paths retained. Main branch and live site untouched.

## Comparison history

No valid comparison iteration completed. Preview infrastructure troubleshooting is not counted as a visual QA iteration.

## Required continuation

1. Restore the supported local preview connection, then capture the actual homepage at desktop and mobile widths.
2. Combine reference and rendered views at equivalent crop/density. Inspect full composition and focused hero, typography, destination and calculator regions.
3. Fix actionable P0/P1/P2 differences and repeat the comparison.
4. Test mobile menu, destination filtering/search and empty state, all guide routes, checklist interaction, language switching with entered values, comparison presets, invalid inputs, reset and downloaded Hebrew/English plans.
5. Verify no horizontal overflow at 360, 390, 768 and desktop widths; verify focus, dialog closing, links, images and console errors.
6. Mark this report passed only after those checks succeed. Keep the PR in draft until then; do not publish without the user's publication approval.
