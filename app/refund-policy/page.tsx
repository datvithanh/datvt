import { fieldGuideMetadata } from '@/lib/field-guide'
import Link from 'next/link'

export const metadata = fieldGuideMetadata('/refund-policy', 'Refund, Cancellation & Delivery Policy', 'Refund, cancellation, and service delivery policy for Contemplative Crossfit LLC meditation bootcamp programs.')

export default function RefundPolicyPage() {
  return (
    <div className="legal-document wrap">
      <section className="legal-document-section">
        <div className="legal-document-inner">
          <Link href="/" className="text-link legal-back-link">
            &larr; Home
          </Link>

          <h1 className="legal-document-title">
            Refund, Cancellation &amp; Delivery Policy
          </h1>
          <p className="legal-document-date">Last updated: April 1, 2026</p>

          <div className="legal-document-body">
            <h2>1. Service Delivery</h2>
            <p>
              All Contemplative Crossfit LLC (&ldquo;CC&rdquo;) programs are delivered as live, online
              group sessions via Zoom video conferencing. There are no physical products or
              in-person deliveries associated with our services.
            </p>
            <ul>
              <li><strong>Format:</strong> Live group video sessions with qualified meditation teachers, plus community support via Discord.</li>
              <li><strong>Schedule:</strong> Session schedules are communicated prior to the cohort start date. Sessions run multiple times per day, Monday through Friday.</li>
              <li><strong>Access:</strong> Upon enrollment and payment, you will receive Zoom session links and Discord community access before your cohort start date.</li>
              <li><strong>Recordings:</strong> Session recordings may be made available to enrolled participants at our discretion, but live attendance is the primary mode of delivery.</li>
            </ul>

            <h2>2. Refund Policy</h2>
            <p>
              Because our programs are live, cohort-based experiences with limited enrollment,
              we apply the following refund policy:
            </p>
            <h3>14+ days before cohort start</h3>
            <p>
              Full refund minus a $100 USD administrative fee. Refunds are processed within
              14 business days via the original payment method.
            </p>
            <h3>1&ndash;13 days before cohort start</h3>
            <p>
              50% refund, or you may defer your enrollment to the next available cohort at
              no additional charge (one deferral per enrollment).
            </p>
            <h3>After the cohort has started</h3>
            <p>
              No refunds are available once the cohort has begun. However, if your life
              circumstances change, you may request a one-time deferral to the next
              available cohort. Deferral requests must be made in writing to{' '}
              <a href="mailto:contact@mindtraining.cc">contact@mindtraining.cc</a>.
            </p>

            <h2>3. Cancellation</h2>
            <p>
              To cancel your enrollment and request a refund (where applicable), email us at{' '}
              <a href="mailto:contact@mindtraining.cc">contact@mindtraining.cc</a>{' '}
              with your full name and the cohort you enrolled in. The cancellation date is
              determined by when we receive your email, not when payment was made.
            </p>
            <p>
              <strong>Payment plan cancellations:</strong> If you are on a payment plan and
              cancel after the cohort has started, remaining installments are still due. Deferral
              to a future cohort may be arranged in lieu of continued payments &mdash; contact us to
              discuss your situation.
            </p>

            <h2>4. Deferrals</h2>
            <p>
              We understand that life circumstances can change. Each enrollment includes one
              complimentary deferral to the next available cohort. Deferrals must be requested
              in writing. A second deferral may be granted at our discretion.
            </p>
            <p>
              Deferrals are subject to availability in the destination cohort. If the next
              cohort is full, you will be placed in the following one.
            </p>

            <h2>5. Special Program Terms</h2>
            <p>
              Certain programs may have specific refund or guarantee terms that differ from this
              general policy. Any such terms will be clearly stated on the program&apos;s page and
              in enrollment communications. Program-specific terms take precedence over this
              general policy.
            </p>

            <h2>6. Contact</h2>
            <p>
              For refund requests, cancellations, deferrals, or questions about this policy, contact us at:
            </p>
            <p>
              <a href="mailto:contact@mindtraining.cc">contact@mindtraining.cc</a><br />
              Contemplative Crossfit LLC<br />
              30 N Gould St<br />
              Sheridan, WY 82801<br />
              United States
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
