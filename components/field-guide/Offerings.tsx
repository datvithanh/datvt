import Link from 'next/link'
import { NEXT_COHORT_START, NEXT_MINI_DATES } from '@/lib/field-guide'

// One paid door until Basecamp is announced; Mini Bootcamp is seasonal, so it sits below as a free taste rather than a peer card.
export function Offerings({ details = false }: { details?: boolean }) {
  return <>
<div className="flyer-offerings single-door"><Link className="flyer-offer paid-offer" href="/bootcamp"><span className="program-type">Paid · 12 weeks · Live online</span><h3>Illumination Bootcamp</h3><p>Twelve weeks of intensive training for practitioners ready for transmission and relational feedback.</p>{details && <ul className="offer-facts"><li>Live training Monday–Friday, one daily session</li><li>Reflection with the people who just trained with you</li><li>Mentoring from senior practitioners</li></ul>}<span className="flyer-offer-end">Starts {NEXT_COHORT_START} <b aria-hidden="true">↗</b></span></Link></div>
<p className="free-door"><span>Want a taste first?</span> <Link className="text-link" href="/mini-bootcamp">Mini Bootcamp: five free days of live practice, {NEXT_MINI_DATES} <span aria-hidden="true">↗</span></Link></p>
  </>
}
