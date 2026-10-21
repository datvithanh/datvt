import { KitEmailForm } from '@/components/ui/KitEmailForm'

// The email wall for the courses. Posts to KitEmailForm's default Kit form, which
// triggers the welcome sequence; its first email delivers the link to the unlisted
// /courses/library page, where the full courses live.
type CourseLibraryOptInProps = {
  heading?: string
  subheading?: string
  align?: 'center' | 'left'
  // Default puts the button on its own row; false fits name, email and button on one line.
  buttonOnNewRow?: boolean
}

export function CourseLibraryOptIn({
  heading = 'Get the Full Course',
  subheading = 'Join the CC newsletter and we’ll email you access to the full CC course library, starting with all five lessons of Transmission 101.',
  align,
  buttonOnNewRow = true,
}: CourseLibraryOptInProps = {}) {
  return (
    <KitEmailForm
      buttonOnNewRow={buttonOnNewRow}
      align={align}
      heading={heading}
      subheading={subheading}
      buttonLabel="Send me access"
      submittingLabel="Sending…"
      successMessage="You’re in. Check your email to confirm, and the library link follows."
    />
  )
}
