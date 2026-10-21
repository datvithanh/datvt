import { MiniClips } from './MiniClips'
import Link from 'next/link'
import { CourseOutline } from './CourseOutline'
import { NEXT_MINI_DATES } from '@/lib/field-guide'

export function MiniBootcampContent() {
  return <>
<section className="mini-hero wrap"><div><span className="program-type">Free public offering · Five days</span><h1>A taste of<br /><em>the training.</em></h1><p className="program-lead">Mini Bootcamp</p><p>Meet CC by practicing with us. Five days of live daily sits, small-group breakouts with mentors, and a closing community campfire.</p><p className="event-date">{NEXT_MINI_DATES} · Live online</p><p className="fineprint">Registration for the next run is not open yet.</p><a className="button" href="#newsletter">Get training announcements <span aria-hidden="true">↗</span></a></div><figure className="mini-photo"><img src="/brand/training.png" width="611" height="343" alt="CC practitioners in a live online training session" /><figcaption>Come train with people who are doing the work.</figcaption></figure></section>
<section id="week" className="section course-details wrap"><div className="section-heading"><h2>Enter together.</h2><p className="section-intro">A free introduction to the practice and the community, whether you later join the Bootcamp or simply want to explore.</p></div><div className="approach-grid"><article><h3>Live daily sits</h3><p>Join the practice in real time, with transmission from Taylor and a shared recap.</p></article><article><h3>Mentor breakouts</h3><p>Bring the morning’s training into your own experience in a small group supported by CC mentors.</p></article><article><h3>Community campfire</h3><p>Close the week with stories from practitioners, conversation, and open questions.</p></article></div></section>
<MiniClips />
<section className="section mini-next wrap"><h2>Begin exploring now.</h2><p>Transmission 101 offers five free lessons you can work through at your own pace.</p><Link className="button" href="/transmission-101">Explore the free course <span aria-hidden="true">↗</span></Link></section>
  </>
}
