import { Badge, AccentLine } from '@/components/bootcamp/primitives'

const valueStack = [
  {
    label: '180 Live Training Sessions',
    sub: 'Monday–Friday, three times daily. New transmission for every session — not recordings on rotation. The model that cuts straight to self-emptiness, repeated until it lands.',
  },
  {
    label: '180 Live Reflection Sessions',
    sub: 'Held immediately after each training, with the people who just sat with you. Same-day pointing-out, not six-months-later processing.',
  },
  {
    label: 'Many-on-One Mentoring',
    sub: 'Receive full support from a network of senior practitioners through every stage of deconstruction and integration.',
  },
  {
    label: 'Direct Transmission from Meicheng',
    sub: '100,000 prostrations is the traditional deal in many lineages to receive something like this. Daily. Online. For ninety days.',
  },
]

const includedBonuses = [
  {
    title: 'Discord access',
    desc: 'Training logs, ongoing connection with sincere co-practitioners moving through it with you.',
  },
  {
    title: 'Weekly community events',
    desc: 'Recap, surface what came up, build relational sangha.',
  },
  {
    title: 'Meicheng\'s private teachings',
    desc: 'Weekly talk shows with senior members. New teaching dropped every week.',
  },
  {
    title: 'Continued access after bootcamp',
    desc: 'Alumni network with ongoing transmission from Taylor at lower cadence.',
  },
]

export function PricingPanel() {
  return (
    <div>
      {/* Value Stack */}
      <section className="py-12 sm:py-16 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-accent">What&rsquo;s in the deal</h2>
          <h3 className="font-heading text-2xl sm:text-3xl text-text-primary mt-4 uppercase tracking-wide">
            Four components, one container
          </h3>
          <p className="font-body text-text-muted text-sm mt-4 leading-relaxed">
            Direct transmission isn&rsquo;t something we want to put a price tag on. What we can name is the
            structure that holds it.
          </p>

          <div className="mt-10 p-6 sm:p-8 border border-border rounded-sm">
            <div className="space-y-6">
              {valueStack.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-6 pb-6 border-b border-border-subtle last:border-b-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="font-heading text-sm uppercase tracking-wider text-text-primary">{item.label}</p>
                    <p className="font-body text-text-muted text-sm mt-2 leading-relaxed">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-accent-muted border border-accent/20 rounded-sm flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-heading text-xs uppercase tracking-wider text-text-muted">Your investment</p>
                <p className="font-heading text-4xl text-accent mt-1">$2,450</p>
                <p className="font-body text-text-muted text-xs mt-1">USD &middot; 12 weeks</p>
              </div>
              <a
                href="#footer-newsletter"
                className="inline-block bg-bg-primary text-accent border border-accent hover:text-accent-hover hover:border-accent-hover font-heading text-xs uppercase tracking-[0.15em] rounded-sm transition-colors px-8 py-3 self-center"
              >
                Priority Registration
              </a>
            </div>
          </div>
        </div>
      </section>

      <AccentLine />

      {/* Included Bonuses */}
      <section className="py-12 sm:py-16 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-accent">Included</h2>
          <h3 className="font-heading text-2xl sm:text-3xl text-text-primary mt-4 uppercase tracking-wide">
            Beyond the daily training
          </h3>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {includedBonuses.map((b, i) => (
              <div key={i} className="p-6 border border-border/40 rounded-sm">
                <p className="font-heading text-sm uppercase tracking-wider text-accent">{b.title}</p>
                <p className="font-body text-text-secondary mt-3 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AccentLine />

      {/* Payment Options */}
      <section className="py-12 sm:py-16 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-accent">Payment</h2>
          <h3 className="font-heading text-2xl sm:text-3xl text-text-primary mt-4 uppercase tracking-wide">
            How you pay
          </h3>

          <div className="mt-8 space-y-4 font-body text-text-secondary leading-relaxed">
            <p>
              We expect payment within one week from the announcement of your result. Details for payment will be sent in
              an email from <a href="mailto:operator@mindtraining.cc" className="text-accent hover:text-accent-hover transition-colors">operator@mindtraining.cc</a>.
            </p>
            <p className="font-body text-text-muted text-sm italic">
              Note: if you require a payment plan, let us know in your application. We work with practitioners across
              exchange rates and cash-flow shapes &mdash; tell us what makes it workable and we&rsquo;ll meet you there.
            </p>
          </div>

          <div className="mt-12">
            <h4 className="font-heading text-sm uppercase tracking-wider text-text-primary">Referral discount</h4>
            <p className="font-body text-text-muted text-sm mt-2">
              If someone who finished a previous Bootcamp recommended you, tell us who in your
              application. You&rsquo;re eligible for 10% off.
            </p>
          </div>
        </div>
      </section>

      <AccentLine />

      {/* On the money */}
      <section className="py-12 sm:py-16 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-accent">On the money</h2>

          <blockquote className="mt-6 border-l-2 border-accent/40 pl-6 py-2">
            <p className="font-body text-lg sm:text-xl text-text-primary italic leading-relaxed">
              The money is an interesting thing. It&rsquo;s our version of commitment.
            </p>
          </blockquote>

          <p className="font-body text-text-secondary mt-6 leading-relaxed">
            If you&rsquo;re rallying only on the basis of getting in &mdash; without sorting out how you&rsquo;re going to
            pay for it, how you&rsquo;re going to keep showing up for the world while you do this work &mdash; the practice
            becomes another version of avoidance. We&rsquo;ve seen it. The price isn&rsquo;t a barrier. It&rsquo;s a mirror.
          </p>
        </div>
      </section>

      <AccentLine />

      {/* Fit assessment / quiet trust beat */}
      <section className="py-12 sm:py-16 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-accent">Before you apply</h2>
          <h3 className="font-heading text-2xl sm:text-3xl text-text-primary mt-4 uppercase tracking-wide">
            We will be honest with you about fit
          </h3>

          <p className="font-body text-text-secondary mt-6 leading-relaxed">
            Application is ten written questions and a 10-minute self-introduction video. The team takes about two weeks
            to look at fit, in both directions. Sometimes the answer is that this container is not the right one right
            now. That is a statement about timing and format, never about whether you belong in practice.
          </p>
          <p className="font-body text-text-secondary mt-4 leading-relaxed">
            If we don&rsquo;t see fit, we&rsquo;ll tell you what we&rsquo;re seeing and point you at what might serve you
            better &mdash; a structured retreat, more time with your current teacher, checking back in six months.
            Fit matters more than enrollment.
          </p>
          <div className="mt-8">
            <a
              href="#footer-newsletter"
              className="btn-primary px-8 py-3 inline-block"
            >
              Get Priority Registration
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
