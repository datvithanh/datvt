// Site-wide feature flags. Plain constants (no fs) so both server and client
// components can import them.

// Whether the rest of the site LINKS to initiate/lineage pages: the nav "Lineage" link
// and byline + author-card hub links. The /team roster and /team/[initiate] hubs stay
// LIVE either way (reachable by URL); this only controls the entry points. Off for
// now — live but unlinked.
export const SHOW_INITIATES = false

// Whether the Transmission 101 course offers the free coaching call: the debrief's
// "Book a Free Coaching Call" block and the mentions that point at it. Off between
// coaching seasons — flip to true when the next season opens.
export const SHOW_COACHING_CALL = false
