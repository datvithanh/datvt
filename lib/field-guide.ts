import type { Metadata } from 'next'
import { SOCIAL_PREVIEW_IMAGE } from './social-preview'
import { COHORT_NEXT_START_DISPLAY, COHORT_NEXT_YEAR, MINI_BOOTCAMP_NEXT_DISPLAY } from './cohort'

export const NEXT_COHORT_START = `${COHORT_NEXT_START_DISPLAY}, ${COHORT_NEXT_YEAR}`
export const NEXT_MINI_DATES = `${MINI_BOOTCAMP_NEXT_DISPLAY}, 2026`

export function fieldGuideMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: 'Contemplative CrossFit' }, description,
    alternates: { canonical: `https://mindtraining.cc${path === '/' ? '' : path}` },
    openGraph: { title, description, url: `https://mindtraining.cc${path === '/' ? '' : path}`, siteName: 'Contemplative CrossFit', type: 'website', images: [SOCIAL_PREVIEW_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [SOCIAL_PREVIEW_IMAGE.url] },
  }
}
