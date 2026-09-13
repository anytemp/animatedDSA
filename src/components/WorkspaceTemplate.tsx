import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ExternalLink, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';
import { useAuth } from '../context/AuthContext';
import ApproachTabs, { ApproachType } from './visualization/ApproachTabs';

interface ApproachContent {
  title: string;
  description: string;
  intuition: string;
  howItWorks: string;
  tradeoff?: string;
}

interface WorkspaceTemplateProps {
  problemId: number;
  title: string;
  topic: string;
  pattern: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  approaches: Record<ApproachType, ApproachContent>;
  children: (approach: ApproachType) => ReactNode;
}

export default function WorkspaceTemplate({
  problemId,
  title,
  topic,
  pattern,
  difficulty,
  approaches,
  children,
}: WorkspaceTemplateProps) {
  const { updateProblemStatus, getProblem } = useProblems();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const problem = getProblem(problemId);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');
  const [currentApproach, setCurrentApproach] = useState<ApproachType>('brute');

  const handleMarkComplete = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    updateProblemStatus(problemId, 'Completed');
    setIsCompleted(true);
  };

  const difficultyColors = {
    Easy: 'border-emerald-400/30 text-emerald-300 bg-emerald-400/10',
    Medium: 'border-amber-400/30 text-amber-300 bg-amber-400/10',
    Hard: 'border-rose-400/30 text-rose-300 bg-rose-400/10',
  };

  const approach = approaches[currentApproach];

  return (
    <div
      className="min-h-screen pt-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D0B18 0%, #171326 40%, #211B35 100%)',
      }}
    >
      {/* Subtle violet accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Top Navigation */}
      <div className="relative border-b border-white/10 bg-[#171326]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                <Home size={16} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link to="/blind75" className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                <span>Blind 75</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link to={`/problem/${problemId}`} className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                <ArrowLeft size={16} />
                <span>{title}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-mono text-white/50">{String(problemId).padStart(2, '0')}</span>
              <span className="font-mono font-semibold text-white text-lg">{title}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/80 bg-white/5">
                {topic}
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-400/30 text-blue-300 bg-blue-400/10">
                {pattern}
              </span>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
              <a
                href={`https://leetcode.com/problems/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-full text-xs font-semibold transition-all"
              >
                <ExternalLink size={12} />
                LeetCode
              </a>
              <button
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isCompleted
                    ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 cursor-default'
                    : 'bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20'
                }`}
              >
                <CheckCircle size={12} />
                {isCompleted ? 'Completed' : 'Complete'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Approach Tabs */}
        <ApproachTabs
          currentApproach={currentApproach}
          onApproachChange={setCurrentApproach}
        />

        {/* Approach Explanation */}
        <motion.div
          key={currentApproach}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">{approach.title}</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              {approach.description}
            </p>
            <div className="space-y-3 text-base text-white/70 leading-relaxed">
              <p>
                <strong className="text-white">Intuition:</strong> {approach.intuition}
              </p>
              <p>
                <strong className="text-white">How it works:</strong> {approach.howItWorks}
              </p>
              {approach.tradeoff && (
                <p>
                  <strong className="text-white">Trade-off:</strong> {approach.tradeoff}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Visualizer */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {children(currentApproach)}
        </div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            to={`/problem/${problemId}`}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-base font-semibold transition-all"
          >
            <ArrowLeft size={18} />
            Back to Problem
          </Link>
          <a
            href={`https://leetcode.com/problems/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-base font-semibold transition-all"
          >
            <ExternalLink size={18} />
            Practice on LeetCode
          </a>
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 cursor-default'
                : 'bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20'
            }`}
          >
            <CheckCircle size={18} />
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
