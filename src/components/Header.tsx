import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Learn', href: '#features' },
  { label: 'Blind 75', href: '#blind75' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Progress', href: '#metrics' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/80 backdrop-blur-xl border-b border-beige/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-gold/40 group-hover:border-gold/70 transition-colors duration-300" />
            <div className="absolute inset-1.5 rounded-full border border-lavender/40 group-hover:border-lavender/60 transition-colors duration-300" />
            <div className="absolute inset-3 rounded-full bg-gold/20 group-hover:bg-gold/30 transition-colors duration-300" />
          </div>
          <span className="font-serif text-xl tracking-tight text-charcoal">
            Aurora <span className="italic text-gold">Algorithms</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-warm hover:text-charcoal transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-sm font-medium text-gray-warm hover:text-charcoal transition-colors duration-200 px-4 py-2">
            Log in
          </button>
          <a
            href="#blind75"
            className="text-sm font-medium text-ivory bg-charcoal hover:bg-charcoal-light px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/10"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-charcoal"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-ivory/95 backdrop-blur-xl border-b border-beige/50 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-gray-warm hover:text-charcoal transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-beige/50 flex flex-col gap-3">
                <button className="text-sm font-medium text-gray-warm py-2 text-left">
                  Log in
                </button>
                <a
                  href="#blind75"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-ivory bg-charcoal px-5 py-3 rounded-full text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
