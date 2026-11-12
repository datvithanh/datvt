#!/usr/bin/env node
// Counts the distinct text styles each page actually renders (font, size, weight, italic, case) at desktop and
// phone width, so type drift shows up as a number. Usage: node scripts/check-type.mjs [base-url]
// Needs a running site (e.g. `npx next start -p 8765`). Target: about a dozen styles per width (Nov 12: 22 / 21).
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')   // works with a global or local Playwright install
const base = process.argv[2] || 'http://127.0.0.1:8765'
const pages = ['/', '/bootcamp', '/mini-bootcamp', '/resources', '/articles', '/articles/effort-is-a-feature-not-a-bug', '/media', '/courses/transmission-101-staying-present', '/terms', '/coaching', '/team']
const browser = await chromium.launch()
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  const styles = new Map()
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    const rows = await page.evaluate(() => [...document.querySelectorAll('main *, header *, .site-footer *')].flatMap(el => {
      const text = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim()
      const r = el.getBoundingClientRect(); if (text.length < 2 || !r.width) return []
      const cs = getComputedStyle(el)
      return [{ key: [cs.fontFamily.split(',')[0].replace(/["']/g, ''), Math.round(parseFloat(cs.fontSize) * 10) / 10 + 'px', cs.fontWeight, cs.fontStyle, cs.textTransform].join(' '), text: text.slice(0, 40) }]
    }))
    for (const { key, text } of rows) { const s = styles.get(key) || { n: 0, pages: new Set(), example: text }; s.n++; s.pages.add(path); styles.set(key, s) }
  }
  console.log(`\n${w}px wide: ${styles.size} distinct text styles`)
  for (const [key, s] of [...styles].sort((a, b) => parseFloat(b[0].split(' ').find(x => x.endsWith('px'))) - parseFloat(a[0].split(' ').find(x => x.endsWith('px')))))
    console.log(`  ${key.padEnd(40)} ×${String(s.n).padStart(4)} on ${s.pages.size} page(s)  e.g. "${s.example}"`)
  await page.close()
}
await browser.close()
