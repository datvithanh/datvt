// Static section metadata — no fs dependency, safe to import from client components.
export type Section = 'view' | 'cohort' | 'essays' | 'spotlight'

// Slug stays `view` (URL /view, existing frontmatter `section: view`); only the
// display label changed to "Editorial". Editorial is the umbrella; its series live
// in the article `subtype` (view refinement, karmic profiling).
export const SECTIONS: { slug: Section; label: string }[] = [
  { slug: 'view', label: 'Editorial' },
  { slug: 'cohort', label: 'Cohort 9' },
  { slug: 'essays', label: 'Articles' },
  { slug: 'spotlight', label: 'Spotlight' },
]

export const SECTION_LABELS: Record<Section, string> = {
  view: 'Editorial',
  cohort: 'Cohort 9',
  essays: 'Articles',
  spotlight: 'Spotlight',
}
