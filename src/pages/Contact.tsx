import ContactForm from '../components/ContactForm'
import { Container } from '../components/SectionHead'
import { CONTACT_EMAIL } from '../data/inquiry'

export default function Contact() {
  return (
    <section className="bg-[#F5F5F5] pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h1 className="hero-title hero-title--long text-gray-900">
              Let's make something meaningful.
            </h1>
            <p className="mt-6 max-w-md text-[15px] sm:text-[17px] leading-[1.6] text-gray-700">
              Tell us a little about your project. We'll review your requirements and get back to you
              with the next steps.
            </p>
            {CONTACT_EMAIL && (
              <p className="mt-8 text-[14px] text-gray-600">
                Prefer email?{' '}
                <a className="text-gray-900 underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            )}
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
