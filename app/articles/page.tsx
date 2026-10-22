import { getFieldGuideArticles } from '@/lib/field-guide-content'
import { FieldGuideJournal } from '@/components/field-guide/Journal'
import { NextStep } from '@/components/field-guide/NextStep'
import { fieldGuideMetadata } from '@/lib/field-guide'

export const metadata = fieldGuideMetadata('/articles', 'Notes from Practice', 'Free teachings on practice, contemplation, and realization.')
export default function ArticlesPage() { return <><FieldGuideJournal articles={getFieldGuideArticles()} /><NextStep /></> }
