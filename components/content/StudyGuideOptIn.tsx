import { KitEmailForm } from '@/components/ui/KitEmailForm'

// The repurposed Transmission 101 opt-in. The course is no longer gated — this
// form posts to the same Kit form as the old gate (9576210), whose sequence now
// delivers the study guide and, after the course, a coaching-call invitation.
type StudyGuideOptInProps = {
  heading?: string
  subheading?: string
  buttonLabel?: string
  successMessage?: string
}

export function StudyGuideOptIn({
  heading = 'Get the Study Guide',
  subheading = "Enter your email and we'll send you the course study guide and our newsletter, along with an invitation to a free coaching call with a CC Mentor.",
  buttonLabel = 'Send me the guide',
  successMessage = 'The guide is on its way. Check your email to confirm.',
}: StudyGuideOptInProps = {}) {
  return (
    <KitEmailForm
      formId="9576210"
      buttonOnNewRow
      heading={heading}
      subheading={subheading}
      buttonLabel={buttonLabel}
      submittingLabel="Sending…"
      successMessage={successMessage}
    />
  )
}
