import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Code2, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TwoSumVisualization() {
  return (
    <div
      className="min-h-screen pt-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F0D16 0%, #171321 40%, #1F1A2E 70%, #2B253A 100%)',
      }}
    >
      {/* Subtle violet light accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-lavender/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-lavender/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-lavender/3 blur-3xl" />
      </div>

      {/* Top Navigation */}
      <div className="relative border-b border-white/5 bg-[#171321]/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <Link
                to="/"
                className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
              >
                <span>Home</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link
                to="/blind75"
                className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
              >
                <span>Blind 75</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link
                to="/problem/1"
                className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Two Sum</span>
              </Link>
            </motion.div>

            {/* Right: Status */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-lavender/30 text-lavender bg-lavender/10">
                Visualization
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-lavender/15 border border-lavender/25 mb-8"
          >
            <Eye size={36} className="text-lavender" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Two Sum Visualization
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/60 leading-relaxed mb-12"
          >
            Next, we will walk through the brute-force, better, and optimal approaches
            with synchronized visuals and code.
          </motion.p>

          {/* Feature Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-3">
                <Eye size={18} className="text-lavender" />
              </div>
              <h3 className="font-mono text-sm font-semibold text-white mb-1">Visual Explanation</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Watch the algorithm solve Two Sum step by step.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                <Code2 size={18} className="text-white/70" />
              </div>
              <h3 className="font-mono text-sm font-semibold text-white mb-1">Synchronized Code</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                See each line of code execute in real-time.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-3">
                <Target size={18} className="text-lavender" />
              </div>
              <h3 className="font-mono text-sm font-semibold text-white mb-1">Practice Mode</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Reconstruct the solution from memory.
              </p>
            </div>
          </motion.div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-lavender/70 mb-12"
          >
            <Sparkles size={12} />
            Coming in the next iteration
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/problem/1"
              className="inline-flex items-center gap-2 bg-lavender text-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-lavender/90 transition-all"
            >
              <ArrowLeft size={14} />
              Back to Problem
            </Link>
            <Link
              to="/blind75"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 px-6 py-3 rounded-xl text-sm font-medium transition-all"
            >
              Back to Library
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
