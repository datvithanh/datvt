import type { Metadata } from 'next'
import { SectionArchive } from '@/components/content/SectionArchive'

export const metadata: Metadata = {
  title: 'Spotlight',
  description: 'Individual recognition — gold-star moments and member wins.',
}

export default function SpotlightPage() {
  return <SectionArchive section="spotlight" />
}
