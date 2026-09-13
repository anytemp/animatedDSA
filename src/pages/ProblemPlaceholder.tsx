import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';
import { useState } from 'react';

export default function ProblemPlaceholder() {
  const { id } = useParams<{ id: string }>();
  const { getProblem, updateProblemStatus } = useProblems();
  const problem = getProblem(Number(id));
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');

  if (!problem) {
    return (
      <div
        className="min-h-screen pt-20 flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #0F0D16 0%, #171321 40%, #1F1A2E 70%, #2B253A 100%)',
        }}
      >
        <div className="text-center">
          <h1 className="font-sans text-3xl font-bold text-white mb-4">Problem not found</h1>
          <Link to="/blind75" className="text-sm font-medium text-lavender hover:underline">
            Back to Blind 75
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Easy: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30',
    Medium: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
    Hard: 'text-rose-300 bg-rose-400/10 border-rose-400/30',
  };

  const handleMarkComplete = () => {
    updateProblemStatus(problem.id, 'Completed');
    setIsCompleted(true);
  };

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
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blind75"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors mb-8"
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
            <span className="text-xs font-mono text-white/40">
              {String(problem.id).padStart(2, '0')}
            </span>
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
            <span className="text-xs text-white/60">{problem.category}</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-lavender font-mono">{problem.pattern}</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            {problem.name}
          </h1>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 lg:p-12 text-center backdrop-blur-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-6">
            <BookOpen size={28} className="text-lavender" />
          </div>

          <h2 className="font-sans text-2xl font-bold text-white mb-3">
            Learning page coming next
          </h2>

          <p className="text-white/60 leading-relaxed mb-8 max-w-md mx-auto">
            The visual explanation and interactive workspace for{' '}
            <span className="font-semibold text-white">{problem.name}</span> is being built.
            Check back soon for the full learning experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lavender text-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-lavender/90 transition-all"
            >
              Open on LeetCode
              <ExternalLink size={14} />
            </a>
            <button
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                isCompleted
                  ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 cursor-default'
                  : 'bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20'
              }`}
            >
              <CheckCircle size={14} />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
            <Link
              to="/blind75"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 px-6 py-3 rounded-xl text-sm font-medium transition-all"
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
          className="mt-12 bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm"
        >
          <h3 className="font-sans text-lg font-semibold text-white mb-4">Problem Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Category</span>
              <span className="text-sm text-white/90 font-medium">{problem.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Pattern</span>
              <span className="text-sm text-white/90 font-medium">{problem.pattern}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Difficulty</span>
              <span className={`text-sm font-semibold ${
                problem.difficulty === 'Easy' ? 'text-emerald-300' :
                problem.difficulty === 'Medium' ? 'text-amber-300' :
                'text-rose-300'
              }`}>{problem.difficulty}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Status</span>
              <span className={`text-sm font-medium ${
                problem.status === 'Completed' ? 'text-emerald-300' :
                problem.status === 'In Progress' ? 'text-lavender' :
                'text-white/60'
              }`}>{problem.status}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
