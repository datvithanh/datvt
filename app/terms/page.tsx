import { fieldGuideMetadata } from '@/lib/field-guide'
import Link from 'next/link'

export const metadata = fieldGuideMetadata('/terms', 'Terms & Conditions', 'Terms and Conditions for Contemplative Crossfit LLC meditation bootcamp programs.')

export default function TermsPage() {
  return (
    <div className="legal-document wrap">
      <section className="legal-document-section">
        <div className="legal-document-inner">
          <Link href="/" className="text-link legal-back-link">
            &larr; Home
          </Link>

          <h1 className="legal-document-title">
            Terms &amp; Conditions
          </h1>
          <p className="legal-document-date">Last updated: April 1, 2026</p>

          <div className="legal-document-body">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing the website at mindtraining.cc or purchasing any program offered by
              Contemplative Crossfit LLC (&ldquo;CC,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by
              these Terms &amp; Conditions. If you do not agree with any part of these terms, you may
              not access our website or purchase our programs.
            </p>

            <h2>2. Company Information</h2>
            <p>
              Contemplative Crossfit LLC<br />
              30 N Gould St<br />
              Sheridan, WY 82801<br />
              United States<br />
              Email: contact@mindtraining.cc
            </p>

            <h2>3. Description of Services</h2>
            <p>
              CC offers live, online meditation training programs delivered via video conferencing
              (Zoom). Our primary offering is a 90-day intensive meditation bootcamp that includes
              live group training sessions, discussion sessions, weekly reviews, and community
              support through Discord. We also offer shorter intensive programs from time to time.
            </p>
            <p>
              All sessions are conducted live online. There is no physical product or in-person
              delivery. Recordings of sessions may be made available to enrolled participants at
              our discretion.
            </p>

            <h2>4. Enrollment and Payment</h2>
            <p>
              Enrollment in our programs requires submitting an application and, upon acceptance,
              completing payment. We accept payments via Wise (TransferWise). By submitting
              payment, you confirm that you have read and agree to these Terms &amp; Conditions and
              our Refund Policy.
            </p>
            <p>
              Prices are listed in USD and are subject to change. The price at the time of your
              enrollment is the price you will be charged. Payment plans may be available for
              certain programs &mdash; details will be communicated during the enrollment process.
            </p>

            <h2>5. Program Participation</h2>
            <p>Our programs require active participation and commitment. By enrolling, you agree to:</p>
            <ul>
              <li>Attend live sessions as scheduled</li>
              <li>Maintain a respectful and supportive environment for all participants</li>
              <li>Follow the guidance and instructions provided by CC teachers and mentors</li>
              <li>Not record, redistribute, or share session content without written permission</li>
              <li>Not share login credentials or session access with non-enrolled individuals</li>
            </ul>
            <p>
              We reserve the right to remove any participant who violates these terms or disrupts
              the program environment, without refund.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content provided through our programs &mdash; including but not limited to teachings,
              techniques, session recordings, written materials, and community discussions &mdash; is the
              intellectual property of Contemplative Crossfit LLC. You may not reproduce,
              distribute, modify, or create derivative works from our content without our prior
              written consent.
            </p>

            <h2>7. Health Disclaimer</h2>
            <p>
              Our meditation training programs are educational in nature and are not a substitute
              for professional medical or psychological treatment. By enrolling, you acknowledge that:
            </p>
            <ul>
              <li>You are participating voluntarily and at your own risk</li>
              <li>Intensive meditation practice may bring up difficult emotions or experiences</li>
              <li>You should consult a qualified healthcare provider if you have concerns about your physical or mental health</li>
              <li>CC teachers and mentors are not licensed therapists or medical professionals</li>
            </ul>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Contemplative Crossfit LLC shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages
              arising out of or relating to your use of our services. Our total liability shall
              not exceed the amount you paid for the specific program giving rise to the claim.
            </p>

            <h2>9. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be
              posted on this page with an updated date. Your continued use of our website or
              participation in our programs after changes are posted constitutes your acceptance of
              the revised terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms &amp; Conditions shall be governed by and construed in accordance with the
              laws of the State of Wyoming, United States, without regard to its conflict of law
              provisions. Any disputes arising under these terms shall be resolved in the courts
              of Sheridan County, Wyoming.
            </p>

            <h2>11. Contact</h2>
            <p>
              If you have questions about these Terms &amp; Conditions, please contact us at{' '}
              <a href="mailto:contact@mindtraining.cc">contact@mindtraining.cc</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
