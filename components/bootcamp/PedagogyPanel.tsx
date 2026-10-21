import { Badge, AccentLine } from '@/components/bootcamp/primitives'

export function PedagogyPanel() {
  return (
    <div>
      {/* The Gap (Is This You) */}
      <section id="the-gap" className="scroll-mt-32 py-16 sm:py-20 bg-bg-secondary/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>The Gap</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
            This Is For You If...
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Tired of Practicing Alone", desc: "You've carried the practice by yourself for years. Books, apps, retreats, then back to a life where no one sees how your mind actually moves. The discipline isn't the problem. The isolation is." },
              { title: "Hitting an Integration Ceiling", desc: "Your meditation insights aren't translating to daily life. You've hit a plateau despite consistent practice. The gap between cushion and world won't close on its own." },
              { title: "Stable Life, Incomplete Practice", desc: "Your life outside practice is steady enough to build on. But practice stays in its own compartment. Spiritual over here, regular life over there." },
              { title: "Seeking Structure, Not Techniques", desc: "You don't need another app, book, or method. You need systematic deconstruction, daily community feedback, and a teacher who knows your patterns." },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-border/40 rounded-sm hover:border-accent/30 transition-colors">
                <h3 className="font-heading text-sm uppercase tracking-wider text-accent">{item.title}</h3>
                <p className="font-body text-text-secondary mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-sm uppercase tracking-[0.15em] text-text-muted mb-5">This may not be the right time if...</h3>
            <div className="space-y-3 font-body text-text-secondary">
              {[
                "You are in acute crisis, or life needs stabilizing first. That work comes before this work, and it matters more",
                "You are looking for pleasant states or a fast breakthrough. What happens here is slower and less comfortable than that",
                "You are looking for career guidance or life purpose. That is real work. It is not the work we do here",
                "You cannot commit to 12 weeks of daily practice right now. The daily rhythm is what makes it work, so a half-attended cohort serves nobody",
              ].map((item, i) => (
                <p key={i} className="flex items-start gap-3">
                  <span className="text-text-muted/50 flex-shrink-0">&mdash;</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AccentLine />

      {/* The Problem */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>The Problem</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
            Modern Mind Training Has a Systemic Problem
          </h2>
          <div className="mt-8 space-y-5 font-body text-text-secondary leading-relaxed">
            <p className="font-body italic text-text-muted text-lg">
              &ldquo;Am I doing this right? Why don&apos;t the effects stick? What am I actually missing?&rdquo;
            </p>
            <p className="text-accent font-heading text-sm uppercase tracking-wider">And it&apos;s not your fault.</p>
            <p>
              Access to quality materials does not mean access to qualified teachers and communities.
              The problem isn&apos;t your effort &mdash; it&apos;s the missing structure around it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Years Stuck", desc: "Countless hours of practice with little progress. You know there's something missing, but can't figure out what." },
              { title: "Dark Nights", desc: "Challenging experiences with no guidance. You're navigating difficult territory alone, uncertain if you're on the right path." },
              { title: "Confusion & Contradictions", desc: "Too many teachers saying different things, leaving you more confused than when you started." },
              { title: "Isolation", desc: "Practicing alone without community support. No one to share experiences with, no one to help when you get stuck." },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-border/40 rounded-sm hover:border-accent/30 transition-colors">
                <h3 className="font-heading text-sm uppercase tracking-wider text-accent">{item.title}</h3>
                <p className="font-body text-text-secondary mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-l-2 border-accent/40 pl-6">
            <blockquote className="font-body text-text-muted italic leading-relaxed">
              &ldquo;Classically, qualified teachers would be working in close proximity with qualified students.
              These three aspects must form a cohesive system.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      <AccentLine />

      {/* The Solution */}
      <section className="py-16 sm:py-20 bg-bg-secondary/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>The Solution</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
            A Complete Path with Qualified Teachers
          </h2>
          <p className="font-body text-text-secondary mt-6 leading-relaxed">
            What was traditionally available only through intensive in-person training &mdash; now accessible online through our systematic 90-day program.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { num: "01", title: "Direct Guidance", desc: "Real-time personalized instruction from an experienced teacher who can guide you through challenges." },
              { num: "02", title: "Personalized Instruction", desc: "Tailored guidance based on your unique karma, lifestyle, and needs." },
              { num: "03", title: "Systematic Path", desc: "Complete, sequential progression from foundation to realization." },
              { num: "04", title: "Real Community", desc: "Honest, committed co-practitioners who stay with you through the hard parts." },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-border/40 rounded-sm hover:border-accent/30 transition-colors">
                <span className="font-heading text-xs text-accent/50">{item.num}</span>
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-primary mt-1.5">{item.title}</h3>
                <p className="font-body text-text-secondary mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 border border-accent/20 rounded-sm bg-accent-muted">
            <h3 className="font-heading text-sm uppercase tracking-wider text-accent">A Living Lineage</h3>
            <p className="font-body text-text-secondary mt-4 leading-relaxed">
              Led by a transmission holder with a team of mentors who train daily under him.
              Everyone pointing at something here is still practicing it themselves. That is what we mean by lineage: not a credential, but a line of people who keep doing the work.
            </p>
          </div>
        </div>
      </section>

      <AccentLine />

      {/* Four Pillars (Pedagogy) */}
      <section id="pedagogy" className="scroll-mt-32 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>Methodology</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
            The Four Pillars of Transformation
          </h2>
          <p className="font-body text-text-secondary mt-4">Our comprehensive approach addresses every aspect of the path.</p>

          <div className="mt-10 space-y-6">
            {[
              {
                num: "01", title: "Absorption", subtitle: "Skills to enter and abide in samadhi",
                desc: "Training in form and formless jhanas with personalized instructions that work for you. Develop reliable access to meditative states through transmission-based practice.",
                features: ["Form and formless jhana training", "Different geometries of experience", "Personalized instruction", "Reliable state access"]
              },
              {
                num: "02", title: "Purification", subtitle: "Skills to re-pattern habits and afflictions",
                desc: "Work with karmic tendencies and transform afflictions into wisdom. Practical lifestyle changes including diet, exercise, and shadow work.",
                features: ["Karmic pattern work", "Affliction transformation", "Lifestyle optimization", "Shadow integration"]
              },
              {
                num: "03", title: "View Refinement", subtitle: "Developing insight through cognitive clarity",
                desc: "Break through false illusions and understand emptiness correctly. Move beyond low-resolution thinking through philosophical training.",
                features: ["Emptiness understanding", "Philosophical training", "Cognitive deconditioning", "Ultimate view refinement"]
              },
              {
                num: "04", title: "Companionship", subtitle: "A community of honest, committed practitioners",
                desc: "Build connections with co-practitioners who support you through challenges and celebrate your triumphs. Create our digital School of Athens together.",
                features: ["Peer support network", "Shared experiences", "Collective growth", "Lifelong connections"]
              },
            ].map((pillar, i) => (
              <div key={i} className="p-8 border border-border/40 rounded-sm hover:border-accent/20 transition-colors">
                <div className="grid grid-cols-[auto_1fr] items-center sm:items-start gap-x-5">
                  <span className="font-heading text-2xl text-accent/40 leading-none">{pillar.num}</span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-base uppercase tracking-wider text-text-primary">{pillar.title}</h3>
                    <p className="font-body text-text-muted text-xs italic mt-1">{pillar.subtitle}</p>
                  </div>
                  <div className="col-span-2 mt-4 pt-4 border-t border-border-subtle">
                    <p className="font-body text-text-secondary leading-relaxed">{pillar.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {pillar.features.map((f, j) => (
                        <span key={j} className="font-body text-xs text-text-muted/80 border border-border-subtle/60 px-2.5 py-1 rounded-sm">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AccentLine />

      {/* Bootcamp Structure */}
      <section className="py-16 sm:py-20 bg-bg-secondary/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>The Journey</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
            What 12 Weeks Actually Looks Like
          </h2>
          <p className="font-body text-text-secondary mt-4 leading-relaxed">A structured path from building capacity to living transformation.</p>

          <div className="mt-12 space-y-10">
            {[
              {
                weeks: "1-6", title: "Stabilization",
                desc: "Daily practice. Meditation. You build capacity and notice your patterns in real time. Your mentor is watching how your mind moves.",
                example: "Your mentor notices you dissociate every time anger arises. That becomes your edge."
              },
              {
                weeks: "7-9", title: "Deconstruction",
                desc: "Direct pointing. We show you exactly how you construct reality. The narratives, the somatic habits, the emotional patterns.",
                example: "In a session with the transmission holder, you see directly — not conceptually — how you've been constructing a self that doesn't exist."
              },
              {
                weeks: "10-12", title: "Integration",
                desc: "You live it. Daily life becomes your practice. The compartmentalization between your spiritual life and your actual life collapses.",
                example: "Your wife notices you're different. Your co-workers notice. Not because you're performing growth — because the structure has changed."
              },
            ].map((phase, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <div className="flex-shrink-0 flex items-baseline gap-2 sm:block sm:w-20 sm:text-right sm:pt-1">
                  <span className="text-accent font-heading text-xl">{phase.weeks}</span>
                  <span className="text-text-muted text-xs font-body sm:block sm:mt-0.5">weeks</span>
                </div>
                <div className="border-t-2 border-accent/20 pt-4 sm:border-t-0 sm:border-l-2 sm:pt-0 sm:pl-8 pb-2">
                  <h3 className="font-heading text-lg text-text-primary uppercase tracking-wide">{phase.title}</h3>
                  <p className="font-body text-text-secondary mt-3 leading-relaxed">{phase.desc}</p>
                  <p className="font-body text-accent/70 text-xs mt-3 italic">{phase.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AccentLine />

      {/* Personalized Attention */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>Our Approach</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
            Personalized Attention by Design
          </h2>
          <p className="font-body text-text-secondary mt-6 leading-relaxed">
            We stay small so every practitioner gets real attention. Nothing here works without actual relationships.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full font-body text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="font-heading text-xs uppercase tracking-wider text-text-muted text-left py-4 pr-2 sm:pr-4"></th>
                  <th className="font-heading text-xs uppercase tracking-wider text-text-muted text-center py-4 px-2 sm:px-3">Apps</th>
                  <th className="font-heading text-xs uppercase tracking-wider text-text-muted text-center py-4 px-2 sm:px-3">Groups</th>
                  <th className="font-heading text-xs uppercase tracking-wider text-accent text-center py-4 px-2 sm:px-3 border-x border-accent/10">CC</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {[
                  { label: 'Students/teacher', app: '100k+', group: '100-500', cc: '10-20' },
                  { label: 'Personalized feedback', app: 'None', group: 'Limited', cc: 'Daily' },
                  { label: 'Knows your name', app: 'No', group: 'Maybe', cc: 'Yes' },
                  { label: 'Knows your patterns', app: 'No', group: 'No', cc: 'Yes' },
                  { label: '3am support', app: 'Bot', group: 'No', cc: 'Mentor' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border-subtle">
                    <td className="py-4 pr-2 sm:pr-4 text-text-muted">{row.label}</td>
                    <td className="text-center py-4 px-2 sm:px-3">{row.app}</td>
                    <td className="text-center py-4 px-2 sm:px-3">{row.group}</td>
                    <td className="text-center py-4 px-2 sm:px-3 text-accent border-x border-accent/10 bg-accent-muted">{row.cc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-body text-text-muted text-xs mt-8 italic">
            Cohorts are capped at 25. That number is what makes this level of attention possible.
          </p>

        </div>
      </section>
    </div>
  )
}
