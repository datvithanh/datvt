import { MediaContent } from '@/components/field-guide/Media'
import { fieldGuideMetadata } from '@/lib/field-guide'

export const metadata = fieldGuideMetadata('/media', 'Media', 'YouTube conversations, the BDSM show, and Instagram from Contemplative CrossFit.')
export default function Page() {return <MediaContent />}
