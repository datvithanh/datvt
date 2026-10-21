import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/content/Breadcrumb'
import { BootcampCTA } from '@/components/content/BootcampCTA'
import { VideoThumb } from '@/components/ui/VideoThumb'
import { getPackageClips, pickPreview } from '@/lib/media'
import { SHOW_COACHING_CALL } from '@/lib/flags'

const COURSE_SLUG = 'transmission-101-staying-present'

// The debrief uses a steel accent (#7d9aa8) instead of amber throughout —
// amber marks transmissions; the color shift signals this page is not one.

export const metadata: Metadata = {
  title: 'Debrief — Staying Present',
  description: SHOW_COACHING_CALL
    ? 'The course is behind you. How to return to the material, book a free coaching call, and find the community where practice continues.'
    : 'The course is behind you. How to return to the material, and find the community where practice continues.',
}

export default function DebriefPage() {
  // Two best-of discussion clips — thumbnails linking into the videos section.
  const clips = pickPreview(getPackageClips(COURSE_SLUG), 2)
  return (
    <div className="animate-fade-in">
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Courses', href: '/courses' },
              { label: 'Transmission 101', href: `/courses/${COURSE_SLUG}` },
              { label: 'Debrief' },
            ]}
          />

          {/* Header */}
          <p className="text-xs font-heading uppercase tracking-[0.2em] text-[#7d9aa8] mt-6">
            Debrief
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary mt-3 uppercase tracking-wide leading-tight">
            The Debrief
          </h1>
          <p className="font-body text-text-secondary text-lg mt-4 italic">
            The teaching is done. This is orientation for what comes next.
          </p>

          <div className="prose mt-10">
            <p>
              The five lessons keep working on you after the last one ends. The debrief is not a
              sixth transmission and there is no new teaching in it. It is a short briefing on what
              to do with what you saw: how to return to the material, who to talk to, and where
              practice goes from here.
            </p>
          </div>

          {/* 1. Reconsume */}
          <div className="mt-16 pt-12 border-t border-border-subtle">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Go Back Through It
            </h2>
            <div className="prose mt-6">
              <p>
                One pass through this course is an introduction. The lessons were built for return:
                what you couldn&rsquo;t hear the first time is usually the exact thing you were
                leaving, and it will still be there on the second pass.
              </p>
              <p>
                Start with the lesson that irritated you. Irritation is contention, and contention
                marks the edge of the structure you spent five lessons studying. Re-watch the
                transmission before you re-read the written material. Then sit.
              </p>
              <p>
                Keep a journal alongside the second pass. Treat it as a playground, not an
                assignment. Note whatever feels relevant, and practice honest expression in
                whatever form it wants to take: writing, drawing, music, photographs, a meal you
                cooked. An open container where your meaning-making can be given form.
              </p>
              <blockquote>
                <p><em>Understanding arrives on the return trip.</em></p>
              </blockquote>
            </div>
            <div className="mt-8">
              <Link
                href={`/courses/${COURSE_SLUG}`}
                className="font-heading text-xs uppercase tracking-[0.15em] text-[#7d9aa8] hover:text-text-primary transition-colors"
              >
                Revisit the five lessons &rarr;
              </Link>
            </div>
          </div>

          {/* 2. Trust the other — community welcome + free coaching call (primary CTA).
              The coaching-call paragraph and button are hidden between coaching
              seasons via SHOW_COACHING_CALL (lib/flags.ts). */}
          <div className="mt-16 pt-12 border-t border-border-subtle">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
              Let Yourself Be Seen
            </h2>
            <div className="prose mt-6">
              <p>
                Every lesson pointed at the same limit: you cannot fully see your own structure.
                The attention you would use to catch the pattern is built by the pattern. Past
                this point, the next step is not a better technique. It is another person.
              </p>
              <p>
                That step asks for trust, and trust builds the way stability did &mdash; through
                contact, in small honest doses. This community is where that happens, and you are
                welcome in it. Not once you&rsquo;re further along. As you are now.
              </p>
              {SHOW_COACHING_CALL && (
                <p>
                  Start with a free coaching call: twenty minutes, one-on-one, with a member of the
                  core team. Bring the pattern you keep catching, or the lesson you keep arguing
                  with. You leave with a precise read on where your practice actually is, and a
                  clear next step.
                </p>
              )}
            </div>
            {SHOW_COACHING_CALL && (
              <div className="mt-8 text-center">
                <Link
                  href="/coaching"
                  className="inline-block px-8 py-3 font-heading text-xs uppercase tracking-[0.15em] text-[#7d9aa8] border border-[#7d9aa8] rounded-sm hover:bg-[#7d9aa8]/10 transition-colors"
                >
                  Book a Free Coaching Call
                </Link>
              </div>
            )}
            <div className="prose mt-10">
              <p>
                The wider field already exists. The CC Discord runs daily: sits, questions, and
                practitioners comparing notes on the same patterns you just spent five lessons
                naming.
              </p>
            </div>

            {/* Discussion clips — thumbnails linking into the videos section */}
            {clips.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clips.map(v => (
                  <Link
                    key={v.id}
                    href={`/courses/videos/${COURSE_SLUG}/${v.id}`}
                    className="group block border border-border/40 rounded-sm overflow-hidden hover:border-[#7d9aa8]/60 transition-colors"
                  >
                    <div className="aspect-video overflow-hidden">
                      <VideoThumb
                        youtubeId={v.youtubeId}
                        alt={v.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="block p-4 font-heading text-[11px] uppercase tracking-wider text-text-muted group-hover:text-[#7d9aa8] transition-colors">
                      {v.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Social links */}
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href="https://www.youtube.com/@ContemplativeCrossFit"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted hover:text-text-primary transition-colors"
              >
                YouTube &rarr;
              </a>
              <a
                href="https://www.instagram.com/contemplativecrossfit/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted hover:text-text-primary transition-colors"
              >
                Instagram &rarr;
              </a>
            </div>
          </div>

          {/* Soft bootcamp pitch */}
          <div className="mt-16 pt-12 border-t border-border-subtle">
            <BootcampCTA intro="The 90-Day Bootcamp is the intensive form: daily training inside a container that does not bend to preference, with direct guidance and a community that operates at your level." />
            <div className="mt-10 text-center">
              <Link href="/bootcamp" className="btn-primary px-8 py-3 inline-block">
                &rarr; Full Bootcamp Details
              </Link>
            </div>
          </div>

          {/* Bottom nav */}
          <nav className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <Link
              href={`/courses/${COURSE_SLUG}/05-the-end-of-negotiation`}
              className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]"
            >
              &larr; Lesson 05
            </Link>
            <Link
              href={`/courses/${COURSE_SLUG}`}
              className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]"
            >
              Course Overview &rarr;
            </Link>
          </nav>
        </div>
      </section>
    </div>
  )
}
