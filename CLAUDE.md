# Budmo — Claude Instructions

Project instructions for [Claude Code](https://docs.anthropic.com/en/docs/claude-code).
These rules apply to every session working on this codebase.

---

## Code Standards

- Use `const` / `let` — never `var`
- Use CSS design tokens (`var(--token)`) — never hardcoded hex values
- No silent `catch` blocks — always surface or log errors
- No inline style blobs — keep styles in component `<style>` blocks or `base.css`

---

## Layout: Container & Grid Alignment Rule

The site uses a `.container` with `max-width: var(--max-w)` (1200px) and `padding: 0 5vw`.
**Every layout decision must be deliberate about whether it sits inside or outside this container.**

### Break OUT of the container when:
- The element **is the visual background** — section colour fills, diagonal clip-path slices, full-bleed images or video. Backgrounds always bleed edge-to-edge.
- The content **signals overflow / scrollability** — horizontal carousels, logo tickers, quote marquees. The edge-bleed tells users "more exists off-screen."
- The element has **no meaningful left/right relationship** with surrounding text — it doesn't need to align with body copy.
- It's **comparison UI** that benefits from using more viewport width than prose needs.

### Stay IN the container when:
- It's **text** — headings, body copy, labels, intros. Line length of 600–800px is what makes prose readable; wider is fatiguing.
- It's a **card grid** introduced by a heading — cards should sit proportionally under the text that sets them up (e.g. the band member grid).
- It has **interactive elements** — forms, buttons, inputs. Consistent left-edge alignment makes them feel organised.
- It **references content above it** — a quote card under a heading, a CTA after a paragraph should stay visually anchored.

### Shorthand rule:
> **Backgrounds can always be full-bleed. Content respects the container unless the content itself _is_ the visual (imagery, motion, or comparison UI — not prose).**

---

## Section Separation System

Sections use a consistent two-part rhythm (defined in `base.css`):

| Utility class | When to use |
|---|---|
| `.section--surface` | Mid-page sections that alternate with white — adds `--bg-surface` background |
| `.section--slice-bottom` | Dark sections (hero, dark CTA) whose **bottom** exits diagonally into a light section |
| `.section--after-slice` | The **first light section** immediately after a `slice-bottom` dark section — compensates margin/padding for the overlap |
| `.section--slice-top` | Dark CTA sections at the **bottom** of a page — diagonal top entry from the preceding light section |

Diagonal angle is `4vw`. All slice utilities carry responsive padding overrides at ≤1023px and ≤600px.

---

## Design Tokens

Brand colours are live in `tokens.css`:
- `--ink: #1a1a1a` — near-black brand surface (hero, dark CTA, footer)
- `--accent: #d4747f` — blush/rose, ~5.5:1 as text on `--ink`, but only ~3.0:1 on white
- `--accent-text: #b8505c` — darkened blush for accent-coloured **text** on light backgrounds (~4.6:1, clears AA). Raw `--accent` is background/border-only on light surfaces — never use it for text on white.
- `--font-display: 'Bebas Neue'`, `--font-body: 'Poppins'`

This site ships **one fixed visual design, no dark-mode toggle**. The `--ink` hero/CTA sections and white content sections are both part of the single design (via the section-slice system above), not a light/dark theme switch — there is no `[data-theme]` mechanism here.

---

## Never Touch the Live Site

`budmo.ca` is currently a **live Squarespace site** serving real bookings for the band. It must never be modified, scraped destructively, or have its Squarespace admin touched from this project — this repo only ever reads the public site (for content/asset reference) and never writes to it. `~/Claude/Portfolio` and `~/Claude/Portfolio-v2` are reference-only conventions sources for this project — never modify them from here either.

Archived source content lives in `source-assets/` (gitignored — raw originals only, not shipped). Only `public/optimized/` (processed WebP) is committed and served.

---

## Dev Server

```
cd /Users/maksymrewko/Claude/Budmo && npx astro dev --port 4325
```

Preview panel connects to port 4325.
