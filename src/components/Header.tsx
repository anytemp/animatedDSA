import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isLibraryPage = location.pathname === '/blind75';
  const isProblemPage = location.pathname.startsWith('/problem');

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isLibraryPage || isProblemPage
          ? (isLibraryPage || isProblemPage
              ? 'bg-[#171321]/80 backdrop-blur-xl border-b border-white/5'
              : 'bg-bg/80 backdrop-blur-xl border-b border-border/50')
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-lavender/40 group-hover:border-lavender/70 transition-colors duration-300" />
            <div className="absolute inset-1.5 rounded-full border border-dark/20 group-hover:border-dark/30 transition-colors duration-300" />
            <div className="absolute inset-3 rounded-full bg-lavender/30 group-hover:bg-lavender/50 transition-colors duration-300" />
          </div>
          <span className={`font-sans text-xl font-bold tracking-tight ${
            isLibraryPage || isProblemPage ? 'text-white' : 'text-text-primary'
          }`}>
            Aurora <span className="italic font-medium text-lavender">Algorithms</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Home link (only show on non-landing pages) */}
          {!isLandingPage && (
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                isLibraryPage || isProblemPage
                  ? 'text-white/70 hover:text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
            </Link>
          )}

          {/* Learn - hash link on landing page, or navigate to landing page */}
          {isLandingPage ? (
            <a
              href="#features"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 relative group"
            >
              Learn
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
            </a>
          ) : (
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                isLibraryPage || isProblemPage
                  ? 'text-white/70 hover:text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Learn
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
            </Link>
          )}

          {/* Blind 75 */}
          <Link
            to="/blind75"
            className={`text-sm font-medium transition-colors duration-200 relative group ${
              location.pathname === '/blind75'
                ? (isLibraryPage || isProblemPage ? 'text-white' : 'text-text-primary')
                : (isLibraryPage || isProblemPage ? 'text-white/70 hover:text-white' : 'text-text-secondary hover:text-text-primary')
            }`}
          >
            Blind 75
            <span className={`absolute -bottom-1 left-0 h-px bg-lavender transition-all duration-300 ${
              location.pathname === '/blind75' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>

          {/* How It Works - hash link on landing page, or navigate to landing page */}
          {isLandingPage ? (
            <a
              href="#how-it-works"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 relative group"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
            </a>
          ) : (
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                isLibraryPage || isProblemPage
                  ? 'text-white/70 hover:text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
            </Link>
          )}

          {/* Progress - hash link on landing page, or navigate to landing page */}
          {isLandingPage ? (
            <a
              href="#metrics"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 relative group"
            >
              Progress
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
            </a>
          ) : (
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                isLibraryPage || isProblemPage
                  ? 'text-white/70 hover:text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Progress
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className={`flex items-center gap-2 text-sm font-medium ${
                isLibraryPage || isProblemPage ? 'text-white/90' : 'text-text-primary'
              }`}>
                <User size={16} />
                <span>{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 px-4 py-2 ${
                  isLibraryPage || isProblemPage
                    ? 'text-white/70 hover:text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className={`text-sm font-medium transition-colors duration-200 px-4 py-2 ${
                isLibraryPage || isProblemPage
                  ? 'text-white/70 hover:text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Log in
            </Link>
          )}
          <Link
            to="/blind75"
            className="text-sm font-medium text-white bg-lavender hover:bg-lavender/80 px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-lavender/20"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${
            isLibraryPage || isProblemPage ? 'text-white' : 'text-text-primary'
          }`}
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
            className={`lg:hidden backdrop-blur-xl border-b overflow-hidden ${
              isLibraryPage || isProblemPage
                ? 'bg-[#171321]/95 border-white/5'
                : 'bg-bg/95 border-border/50'
            }`}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {/* Home link (only show on non-landing pages) */}
              {!isLandingPage && (
                <Link
                  to="/"
                  className={`text-base font-medium transition-colors py-2 ${
                    isLibraryPage || isProblemPage
                      ? 'text-white/70 hover:text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Home
                </Link>
              )}

              {/* Learn */}
              {isLandingPage ? (
                <a href="#features" className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors py-2">
                  Learn
                </a>
              ) : (
                <Link to="/" className={`text-base font-medium transition-colors py-2 ${
                  isLibraryPage || isProblemPage
                    ? 'text-white/70 hover:text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}>
                  Learn
                </Link>
              )}

              {/* Blind 75 */}
              <Link to="/blind75" className={`text-base font-medium transition-colors py-2 ${
                isLibraryPage || isProblemPage
                  ? 'text-white/70 hover:text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}>
                Blind 75
              </Link>

              {/* How It Works */}
              {isLandingPage ? (
                <a href="#how-it-works" className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors py-2">
                  How It Works
                </a>
              ) : (
                <Link to="/" className={`text-base font-medium transition-colors py-2 ${
                  isLibraryPage || isProblemPage
                    ? 'text-white/70 hover:text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}>
                  How It Works
                </Link>
              )}

              {/* Progress */}
              {isLandingPage ? (
                <a href="#metrics" className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors py-2">
                  Progress
                </a>
              ) : (
                <Link to="/" className={`text-base font-medium transition-colors py-2 ${
                  isLibraryPage || isProblemPage
                    ? 'text-white/70 hover:text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}>
                  Progress
                </Link>
              )}

              <div className={`pt-4 border-t flex flex-col gap-3 ${
                isLibraryPage || isProblemPage ? 'border-white/10' : 'border-border/50'
              }`}>
                {isAuthenticated ? (
                  <>
                    <div className={`flex items-center gap-2 text-sm font-medium py-2 ${
                      isLibraryPage || isProblemPage ? 'text-white/90' : 'text-text-primary'
                    }`}>
                      <User size={16} />
                      <span>{user?.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className={`flex items-center gap-1.5 text-sm font-medium py-2 text-left ${
                        isLibraryPage || isProblemPage
                          ? 'text-white/70'
                          : 'text-text-secondary'
                      }`}
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className={`text-sm font-medium py-2 text-left ${
                      isLibraryPage || isProblemPage
                        ? 'text-white/70'
                        : 'text-text-secondary'
                    }`}
                  >
                    Log in
                  </Link>
                )}
                <Link
                  to="/blind75"
                  className="text-sm font-medium text-dark bg-lavender hover:bg-lavender/80 px-5 py-3 rounded-full text-center transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
