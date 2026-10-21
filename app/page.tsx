import { HomeContent } from '@/components/field-guide/Home'
import { fieldGuideMetadata } from '@/lib/field-guide'

export const metadata = fieldGuideMetadata("/", "Contemplative CrossFit", "Rigorous mind training for serious practitioners. Direct transmission, structured training, and a community with skin in the practice.")

export default function Page() { return <><HomeContent /></> }
