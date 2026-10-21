# Hidden Features — How to Revert

Features temporarily hidden from the site. All code is preserved — these are just navigation/routing changes.

## 1. Editorial Homepage (article feed)

**What:** The original homepage showed a rotating quote, topic tags, 6 latest articles, and an Illumination 101 course card.

**Where it lives:** `app/feed-page.tsx.bak` (the original `app/page.tsx`)

**To restore:**
1. Move current `app/page.tsx` (bootcamp) back to `app/bootcamp/page.tsx`
2. Rename `app/feed-page.tsx.bak` → `app/page.tsx`
3. Replace the redirect in `app/bootcamp/page.tsx` with the bootcamp content
4. Add "Back to teachings" link back to bottom of bootcamp page
5. Re-add `{ href: '/bootcamp', label: 'Bootcamp' }` to Header nav links
6. Re-add `<Link href="/bootcamp">Bootcamp</Link>` to Footer

## 2. Illumination 101 Course

**What:** A free 10-day course linked from nav, footer, article pages, and homepage.

**Where it lives:** Course pages are still live at `/courses/illumination-101` and `/courses/illumination-101/[lesson]` — just not linked anywhere.

**To restore visibility:**
1. Add `{ href: '/courses', label: 'Courses' }` back to `components/layout/Header.tsx` nav links
2. Add `<Link href="/courses">Courses</Link>` back to `components/layout/Footer.tsx`
3. Uncomment the Course CTA block in `app/articles/[slug]/page.tsx` (search for "hidden until email gating")
4. Re-add course entries to `app/sitemap.ts`
5. If restoring the editorial homepage, the Featured Course section is already in `feed-page.tsx.bak`

**Future plan:** Gate behind email capture before re-linking.
