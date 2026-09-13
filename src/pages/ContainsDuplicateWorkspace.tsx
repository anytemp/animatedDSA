import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';
import ApproachTabs, { ApproachType } from '../components/visualization/ApproachTabs';
import ContainsDuplicateBruteVisualizer from '../components/visualization/ContainsDuplicateBruteVisualizer';
import ContainsDuplicateBetterVisualizer from '../components/visualization/ContainsDuplicateBetterVisualizer';
import ContainsDuplicateOptimalVisualizer from '../components/visualization/ContainsDuplicateOptimalVisualizer';

export default function ContainsDuplicateWorkspace() {
  const { updateProblemStatus, getProblem } = useProblems();
  const problem = getProblem(3);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');
  const [currentApproach, setCurrentApproach] = useState<ApproachType>('optimal');

  const handleMarkComplete = () => {
    updateProblemStatus(3, 'Completed');
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
                to="/problem/3"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Contains Duplicate</span>
              </Link>
            </motion.div>

            {/* Center: Problem info */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-mono text-white/50">03</span>
              <span className="font-mono font-semibold text-white text-lg">Contains Duplicate</span>
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
                Hash Set
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-400/30 text-emerald-300 bg-emerald-400/10">
                Easy
              </span>
              <a
                href="https://leetcode.com/problems/contains-duplicate/"
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
                Compare every element with every other element. If two elements are equal, return true.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> Use two nested loops to check all possible pairs of elements.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> For each element at index i, compare it with every element at index j where j {'>'} i. If we find a match, we have a duplicate.
                </p>
                <p>
                  <strong className="text-white">Why it works:</strong> By checking all pairs, we're guaranteed to find any duplicate if it exists.
                </p>
              </div>
              <div className="mt-6 bg-black/30 rounded-2xl p-6">
                <pre className="text-sm font-mono text-white/90 overflow-x-auto">
                  <code>{`class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
};`}</code>
                </pre>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-white/60 mb-2">Time Complexity</div>
                  <div className="text-2xl font-bold text-white">O(n²)</div>
                  <div className="text-sm text-white/60 mt-2">Two nested loops</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-white/60 mb-2">Space Complexity</div>
                  <div className="text-2xl font-bold text-white">O(1)</div>
                  <div className="text-sm text-white/60 mt-2">No extra space</div>
                </div>
              </div>
            </div>
          )}

          {currentApproach === 'better' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Better Approach: Sorting</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                After sorting, duplicate values become adjacent. We only need to compare neighboring values.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> If we sort the array, any duplicate values will be next to each other. We can then scan through once to find adjacent duplicates.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> Sort the array first, then iterate through it comparing each element with the previous one. If they're equal, we found a duplicate.
                </p>
                <p>
                  <strong className="text-white">Trade-off:</strong> This is faster than brute force O(n²) but requires sorting which takes O(n log n) time.
                </p>
              </div>
              <div className="mt-6 bg-black/30 rounded-2xl p-6">
                <pre className="text-sm font-mono text-white/90 overflow-x-auto">
{`class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                return true;
            }
        }
        
        return false;
    }
};`}
                </pre>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-white/60 mb-2">Time Complexity</div>
                  <div className="text-2xl font-bold text-white">O(n log n)</div>
                  <div className="text-sm text-white/60 mt-2">Sorting + one pass</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-white/60 mb-2">Space Complexity</div>
                  <div className="text-2xl font-bold text-white">O(1)</div>
                  <div className="text-sm text-white/60 mt-2">In-place sorting</div>
                </div>
              </div>
            </div>
          )}

          {currentApproach === 'optimal' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Optimal Approach: Hash Set</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                Use a hash set to track values we've seen. For each element, check if it's already in the set.
              </p>
              <div className="space-y-3 text-base text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Intuition:</strong> A hash set provides O(1) average time lookup. We can check if we've seen a value before in constant time.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> Iterate through the array. For each element, check if it exists in the set. If yes, we found a duplicate. If no, add it to the set and continue.
                </p>
                <p>
                  <strong className="text-white">Why it's optimal:</strong> We only need one pass through the array, and each lookup/insert is O(1) on average. Total time: O(n).
                </p>
              </div>
              <div className="mt-6 bg-black/30 rounded-2xl p-6">
                <pre className="text-sm font-mono text-white/90 overflow-x-auto">
{`class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        
        for (int i = 0; i < nums.size(); i++) {
            if (seen.find(nums[i]) != seen.end()) {
                return true;
            }
            
            seen.insert(nums[i]);
        }
        
        return false;
    }
};`}
                </pre>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-white/60 mb-2">Time Complexity</div>
                  <div className="text-2xl font-bold text-white">O(n) average</div>
                  <div className="text-sm text-white/60 mt-2">One pass with O(1) lookups</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-white/60 mb-2">Space Complexity</div>
                  <div className="text-2xl font-bold text-white">O(n)</div>
                  <div className="text-sm text-white/60 mt-2">Hash set storage</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Visualizer - Show based on selected approach */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {currentApproach === 'brute' && <ContainsDuplicateBruteVisualizer />}
          {currentApproach === 'better' && <ContainsDuplicateBetterVisualizer />}
          {currentApproach === 'optimal' && <ContainsDuplicateOptimalVisualizer />}
        </div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            to="/problem/3"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-base font-semibold transition-all"
          >
            <ArrowLeft size={18} />
            Back to Problem
          </Link>
          <a
            href="https://leetcode.com/problems/contains-duplicate/"
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
