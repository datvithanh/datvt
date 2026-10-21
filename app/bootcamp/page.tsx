import { BootcampContent } from '@/components/field-guide/Bootcamp'
import { fieldGuideMetadata } from '@/lib/field-guide'

export const metadata = fieldGuideMetadata("/bootcamp", "Illumination Bootcamp", "Twelve weeks of daily training, reflection, mentoring, and community. Explore the practice, schedule, fit, and tuition.")

export default function Page() { return <><BootcampContent /></> }
