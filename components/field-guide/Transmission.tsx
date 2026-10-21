import { FieldGuideSignup } from './Signup'
import { CourseOutline } from './CourseOutline'

export function TransmissionContent() {
  return <>
<section className="course-hero wrap"><div><p className="eyebrow">FREE COURSE / TRANSMISSION 101</p><h1 className="resource-title">Staying<br /><em>present.</em></h1><p className="resource-deck">You can concentrate, soften, and follow the breath. By noon, the same old patterns are running you.</p><FieldGuideSignup course inline /><p className="course-meta">5 LESSONS <span>SELF-PACED</span> FREE</p></div><figure className="course-art"><div className="course-art-label"><span className="eyebrow">TRANSMISSION 101</span><span className="eyebrow">FIVE LESSONS</span></div><img src="/images/ppw-hero.jpg" alt="A teacher seated for a Transmission 101 practice session" /><figcaption><span>ATTENTION / CONTACT / PRACTICE</span><span>01—05</span></figcaption></figure></section><section className="course-outline wrap"><div className="outline-intro"><p className="eyebrow">THE COURSE / A PREVIEW</p><h2>Catch the move<br />away from life.</h2><p>Five teachings with Taylor, from noticing the act of leaving to seeing what keeps the negotiation alive.</p><a className="text-link" href="#newsletter">Receive the course library link ↗</a></div><CourseOutline /></section>
  </>
}
