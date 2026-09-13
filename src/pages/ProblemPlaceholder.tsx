import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { problems } from '../data/problems';

export default function ProblemPlaceholder() {
  const { id } = useParams<{ id: string }>();
  const problem = problems.find(p => p.id === Number(id));

  if (!problem) {
    return (
      <div className="min-h-screen bg-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-sans text-3xl font-bold text-text-primary mb-4">Problem not found</h1>
          <Link to="/blind75" className="text-sm font-medium text-dark hover:underline">
            Back to Blind 75
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Easy: 'text-emerald-700 bg-emerald-50 border-emerald-200/50',
    Medium: 'text-amber-700 bg-amber-50 border-amber-200/50',
    Hard: 'text-rose-700 bg-rose-50 border-rose-200/50',
  };

  return (
    <div className="min-h-screen bg-bg pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
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
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-mono text-text-light">
              {String(problem.id).padStart(2, '0')}
            </span>
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
            <span className="text-xs text-text-secondary">{problem.topic}</span>
            <span className="text-border">·</span>
            <span className="text-xs text-text-light font-mono">{problem.pattern}</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
            {problem.name}
          </h1>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-8 lg:p-12 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-6">
            <BookOpen size={28} className="text-dark" />
          </div>

          <h2 className="font-sans text-2xl font-bold text-text-primary mb-3">
            Learning page coming next
          </h2>

          <p className="text-text-body leading-relaxed mb-8 max-w-md mx-auto">
            The visual explanation and interactive workspace for <span className="font-semibold text-text-primary">{problem.name}</span> is being built. 
            Check back soon for the full learning experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-dark-light transition-all"
            >
              Open on LeetCode
              <ExternalLink size={14} />
            </a>
            <Link
              to="/blind75"
              className="inline-flex items-center gap-2 bg-white border border-border text-text-primary px-6 py-3 rounded-full text-sm font-semibold hover:border-lavender/40 transition-all"
            >
              Back to Library
            </Link>
          </div>
        </motion.div>

        {/* Problem Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl p-6 lg:p-8"
        >
          <h3 className="font-sans text-lg font-semibold text-text-primary mb-4">Problem Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-text-light uppercase tracking-wider">Topic</span>
              <span className="text-sm text-text-primary font-medium">{problem.topic}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-text-light uppercase tracking-wider">Pattern</span>
              <span className="text-sm text-text-primary font-medium">{problem.pattern}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-text-light uppercase tracking-wider">Difficulty</span>
              <span className={`text-sm font-semibold ${
                problem.difficulty === 'Easy' ? 'text-emerald-600' :
                problem.difficulty === 'Medium' ? 'text-amber-600' :
                'text-rose-600'
              }`}>{problem.difficulty}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-text-light uppercase tracking-wider">Status</span>
              <span className="text-sm text-text-primary font-medium">{problem.status}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
