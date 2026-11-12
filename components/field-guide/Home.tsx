import Link from 'next/link'
import { InlineVideo } from '@/components/ui/InlineVideo'
import { NEXT_COHORT_START, NEXT_MINI_DATES } from '@/lib/field-guide'

// "04 Lanes" homepage (design canvas, Nov 2026). The hero is drawn on a 1280-unit stage:
// every position below is in stage units (see --u in app/lanes-home.css), so the bands,
// the glyph figure and the copy stay locked together as the page scales.
// One band (Dat, Nov 6): it comes in from the right behind the figure, runs level under it, turns one
// rounded 90° corner on the left margin and drops down beside the phases. See docs/design/README.md.

const phases = [
  { n: '01', name: 'Absorption', text: 'Attention steadies, and your patterns start to show in real time.', tone: 'marigold', glyph: 'absorption' },
  { n: '02', name: 'Purification', text: 'Patterns met fully begin to unwind, freeing you to choose anew.', tone: 'clay', glyph: 'purification' },
  { n: '03', name: 'Recognition', text: 'You see how a self is being constructed, directly rather than conceptually.', tone: 'sage', glyph: 'recognition' },
  { n: '04', name: 'Integration', text: 'Land insight into your life, bring your practice beyond the\u00a0cushion.', tone: 'blue', glyph: 'integration' },
]

const stories = [
  { id: 'tHBd3sCOjWk', name: 'Tyson', image: '/brand/stories/tyson-headshot.jpg', tone: 'clay', quote: 'Realization fitness is like a transformation of your relationship to resistance.' },
  { id: 'M4tPoR5-n40', name: 'Taylor', image: '/brand/stories/taylor-headshot.jpg', tone: 'marigold', quote: 'True realization is not the destruction of intelligence. It is the liberation and embodiment of intelligence.' },
  { id: 'zcrvJoSpfYs', name: 'Ryan', image: '/brand/stories/ryan-headshot.jpg', tone: 'sage', quote: 'Before that it felt like poking around in the dark. Now it finally feels like I can train properly.' },
  { id: '-uMMTet2FP8', name: 'Adrian', image: '/brand/stories/adrian-headshot.jpg', tone: 'blue', quote: 'What drew me in was the culture of being yourself — welcoming all sides, including the parts I’d cast away.' },
  { id: 'mTZIjfB5BZ8', name: 'Tom', image: '/brand/stories/tom-headshot.jpg', tone: 'clay', quote: 'My relationship, my life was cleaning up, I was maturing — that wasn’t a goal. But it never happened at that kind of pace before.' },
  { id: 'WoQbN-CnHJg', name: 'John', image: '/brand/stories/john-headshot.jpg', tone: 'marigold', quote: 'It locked in the Realization... it gave me a physical visceral understanding. Before, maybe I thought Anatta was something more conceptual.' },
]

export function HomeContent() {
  return <>
<section className="ln-hero" aria-labelledby="ln-hero-title">
  <div className="ln-stage">
    <div className="ln-art" aria-hidden="true">
      <img className="ln-bands" src="/brand/home/bands.svg" alt="" width="3880" height="1700" />
      <img className="ln-figure" src="/brand/home/hero-figure.svg" alt="" width="799" height="822" />
    </div>
    <div className="ln-copy">
      <h1 id="ln-hero-title">Live in<br />practice</h1>
      <p className="ln-lede">Build a practice that can meet your life, with people who train alongside you.</p>
      <Link className="ln-button" href="/bootcamp">Explore the Bootcamp <span aria-hidden="true">↗</span></Link>
    </div>
    <h2 className="ln-phases-title">Realization as a fitness</h2>
    <ol className="ln-phases">
      {phases.map(p => <li key={p.n} className={`tone-${p.tone}`}>
        <img className="ln-phase-glyph" src={`/brand/home/glyph-${p.glyph}.svg`} alt="" width="48" height="48" />
        <div><span className="ln-num">{p.n}</span><h3>{p.name}</h3>
        <p>{p.text}</p></div>
      </li>)}
    </ol>
  </div>
</section>

<section className="ln-section ln-ways" aria-labelledby="ln-ways">
  <div className="ln-wrap">
    <h2 id="ln-ways">Ways to train</h2>
    <div className="ln-ways-grid">
      <Link className="ln-card ln-card-paid" href="/bootcamp">
        <span className="ln-card-eyebrow tone-marigold">Paid · Live online · 12 weeks</span>
        <span className="ln-card-title">Illumination Bootcamp</span>
        <span className="ln-card-text">Twelve weeks of intensive training for practitioners ready for transmission and relational feedback.</span>
        <span className="ln-card-date">Next cohort: <span className="ln-card-date-value">{NEXT_COHORT_START}</span></span>
        <span className="ln-card-foot"><span className="ln-button ln-button-bone">Explore <span aria-hidden="true">↗</span></span></span>
        <span className="ln-card-side" aria-hidden="true" />
      </Link>
      <Link className="ln-card ln-card-free" href="/mini-bootcamp">
        <span className="ln-card-eyebrow tone-sage">Free · 5 days</span>
        <span className="ln-card-title ln-card-title-sm">Want a taste first?</span>
        <span className="ln-card-text">Mini Bootcamp: five free days of live practice.</span>
        <span className="ln-card-date">Next run: <span className="ln-card-date-value">{NEXT_MINI_DATES}</span></span>
        <span className="ln-button-outline">Explore Mini Bootcamp <span aria-hidden="true">↗</span></span>
      </Link>
    </div>
  </div>
</section>

<div className="ln-divider" aria-hidden="true"><span /><img src="/brand/home/glyph-community-ink.svg" alt="" width="40" height="40" /><span /></div>

<section id="stories" className="ln-section ln-community" aria-labelledby="ln-community">
  <div className="ln-wrap">
    <div className="ln-community-head">
      <h2 id="ln-community">You’ve found the maps<br /><span className="ln-h2-accent">Find your people</span></h2>
    </div>
    <div className="ln-stories">
      {stories.map(s => <figure key={s.id}>
        <InlineVideo className={`ln-story-image tone-bg-${s.tone}`} videoId={s.id} title={`${s.name}’s story`} ratio="4 / 3">
          <img src={(s as { image?: string }).image ?? `/brand/stories/${s.id}.jpg`} width="1280" height="720" alt="" loading="lazy" />
          <span className="play-mark" aria-hidden="true" />
        </InlineVideo>
        <blockquote>“{s.quote}”</blockquote>
        <figcaption><span>{s.name}</span></figcaption>
      </figure>)}
    </div>
  </div>
</section>
  </>
}
