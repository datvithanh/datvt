import { fieldGuideMetadata } from '@/lib/field-guide'
import Link from 'next/link'

export const metadata = fieldGuideMetadata('/privacy', 'Privacy Policy', 'Privacy Policy for Contemplative Crossfit LLC — how we collect, use, and protect your data.')

export default function PrivacyPage() {
  return (
    <div className="legal-document wrap">
      <section className="legal-document-section">
        <div className="legal-document-inner">
          <Link href="/" className="text-link legal-back-link">
            &larr; Home
          </Link>

          <h1 className="legal-document-title">
            Privacy Policy
          </h1>
          <p className="legal-document-date">Last updated: April 1, 2026</p>

          <div className="legal-document-body">
            <h2>1. Introduction</h2>
            <p>
              Contemplative Crossfit LLC (&ldquo;CC,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is
              committed to protecting your personal data. This Privacy Policy explains how we
              collect, use, and safeguard your information when you visit our website at
              mindtraining.cc or participate in our programs.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal information you provide:</strong> Name, email address, and any information you share during the application process or in program communications.</li>
              <li><strong>Payment information:</strong> Payment details are processed securely through Wise (TransferWise). We do not store your full payment credentials on our servers.</li>
              <li><strong>Usage data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring sources. This data is collected through standard web analytics.</li>
              <li><strong>Program participation data:</strong> Session attendance, participation in discussions, and feedback you provide during the program.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process your application and enrollment</li>
              <li>Deliver our meditation training programs</li>
              <li>Communicate with you about your program, schedule changes, and updates</li>
              <li>Process payments and manage billing</li>
              <li>Improve our programs and website experience</li>
              <li>Send you information about future programs (you may opt out at any time)</li>
            </ul>

            <h2>4. Third-Party Services</h2>
            <p>
              We use the following third-party services to operate our programs. Each has its own
              privacy policy governing the use of your data:
            </p>
            <ul>
              <li><strong>Zoom:</strong> For live video sessions and application calls</li>
              <li><strong>Wise (TransferWise):</strong> For payment processing</li>
              <li><strong>Discord:</strong> For community communication and support</li>
              <li><strong>Netlify:</strong> For website hosting</li>
            </ul>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We only
              share data with the services listed above as necessary to deliver our programs.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this policy, including to provide our services, comply with legal
              obligations, and resolve disputes. If you request deletion of your data, we will
              do so within 30 days, except where we are required by law to retain it.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:contact@mindtraining.cc">contact@mindtraining.cc</a>.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Our website may use cookies and similar technologies to improve your browsing
              experience and analyze site traffic. You can control cookie settings through your
              browser preferences.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our programs are intended for adults aged 18 and older. We do not knowingly collect
              personal information from children under 18. If we become aware that we have
              collected data from a child under 18, we will delete it promptly.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated date. We encourage you to review this policy periodically.
            </p>

            <h2>11. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:contact@mindtraining.cc">contact@mindtraining.cc</a>.
            </p>
            <p>
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
