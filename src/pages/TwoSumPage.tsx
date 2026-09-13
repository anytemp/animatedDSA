import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ChevronRight, ExternalLink, CheckCircle, Play, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';

export default function TwoSumPage() {
  const { updateProblemStatus, getProblem } = useProblems();
  const navigate = useNavigate();
  const problem = getProblem(1);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');

  const handleMarkComplete = () => {
    updateProblemStatus(1, 'Completed');
    setIsCompleted(true);
  };

  const handleVisualize = () => {
    navigate('/problem/1/visualize');
  };

  const testCases = [
    {
      nums: [2, 7, 11, 15],
      target: 9,
      output: [0, 1],
      explanation: '2 + 7 = 9',
    },
    {
      nums: [3, 2, 4],
      target: 6,
      output: [1, 2],
      explanation: '2 + 4 = 6',
    },
    {
      nums: [3, 3],
      target: 6,
      output: [0, 1],
      explanation: 'The two different indices contain values that add up to 6.',
    },
  ];

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
                <Home size={14} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <ChevronRight size={12} className="text-white/30" />
              <Link
                to="/blind75"
                className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Blind 75</span>
              </Link>
            </motion.div>

            {/* Center: Problem info */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-mono text-white/50">01</span>
              <span className="font-mono font-semibold text-white">Two Sum</span>
            </motion.div>

            {/* Right: Badges */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20 text-white/80 bg-white/5">
                Array
              </span>
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-lavender/30 text-lavender bg-lavender/10">
                Hash Map
              </span>
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-emerald-400/30 text-emerald-300 bg-emerald-400/10">
                Easy
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Problem Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-white/40">01</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Two Sum
          </h1>
          <p className="text-sm text-white/50 font-mono">
            Array · Hash Map · Easy
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xs font-semibold tracking-widest uppercase text-lavender mb-4">
            Problem Statement
          </h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              Given an array of integers <code className="font-mono text-lavender bg-lavender/10 px-1.5 py-0.5 rounded">nums</code> and
              an integer <code className="font-mono text-lavender bg-lavender/10 px-1.5 py-0.5 rounded">target</code>,
              return indices of the two numbers such that they add up to target.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              You need to find two different positions in the array whose values add up to the target.
              Return their indices, not the values themselves.
            </p>
          </div>
        </motion.section>

        {/* Input / Output */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 grid md:grid-cols-2 gap-4 lg:gap-6"
        >
          {/* Input Panel */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-lavender" />
              <h3 className="text-xs font-semibold tracking-widest uppercase text-lavender">
                Input
              </h3>
            </div>
            <div className="font-mono text-sm text-white/90 space-y-2">
              <div>
                <span className="text-white/50">nums</span> ={' '}
                <span className="text-lavender">[2, 7, 11, 15]</span>
              </div>
              <div>
                <span className="text-white/50">target</span> ={' '}
                <span className="text-lavender">9</span>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-xs font-semibold tracking-widest uppercase text-emerald-300">
                Output
              </h3>
            </div>
            <div className="font-mono text-sm text-white/90 mb-3">
              <span className="text-emerald-300">[0, 1]</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              The numbers at indices 0 and 1 are 2 and 7, and 2 + 7 = 9.
            </p>
          </div>
        </motion.section>

        {/* Test Cases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-xs font-semibold tracking-widest uppercase text-lavender mb-6">
            Understand it through examples
          </h2>
          <div className="grid gap-4">
            {testCases.map((tc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-lavender/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono text-white/40">
                    Example {i + 1}
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-[10px] font-semibold tracking-widest uppercase text-white/40 mb-2">
                      Input
                    </div>
                    <div className="font-mono text-xs text-white/80 space-y-1">
                      <div>
                        <span className="text-white/50">nums</span> ={' '}
                        <span className="text-lavender">[{tc.nums.join(', ')}]</span>
                      </div>
                      <div>
                        <span className="text-white/50">target</span> ={' '}
                        <span className="text-lavender">{tc.target}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-widest uppercase text-white/40 mb-2">
                      Output
                    </div>
                    <div className="font-mono text-xs text-emerald-300">
                      [{tc.output.join(', ')}]
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-widest uppercase text-white/40 mb-2">
                      Explanation
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {tc.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Constraints */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-xs font-semibold tracking-widest uppercase text-lavender mb-4">
            Constraints
          </h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <ul className="space-y-2">
              {[
                '2 ≤ nums.length ≤ 10⁴',
                '-10⁹ ≤ nums[i] ≤ 10⁹',
                '-10⁹ ≤ target ≤ 10⁹',
                'Only one valid answer exists.',
                'You may not use the same element twice.',
                'The answer may be returned in any order.',
              ].map((constraint, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="text-lavender/50 mt-1">•</span>
                  <span className="font-mono text-xs leading-relaxed">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Primary Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <button
            onClick={handleVisualize}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-lavender text-dark px-8 py-4 rounded-xl text-sm font-semibold hover:bg-lavender/90 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/20"
          >
            <Play size={16} className="group-hover:scale-110 transition-transform" />
            Visualize Two Sum
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.section>

        {/* Secondary Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-3"
        >
          {/* Practice on LeetCode */}
          <a
            href="https://leetcode.com/problems/two-sum/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 px-5 py-3 rounded-xl text-sm font-medium transition-all"
          >
            <ExternalLink size={14} />
            Practice on LeetCode
          </a>

          {/* Mark as Complete */}
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              isCompleted
                ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 cursor-default'
                : 'bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20'
            }`}
          >
            <CheckCircle size={14} />
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </button>

          {/* Back to Library */}
          <Link
            to="/blind75"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 px-5 py-3 rounded-xl text-sm font-medium transition-all"
          >
            <ArrowLeft size={14} />
            Back to Library
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
