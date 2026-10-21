import { MiniBootcampContent } from '@/components/field-guide/MiniBootcamp'
import { fieldGuideMetadata } from '@/lib/field-guide'

export const metadata = fieldGuideMetadata("/mini-bootcamp", "Mini Bootcamp", "A free five-day taste of live training, mentor breakouts, and a community campfire.")

metadata.robots = { index: false, follow: false }

const eventJsonLd = {
  '@context': 'https://schema.org', '@type': 'Event', name: 'Mini Bootcamp — Contemplative CrossFit',
  startDate: '2026-12-14', endDate: '2026-12-18', eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: { '@type': 'VirtualLocation', url: 'https://mindtraining.cc/mini-bootcamp' }, image: 'https://mindtraining.cc/images/mini-bootcamp-ad.jpg',
  organizer: { '@type': 'Organization', name: 'Contemplative CrossFit', url: 'https://mindtraining.cc' }, isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: 'https://mindtraining.cc/mini-bootcamp' },
}
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} /><MiniBootcampContent /></> }
