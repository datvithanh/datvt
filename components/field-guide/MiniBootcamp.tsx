import Link from 'next/link'
import { CourseOutline } from './CourseOutline'
import { NEXT_MINI_DATES } from '@/lib/field-guide'

export function MiniBootcampContent() {
  return <>
<section className="mini-hero wrap"><div><span className="program-type">Free public offering · Five days</span><h1>Mini Bootcamp</h1><p>A free introduction to the practice and the community, whether you later join the Bootcamp or simply want to explore.</p><p className="event-date">Next run: <span className="event-date-value">{NEXT_MINI_DATES}</span></p><p className="fineprint">Registration for the next run is not open yet.</p><a className="button" href="#newsletter">Get training announcements <span aria-hidden="true">↗</span></a></div><figure className="mini-photo"><img src="/brand/training.png" width="611" height="343" alt="CC practitioners in a live online training session" /><figcaption>Come train with people who are doing the work.</figcaption></figure></section>
<section id="week" className="section mini-week wrap" aria-labelledby="mini-week-title">
  <div className="section-heading"><h2 id="mini-week-title">Five days of training</h2></div>
  <div className="mw-rows">
    <article className="mw-row tone-blue"><img className="mw-row-leaf" src="/brand/home/leaf-soft-lance-blue.svg" alt="" width="35" height="100" /><div><p className="mw-label">Daily</p><h3>Live meditation sessions</h3><p>Join the practice in real time, with transmission from Taylor and a shared recap.</p></div></article>
    <article className="mw-row tone-marigold"><img className="mw-row-leaf" src="/brand/home/leaf-soft-lance-marigold.svg" alt="" width="35" height="100" /><div><p className="mw-label">Daily</p><h3>Mentor-led discussions</h3><p>Share your meditation experience and be mirrored by CC mentors and other practitioners.</p></div></article>
    <article className="mw-row tone-clay"><img className="mw-row-leaf" src="/brand/home/leaf-nested-clay.svg" alt="" width="35" height="100" /><div><p className="mw-label">Closing</p><h3>Community campfire</h3><p>Close the week with stories from practitioners, conversation, and open questions.</p></div></article>
  </div>
</section>
<section className="section mini-next wrap"><h2>Can’t wait? Begin exploring now</h2><p>Transmission 101 offers five free lessons you can work through at your own pace.</p><Link className="button" href="/transmission-101">Explore the free course <span aria-hidden="true">↗</span></Link></section>
  </>
}
