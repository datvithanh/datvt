import { FAQAccordion } from '@/components/bootcamp/FAQAccordion'
import { faqItems } from '@/lib/faq'

// Every question from the live Bootcamp FAQ, in its order.
export function BootcampFAQ() {
  return <section id="faq" className="section wrap fg-faq"><h2>Common questions.</h2><FAQAccordion items={faqItems} /></section>
}
