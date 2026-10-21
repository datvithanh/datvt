import type { Metadata } from 'next'
import { SectionArchive } from '@/components/content/SectionArchive'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles from the mentors.',
}

export default function EssaysPage() {
  return <SectionArchive section="essays" />
}
