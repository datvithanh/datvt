import { FAQAccordion } from '@/components/bootcamp/FAQAccordion'
import { faqItems } from '@/lib/faq'

const questions = new Set(['How much time do I need to commit?', 'Can I attend more than one session a day?', 'What if I have a schedule conflict — a planned retreat or a family emergency?', 'Can I join from anywhere in the world?', 'I already work with a teacher. Will this conflict?', 'Is financial aid available?'])
export function BootcampFAQ() {
  return <section id="faq" className="section wrap fg-faq"><h2>Questions about the commitment.</h2><FAQAccordion items={faqItems.filter(item => questions.has(item.q))} /></section>
}
