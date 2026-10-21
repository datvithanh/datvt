import { TransmissionContent } from '@/components/field-guide/Transmission'
import { fieldGuideMetadata } from '@/lib/field-guide'
import { courseJsonLd } from '@/lib/transmission'

export const metadata = fieldGuideMetadata("/transmission-101", "Transmission 101: Staying Present", "A free five-part course for meditators who can concentrate and soften and still get run by the same patterns by noon. Why awareness alone does not change behavior, and what finally lets you stay present.")

export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} /><TransmissionContent /></> }
