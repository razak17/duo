import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)/privacy/')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 font-bold text-3xl text-neutral-700">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-neutral-600">
        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, make a purchase, or contact us for support. This
            may include your name, email address, and learning progress data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, personalize your learning experience, and communicate
            with you about updates and promotions.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            3. Information Sharing
          </h2>
          <p>
            We do not sell your personal information. We may share your
            information with third-party service providers who assist us in
            operating our platform, subject to confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            4. Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            5. Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. You may also opt out of marketing communications at any
            time by following the unsubscribe instructions in our emails.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            6. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us through our support channels.
          </p>
        </section>

        <p className="pt-4 text-neutral-500 text-sm">
          Last updated: December 24, 2025
        </p>
      </div>
    </div>
  )
}
