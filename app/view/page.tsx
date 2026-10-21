import type { Metadata } from 'next'
import { SectionArchive } from '@/components/content/SectionArchive'

export const metadata: Metadata = {
  title: 'Editorial',
  description: 'The operative lens — how we meet experience, and why.',
}

export default function ViewPage() {
  return <SectionArchive section="view" />
}
