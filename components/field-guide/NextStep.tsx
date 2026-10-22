import Link from 'next/link'
import { NEXT_COHORT_START } from '@/lib/field-guide'

// The next step in the funnel from any free page: resources and media lead to the Bootcamp.
export function NextStep() {
  return <section className="next-step wrap" aria-labelledby="next-step-heading"><div><h2 id="next-step-heading">Ready to train?</h2><p>The next Illumination Bootcamp begins {NEXT_COHORT_START}. Twelve weeks of daily practice with people who are doing the work.</p></div><Link className="button" href="/bootcamp">Explore the Bootcamp <span aria-hidden="true">↗</span></Link></section>
}
