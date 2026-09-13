import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Eye, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { problems } from '../data/problems';

export default function TwoSumPage() {
  const problem = problems.find(p => p.id === 1)!;

  return (
    <div className="min-h-screen bg-bg pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blind75"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Blind 75
          </Link>
        </motion.div>

        {/* Problem Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-text-light">01</span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-emerald-700 bg-emerald-50 border-emerald-200/50">
              Easy
            </span>
            <span className="text-xs text-text-secondary">Array</span>
            <span className="text-border">·</span>
            <span className="text-xs text-text-light font-mono">Hash Map</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
            Two Sum
          </h1>

          <p className="text-lg text-text-body leading-relaxed max-w-2xl">
            Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
          </p>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-8 lg:p-12 text-center max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-6">
            <Code2 size={28} className="text-dark" />
          </div>

          <h2 className="font-sans text-2xl font-bold text-text-primary mb-3">
            Visual workspace coming next
          </h2>

          <p className="text-text-body leading-relaxed mb-8 max-w-md mx-auto">
            The interactive visualization, synchronized code execution, and step-by-step learning workspace for this problem is being built.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-dark-light transition-all"
            >
              Open on LeetCode
              <ArrowLeft size={14} className="rotate-180" />
            </a>
            <Link
              to="/blind75"
              className="inline-flex items-center gap-2 bg-white border border-border text-text-primary px-6 py-3 rounded-full text-sm font-semibold hover:border-lavender/40 transition-all"
            >
              Back to Library
            </Link>
          </div>
        </motion.div>

        {/* Feature Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-4">
              <Eye size={20} className="text-dark" />
            </div>
            <h3 className="font-sans text-base font-semibold text-text-primary mb-2">Visual Explanation</h3>
            <p className="text-sm text-text-body">Watch the algorithm solve Two Sum step by step with animated data structures.</p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-dark/5 border border-dark/10 flex items-center justify-center mx-auto mb-4">
              <Code2 size={20} className="text-dark" />
            </div>
            <h3 className="font-sans text-base font-semibold text-text-primary mb-2">Synchronized Code</h3>
            <p className="text-sm text-text-body">See each line of code execute in real-time as the visualization progresses.</p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-4">
              <Target size={20} className="text-dark" />
            </div>
            <h3 className="font-sans text-base font-semibold text-text-primary mb-2">Practice Mode</h3>
            <p className="text-sm text-text-body">Reconstruct the solution from memory after understanding the pattern.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
