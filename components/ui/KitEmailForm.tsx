'use client'

import { useId, useState } from 'react'

// Native, theme-aware newsletter form. Posts to a Kit (ConvertKit) form via the
// `email_address` field. Styled with the site's theme tokens so it follows
// light/dark mode instead of shipping Kit's fixed cream card. `formId` defaults
// to Kit form 9576210 (uid 89450c0c9a) — the form wired to the welcome sequence
// that emails every new subscriber the course library link (/courses/library).
// Every signup on the site should enter that sequence, so leave the default unless
// a page genuinely needs its own Kit form. (The old shared newsletter form,
// 9257598, triggers no sequence.)
const DEFAULT_FORM_ID = '9576210'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface KitEmailFormProps {
  variant?: 'field-guide'
  heading?: string
  subheading?: string
  buttonLabel?: string
  submittingLabel?: string
  successMessage?: string
  formId?: string
  collectFirstName?: boolean
  // When true, the submit button drops to its own row (centered) below the inputs.
  // Default keeps everything inline on a single row.
  buttonOnNewRow?: boolean
  // 'left' left-aligns the whole form on desktop (lg+) for side-by-side hero
  // layouts; it stays centered on smaller screens. Default is centered everywhere.
  align?: 'center' | 'left'
}

export function KitEmailForm({
  variant,
  heading = 'Join the CC Newsletter',
  subheading = 'Stay updated with our community and open enrollment',
  buttonLabel = 'Subscribe',
  submittingLabel = 'Joining…',
  successMessage = 'Success — now check your email to confirm your subscription.',
  formId = DEFAULT_FORM_ID,
  collectFirstName = true,
  buttonOnNewRow = false,
  align = 'center',
}: KitEmailFormProps = {}) {
  const inputId = useId()
  const left = align === 'left'
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      const body = new FormData()
      body.append('email_address', email)
      if (collectFirstName && firstName) {
        body.append('fields[first_name]', firstName)
      }
      const res = await fetch(`https://app.kit.com/forms/${formId}/subscriptions`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      })
      const data = await res.json().catch(() => null)
      if (res.ok && (!data || data.status !== 'error')) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (variant === 'field-guide') {
    return <div className="fg-kit-form">
      {status === 'success' ? <p className="form-status" role="status">{successMessage}</p> : <>
        <form className="newsletter-form" onSubmit={handleSubmit} data-kit-form={formId}>
          {collectFirstName && <div className="fg-name-field">
            <label htmlFor={`${inputId}-name`}>First name (optional)</label>
            <input id={`${inputId}-name`} name="fields[first_name]" autoComplete="given-name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>}
          <label htmlFor={`${inputId}-email`}>Your email</label>
          <div className="input-row">
            <input id={`${inputId}-email`} name="email_address" type="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? submittingLabel : buttonLabel} <span aria-hidden="true">↗</span></button>
          </div>
        </form>
        {status === 'error' && <p className="form-status" role="alert">Something went wrong. Please try again.</p>}
        <p className="form-status fineprint" aria-live="polite">By subscribing, you agree to the <a href="/privacy">privacy policy</a>. Unsubscribe at any time.</p>
      </>}
    </div>
  }

  return (
    <div className={`w-full text-center ${left ? 'lg:text-left' : ''}`}>
      {heading && (
        <h2 className="font-heading text-2xl sm:text-3xl uppercase tracking-wide text-text-primary leading-tight">
          {heading}
        </h2>
      )}
      {subheading && (
        <p className="font-body text-text-muted mt-3 text-sm">
          {subheading}
        </p>
      )}

      {status === 'success' ? (
        <p className="font-body text-accent mt-8 text-sm" role="status">
          {successMessage}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`${heading || subheading ? 'mt-8' : ''} flex flex-col gap-3 mx-auto text-left ${
            left ? 'lg:mx-0' : ''
          } ${buttonOnNewRow ? 'max-w-[600px]' : 'max-w-[760px]'}`}
        >
          {/* In the left-aligned hero layout the column is too narrow for one row
              between lg and xl, so it stacks there and goes back to a row at xl. */}
          <div className={`flex flex-col sm:flex-row gap-3 ${left ? 'lg:flex-col xl:flex-row' : ''}`}>
            {collectFirstName && (
              <input
                type="text"
                name="fields[first_name]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                aria-label="First Name"
                className="flex-1 min-w-0 font-body text-sm px-4 py-3 rounded-sm bg-bg-surface text-text-primary placeholder:text-text-muted border border-border focus:outline-none focus:border-accent transition-colors"
              />
            )}
            <input
              type="email"
              name="email_address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              aria-label="Email Address"
              className="flex-[2] min-w-0 font-body text-sm px-4 py-3 rounded-sm bg-bg-surface text-text-primary placeholder:text-text-muted border border-border focus:outline-none focus:border-accent transition-colors"
            />
            {!buttonOnNewRow && (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary px-6 py-3 shrink-0 disabled:opacity-60"
              >
                {status === 'submitting' ? submittingLabel : buttonLabel}
              </button>
            )}
          </div>
          {buttonOnNewRow && (
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`btn-primary px-6 py-3 w-full sm:w-auto self-center disabled:opacity-60 ${
                left ? 'lg:self-start' : ''
              }`}
            >
              {status === 'submitting' ? submittingLabel : buttonLabel}
            </button>
          )}
        </form>
      )}

      {status === 'error' && (
        <p className="font-body text-red-400 mt-3 text-xs" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      {status !== 'success' && (
        <p className="font-body text-text-muted mt-4 text-xs">
          We won&rsquo;t send you spam. Unsubscribe at any time.
        </p>
      )}
    </div>
  )
}
