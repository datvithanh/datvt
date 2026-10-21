import Link from 'next/link'
import {
  MINI_BOOTCAMP_NEXT_DISPLAY,
  COACHING_SEASON_DATES_DISPLAY,
  COHORT_NEXT_LABEL,
  COHORT_NEXT_START_DISPLAY,
  COHORT_NEXT_YEAR,
  COHORT_PRIORITY_REG_DUE_DISPLAY,
} from '@/lib/cohort'

export const faqItems = [
  { q: "How much meditation experience do I need?", a: "The question to ask isn't how long you've practiced — it's whether you've had genuine insight that hasn't transferred to your daily life. People arrive at that point through formal sitting practice, intensive retreat, non-duality work, and other paths. What matters is where you are, not how you got there. If you're unsure whether you're ready, book a free 20-minute coaching call during Coaching Season and we'll tell you honestly." },
  { q: "Am I realized enough to join the bootcamp?", a: "The most common question we hear from people hesitating at the application. After two years of cohorts, the honest observation is this: practitioners with decades of experience arrive feeling like they're beginning all over again, while people who never had a formal practice have cultivated enough stability within 12 weeks to have a glimpse of self-emptiness realization. The container meets you wherever you're starting from. The combination of daily training, a team of teachers and mentors, and a community where everyone helps everyone else moves practitioners at every level. The question isn't whether you're realized enough to start — it's whether you're willing to show up." },
  { q: "How much time do I need to commit?", a: "You commit to one of the listed sessions per day, 5 days per week, for 12 weeks. Check the schedule above and confirm the cohort timetable with the team before enrolling. There are also weekly community sessions on Saturdays." },
  { q: "Can I attend more than one session a day?", a: "Yes. The commitment is one session per day, five days a week — but plenty of practitioners sit twice, occasionally three times. Use whichever combination works for your schedule and energy. We'd rather you fully commit to one session than half-show to three." },
  { q: "What if I have a schedule conflict — a planned retreat or a family emergency?", a: "Conflicts come up. Past cohort members have worked through silent retreats already on the calendar, the birth of a child, and family emergencies. The commitment is serious, but we work with you. Typically that means you keep up your own sitting during the gap and rejoin the live sessions when you're able. Let us know what's coming so we can plan together." },
  { q: "How is this different from therapy or coaching?", a: "Therapy works with your wounds. Coaching works with your goals. CC works with your capacity to see. We're not healing the past or optimizing performance — we're deconstructing the structure of how you experience reality itself." },
  { q: "What results can I expect?", a: "Practitioners report: reliable absorption skills, transformed relationships with emotions, clearer understanding of emptiness, deeper community connections, and progress toward self-emptiness realization. The transformation is reliably magical when you put in the work." },
  { q: "What's a transmission holder?", a: "Someone who has completed the path and can point directly to what's true. Mei Cheng holds the lineage and leads the deepest work. The mentors train under him, daily, and keep training. Nobody here is pointing at something they stopped practicing." },
  { q: "Is CC affiliated with any particular Buddhist tradition?", a: "CC is culturally independent while drawing from multiple lineages (Theravada, Mahayana, Vajrayana, Dzogchen). We focus on universal principles of mind training that work regardless of cultural background." },
  { q: "Can I join from anywhere in the world?", a: "Yes. Sessions are conducted via Zoom. With three daily session times, there's a slot that works for most time zones." },
  { q: "I already work with a teacher. Will this conflict?", a: "The bootcamp complements existing teacher relationships by providing daily community practice and feedback loops that monthly sessions can't offer. Many participants continue working with their primary teachers. That said, if you're already receiving intensive daily guidance from another teacher, the bootcamp may be redundant — we'd rather you invest your time where it creates the most value." },
  { q: "My path hasn't been traditional. Can I still join?", a: "CC practitioners arrive through many doors — formal retreat, psychedelics, non-duality work, somatic practice, contemplation. The entry requirement isn't a specific path, it's a specific state: you've had genuine insight, and it hasn't transferred to daily life. If that's where you are, book a call and we'll assess fit together." },
  { q: "What if I'm not ready?", a: "We'll tell you directly. Not everyone is ready. If you're not there yet, we'll point you toward what might serve you better — a structured retreat, more daily practice, or checking in again in 6-12 months. The practitioners who wait for the right timing often have the best outcomes." },
  {
    q: "Can I see what the bootcamp is like before applying?",
    a: (
      <>
        Yes. We run a free Mini Bootcamp roughly once a quarter &mdash; five days of free live training in the same format as the bootcamp. The next one runs {MINI_BOOTCAMP_NEXT_DISPLAY}; see{' '}
        <Link href="/mini-bootcamp" className="text-accent hover:underline transition-colors">/mini-bootcamp</Link>{' '}
        to be notified when registration opens.
      </>
    ),
  },
  {
    q: "When does the next cohort start?",
    a: (
      <>
        {COHORT_NEXT_LABEL} begins {COHORT_NEXT_START_DISPLAY}, {COHORT_NEXT_YEAR} and runs 12 weeks.
        {COHORT_PRIORITY_REG_DUE_DISPLAY ? ` Priority registration is open through ${COHORT_PRIORITY_REG_DUE_DISPLAY}.` : ''}
        {' '}Before it starts, Coaching Season ({COACHING_SEASON_DATES_DISPLAY}) and the free Mini Bootcamp ({MINI_BOOTCAMP_NEXT_DISPLAY}) are the two ways to meet the team and find out whether the bootcamp is your timing. See{' '}
        <Link href="/coaching" className="text-accent hover:underline transition-colors">/coaching</Link>{' '}
        and{' '}
        <Link href="/mini-bootcamp" className="text-accent hover:underline transition-colors">/mini-bootcamp</Link>.
      </>
    ),
  },
  { q: "What happens after the 12 weeks?", a: "Many practitioners join multiple consecutive cohorts to deepen their practice. You'll have lifetime access to materials and can stay connected with the community." },
  { q: "Is financial aid available?", a: "We offer payment plans for committed participants who need timing flexibility. Apply and tell us your situation. If you are committed and the money is the obstacle, say so — we would rather solve it with you than lose you over it." },
]
