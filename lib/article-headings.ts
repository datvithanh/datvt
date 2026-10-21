import { isValidElement, type ReactNode } from 'react'

export function headingText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(headingText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return headingText(node.props.children)
  return ''
}
export function headingId(title: string): string {
  return title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
export function articleHeadings(markdown: string) {
  return [...markdown.matchAll(/^## (.+)$/gm)].map(match => {
    const title = match[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim()
    return { title, id: headingId(title) }
  })
}
