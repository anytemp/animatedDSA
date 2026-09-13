import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';
import ApproachTabs, { ApproachType } from '../components/visualization/ApproachTabs';
import StockBruteForceVisualizer from '../components/visualization/StockBruteForceVisualizer';
import StockBetterApproachVisualizer from '../components/visualization/StockBetterApproachVisualizer';
import StockOptimalApproachVisualizer from '../components/visualization/StockOptimalApproachVisualizer';
import StockMinimalVisualization from '../components/visualization/StockMinimalVisualization';

export default function StockWorkspace() {
  const { updateProblemStatus, getProblem } = useProblems();
  const problem = getProblem(2);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');
  const [currentApproach, setCurrentApproach] = useState<ApproachType>('brute');
  const [visualizationMode, setVisualizationMode] = useState<'current' | 'minimal'>('minimal');

  const handleMarkComplete = () => {
    updateProblemStatus(2, 'Completed');
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
                to="/problem/2"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Stock Problem</span>
              </Link>
            </motion.div>

            {/* Center: Problem info */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-mono text-white/50">02</span>
              <span className="font-mono font-semibold text-white text-lg">Best Time to Buy and Sell Stock</span>
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
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-400/30 text-blue-300 bg-blue-400/10">
                Sliding Window
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-400/30 text-emerald-300 bg-emerald-400/10">
                Easy
              </span>
              <a
                href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
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
                Try every possible buying day and every later selling day. Calculate the profit for each pair and keep the maximum.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> The simplest way is to check all valid (buy, sell) pairs where sell day comes after buy day.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> Use two nested loops. The outer loop picks the buying day, and the inner loop picks the selling day. Calculate profit = prices[sell] - prices[buy] and track the maximum.
                </p>
                <p>
                  <strong className="text-white">Why it works:</strong> By checking all pairs, we're guaranteed to find the maximum profit.
                </p>
              </div>
            </div>
          )}

          {currentApproach === 'better' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Better Approach: Suffix Maximum</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                For every buying day, precompute the highest price available after that day.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> If we know the maximum future selling price for each day, we can calculate the profit in one pass.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> Create a futureMax array where futureMax[i] stores the maximum price from day i onwards. Build it from right to left, then calculate profit = futureMax[i] - prices[i] for each day.
                </p>
                <p>
                  <strong className="text-white">Trade-off:</strong> This uses O(n) extra space but reduces time from O(n²) to O(n).
                </p>
              </div>
            </div>
          )}

          {currentApproach === 'optimal' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Optimal Approach: Single Pass</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                Track the cheapest price seen so far and calculate profit at each step.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> As we iterate through the array, we maintain the cheapest buying price (minPrice). At each day, we calculate the profit if we sell today using minPrice.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> If today's price is lower than minPrice, update minPrice. Otherwise, calculate currentProfit = prices[day] - minPrice and update bestProfit if this profit is better.
                </p>
                <p>
                  <strong className="text-white">Why it's optimal:</strong> We only need one pass through the array and constant extra space. Time: O(n), Space: O(1).
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Visualization Mode Toggle (only for optimal approach) */}
        {currentApproach === 'optimal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center justify-center gap-4"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 flex items-center gap-2">
              <button
                onClick={() => setVisualizationMode('minimal')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  visualizationMode === 'minimal'
                    ? 'bg-purple-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                ✨ Minimal Motion Graphics
              </button>
              <button
                onClick={() => setVisualizationMode('current')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  visualizationMode === 'current'
                    ? 'bg-purple-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                📊 Current Visualization
              </button>
            </div>
          </motion.div>
        )}

        {/* Visualizer */}
        {currentApproach === 'brute' && <StockBruteForceVisualizer />}
        {currentApproach === 'better' && <StockBetterApproachVisualizer />}
        {currentApproach === 'optimal' && visualizationMode === 'minimal' && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <StockMinimalVisualization />
          </div>
        )}
        {currentApproach === 'optimal' && visualizationMode === 'current' && <StockOptimalApproachVisualizer />}

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            to="/problem/2"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-base font-semibold transition-all"
          >
            <ArrowLeft size={18} />
            Back to Problem
          </Link>
          <a
            href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
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
