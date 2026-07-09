# DevRel Portfolio — New Sections & Repositioning

**Date:** 2026-07-09
**Status:** Approved design, pending implementation plan

## Overview

Reshape the existing single-page portfolio (JS-Mastery "Ultimate Portfolio" template:
React 17 + CRA + framer-motion + Sass + Sanity) around a DevRel / community
identity. Add new content sections, split the combined Skills/Experience block,
introduce animated impact counters, and remove the profile photo in favor of a
text-forward hero.

The person: **Mohammad Mudassir**, Engagement Support Engineer at the **Algorand
Foundation**, working at the intersection of **Developer Experience, AI, Blockchain
Infrastructure, and Startup Ecosystems**.

## Goals

- Text-forward hero with no profile photo, repositioned for DevRel.
- Split the current combined `Skills` section into two independent sections: **Skills** and **Experience** (timeline).
- New **Research** section (technical deep-dive cards).
- New **Speaking & Community** section: animated stat counters on top, then a filterable grid of event cards (All / Talks / Events / Hackathons).
- New content is **Sanity-backed** (new schemas), editable in Studio.
- Grouped navigation with dropdowns.
- Consistent with existing code patterns; minimal new dependencies.

## Non-Goals (explicit follow-ups, not this work)

- Fixing the contact form submission. `Footer.jsx` calls `client.create()`, which
  requires a write token. We intentionally do **not** ship a write token in the
  browser bundle. Proper fix (serverless function or Formspree/EmailJS) is a
  separate task. Note: it was already non-functional (the previously configured
  token was invalid), so this is not a regression.
- Sanity Studio v2 → v3 migration.
- CRA → Next.js / Vite migration.
- Making the hero copy Sanity-editable (kept hardcoded for now; it rarely changes).

## Navigation & Page Structure

Single-page app with anchor scrolling (unchanged mechanism). Grouped desktop nav:

```
Home · About▾ · Work▾ · Community · Contact
        │         │
        │         └─ Projects (#work) · Research (#research)
        └─ About (#about) · Skills (#skills) · Experience (#experience)
```

- **Community** is a single top-level item → `#community` (the one filtered section).
- Mobile menu (hamburger) lists all destinations flat: Home, About, Skills,
  Experience, Projects, Research, Community, Contact.

**Section order down the page:**

```
Home → About → Skills → Experience → Projects → Research → Speaking & Community → Testimonials → Contact
```

(Community placed after Projects/Research, mirroring the nav. Easy to move earlier
if desired later.)

## New Sanity Schemas

Registered in `backend_sanity_portfolio/schemas/schema.js` alongside existing types.

### `stats` (impact counters)
| field | type | notes |
|-------|------|-------|
| `label` | string | e.g. "Developers Supported" |
| `value` | number | numeric target for count-up, e.g. `10000` |
| `suffix` | string | e.g. `"+"`, `"k+"` (display suffix) |
| `order` | number | sort order |

Seed data (six entries):
- 10,000+ Developers Supported → value 10000, suffix "+"
- 100+ Universities → 100, "+"
- 100+ Projects Mentored → 100, "+"
- 3 National Hackathons → 3, ""
- 20+ Startups Supported → 20, "+"
- 100+ Technical Sessions → 100, "+"

### `research` (technical deep-dives)
| field | type | notes |
|-------|------|-------|
| `title` | string | |
| `summary` | string | short card blurb |
| `tags` | array of string | topic tags |
| `date` | date | |
| `link` | url/string | external link to full piece |
| `coverImage` | image (optional) | hotspot enabled |

### `events` (Speaking & Community)
| field | type | notes |
|-------|------|-------|
| `title` | string | talk/event title |
| `type` | string (list: `talk`, `event`, `hackathon`) | drives the filter |
| `role` | string | e.g. speaker / organizer / mentor |
| `eventName` | string | host event/conference/meetup |
| `location` | string | city / online |
| `date` | date | |
| `link` | url/string (optional) | recording / slides / event page |
| `coverImage` | image (optional) | hotspot enabled |
| `description` | string (optional) | |

## Components

Follow the existing `AppWrap(MotionWrap(Component, className), idName, bgClass)`
wrapper pattern and per-component Sanity `client.fetch` in `useEffect`.

### New
- **`components/StatCounter.jsx`** — reusable animated counter. Props: `value`,
  `suffix`, `label`. Uses `IntersectionObserver` to start when scrolled into view;
  animates `0 → value` with `requestAnimationFrame`. Respects
  `prefers-reduced-motion` (snaps to final value, no animation). Formats
  `value + suffix` (thousands grouping for large numbers, e.g. `10,000+`).
- **`components/FilterableCards.jsx`** — shared filter + card grid. Props: `items`,
  `filters` (list of filter keys), `getFilterValue(item)` (maps an item to its
  filter key/keys), and a `renderCard(item)` render prop. Encapsulates the
  active-filter state + the framer-motion re-animate-on-filter behavior currently
  inline in `Work.jsx`.
- **`container/Experience/Experience.jsx`** (+ `.scss`) — the timeline extracted
  from `Skills.jsx`. Reads `*[_type == "experiences"]`, renders year → works with
  the existing tooltip UI. `AppWrap(MotionWrap(...), 'experience', 'app__whitebg')`.
- **`container/Research/Research.jsx`** (+ `.scss`) — reads `*[_type == "research"]`,
  renders a card grid (title, summary, tags, date, link, optional cover).
  `AppWrap(MotionWrap(...), 'research')`.
- **`container/Community/Community.jsx`** (+ `.scss`) — reads `*[_type == "stats"]`
  and `*[_type == "events"]`. Layout: `StatCounter` band (from `stats`, sorted by
  `order`) → `FilterableCards` with filters `['All','Talks','Events','Hackathons']`
  mapping to event `type` → event card grid. `AppWrap(MotionWrap(...), 'community', 'app__whitebg')`.

### Changed
- **`container/Header/Header.jsx`** — remove `images.profile` / `images.circle`
  photo block. New text-forward layout: greeting, name (`head-text`), role line
  ("Engagement Support Engineer @ Algorand Foundation"), focus-area pills
  (DevX · AI · Blockchain Infra · Startups), two CTA buttons ("View Work" → `#work`,
  "Let's talk" → `#contact`). Keep entrance motion. Copy hardcoded.
- **`container/Skills/Skills.jsx`** — remove the experience/timeline half and its
  `experiences` fetch + `ReactTooltip`; keep only the skills grid.
- **`container/About/About.jsx`** — update the hardcoded heading from the
  design-agency line to DevRel-appropriate copy (cards still from `abouts`).
- **`components/Navbar/Navbar.jsx`** — grouped dropdown nav (About▾, Work▾) + single
  Community item; mobile menu lists all sections flat.
- **`App.js`** — import and place the new sections in the order above.

## Data Flow

Each section fetches its own data from Sanity on mount (existing pattern). No global
store. `urlFor` handles images. Reads are public (no token), consistent with the
current client config.

## Visual Direction (light touch, stays within existing system)

- Reuse existing Sass variables, `head-text` / `p-text` / `bold-text` / `app__flex`
  classes and the `app__whitebg` alternating backgrounds.
- Hero: large type, focus-area pills as small rounded chips, CTA buttons using the
  existing accent color.
- Cards (Research + events) share a consistent card style: rounded, subtle shadow,
  hover lift, tag chips.
- Counters: large numerals with the existing accent, label beneath.
- Detailed aesthetic decisions handled during implementation (may consult the
  frontend-design skill) but must not diverge from the current look.

## Testing

CRA + React Testing Library (already configured).

- **`StatCounter`**: renders and reaches the target value (and its suffix); with
  `prefers-reduced-motion` it shows the final value immediately.
- **`FilterableCards`**: renders all items by default; selecting a filter narrows
  the visible set; "All" restores.
- **Section smoke tests**: `Research`, `Experience`, `Community` render without
  crashing given mocked Sanity data (mock the `client` module).
- **End-to-end verification**: run the app locally with seeded Sanity content and
  confirm each section renders, the counters animate on scroll, filters work, and
  nav dropdowns anchor-scroll correctly.

## Risks / Notes

- `@sanity/client` v2 and CRA are dated but sufficient for this scope; no upgrade
  required here.
- Adding a `research` or `events` type in Studio requires the Studio to be running
  against the same project/dataset (`ouoeyqyw` / `production`).
- Grouped-dropdown nav is custom (no library); keep it accessible (keyboard focus,
  `aria-expanded`).
