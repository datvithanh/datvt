import Link from 'next/link'
import { InlineVideo } from '@/components/ui/InlineVideo'
import { NEXT_COHORT_START, NEXT_MINI_DATES } from '@/lib/field-guide'

// "04 Lanes" homepage (design canvas, Nov 2026). The hero is drawn on a 1280-unit stage:
// every position below is in stage units (see --u in app/lanes-home.css), so the bands,
// the glyph figure and the copy stay locked together as the page scales.
// PROVISIONAL: the first bend (U-fold) of the lower band does not yet match the reference
// in docs/design/hero-bands-reference.png. See docs/design/README.md.

const phases = [
  { n: '01', name: 'Absorption', text: 'Attention steadies, and your patterns start to show in real time.', tone: 'marigold', glyph: 'absorption', top: 1040 },
  { n: '02', name: 'Purification', text: 'Learn to meet your patterns as you hold and become them.', tone: 'clay', glyph: 'purification', top: 1040 },
  { n: '03', name: 'Recognition', text: 'You see how a self is being constructed, directly rather than conceptually.', tone: 'sage', glyph: 'recognition', top: 1160 },
  { n: '04', name: 'Integration', text: 'Land insight into your life, bring your practice beyond the\u00a0cushion.', tone: 'blue', glyph: 'integration', top: 1160 },
]

const stories = [
  { id: 'RYwjMy_SID8', name: 'Kristen', tone: 'clay', quote: 'People here are full of integrity — they want progress for themselves, but they want it for each other.' },
  { id: 'NrObMSAiNQQ', name: 'Ryan', tone: 'marigold', quote: 'CC was a course correction.' },
  { id: 'YEpNqEyG3AE', name: 'James', tone: 'sage', quote: 'Everyone’s just trying to work it all out together.' },
]

const u = (n: number) => `calc(${n} * var(--u))`

export function HomeContent() {
  return <>
<section className="ln-hero" aria-labelledby="ln-hero-title">
  <div className="ln-stage">
    <div className="ln-art" aria-hidden="true">
      <img className="ln-bands" src="/brand/home/bands-upper.svg" alt="" width="3880" height="1700" />
      <img className="ln-figure" src="/brand/home/hero-figure.svg" alt="" width="799" height="822" />
      <img className="ln-bands" src="/brand/home/bands-lower.svg" alt="" width="3880" height="1700" />
    </div>
    <div className="ln-copy">
      <h1 id="ln-hero-title">Live in<br />practice</h1>
      <p className="ln-lede">Build a practice that can meet your life, with people who train alongside you.</p>
      <Link className="ln-button" href="/bootcamp">Explore the Bootcamp <span aria-hidden="true">↗</span></Link>
    </div>
    <h2 className="ln-phases-title">Realisation as a fitness</h2>
    <ol className="ln-phases">
      {phases.map(p => <li key={p.n} className={`tone-${p.tone}`} style={{ top: u(p.top) }}>
        <img className="ln-phase-glyph" src={`/brand/home/glyph-${p.glyph}.svg`} alt="" width="48" height="48" />
        <div><h3><span className="ln-num">{p.n}</span><span>{p.name}</span></h3>
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
        <span className="ln-card-eyebrow tone-marigold">Paid · 12 weeks · Live online</span>
        <span className="ln-card-title">Illumination Bootcamp</span>
        <span className="ln-card-text">Twelve weeks of intensive training for practitioners ready for transmission and relational feedback.</span>
        <span className="ln-card-foot"><span className="ln-mono">Starts {NEXT_COHORT_START}</span><span className="ln-button ln-button-bone">Explore <span aria-hidden="true">↗</span></span></span>
      </Link>
      <Link className="ln-card ln-card-free" href="/mini-bootcamp">
        <span className="ln-card-eyebrow tone-sage">Free · 5 days</span>
        <span className="ln-card-title ln-card-title-sm">Want a taste first?</span>
        <span className="ln-card-text">Mini Bootcamp: five free days of live practice, {NEXT_MINI_DATES}.</span>
        <span className="ln-button-outline">Save a spot <span aria-hidden="true">↗</span></span>
      </Link>
    </div>
  </div>
</section>

<section id="stories" className="ln-section ln-community" aria-labelledby="ln-community">
  <div className="ln-wrap">
    <div className="ln-community-head">
      <div>
        <img className="ln-glyph" src="/brand/home/glyph-community-ink.svg" alt="" width="52" height="52" />
        <h2 id="ln-community">You’ve found the maps. Find your people.</h2>
      </div>
      <div>
        <p className="ln-community-text">CC is a community for serious contemplative training: guidance from teachers, structured daily practice, study that sharpens understanding, and people who train alongside you.</p>
        <p className="ln-quote-line">You bring the willingness. The training gives it somewhere to go.</p>
      </div>
    </div>
    <div className="ln-stories">
      {stories.map(s => <figure key={s.id}>
        <InlineVideo className={`ln-story-image tone-bg-${s.tone}`} videoId={s.id} title={`${s.name}’s story`} ratio="4 / 3">
          <img src={`/brand/stories/${s.id}.jpg`} width="1280" height="720" alt="" loading="lazy" />
          <span className="play-mark" aria-hidden="true" />
        </InlineVideo>
        <blockquote>“{s.quote}”</blockquote>
        <figcaption><span>{s.name}</span></figcaption>
      </figure>)}
    </div>
    <Link className="ln-more" href="/bootcamp#stories">More participant stories <span aria-hidden="true">↗</span></Link>
  </div>
</section>
  </>
}
