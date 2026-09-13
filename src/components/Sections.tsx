import { motion } from 'framer-motion';
import { Eye, Code2, Target, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── METRICS STRIP ─── */
export function Metrics() {
  const metrics = [
    { value: '75', label: 'Curated problems' },
    { value: '12', label: 'Core patterns' },
    { value: '3', label: 'Learning stages' },
    { value: '1', label: 'Clear visual system' },
  ];

  return (
    <section id="metrics" className="relative py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 lg:p-8 text-center relative overflow-hidden group hover:border-lavender/30 transition-all duration-300"
            >
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-lavender/10 group-hover:bg-lavender/20 transition-colors duration-300" />
              <div className="font-sans text-4xl lg:text-5xl font-bold text-text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-text-secondary font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─── */
export function Features() {
  const features = [
    {
      icon: Eye,
      title: 'Visual-first explanations',
      description: 'See arrays, pointers, maps, trees, and graphs change step by step.',
      iconBg: 'bg-lavender/15 border-lavender/25',
    },
    {
      icon: Code2,
      title: 'Code synchronized with action',
      description: 'Understand what each meaningful line does while the algorithm runs.',
      iconBg: 'bg-dark/5 border-dark/10',
    },
    {
      icon: Target,
      title: 'Practice with purpose',
      description: 'Move from explanation to recall, reconstruction, and LeetCode practice.',
      iconBg: 'bg-lavender/15 border-lavender/25',
    },
  ];

  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px decorative-line" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dark mb-4">
            <Sparkles size={12} />
            The Platform
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold text-text-primary">
            Learn the thinking{' '}
            <span className="italic font-medium">behind</span>{' '}
            the code.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-8 group hover:border-lavender/30 hover:shadow-lg hover:shadow-lavender/10 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={20} className="text-text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-sm text-text-body leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Understand the problem',
      description: 'Read the question, identify constraints, and clarify what the output should look like.',
    },
    {
      number: '02',
      title: 'Visualize the algorithm',
      description: 'Watch the data structure transform step by step. See pointers move, values swap, and patterns emerge.',
    },
    {
      number: '03',
      title: 'Reconstruct and practice',
      description: 'Write the solution from memory. Reinforce understanding through deliberate reconstruction.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-lavender/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px decorative-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px decorative-line" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dark mb-4">
            <BookOpen size={12} />
            Process
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold text-text-primary">
            How it works.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-border mb-6 relative z-10">
                <span className="font-sans text-lg font-bold text-dark">{step.number}</span>
              </div>
              <h3 className="font-sans text-xl lg:text-2xl font-semibold text-text-primary mb-3">{step.title}</h3>
              <p className="text-sm text-text-body leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lavender/8 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-lavender/5 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-dark/3 blur-2xl" />

        {/* Decorative algorithmic elements */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 800 400">
          <circle cx="100" cy="100" r="3" fill="#2B253A" />
          <circle cx="200" cy="150" r="2" fill="#2B253A" />
          <circle cx="350" cy="80" r="4" fill="#2B253A" />
          <circle cx="500" cy="200" r="3" fill="#2B253A" />
          <circle cx="650" cy="120" r="2" fill="#2B253A" />
          <circle cx="700" cy="300" r="3" fill="#2B253A" />
          <line x1="100" y1="100" x2="200" y2="150" stroke="#2B253A" strokeWidth="0.5" />
          <line x1="200" y1="150" x2="350" y2="80" stroke="#2B253A" strokeWidth="0.5" />
          <line x1="350" y1="80" x2="500" y2="200" stroke="#2B253A" strokeWidth="0.5" />
          <line x1="500" y1="200" x2="650" y2="120" stroke="#2B253A" strokeWidth="0.5" />
          <line x1="650" y1="120" x2="700" y2="300" stroke="#2B253A" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold text-text-primary mb-8 leading-tight">
            Stop memorizing solutions.
            <br />
            <span className="italic font-medium text-dark">Start seeing</span> how they work.
          </h2>

          <Link
            to="/blind75"
            className="group inline-flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-dark-light transition-all duration-300 hover:shadow-xl hover:shadow-dark/10"
          >
            Start with Blind 75
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
export function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 rounded-full border border-lavender/40" />
                <div className="absolute inset-1.5 rounded-full border border-dark/20" />
                <div className="absolute inset-3 rounded-full bg-lavender/30" />
              </div>
              <span className="font-sans text-lg font-bold text-text-primary">
                Aurora <span className="italic font-medium text-dark">Algorithms</span>
              </span>
            </div>
            <p className="text-sm text-text-body leading-relaxed max-w-xs">
              Learn visually. Think algorithmically.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-text-light mb-4">Navigate</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Learn</a></li>
              <li><Link to="/blind75" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Blind 75</Link></li>
              <li><a href="#metrics" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Progress</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">About</a></li>
            </ul>
          </div>

          {/* Actions */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-text-light mb-4">Get Started</h4>
            <div className="flex flex-col gap-3">
              <button className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left">
                Log in
              </button>
              <Link
                to="/blind75"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-dark hover:bg-dark-light px-5 py-2.5 rounded-full transition-all duration-300 w-fit"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-light">
            © 2025 Aurora Algorithms. A visual DSA learning platform.
          </p>
          <p className="text-xs text-text-light">
            Designed for deep understanding.
          </p>
        </div>
      </div>
    </footer>
  );
}
