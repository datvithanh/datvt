import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed'

// Video testimonials + stats banner, shared by /bootcamp and /coaching.
const testimonials = [
  { name: "John", videoId: "WoQbN-CnHJg", quote: "It locked in the Realization... it gave me a physical visceral understanding. Before, maybe I thought Anatta was something more conceptual. What we're talking about is the one that's undoing, stretching my mind, opening my horizons." },
  { name: "Tom", videoId: "mTZIjfB5BZ8", quote: "A shell fell off me... It wasn't just like I'm imagining that happening. It was like an actual something left me, fell off. My relationship, my life was cleaning up, I was maturing — that wasn't a goal. But it never happened at that kind of pace before." },
  { name: "Ryan", videoId: "zcrvJoSpfYs", quote: "Once I made that clear commitment, it was later that night that I had this stream entry moment... Before that it felt like poking around in the dark, now it finally feels like I can train properly." },
  { name: "Tyson", videoId: "tHBd3sCOjWk", quote: "Realization fitness is like a transformation of your relationship to resistance. I was fully cooking myself every way that I could. I was letting go of my identity and even my physical training... and that was like a really core one." },
  { name: "Kristen", videoId: "RYwjMy_SID8", quote: "The amplification of your efforts being in this group is unbelievable. People here are full of integrity — they want progress for themselves, but they want it for each other." },
  { name: "Ryan", videoId: "NrObMSAiNQQ", quote: "I felt like I was completely lost and spinning — but I didn't even know it. A lot of my path was built on ignoring and feeling safe. CC was a course correction. I'd rather be aware that I'm lost than think I know what's going on." },
  { name: "James", videoId: "YEpNqEyG3AE", quote: "The support is 24/7 — not like other courses where you get help on one scheduled day. You're going to get looked after. No man left behind. Everyone's just trying to work it all out together." },
  { name: "Adrian", videoId: "-uMMTet2FP8", quote: "There was something cryptic, something mysterious beyond the form. What drew me in was the culture of being yourself — welcoming all sides, including the parts I'd cast away." },
]

export function TestimonialGrid() {
  return (
    <>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="border border-border/40 rounded-sm overflow-hidden hover:border-accent/20 transition-colors">
            <YouTubeEmbed videoId={t.videoId} title={`${t.name} — CC Bootcamp`} />
            <div className="p-5">
              <p className="font-heading text-xs uppercase tracking-wider text-accent mb-3">{t.name}</p>
              <p className="font-body text-text-secondary text-sm italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats banner */}
      <div className="mt-14 p-6 border border-border/40 rounded-sm">
        <div className="flex justify-center gap-12 font-heading text-sm uppercase tracking-wider text-center">
          <div><span className="text-3xl text-accent block">8</span><span className="text-text-muted text-xs mt-1 block">Cohorts Completed</span></div>
          <div><span className="text-3xl text-accent block">300+</span><span className="text-text-muted text-xs mt-1 block">Lives Transformed</span></div>
          <div><span className="text-3xl text-accent block">90%</span><span className="text-text-muted text-xs mt-1 block">Completion Rate</span></div>
        </div>
      </div>
    </>
  )
}
