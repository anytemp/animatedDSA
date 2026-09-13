import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ChevronRight, ExternalLink, CheckCircle, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';

export default function ContainsDuplicatePage() {
  const { updateProblemStatus, getProblem } = useProblems();
  const navigate = useNavigate();
  const problem = getProblem(3);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');

  const handleMarkComplete = () => {
    updateProblemStatus(3, 'Completed');
    setIsCompleted(true);
  };

  const handleVisualize = () => {
    navigate('/problem/3/visualize');
  };

  const testCases = [
    {
      nums: [1, 2, 3, 1],
      output: 'true',
      explanation: 'The value 1 appears at indices 0 and 3.',
    },
    {
      nums: [1, 2, 3, 4],
      output: 'false',
      explanation: 'Every value appears only once.',
    },
    {
      nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
      output: 'true',
      explanation: 'Multiple values appear more than once.',
    },
  ];

  return (
    <div
      className="min-h-screen pt-20 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #FFFFFF 0%, #F0F9FF 50%, #E0F2FE 100%)',
      }}
    >
      {/* Subtle cyan side glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#CDEEFF]/30 blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#A2DFFF]/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#CDEEFF]/20 blur-3xl" />
      </div>

      {/* Top Navigation */}
      <div className="relative border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                <Home size={16} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link to="/blind75" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft size={16} />
                <span>Blind 75</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-mono text-gray-500">03</span>
              <span className="font-mono font-semibold text-gray-900 text-lg">Contains Duplicate</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 bg-gray-50">Array</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50">Hash Set</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-700 bg-emerald-50">Easy</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Problem Title with Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-base font-mono text-gray-500">03</span>
              <span className="text-gray-400">·</span>
              <span className="text-base font-medium text-gray-600">Array</span>
              <span className="text-gray-400">·</span>
              <span className="text-base font-medium text-gray-600">Hash Set</span>
              <span className="text-gray-400">·</span>
              <span className="text-base font-medium text-emerald-600">Easy</span>
            </div>
            <h1 
              className="font-sans font-bold tracking-tight text-gray-900 mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                lineHeight: '1.1',
                wordBreak: 'break-word'
              }}
            >
              Contains Duplicate
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleVisualize}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-base font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
            >
              <Play size={18} />
              Visualize Contains Duplicate
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://leetcode.com/problems/contains-duplicate/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-xl text-base font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <ExternalLink size={18} />
              Practice on LeetCode
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-colors border ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default'
                  : 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200'
              }`}
            >
              <CheckCircle size={18} />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </motion.button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/blind75" className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-xl text-base font-semibold hover:bg-gray-200 transition-colors border border-gray-200">
                <ArrowLeft size={18} />
                Back to Library
              </Link>
            </motion.div>
          </div>

          {/* Problem Description */}
          <div className="space-y-6">
            <p className="text-3xl text-gray-900 leading-relaxed">
              Given an integer array <code className="font-mono text-blue-600 bg-blue-50 px-4 py-2 rounded-lg text-3xl">nums</code>, return <code className="font-mono text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg text-3xl">true</code> if any value appears <span className="font-semibold">at least twice</span> in the array, and return <code className="font-mono text-rose-600 bg-rose-50 px-4 py-2 rounded-lg text-3xl">false</code> if every element is distinct.
            </p>
          </div>
        </motion.div>

        {/* Input / Output */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Input & Output</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#DCEBFA] shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500">Input</h3>
              </div>

              {/* Visual Array */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-mono text-gray-600">nums</span>
                  <span className="text-lg text-gray-400">=</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {[1, 2, 3, 1].map((num, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-xs font-mono text-gray-400 mb-1">Index {i}</span>
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-xl text-2xl font-mono font-bold border-2 ${
                          i === 0 || i === 3
                            ? 'bg-rose-50 border-rose-400 text-rose-700'
                            : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                      >
                        {num}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-rose-400" />
                    <span className="text-gray-600">Duplicate value (1)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Output Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#DCEBFA] shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500">Output</h3>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-mono font-bold text-emerald-600 bg-emerald-50 px-8 py-4 rounded-xl border-2 border-emerald-200 inline-block">
                  true
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The value <span className="font-mono font-bold text-rose-600">1</span> appears at indices <span className="font-mono font-bold text-gray-900">0</span> and <span className="font-mono font-bold text-gray-900">3</span>.
                </p>
                <p className="text-lg text-gray-900 leading-relaxed font-semibold">
                  Therefore, the array contains a duplicate.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#0A0A0A] mb-4">Understand it through examples</h2>
          <p className="text-xl text-[#4A4A4A] mb-10 leading-relaxed">See how duplicate detection works with different inputs.</p>
          <div className="space-y-8">
            {testCases.map((tc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                className="bg-white rounded-3xl p-10 border-2 border-[#DCEBFA] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{i + 1}</span>
                  </div>
                  <span className="text-xl font-bold text-[#0A0A0A]">Example {i + 1}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-base font-semibold text-[#4A4A4A] mb-4 uppercase tracking-wide">Input</div>
                    <div className="font-mono text-lg text-[#0A0A0A] space-y-3 leading-relaxed">
                      <div>
                        <span className="text-[#6B6B6B]">nums</span> ={' '}
                        <span className="text-blue-600 font-bold">[{tc.nums.join(', ')}]</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-[#4A4A4A] mb-4 uppercase tracking-wide">Output</div>
                    <div className={`font-mono text-xl font-bold leading-relaxed ${
                      tc.output === 'true' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {tc.output}
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-[#4A4A4A] mb-4 uppercase tracking-wide">Explanation</div>
                    <p className="text-lg text-[#0A0A0A] leading-relaxed">
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
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Constraints</h2>
          <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
            <div className="border-l-4 border-blue-400 pl-6">
              <ul className="space-y-4">
                {[
                  '1 ≤ nums.length ≤ 10⁵',
                  '−10⁹ ≤ nums[i] ≤ 10⁹',
                ].map((constraint, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg text-gray-700">
                    <span className="text-blue-500 font-bold mt-0.5">{i + 1}.</span>
                    <span className="font-mono leading-relaxed">{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Footer Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            to="/blind75"
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-xl text-base font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
          >
            <ArrowLeft size={18} />
            Back to Library
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
