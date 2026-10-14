import RollButton from '../components/RollButton'
import { Container } from '../components/SectionHead'

export default function NotFound() {
  return (
    <section className="pb-24 pt-40">
      <Container>
        <h1 className="hero-title hero-title--long text-gray-900">Page not found</h1>
        <p className="mt-4 text-gray-600">The page you're looking for doesn't exist.</p>
        <div className="mt-8">
          <RollButton to="/" variant="dark">Back to Home</RollButton>
        </div>
      </Container>
    </section>
  )
}
