import type { Metadata } from 'next'
import { SectionArchive } from '@/components/content/SectionArchive'

export const metadata: Metadata = {
  title: 'Cohort 9',
  description: 'Reported coverage of the program in motion.',
}

export default function CohortPage() {
  return <SectionArchive section="cohort" />
}
