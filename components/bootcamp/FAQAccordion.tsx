'use client'

import { useState, type ReactNode } from 'react'

interface FAQItem {
  q: string
  a: ReactNode
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border-subtle/50">
      {items.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full py-5 flex items-center justify-between gap-4 text-left group"
            >
              <h3 className="font-heading text-sm uppercase tracking-wider text-text-primary group-hover:text-accent transition-colors">
                {faq.q}
              </h3>
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-text-muted transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="6" y1="1" x2="6" y2="11" />
                  <line x1="1" y1="6" x2="11" y2="6" />
                </svg>
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? 'none' : '0px', opacity: isOpen ? 1 : 0 }}
            >
              <p className="font-body text-text-secondary text-sm leading-relaxed pb-6 pr-8">
                {faq.a}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
