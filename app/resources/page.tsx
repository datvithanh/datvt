import { ResourcesContent } from '@/components/field-guide/Resources'
import { fieldGuideMetadata } from '@/lib/field-guide'

export const metadata = fieldGuideMetadata('/resources', 'Resources', 'Free courses and writing for your practice. Begin with Transmission 101, or explore the blog.')
export default function Page() {return <ResourcesContent />}
