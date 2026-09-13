import Header from './components/Header';
import Hero from './components/Hero';
import Blind75 from './components/Blind75';
import { Metrics, Features, HowItWorks, FinalCTA, Footer } from './components/Sections';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg">
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Metrics Strip */}
        <Metrics />

        {/* Features */}
        <Features />

        {/* Blind 75 Featured Section */}
        <Blind75 />

        {/* How It Works */}
        <HowItWorks />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
