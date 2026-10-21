# Lineage / Initiate records

Each `*.mdx` here is one **initiate** (a CC lineage member). The same record feeds three surfaces:

- **`/lineage`** — the roster. Lists initiates where `lineagePublished: true`.
- **`/lineage/[slug]`** — the full bio hub (the MDX body below the frontmatter).
- **`/mentorship`** — the booking card grid. Lists initiates where `offersMentorship: true`.

"Initiate" is the base entity. **Mentor** is a capability an initiate can hold — set by
`offersMentorship`, not by `role`.

## Frontmatter

| Field | Type | Used by | Notes |
|---|---|---|---|
| `name` | string | all | Display name. |
| `role` | string | `/lineage` | Lineage title label, e.g. `"Initiate"`, `"Transmission Holder"`. Defaults to `Initiate`. |
| `specialty` | string | card + hub | Short focus eyebrow. |
| `blurb` | string | card + roster | 2–3 sentences. |
| `schedulerUrl` | string | mentorship | Booking link. Used by the `/mentorship` card and the hub CTA — only when `offersMentorship`. |
| `offerTerms` | string | mentorship | Optional. Cadence / session length. |
| `price` | string | — | Optional. Hidden on the card for now. |
| `offersMentorship` | bool | gate | `true` → appears on `/mentorship`; shows the "work with me" CTA + "Mentor" badge on the hub. |
| `lineagePublished` | bool | gate | `true` → hub is live on `/lineage`; appears in the roster. |
| `photo` | string | card + hub | Optional portrait path. |

The MDX **body** (below the frontmatter) is the full bio, rendered on `/lineage/[slug]`. Not shown on `/mentorship`.

## Tagging articles to an initiate

An article appears on an initiate's hub feed when it is a **news article** (has a `section`) and
either:

- `author: <slug>` — the initiate wrote it (essays), **or**
- `features: [<slug>, …]` — the article is about/references the initiate (any section).

`features` is set in the article's frontmatter (in `content/articles/`), not here. Slugs must match a
file in this folder (e.g. `features: [tyson]` ↔ `content/lineage/tyson.mdx`).

## Launch a new initiate

1. Add `content/lineage/<slug>.mdx` with `name` + `role`.
2. Fill `specialty`, `blurb`. Keep `lineagePublished: false` until the bio body is written.
3. If they take clients: set `offersMentorship: true` and a real `schedulerUrl` → they appear on `/mentorship`.
4. When the bio is written: set `lineagePublished: true` → the hub goes live and they join the `/lineage` roster.
