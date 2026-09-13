import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';
import ApproachTabs, { ApproachType } from '../components/visualization/ApproachTabs';
import BruteForceVisualizer from '../components/visualization/BruteForceVisualizer';
import BetterApproachVisualizer from '../components/visualization/BetterApproachVisualizer';
import OptimalApproachVisualizer from '../components/visualization/OptimalApproachVisualizer';

export default function TwoSumWorkspace() {
  const { updateProblemStatus, getProblem } = useProblems();
  const problem = getProblem(1);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');
  const [currentApproach, setCurrentApproach] = useState<ApproachType>('brute');

  const handleMarkComplete = () => {
    updateProblemStatus(1, 'Completed');
    setIsCompleted(true);
  };

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
            {/* Left: Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <Home size={16} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link
                to="/blind75"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <span>Blind 75</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link
                to="/problem/1"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Two Sum</span>
              </Link>
            </motion.div>

            {/* Center: Problem info */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-mono text-white/50">01</span>
              <span className="font-mono font-semibold text-white text-lg">Two Sum</span>
            </motion.div>

            {/* Right: Badges and Actions */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/80 bg-white/5">
                Array
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-400/30 text-purple-300 bg-purple-400/10">
                Hash Map
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-400/30 text-emerald-300 bg-emerald-400/10">
                Easy
              </span>
              <a
                href="https://leetcode.com/problems/two-sum/"
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
          {currentApproach === 'brute' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Brute Force Approach</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                The simplest way to solve this problem is to check every possible pair of numbers.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> We need to find two numbers that add up to the target. The most straightforward approach is to try all combinations.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> Use two nested loops. The outer loop picks the first number, and the inner loop picks the second number. We check if their sum equals the target.
                </p>
                <p>
                  <strong className="text-white">Why it works:</strong> By checking all pairs, we're guaranteed to find the answer if it exists.
                </p>
              </div>
            </div>
          )}

          {currentApproach === 'better' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Better Approach: Sorting + Two Pointers</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                Can we do better than checking all pairs? Yes, by sorting the array first.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> If the array is sorted, we can use two pointers efficiently. One pointer starts at the beginning (smallest values) and one at the end (largest values).
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> Sort the array while keeping track of original indices. Use two pointers: if the sum is too small, move the left pointer right; if too large, move the right pointer left.
                </p>
                <p>
                  <strong className="text-white">Important note:</strong> Sorting changes the order, so we must preserve the original indices to return the correct answer.
                </p>
              </div>
            </div>
          )}

          {currentApproach === 'optimal' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Optimal Approach: Hash Map</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                Can we solve this in a single pass? Yes, by using a hash map to remember what we've seen.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> For each number, we can calculate exactly what we need: complement = target - current number. If we've already seen this complement, we found our answer.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> As we iterate through the array, we store each number and its index in a hash map. Before storing, we check if the complement already exists in the map.
                </p>
                <p>
                  <strong className="text-white">Why it's better:</strong> Instead of checking all pairs (O(n²)), we only need one pass through the array (O(n)). Hash map lookups are O(1) on average.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Visualizer */}
        <BruteForceVisualizer isVisible={currentApproach === 'brute'} />
        <BetterApproachVisualizer isVisible={currentApproach === 'better'} />
        <OptimalApproachVisualizer isVisible={currentApproach === 'optimal'} />

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            to="/problem/1"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-base font-semibold transition-all"
          >
            <ArrowLeft size={18} />
            Back to Problem
          </Link>
          <a
            href="https://leetcode.com/problems/two-sum/"
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
