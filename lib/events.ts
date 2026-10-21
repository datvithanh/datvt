// import { TAYLOR_SNAKE_TOOLTIP } from './easterEggs' // used by the hidden Transmission 101 entry below

// Master list of events for the homepage Popular section.
// Featured events render as the large EventCard at the top; everything else
// renders below in the compact EventRow master list. Keep every live event
// here — date changes and promotions/demotions happen in this one file.
export type SiteEvent = {
  slug: string
  title: string
  // Omit to hide the "by AUTHOR" byline on the card/row.
  author?: string
  dateDisplay: string
  href: string
  image: string
  // Render the image dimmed and contained (logo placeholder) instead of a
  // full-bleed cropped thumbnail — for events without creative yet.
  imagePlaceholder?: boolean
  // Short teaser text overlaid on the thumbnail. On a placeholder it sits
  // small over the logo (e.g. 'T102'); on a photo it renders big over a gray
  // dimming overlay (e.g. '10' for Cohort 10).
  imageTeaser?: string
  // Session length shown under the date (e.g. '3 Hours'). Omit to hide.
  length?: string
  // Native hover title on the thumbnail (easter eggs).
  imageTooltip?: string
  // Article-card-style meta header on compact rows: kicker ('Course'),
  // chip ('New') — rendered with the author as `KICKER [CHIP] · by AUTHOR`.
  kicker?: string
  badge?: string
  description: string
  featured: boolean
  // 'silver' renders the compact row low-key — muted monochrome instead of
  // the gold accent. For quiet entries like self-paced courses.
  tone?: 'silver'
}

export const EVENTS: SiteEvent[] = [
  {
    slug: 'mini-bootcamp',
    title: 'Mini Bootcamp',
    author: 'Taylor',
    dateDisplay: 'December 14 – 18 · 7am – 9:30am ET',
    href: '/mini-bootcamp',
    // Mini Bootcamp ad creative — same image as the landing page hero.
    image: '/images/mini-bootcamp-ad.jpg',
    description:
      'The open, no-cost way in. A week of live transmission and practice that surfaces the bypassing patterns most practice hides. Five days, live on Zoom, free — register once and you are in for the whole week.',
    featured: true,
  },
  {
    slug: 'coaching-season',
    title: 'Coaching Season',
    dateDisplay: 'Now through August 15',
    href: '/coaching',
    // Coaching Season ad creative — same image used on Instagram.
    image: '/images/coaching-season-ad.jpg',
    description:
      'A free 20-minute call to meet one of the core team and say plainly where your practice actually stands. You do not need years behind you or the right vocabulary — just an honest account of where you are. Open through August 15 — spots are limited.',
    featured: false,
    tone: 'silver',
  },
  // Embodiment, PPW, and the Bootcamp now live in the homepage Programs rail
  // (components/content/CuratedRail.tsx) with their next dates.
  // Transmission 101 — hidden from the homepage for now (Aug 2026); the course
  // page stays live at /transmission-101. Uncomment to bring the row back
  // (restore the TAYLOR_SNAKE_TOOLTIP import above with it).
  // {
  //   slug: 'transmission-101',
  //   title: 'Transmission 101',
  //   author: 'Taylor',
  //   dateDisplay: 'Staying Present · Self-Paced · Free',
  //   href: '/transmission-101',
  //   image: '/images/ppw-hero.jpg',
  //   imageTooltip: TAYLOR_SNAKE_TOOLTIP,
  //   kicker: 'Courses',
  //   badge: 'New',
  //   description:
  //     'Five short lessons on why you keep leaving the present moment, and what finally lets you stay. An introduction to transmission-based practice.',
  //   featured: false,
  //   tone: 'silver',
  // },
]
