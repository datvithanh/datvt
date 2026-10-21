// Public course outline and schema, retained from the existing course landing page.
const SITE = 'https://mindtraining.cc'

type Lesson = {
  n: number
  title: string
  line: string
  description: string[]
  covers: string[]
  practice: string
}

export const lessons: Lesson[] = [
  {
    n: 1,
    title: 'The Act of Leaving',
    line: 'Catch the exact moment you check out of the present.',
    description: [
      'You can concentrate, soften, and follow the breath, and still, by noon, the same reactivity is running you. If meditation stopped working the way it used to, this is why. The suffering is not in the moment you are in. It is in the small, constant move away from it, the instant you reject the present and decide it should be different.',
      'That move is subtle, near-constant, and almost always missed. It is not a new technique to add on top of the ones that stopped working. It is a false orientation to see through. Once you catch the act of leaving, you stop treating the present as the problem to fix.',
    ],
    covers: [
      'Why you are not failing to arrive — you are actively leaving',
      'Suffering as a mode of participation: insistence, rejection, fragmentation',
      'The misdiagnosis that runs most practice: "the problem is this moment"',
      'Absorption reframed — you are always absorbed, the only question is into what',
      'The mechanics of ignoring: how survival conditioning keeps the exit invisible',
      'Where the split between cushion and daily life actually begins',
    ],
    practice: 'Watch for the exact moment attention moves to leave, the small pull toward "this should be different," and instead of correcting it, just see it.',
  },
  {
    n: 2,
    title: 'The Patterns of Exit',
    line: 'The three ways you leave a moment: pushing, distancing, and going numb.',
    description: [
      'You do not leave a moment at random. You leave in three reliable ways, the exit patterns: insisting the moment be different (pushing), distancing into commentary about it, or fading into low-energy withdrawal. They are conditioned and repeatable, which is why they persist and why willpower does not touch them.',
      'This is where suffering stops looking situational. It is not that life is uniquely hard right now. It is that there is a repeatable way you meet difficulty, running underneath every situation. Name which maneuver you use, and when, and the pattern becomes visible for the first time.',
    ],
    covers: [
      'The three exit maneuvers: insisting, distancing, fading',
      'Why leaving is patterned and reliable, not random or circumstantial',
      'Suffering is not pain: discomfort versus the refusal to participate',
      'The attention–contention–intention mechanism beneath every exit',
      'How practice itself quietly becomes another exit',
      'Why daily life cannot be excluded from the field of training',
    ],
    practice: 'Take one recurring friction this week and, without trying to stay, simply name how you leave it: pushing harder, stepping back into commentary, or going quiet.',
  },
  {
    n: 3,
    title: 'Seeing the Structure',
    line: 'How those small exits quietly shape the life you actually live.',
    description: [
      'You can change the job, the relationship, the city, and after the honeymoon the same dynamics quietly reassemble. Most of us read that as bad luck or bad choices. This lesson offers something more precise: the circumstance was never the cause. Suffering is structural, not situational.',
      'Attention orients toward what matters, contention arises when reality does not cooperate, and intention resolves the tension the same way each time. Run that loop long enough and it stops feeling like a choice. It becomes preference, then reaction, then personality. You keep recreating the same experience because you are the one assembling it.',
    ],
    covers: [
      'Why changing your circumstances doesn’t change how you feel',
      'The mechanism of structuring: attention, contention, intention, consequence',
      'Why the structure stays invisible — precisely because it works',
      'The reinforcement loop: how a response becomes a trait, then a self',
      'Preference as an organizing principle, not a surface bias',
      'Holding contention without collapsing into an exit',
    ],
    practice: 'When discomfort arises — relational friction, a sit that will not settle — catch the move toward distance, the moment you relinquish the field, and just see it.',
  },
  {
    n: 4,
    title: 'Seeing What You Cannot See',
    line: "Why more effort and more awareness aren't enough on their own.",
    description: [
      'If the patterns are structural, the obvious fix is to watch them more closely. This lesson shows why that is not enough, and why more awareness can quietly reinforce the thing it is trying to dissolve.',
      'The attention you would use to catch the pattern is built by the same structure it is trying to see. It moves toward what confirms your aims and away from what would unsettle them. This is the blind spot, or self-occluding coherence: the order that makes experience feel clear is the same order that keeps its own machinery out of view. The hardest exits to catch are the ones that look like discipline, equanimity, and surrender. Awareness sharpens. The blind spot stays where it was.',
    ],
    covers: [
      'The core reversal: you cannot fully see your own structure',
      'Self-occluding coherence: how coherence itself produces the blind spot',
      'Why "if I just pay attention, I will catch it" fails',
      'How exits disguise themselves as discipline, clarity, and peace',
      'Why insight so often stabilizes into a new identity',
      'Why an external structure becomes necessary, not optional',
    ],
    practice: 'Locate where your interpretation feels non-negotiable, obviously correct beyond question, and instead of arguing with it, notice the quality of that certainty. That edge is the perimeter of the blind spot.',
  },
  {
    n: 5,
    title: 'The End of Negotiation',
    line: "What actually lets you stay, when trying harder doesn't.",
    description: [
      'This is the lesson for anyone who can name their patterns exactly and still repeats them. Seeing does not stop the structure, because seeing is part of it. Every recognition arrives already shaped by the aim that wanted to resolve it, so clarity can increase while nothing fundamental moves.',
      'What keeps the pattern alive is negotiation: the quiet space where you stay with an experience until it gets uncomfortable, then adjust the terms. That space runs on vagueness. Precision closes it, not by force, but by leaving no room to soften, reinterpret, or only partly arrive. What ends the pattern is not understanding it. It is remaining in it, without an exit clause.',
    ],
    covers: [
      'Why seeing a pattern clearly does not end it',
      'Negotiation: the hidden space where you adjust the terms of contact',
      'Vagueness as the thing that keeps the structure intact',
      'Precision as consent — meeting experience without conditions',
      'Why conditions that do not bend to preference become necessary',
      'Resting in contention instead of negotiating an exit',
    ],
    practice: 'Notice the exact moment you attach a condition — "I will stay with this if it stays manageable" — and simply stop honoring the exit clause. See what remains when negotiation has nowhere to go.',
  },
]

export const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Transmission 101: Staying Present',
    description:
      'A free five-part course for experienced meditators who plateaued: why concentration, softening, and watching the breath do not stop the patterns that run you by noon, and what finally does.',
    url: `${SITE}/transmission-101`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: 'Contemplative CrossFit', url: SITE },
    about: [
      'meditation is not working anymore',
      'meditation plateau',
      'resisting the present moment',
      'why do I keep recreating the same situations',
      'why does changing my circumstances not change anything',
      'why awareness does not change behavior',
      'I can see my patterns but still repeat them',
      'the exit pattern: insisting, distancing, fading',
      'suffering is structural not situational',
      'self-occluding coherence',
      'the end of negotiation: precision versus vagueness in practice',
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT5H',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    hasPart: lessons.map(l => ({
      '@type': 'Course',
      name: l.title,
      description: l.description.join(' '),
      provider: { '@type': 'Organization', name: 'Contemplative CrossFit', url: SITE },
    })),
  }
