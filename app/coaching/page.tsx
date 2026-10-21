import type { Metadata } from 'next'
import { BootcampCTA } from '@/components/content/BootcampCTA'
import { KitEmailForm } from '@/components/ui/KitEmailForm'
import type { PlaylistVideo } from '@/components/content/WorkshopPlaylist'
import { PlaylistRows } from '@/components/content/PlaylistRows'
import { CoachingNav } from './CoachingNav'
import { TestimonialGrid } from '@/components/bootcamp/Testimonials'
import {
  COACHING_SEASON_DATES_DISPLAY,
  COHORT_NEXT_LABEL,
  COHORT_NEXT_START_DISPLAY,
  COHORT_PRIORITY_REG_DUE_DISPLAY,
} from '@/lib/cohort'

const SITE = 'https://mindtraining.cc'

// Coaching Season ad creative — same image used on Instagram.
const COACHING_IMAGE = '/images/coaching-season-ad.jpg'

// Hero poster beside the booking CTA — the "Get Feedback" post, full creative.
const FEEDBACK_IMAGE = '/images/coaching-feedback-ad.jpg'

const COACHING_DESCRIPTION =
  `A free 20-minute coaching call with the CC core team. Map your practice, find the bottleneck, and leave with a clear next step. Next season: ${COACHING_SEASON_DATES_DISPLAY} — join the newsletter to hear when the calendar opens.`

export const metadata: Metadata = {
  title: 'Coaching Season — Find Where Your Practice Is Stuck',
  description: COACHING_DESCRIPTION,
  openGraph: {
    title: 'Coaching Season — Find Where Your Practice Is Stuck',
    description: COACHING_DESCRIPTION,
    url: `${SITE}/coaching`,
    images: [{
      url: COACHING_IMAGE,
      width: 1080,
      height: 1350,
      alt: 'Coaching Season — Contemplative CrossFit. You got 99 problems on the path? Lacking feedback doesn’t have to be one. Get coached.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Season — Find Where Your Practice Is Stuck',
    description: COACHING_DESCRIPTION,
    images: [COACHING_IMAGE],
  },
}

// The 20-minute call structure, from the consultation doc.
const steps = [
  {
    n: 1,
    title: 'Map the Practice',
    text: 'Together we capture the whole picture of the work you have done — meditation, inquiry, psychedelics, shadow work. All of it on one table.',
  },
  {
    n: 2,
    title: 'Find the Bottleneck',
    text: 'We identify where and why you are stuck. A blind spot can take years to find alone. From outside, it is usually visible in minutes.',
  },
  {
    n: 3,
    title: 'Plan the Next Step',
    text: 'You leave with a clear picture of where you are, what is actually holding you back, and what can move you forward now.',
  },
]

// Core team story videos — the rotating player cycles through these while idle.
const team: PlaylistVideo[] = [
  {
    youtubeId: '4dJqJcEfJAE',
    title: 'Frank Yang',
    sub: 'Founder',
    description:
      'Pioneering contemplative artist whose practice spans a lifetime of intensity: violin, bodybuilding, mind-bending short films, and vipassanizing his way to non-dual realization. Known for extracting wisdom through creative and eccentric expression of the Dharma.',
  },
  {
    youtubeId: '5LBzCvSbNK0',
    start: 78,
    title: 'Khan',
    sub: 'Founder',
    description:
      'Graduate researcher at the University of Michigan studying mindfulness pedagogy, the modern adaptation of contemplative training, and how wisdom is recreated across cultural divides.',
  },
  {
    youtubeId: 'UnRbix1LNvE',
    title: 'Adrian',
    sub: 'Head Operator',
    description:
      'Lead Operator, and a professional therapist and counselor specializing in existential psychotherapy. He integrates Jungian psychology — shadow and archetypal work — with somatic, body-based therapy.',
  },
  {
    // John's recent interview with Frank — same video as the /embodiment page.
    youtubeId: 'WMaNb2gi5Qg',
    start: 1274,
    title: 'John Le',
    sub: 'Instructor · Embodiment',
    description:
      'Eight years of dedicated embodiment training and energetic cultivation, with a medical-field background integrated with Daoist internal alchemy. After a severe spinal injury, John developed subtle bodybuilding: systematic cultivation of energetic anatomy through breath, movement, and refined awareness.',
  },
  {
    // "Lift Your Way to Awakening — Realization Fitness & the Virtue of
    // Exertion" (CC Mentors Interview #2).
    youtubeId: 'tHBd3sCOjWk',
    title: 'Tyson',
    sub: 'Coach · Exertion',
    description:
      'Nearly twenty years of resistance training fused with Buddhist philosophy into a novel pedagogy: alchemical lifting. He has worked with world-class athletes. His focus is contemplative exertion, drawing on Nagarjuna and Shantideva to distinguish mere exertion from exertion liberated by wisdom.',
  },
  {
    youtubeId: 'Md4B5MpNb6k',
    title: 'Roger',
    sub: 'Operator',
    description:
      'A longtime seeker whose profound non-dual realizations brought periods of bliss — and left suffering and conditioning intact. That gap led him to CC, to keep training inside a relational container. He now serves on the operating team.',
    start: 3245,
  },
]

const phases = [
  {
    label: 'Weeks 1–6',
    title: 'Stabilization',
    text: 'Daily practice. Meditation, feedback, integration. Repeat. You build capacity and watch your patterns in real time. A team of mentors tracks how your mind moves, and you share momentum with dozens of co-practitioners as dedicated as you are.',
  },
  {
    label: 'Weeks 7–9',
    title: 'Cessation',
    text: 'Direct pointing at your deepest, most subtle clinging: the narratives, the somatic habits, the emotional patterns. Then you are asked to rest, let go, and move forward. In transmission you see directly — emotionally, viscerally, conceptually — how you have been holding a self that does not inherently exist.',
  },
  {
    label: 'Weeks 10–12',
    title: 'Integration',
    text: 'Daily living becomes practice. The split between your spiritual life and your actual life collapses. Your loved ones notice. Your co-workers notice. The structure of your being has changed.',
  },
]

export default function CoachingCallLanding() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Coaching Season',
    serviceType: 'Meditation practice consultation',
    description:
      'A free 20-minute 1-on-1 coaching call for committed practitioners: map your practice, identify the bottleneck, and plan the next step.',
    image: `${SITE}${COACHING_IMAGE}`,
    provider: { '@type': 'Organization', name: 'Contemplative CrossFit', url: SITE },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/LimitedAvailability',
      url: `${SITE}/coaching`,
    },
  }

  return (
    <div className="animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Hero — poster + text as one CTA unit */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary uppercase tracking-wide leading-tight">
                Coaching Season
              </h1>
              <p className="font-body text-text-muted mt-4 text-xs uppercase tracking-[0.15em]">
                With the CC core team &middot; 20 minutes &middot; Free &middot; Live on Zoom &middot; Next Season {COACHING_SEASON_DATES_DISPLAY}
              </p>
              <p className="font-body text-text-secondary text-lg mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                We are a team of practitioners who train together, and each Coaching Season we
                open the calendar to talk with more people. Twenty minutes to meet one of us and
                say plainly where your practice actually stands. You do not need years behind you
                or the right vocabulary. Bring an honest account of where you are. The aspiration
                is simple: that we practice all together.
              </p>
              {/* The season is between runs and the old Zoom scheduler link is dead —
                  the hero CTA is email capture until the calendar reopens. */}
              <div id="newsletter" className="mt-12 scroll-mt-32">
                <KitEmailForm
                  heading=""
                  subheading={`The next Coaching Season runs ${COACHING_SEASON_DATES_DISPLAY}. Leave your email and we'll tell you when the calendar opens.`}
                  buttonLabel="Notify Me"
                />
              </div>
            </div>
            <div className="rounded-sm overflow-hidden border border-border/40 max-w-md mx-auto lg:max-w-none w-full">
              <img
                src={COACHING_IMAGE}
                alt="Coaching Season — Contemplative CrossFit. Caricature figurines of the CC core team gathered around a seated Buddha on a film set. You got 99 problems on the path? Lacking feedback doesn't have to be one. Get coached."
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <CoachingNav />

      <section className="pb-16 sm:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px]">

          {/* The call */}
          <div id="call" className="scroll-mt-32 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              What Happens in Twenty Minutes
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {steps.map(s => (
                <div key={s.n} className="p-5 border border-border/40 rounded-sm hover:border-accent/20 transition-colors">
                  <span className="font-heading text-xs uppercase tracking-wider text-accent">Step {s.n}</span>
                  <h3 className="font-heading text-base uppercase tracking-wide text-text-primary mt-2">{s.title}</h3>
                  <p className="font-body text-sm text-text-secondary mt-3 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-text-secondary leading-relaxed mt-8">
              If the call reveals that the 90-Day Bootcamp is the right container for you, we
              will say so. If it is not, we will say that too.
            </p>
          </div>

          {/* Team — every core-team video as a full row: small player left, description right */}
          <div id="team" className="scroll-mt-32 mt-20 pt-12 border-t border-border-subtle max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Who You&rsquo;ll Work With
            </h2>
            <p className="font-body text-text-secondary leading-relaxed mt-6">
              Your call is with one of the core team — practitioners living this work. Their
              stories are below.
            </p>
            <div className="mt-10">
              <PlaylistRows videos={team} />
            </div>
          </div>

          {/* Mid CTA — Feedback poster and the booking link share a row.
              Poster sits left here, mirroring the hero's text-left/poster-right. */}
          <div className="mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,320px)_1fr] gap-10 sm:gap-12 items-center">
              <div className="rounded-sm overflow-hidden border border-border/40 max-w-sm mx-auto sm:mx-0 w-full">
                <img
                  src={FEEDBACK_IMAGE}
                  alt="Get Feedback — caricature figurines of Khan and Frank Yang fitting headphones onto a seated Buddha statue, with the captions: We got you broski! Come train, eh! and It doesn't have to be so hard bro..."
                  className="w-full"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
                  1-on-1 Coaching
                </h2>
                <p className="font-body text-text-secondary leading-relaxed mt-5">
                  Twenty minutes, free, on Zoom. The next season runs {COACHING_SEASON_DATES_DISPLAY}.
                </p>
                <div className="mt-8">
                  <a href="#newsletter"
                    className="btn-primary px-10 py-3.5 inline-block">
                    Get Notified
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bootcamp path */}
          <div id="bootcamp" className="scroll-mt-32 mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Where This Leads
            </h2>
            <p className="font-body text-text-secondary leading-relaxed mt-6">
              The twenty minutes stand on their own. If the call points toward a longer
              container, this is the one we run: the 90-Day Bootcamp. Dozens of practitioners
              have made a lasting breakthrough inside it. {COHORT_NEXT_LABEL} starts {COHORT_NEXT_START_DISPLAY}, and priority
              registration closes {COHORT_PRIORITY_REG_DUE_DISPLAY}. If the timing is not right, we will say that just as plainly.
            </p>
            <div className="mt-10 space-y-4">
              {phases.map(p => (
                <div key={p.label} className="p-5 border border-border rounded-sm">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-accent">{p.label}</p>
                  <h3 className="font-heading text-base uppercase tracking-wide text-text-primary mt-2">{p.title}</h3>
                  <p className="font-body text-sm text-text-secondary mt-3 leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
            <a href="/bootcamp"
              className="inline-block mt-8 font-heading text-xs uppercase tracking-[0.18em] text-accent hover:text-text-primary transition-colors">
              See the full program &rarr;
            </a>
          </div>

          {/* Testimonials */}
          <div id="testimonials" className="scroll-mt-32 mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Real Transformations from Real People
            </h2>
            <TestimonialGrid />
          </div>

          {/* Final CTA */}
          <div className="mt-20 pt-12 border-t border-border-subtle text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Hear When It Opens
            </h2>
            <p className="mt-4 font-body text-text-secondary leading-relaxed max-w-xl mx-auto">
              The calendar opens {COACHING_SEASON_DATES_DISPLAY}. Come with your practice history and one honest question.
              Leave knowing where you are, what is in the way, and what moves it.
            </p>
            <div className="mt-8">
              <a href="#newsletter"
                className="btn-primary px-10 py-3.5 inline-block">
                Get Notified
              </a>
            </div>
            <p className="mt-4 font-heading text-xs uppercase tracking-[0.18em] text-text-muted">
              20 minutes &middot; Free &middot; Live on Zoom
            </p>
          </div>

          {/* Soft bootcamp CTA */}
          <div className="mt-20 pt-12 border-t border-border-subtle max-w-3xl mx-auto">
            <BootcampCTA intro="The coaching call is the seed of a longer relationship. If the work resonates, the CC 90-Day Bootcamp is where it continues — direct guidance, a community of honest and committed practitioners, and a systematic path from foundation to realization." />
          </div>
        </div>
      </section>
    </div>
  )
}
