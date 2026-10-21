import Link from 'next/link'
import { CourseOutline } from './CourseOutline'
import { NEXT_COHORT_START, NEXT_MINI_DATES } from '@/lib/field-guide'

export function ProgramsContent() {
  return <>
<section className="programs-overview wrap"><h1>Ways to<br /><em>train.</em></h1><p className="programs-overview-deck">Different levels of intensity. A shared seriousness about practice. Start where you can commit to doing the work.</p><div className="flyer-offerings"><Link className="flyer-offer paid-offer" href="/bootcamp"><span className="program-type">Paid · 12 weeks · Live online</span><h3>Illumination Bootcamp</h3><p>Deepen your practice with daily training, personal guidance, and people who train alongside you.</p><span className="flyer-offer-end">Starts {NEXT_COHORT_START} <b aria-hidden="true">↗</b></span></Link><Link className="flyer-offer free-offer" href="/mini-bootcamp"><span className="program-type">Free public offering · Five days</span><h3>Mini Bootcamp</h3><p>Meet the practice by practicing. Five days to experience CC.</p><span className="flyer-offer-end">{NEXT_MINI_DATES} <b aria-hidden="true">↗</b></span></Link></div><div className="programs-help"><p>Questions about the practice or the commitment?</p><a className="text-link" href="mailto:contact@mindtraining.cc">Talk with the team <span aria-hidden="true">↗</span></a></div></section>
  </>
}
