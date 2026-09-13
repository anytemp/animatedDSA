import Hero from '../components/Hero';
import Blind75 from '../components/Blind75';
import { Metrics, Features, FinalCTA, Footer } from '../components/Sections';

export default function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <Metrics />
        <Features />
        <Blind75 />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
