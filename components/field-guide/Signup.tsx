import { KitEmailForm } from '@/components/ui/KitEmailForm'

export function FieldGuideSignup({ course = false, inline = false }: { course?: boolean; inline?: boolean }) {
  if (inline) return <div id="newsletter" className="course-hero-signup">
    <span id="access" className="fg-anchor-alias" aria-hidden="true" />
    <span id="footer-newsletter" className="fg-anchor-alias" aria-hidden="true" />
    <p className="course-signup-note">Get the course library link by email after confirming your subscription.</p>
    <KitEmailForm variant="field-guide" heading="" subheading="" buttonLabel="Get the free course"
      submittingLabel="Sending…" successMessage="You’re in. Check your email to confirm, and the library link follows." />
  </div>
  return <section id="newsletter" className={`section newsletter wrap ${course ? '' : 'footer-newsletter'}`}>
    <span id="access" className="fg-anchor-alias" aria-hidden="true" />
    <span id="footer-newsletter" className="fg-anchor-alias" aria-hidden="true" />
    <div><h2>{course ? <>Get the<br /> free course.</> : <>Stay close<br /> to the practice.</>}</h2>
      <p>{course ? 'Join the CC mailing list to receive the course library link. Check your inbox and confirm your subscription.' : 'New teachings, notes from the community, and the next opportunities to train.'}</p>
    </div>
    <KitEmailForm variant="field-guide" heading="" subheading="" buttonLabel={course ? 'Send me the course' : 'Join the mailing list'}
      submittingLabel={course ? 'Sending…' : 'Joining…'}
      successMessage={course ? 'You’re in. Check your email to confirm, and the library link follows.' : 'Success — now check your email to confirm your subscription.'} />
  </section>
}
