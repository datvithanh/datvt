import type { Metadata } from 'next'
import { Badge } from '@/components/bootcamp/primitives'
import { BootcampCTA } from '@/components/content/BootcampCTA'
import { KitEmailForm } from '@/components/ui/KitEmailForm'
import { WorkshopPlaylist, type PlaylistVideo } from '@/components/content/WorkshopPlaylist'
import { getLibraryVideos } from '@/lib/media'
import { getVideoSubLabel } from '@/lib/videoLabels'
import { EmbodimentNav } from './EmbodimentNav'
import { EMBODIMENT_SIGNUP_URL } from './constants'
import { MINI_BOOTCAMP_NEXT_DISPLAY } from '@/lib/cohort'

const SITE = 'https://mindtraining.cc'

// Same creative as the homepage Events card.
const EMBODIMENT_IMAGE = '/images/embodiment-workshop-ad.jpg'

export const metadata: Metadata = {
  title: 'Embodiment Training — Next Workshop TBD',
  description:
    'Free embodiment training led by John Le, with Frank Yang and Khan. Honest posture, breathing principles, and how to sync attention into stable absorption. Guided meditation, presentation, and live Q&A on Zoom.',
}

// Cold-audience marketing copy (CC's material). The Pedagogy section is written to the
// search intent it serves — see docs/knowledge/seo-content-map-embodiment-workshop.md.
// The workshop outline itself (John/Frank/Khan's material) is never edited for search.
type Theme = {
  n: number
  title: string
  line: string
  description: string[]
  covers: string[]
}

const themes: Theme[] = [
  {
    n: 1,
    title: 'Body as Earth',
    line: 'What being grounded actually means, and why feeling ungrounded is a sign, not a mood.',
    description: [
      'The body is the seemingly stable form you start from: weight, density, structure, solidity. Raw data before interpretation. Every other part of the practice moves through these foundational contact points, which is why a practitioner who cannot feel them ends up meditating on a concept of the body instead of the body.',
      'Being grounded is not a vibe. It is the ability to express and choose from the ground up. Being ungrounded — the floaty, rootless, top-heavy quality that follows you off the cushion — is a recognizable sign of disembodiment, and it can be worked with directly.',
    ],
    covers: [
      'Why you can concentrate for an hour and still not feel your feet',
      'Disembodiment: dissociation, dysregulation, and ungroundedness as signatures',
      'The body as foundational contact — raw data, before interpretation',
      'What being grounded means when it is not a wellness slogan',
    ],
  },
  {
    n: 2,
    title: 'Gravity as the Unifying Teacher',
    line: 'The one teacher everyone already has: universal, non-conceptual, always on.',
    description: [
      'Every posture instruction you have ever received is a substitute for this: notice what braces against gravity and what yields to it. Gravity establishes directionality, informs the most efficient form, and organizes posture without a single rule about spines or shoulders.',
      'You hold your form to participate with it. Feel where that holding meets resistance and the whole architecture of your sitting becomes legible.',
    ],
    covers: [
      'Brace versus yield: reading your own holding in real time',
      'How gravity organizes posture without insistence',
      'Why grounding techniques fail when contact is missing',
      'Directionality: how the body moves off the earth and in balance',
    ],
  },
  {
    n: 3,
    title: 'Honest Posture',
    line: 'Your straight spine is a performance. What does your posture honestly communicate?',
    description: [
      'There is a fixation on how meditation posture should look: straight spine, shoulders back, symmetrical, still. That insistence is external and superficial, a meme of sitting. You end up performing a shape while the body underneath goes unheard, and the performance costs you in bracing, numbness, and pain.',
      'Honest posture works the other way. It arises as a truthful reflection of what is going on inside: responsive, expressive, revealing. The question is not how to hold the body right. It is what it feels like to be held by the ground.',
    ],
    covers: [
      'Why forcing a straight spine creates pain instead of stability',
      'Posture as honest expression versus posture as insistence',
      'Stacking: establishing the foundation from the ground up',
      'Physical posture, mental posture, posture of mind',
    ],
  },
  {
    n: 4,
    title: 'Breath as Diagnostic',
    line: 'Breathing is not respiration. Your breath tells the truth about your condition before you do.',
    description: [
      'Respiration is gas exchange. Breathing is a whole-being act: a cyclic wave that reflects your attention, your tension, your posture, your habits, your relationship to this moment. That is why a shallow breath is not a technique failure. It is information about your current condition, and it changes when the condition changes, not when you force air lower.',
      'The workshop teaches riding the breath: following the wave of expansion and contraction to the edges of sensation, letting breath massage the body into its actual shape rather than an imposed one.',
    ],
    covers: [
      'Why your breath stays shallow no matter what technique you use',
      'Breath as a diagnostic: location, coherence, depth, shape',
      'Riding the breath to the edges of sensation',
      'Control versus automaticity: whose breath is it',
    ],
  },
  {
    n: 5,
    title: 'So Much Movement in Stillness',
    line: 'Restlessness is signal, not an obstacle. Stillness is what makes it visible.',
    description: [
      'If sitting still makes you more agitated, nothing has gone wrong. Slowing down makes the signal legible: energy the system has been carrying all day is finally loud enough to hear. Most instruction tells you to be patient with restlessness. This workshop treats it as content.',
      'Stillness is not the absence of movement. It is the ground against which movement and flux become noticeable, the baseline that allows clear signals and real intimacy with what is actually running.',
    ],
    covers: [
      'Restless energy during meditation: neither suppress it nor obey it',
      'Why meditation can make you agitated instead of calm',
      'Stillness as ground, not suppression',
      'Buzzing, waves, and undulation: the life force under posture',
    ],
  },
  {
    n: 6,
    title: 'The Edge and Staying Power',
    line: 'Tightness, twitches, numb regions: how to stay where the practice actually happens.',
    description: [
      'At the edges of sensation you meet tightness, restriction, resistance, and places that have gone completely quiet. The usual responses are to push through or to leave. Both waste the moment. The practice is staying power: following the breath to the edge and remaining there gently, with clarity, while the parts of you that stopped talking to each other start again.',
      'Tension is adaptation, not failure. Ask what it has been protecting before you ask how to release it. And when release comes — twitches, jerks, heat, emotion — that is the system redistributing what it no longer needs to carry. Nothing to suppress, nothing to chase.',
    ],
    covers: [
      'Body twitching during meditation: what it is and what to do',
      'Pain in a sit: neither pushing through nor fleeing',
      'What tension is protecting, and why that question matters',
      'Numbness is not equanimity: telling signal purified from signal turned down',
    ],
  },
]

const faqs: { q: string; a: string }[] = [
  {
    q: 'How do I sign up for the workshop?',
    a: `Registration for Workshop II is closed — it ran Saturday, August 1. If a third workshop opens, registration will return to this page. In the meantime, the next Mini Bootcamp runs ${MINI_BOOTCAMP_NEXT_DISPLAY}.`,
  },
  {
    q: 'When is it, and how does the session run?',
    a: 'Saturday, August 1 at 2PM EDT, live on Zoom, free. Three hours in three movements: a guided embodiment meditation to establish your honest posture (hour one), a presentation on disembodied nonduality as the central problem for modern practitioners (hour two), and live Q&A where we work through the challenges registrants bring (hour three). Led by John Le, with Frank Yang and Khan as co-hosts.',
  },
  {
    q: 'Do I need to prepare anything?',
    a: 'A place where you can sit undisturbed for an hour. Chair or cushion both work — the sit starts from contact with the ground, not from a prescribed shape. No technique prerequisites. The one thing worth bringing is the specific challenge you named when you registered.',
  },
  {
    q: 'Is it really free? What comes after?',
    a: 'Free, no catch. This was the second of three free events leading into Cohort 10 of the 90-Day Bootcamp, following Embodiment Workshop I on July 11 and leading into the Mini Bootcamp in August. The workshop is not a pitch dressed as a meditation — the three hours are the work itself. If the work resonates, the bootcamp is where it continues.',
  },
  {
    q: 'What is embodiment?',
    a: 'Embodiment is making contact with everything you already are — every thought, emotion, habit, and pattern you sense and hold — as it lives in the body. Not a state you achieve. A completeness you stop avoiding.',
  },
  {
    q: 'How do I know if I am disembodied?',
    a: 'You can concentrate but you cannot feel your feet. You leave a sit calm and walk into the kitchen reactive. The body shows up as a problem to manage rather than the place experience actually happens. Dissociation, dysregulation, and ungroundedness are the signatures, on the cushion and in daily friction.',
  },
  {
    q: 'Does meditation posture actually matter?',
    a: 'It matters, but not the way it is taught. The straight spine you force is a performance of what you think meditation looks like. Honest posture arises as a truthful reflection of what is going on inside. The question is not how to hold the body right. It is what it feels like to be held by the ground.',
  },
  {
    q: 'Why does my body twitch or jerk during meditation?',
    a: 'As holding patterns soften, the system redistributes tension it no longer needs to carry. Twitches are reorganization, not malfunction. Nothing to suppress, nothing to chase.',
  },
  {
    q: 'What does being grounded actually mean?',
    a: 'The ability to express and choose from the ground up. Gravity establishes your directionality; a grounded body yields to it instead of bracing against it. Being ungrounded is not a mood. It is a sign of disembodiment you can feel and work with directly.',
  },
  {
    q: 'What do I do with pain or tightness when I sit?',
    a: 'Neither push through nor flee. Follow the breath to the edge of the sensation and remain there, gently, with clarity. Then get curious: what has this tension been protecting? Tension is adaptation, not failure. Treat it as a part of you that has not been heard, not a flaw to eliminate.',
  },
  {
    q: 'What is the difference between breathing and respiration?',
    a: 'Respiration is gas exchange. Breathing is a whole-being act, a cyclic wave that reflects your attention, your tension, your posture, your relationship to this moment. That is why breath works as a diagnostic: it tells the truth about your condition before you do.',
  },
  {
    q: 'What do I do with restless energy when I sit?',
    a: 'Neither suppress it nor obey it. Restlessness is signal: energy the system has been carrying all day, finally loud enough to hear. Stillness is not the absence of that movement. It is the ground that makes the movement visible. Follow the breath to where the energy actually lives and stay there with curiosity.',
  },
  {
    q: 'My practice feels flat. Is that equanimity, or is something wrong?',
    a: 'Check the body. Equanimity is full contact without reactivity: the signal is loud and clear, and you are not flinching from it. Numbness is the signal turned down — parts gone offline, feeling traded for quiet. If the flatness extends past the cushion into food, music, and people you love, that is not depth. It is armor that learned to pass as peace. The way back is contact, not more detachment. And if the loss of interest is persistent and heavy, that is territory for a professional, not more sitting.',
  },
]

// Embodiment-tagged YouTube videos from the site library, in manifest order.
// This includes John's interview and the Workshop I guided meditation; new
// tagged videos appear here without another page edit. Computed inside the
// component (not at module scope) so manifest edits show up on refresh in dev.
function getPlaylist(): PlaylistVideo[] {
  return getLibraryVideos()
    .filter(v => v.group === 'Embodiment' || v.tags?.includes('embodiment'))
    .map(v => ({
      youtubeId: v.youtubeId,
      title: v.title,
      sub: getVideoSubLabel(v),
      description: v.summary,
      start: v.start,
      duration: v.duration,
    }))
}

const hours = [
  {
    n: 1,
    title: 'Guided Meditation',
    text: 'Establishing your honest posture, live. Contact with the ground, gravity stacking the posture from the bottom up, riding the breath to the edges of sensation.',
  },
  {
    n: 2,
    title: 'Presentation',
    text: 'Disembodied nonduality as the central problem for modern practitioners, and what addresses it directly.',
  },
  {
    n: 3,
    title: 'Q&A',
    text: 'Bring your specific challenge. We’ll work through it together.',
  },
]

export default function EmbodimentWorkshopLanding() {
  const playlist = getPlaylist()
  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Free Embodiment Workshop II',
    description:
      'A free 3-hour live workshop: guided embodiment meditation, a presentation on disembodied nonduality, and live Q&A. Led by John Le, with Frank Yang and Khan as co-hosts.',
    startDate: '2026-08-01T14:00:00-04:00',
    endDate: '2026-08-01T17:00:00-04:00',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'VirtualLocation', url: EMBODIMENT_SIGNUP_URL },
    image: `${SITE}${EMBODIMENT_IMAGE}`,
    performer: [
      { '@type': 'Person', name: 'John Le' },
      { '@type': 'Person', name: 'Frank Yang' },
      { '@type': 'Person', name: 'Khan' },
    ],
    organizer: { '@type': 'Organization', name: 'Contemplative CrossFit', url: SITE },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/SoldOut',
      url: `${SITE}/embodiment`,
    },
    about: [
      'honest posture for stable absorption',
      'how to synchronize posture, breath, attention, and feeling',
      'disembodied nonduality',
      'cannot feel my body when I meditate',
      'does meditation posture actually matter',
      'why is my breath shallow when I meditate',
      'body twitching during meditation',
      'restless energy during meditation',
      'meditation feels flat — equanimity or numbness',
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px]">
          {/* Hero — poster + text as one CTA unit */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Badge>Next Workshop TBD</Badge>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary uppercase tracking-wide leading-tight">
                Embodiment Training
              </h1>
              <p className="font-body text-text-muted mt-4 text-xs uppercase tracking-[0.15em]">
                Led by John Le &middot; with Frank Yang and Khan &middot; Live on Zoom
              </p>
              <p className="font-body text-text-secondary text-lg mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                You can sit for a decade and never be introduced to the fundamentals: sitting
                posture, breathing principles, how to sync attention into stable absorption.
                Without that foundation, practice stays turbulent, inconsistent, and looping
                without growth. That is the problem this training resolves.
              </p>
              <div className="mt-12 flex flex-col items-center lg:items-start gap-4">
                {/* No workshop scheduled — the hero CTA sends people to the free courses.
                    ("Watch the VOD" → #videos was here; removed for now.) */}
                <a href="/courses" className="btn-primary px-6 py-3 inline-block">
                  Train With the Free Courses
                </a>
                <a href="#workshop" className="font-heading text-xs uppercase tracking-[0.18em] text-text-muted hover:text-accent transition-colors">
                  Get notified about the next workshop &darr;
                </a>
              </div>
            </div>
            <div className="rounded-sm overflow-hidden border border-border/40 max-w-md mx-auto lg:max-w-none w-full">
              <img
                src={EMBODIMENT_IMAGE}
                alt="Free Embodiment Workshop II with John Le — Saturday, August 1, 2PM EDT, live on Zoom"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <EmbodimentNav />

      <section className="pb-16 sm:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px]">
          {/* Player + playlist */}
          <div id="videos" className="scroll-mt-32 pt-14 max-w-3xl mx-auto">
            <WorkshopPlaylist
              videos={playlist}
              queueTitle="Embodiment Clips"
              queueLayout="grid"
            />
          </div>

          {/* Workshop */}
          <div id="workshop" className="scroll-mt-32 mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            {/* No workshop is scheduled — the Workshop I / II schedule cards (both
                completed) are replaced by a newsletter module. The hero's "Get notified"
                link and the in-page nav both land here. */}
            <KitEmailForm
              heading="Get Notified About the Next Workshop"
              subheading="Workshops I and II have run, and the next one is not scheduled yet. Leave your email and we'll tell you when it is."
              buttonLabel="Notify Me"
            />
            <h3 className="mt-14 font-heading text-xl sm:text-2xl text-text-primary uppercase tracking-wide">
              Live Training
            </h3>
            <div className="prose mt-6">
              <p>
                Every workshop runs live. You train in real time with fellow practitioners — not
                alongside a recording, but in a room where instructors can see your practice as
                it happens.
              </p>
              <p>
                That is the point of the format. When your posture braces or your attention
                drifts, you get feedback in the moment and adjust while the instruction is still
                warm. And you watch other practitioners get worked with on the challenges they
                brought, which teaches what solo practice cannot.
              </p>
            </div>
            <h3 className="mt-14 font-heading text-xl sm:text-2xl text-text-primary uppercase tracking-wide">
              What You&rsquo;ll Learn
            </h3>
            <div className="prose mt-6">
              <p>
                Dark nights, cathartic bliss. More effort. Letting go. Cycle after cycle. The
                turbulence is not a discipline problem — it is what practice does when the
                foundation was never built. In three hours you will learn:
              </p>
            </div>
            <ul className="mt-6 space-y-3 font-body text-text-secondary leading-relaxed list-disc pl-5 marker:text-accent/60">
              <li>How to find your honest posture for stable absorption</li>
              <li>How to synchronize posture, breath, attention, and feeling as one</li>
              <li>How disembodied nonduality keeps modern practitioners stuck, and what closes that gap</li>
            </ul>
          </div>

          {/* How we'll spend the 3 hours */}
          <div className="mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              How We&rsquo;ll Spend the Three Hours
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {hours.map(h => (
                <div key={h.n} className="p-5 border border-border/40 rounded-sm hover:border-accent/20 transition-colors">
                  <span className="font-heading text-xs uppercase tracking-wider text-accent">Hour {h.n}</span>
                  <h3 className="font-heading text-base uppercase tracking-wide text-text-primary mt-2">{h.title}</h3>
                  <p className="font-body text-sm text-text-secondary mt-3 leading-relaxed">{h.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Register — closed */}
          <div className="mt-20 pt-12 border-t border-border-subtle text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Workshop II Has Completed
            </h2>
            <p className="mt-4 font-body text-text-secondary leading-relaxed max-w-xl mx-auto">
              Registration is closed. Workshop II ran Saturday, August 1. While you wait for the
              next one, the free courses are open. The next live way into the CC container is the
              Mini Bootcamp &mdash; the next run is {MINI_BOOTCAMP_NEXT_DISPLAY}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="/courses" className="btn-primary px-10 py-3.5 inline-block">
                Train With the Free Courses
              </a>
              <a href="/mini-bootcamp"
                className="font-heading text-xs uppercase tracking-[0.18em] text-accent border border-accent/40 hover:border-accent rounded-sm px-10 py-3.5 inline-block transition-colors">
                See the Mini Bootcamp
              </a>
            </div>
          </div>

          {/* Pedagogy — the search-facing teaching material */}
          <div id="pedagogy" className="scroll-mt-32 mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Pedagogy
            </h2>
            <div className="prose mt-6">
              <p>
                You have done the body scans. Maybe a breathwork course, a few years of yoga. And
                you still spend most of the day from the neck up: the body a thing you manage, not
                a place you live. The signals are there — tension you discover only when it hurts,
                a breath that never drops below the collarbones, a sit that feels precise and lands
                nowhere.
              </p>
              <p>
                Embodiment is the process of making contact with everything you already are, as it
                lives in the body: every thought, emotion, habit, and pattern you sense and hold.
                Disembodiment is what most trained attention quietly becomes instead. Dissociation
                that reads as depth. Numbness that passes for equanimity. A posture performed for
                an audience of one.
              </p>
              <p>
                The workshop is contact before concept: establish the body, the ground, and the
                breath first, and every technique you already own gets traction it did not have
                before. Six movements, from the ground up. Open any section for the full outline.
              </p>
            </div>
            <div className="mt-10 space-y-4">
              {themes.map(t => (
                <details
                  key={t.n}
                  className="group border border-border rounded-sm transition-colors hover:border-accent/30 open:border-accent/30 open:bg-bg-secondary/30"
                >
                  <summary className="p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
                      <span className="w-10 h-10 rounded-sm bg-accent-muted text-accent flex items-center justify-center font-heading text-sm">
                        {String(t.n).padStart(2, '0')}
                      </span>
                      <h3 className="min-w-0 font-heading text-base uppercase tracking-wide text-text-primary group-open:text-accent transition-colors">
                        {t.title}
                      </h3>
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-text-muted group-open:rotate-180 transition-transform"
                        viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
                      >
                        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="col-span-3 mt-3 sm:col-span-1 sm:col-start-2 sm:mt-1.5 font-body text-sm text-text-secondary">
                        {t.line}
                      </p>
                    </div>
                  </summary>
                  <div className="mx-5 pt-5 pb-6 border-t border-border-subtle space-y-6">
                    <div className="space-y-3 font-body text-sm text-text-secondary leading-relaxed">
                      {t.description.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <div>
                      <p className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted">In this section</p>
                      <ul className="mt-3 space-y-1.5 font-body text-sm text-text-secondary list-disc pl-5 marker:text-accent/60">
                        {t.covers.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="scroll-mt-32 mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Questions Practitioners Ask
            </h2>
            <div className="mt-10 space-y-4">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="group border border-border rounded-sm transition-colors hover:border-accent/30 open:border-accent/30 open:bg-bg-secondary/30"
                >
                  <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-heading text-base uppercase tracking-wide text-text-primary group-open:text-accent transition-colors">
                      {f.q}
                    </h3>
                    <svg
                      className="flex-shrink-0 w-5 h-5 mt-1 text-text-muted group-open:rotate-180 transition-transform"
                      viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
                    >
                      <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="mx-5 pt-5 pb-6 border-t border-border-subtle">
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Soft bootcamp CTA */}
          <div className="mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <BootcampCTA intro="Embodiment Training is a taste of what's available inside the CC 90-Day Bootcamp — direct guidance, a sincere community, and a systematic path from foundation to realization." />
          </div>
        </div>
      </section>
    </div>
  )
}
