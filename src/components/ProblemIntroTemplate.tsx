import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ChevronRight, ExternalLink, CheckCircle, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';
import { useAuth } from '../context/AuthContext';

interface ProblemIntroProps {
  problemId: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  pattern: string;
  statement: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  constraints: string[];
}

export default function ProblemIntroTemplate({
  problemId,
  title,
  difficulty,
  topic,
  pattern,
  statement,
  examples,
  constraints,
}: ProblemIntroProps) {
  const { updateProblemStatus, getProblem } = useProblems();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const problem = getProblem(problemId);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');

  const handleMarkComplete = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    updateProblemStatus(problemId, 'Completed');
    setIsCompleted(true);
  };

  const handleVisualize = () => {
    navigate(`/problem/${problemId}/visualize`);
  };

  const difficultyColors = {
    Easy: 'border-emerald-200 text-emerald-700 bg-emerald-50',
    Medium: 'border-amber-200 text-amber-700 bg-amber-50',
    Hard: 'border-rose-200 text-rose-700 bg-rose-50',
  };

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
              <span className="text-sm font-mono text-gray-500">{String(problemId).padStart(2, '0')}</span>
              <span className="font-mono font-semibold text-gray-900 text-lg">{title}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 bg-gray-50">{topic}</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50">{pattern}</span>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${difficultyColors[difficulty]}`}>{difficulty}</span>
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
              <span className="text-base font-mono text-gray-500">{String(problemId).padStart(2, '0')}</span>
              <span className="text-gray-400">·</span>
              <span className="text-base font-medium text-gray-600">{topic}</span>
              <span className="text-gray-400">·</span>
              <span className="text-base font-medium text-gray-600">{pattern}</span>
              <span className="text-gray-400">·</span>
              <span className={`text-base font-medium ${
                difficulty === 'Easy' ? 'text-emerald-600' : difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
              }`}>{difficulty}</span>
            </div>
            <h1 
              className="font-sans font-bold tracking-tight text-gray-900 mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                lineHeight: '1.1',
                wordBreak: 'break-word'
              }}
            >
              {title}
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
              Visualize Problem
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://leetcode.com/problems/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`}
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
              {statement}
            </p>
          </div>
        </motion.div>

        {/* Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Examples</h2>
          <div className="space-y-6">
            {examples.map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#DCEBFA] shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{i + 1}</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Example {i + 1}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-base font-semibold text-gray-600 mb-3 uppercase tracking-wide">Input</div>
                    <div className="font-mono text-lg text-gray-900 leading-relaxed">
                      {example.input}
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-600 mb-3 uppercase tracking-wide">Output</div>
                    <div className="font-mono text-lg text-emerald-600 font-bold leading-relaxed">
                      {example.output}
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-600 mb-3 uppercase tracking-wide">Explanation</div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {example.explanation}
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Constraints</h2>
          <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
            <div className="border-l-4 border-blue-400 pl-6">
              <ul className="space-y-4">
                {constraints.map((constraint, i) => (
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
          transition={{ duration: 0.6, delay: 0.6 }}
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
