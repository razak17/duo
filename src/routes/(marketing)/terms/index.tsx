import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)/terms/')({
  component: TermsOfService,
})

function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 font-bold text-3xl text-neutral-700">
        Terms of Service
      </h1>

      <div className="space-y-6 text-neutral-600">
        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Lingozeit, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not
            use our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            2. Use of Services
          </h2>
          <p>
            You may use our services only for lawful purposes and in accordance
            with these terms. You agree not to misuse our services or help
            anyone else do so.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            3. Account Registration
          </h2>
          <p>
            You may need to create an account to access certain features. You
            are responsible for maintaining the confidentiality of your account
            credentials and for all activities under your account.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            4. Intellectual Property
          </h2>
          <p>
            All content on Lingozeit, including text, graphics, logos, and
            software, is the property of Lingozeit or its licensors and is
            protected by intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            5. Limitation of Liability
          </h2>
          <p>
            Lingozeit shall not be liable for any indirect, incidental, special,
            or consequential damages arising from your use of our services. Our
            total liability shall not exceed the amount paid by you, if any, for
            accessing our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            6. Termination
          </h2>
          <p>
            We may terminate or suspend your access to our services at any time,
            without prior notice, for conduct that we believe violates these
            terms or is harmful to other users or us.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-neutral-700 text-xl">
            7. Changes to Terms
          </h2>
          <p>
            We may modify these terms at any time. We will notify you of
            significant changes by posting the new terms on our platform.
            Continued use of our services after changes constitutes acceptance.
          </p>
        </section>

        <p className="pt-4 text-neutral-500 text-sm">
          Last updated: December 24, 2025
        </p>
      </div>
    </div>
  )
}
