import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import WorkspaceTemplate from '../components/WorkspaceTemplate';

function KadaneVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  
  const steps = [
    { id: 0, phase: 'init', i: null, current: -2, best: -2, codeLine: 3, explanation: 'Initialize: current = nums[0] = -2, best = nums[0] = -2. Both track the maximum subarray sum.' },
    { id: 1, phase: 'loop', i: 1, current: -2, best: -2, codeLine: 5, explanation: 'Start loop at i = 1. nums[1] = 1. We must decide: extend previous subarray or start fresh?' },
    { id: 2, phase: 'decide', i: 1, current: 1, best: -2, codeLine: 6, explanation: 'Compare: nums[1] = 1 vs current + nums[1] = -2 + 1 = -1. Starting fresh (1) is better! current = 1.' },
    { id: 3, phase: 'update', i: 1, current: 1, best: 1, codeLine: 7, explanation: 'Update best: max(-2, 1) = 1. The best subarray sum so far is 1.' },
    { id: 4, phase: 'loop', i: 2, current: 1, best: 1, codeLine: 5, explanation: 'Move to i = 2. nums[2] = -3. Extend or start fresh?' },
    { id: 5, phase: 'decide', i: 2, current: -2, best: 1, codeLine: 6, explanation: 'Compare: nums[2] = -3 vs current + nums[2] = 1 + (-3) = -2. Extending (-2) is better than starting fresh (-3). current = -2.' },
    { id: 6, phase: 'update', i: 2, current: -2, best: 1, codeLine: 7, explanation: 'Update best: max(1, -2) = 1. Best remains 1.' },
    { id: 7, phase: 'loop', i: 3, current: -2, best: 1, codeLine: 5, explanation: 'Move to i = 3. nums[3] = 4. Extend or start fresh?' },
    { id: 8, phase: 'decide', i: 3, current: 4, best: 1, codeLine: 6, explanation: 'Compare: nums[3] = 4 vs current + nums[3] = -2 + 4 = 2. Starting fresh (4) is better! current = 4.' },
    { id: 9, phase: 'update', i: 3, current: 4, best: 4, codeLine: 7, explanation: 'Update best: max(1, 4) = 4. New best subarray sum is 4!' },
    { id: 10, phase: 'loop', i: 4, current: 4, best: 4, codeLine: 5, explanation: 'Move to i = 4. nums[4] = -1. Extend or start fresh?' },
    { id: 11, phase: 'decide', i: 4, current: 3, best: 4, codeLine: 6, explanation: 'Compare: nums[4] = -1 vs current + nums[4] = 4 + (-1) = 3. Extending (3) is better than starting fresh (-1). current = 3.' },
    { id: 12, phase: 'update', i: 4, current: 3, best: 4, codeLine: 7, explanation: 'Update best: max(4, 3) = 4. Best remains 4.' },
    { id: 13, phase: 'loop', i: 5, current: 3, best: 4, codeLine: 5, explanation: 'Move to i = 5. nums[5] = 2. Extend or start fresh?' },
    { id: 14, phase: 'decide', i: 5, current: 5, best: 4, codeLine: 6, explanation: 'Compare: nums[5] = 2 vs current + nums[5] = 3 + 2 = 5. Extending (5) is better! current = 5.' },
    { id: 15, phase: 'update', i: 5, current: 5, best: 5, codeLine: 7, explanation: 'Update best: max(4, 5) = 5. New best subarray sum is 5!' },
    { id: 16, phase: 'loop', i: 6, current: 5, best: 5, codeLine: 5, explanation: 'Move to i = 6. nums[6] = 1. Extend or start fresh?' },
    { id: 17, phase: 'decide', i: 6, current: 6, best: 5, codeLine: 6, explanation: 'Compare: nums[6] = 1 vs current + nums[6] = 5 + 1 = 6. Extending (6) is better! current = 6.' },
    { id: 18, phase: 'update', i: 6, current: 6, best: 6, codeLine: 7, explanation: 'Update best: max(5, 6) = 6. New best subarray sum is 6! This is the subarray [4, -1, 2, 1].' },
    { id: 19, phase: 'loop', i: 7, current: 6, best: 6, codeLine: 5, explanation: 'Move to i = 7. nums[7] = -5. Extend or start fresh?' },
    { id: 20, phase: 'decide', i: 7, current: 1, best: 6, codeLine: 6, explanation: 'Compare: nums[7] = -5 vs current + nums[7] = 6 + (-5) = 1. Extending (1) is better than starting fresh (-5). current = 1.' },
    { id: 21, phase: 'update', i: 7, current: 1, best: 6, codeLine: 7, explanation: 'Update best: max(6, 1) = 6. Best remains 6.' },
    { id: 22, phase: 'loop', i: 8, current: 1, best: 6, codeLine: 5, explanation: 'Move to i = 8. nums[8] = 4. Extend or start fresh?' },
    { id: 23, phase: 'decide', i: 8, current: 5, best: 6, codeLine: 6, explanation: 'Compare: nums[8] = 4 vs current + nums[8] = 1 + 4 = 5. Extending (5) is better! current = 5.' },
    { id: 24, phase: 'update', i: 8, current: 5, best: 6, codeLine: 7, explanation: 'Update best: max(6, 5) = 6. Best remains 6.' },
    { id: 25, phase: 'return', i: null, current: 5, best: 6, codeLine: 9, explanation: 'Return best = 6. The maximum subarray sum is 6, from the subarray [4, -1, 2, 1].' },
  ];

  const step = steps[currentStep];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 2500 / speed);
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, speed, steps.length]);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Kadane's Algorithm Visualization</h2>
            <p className="text-gray-600">Find the maximum subarray sum in O(n) time</p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="text-sm text-gray-500 font-mono">Step {currentStep + 1} of {steps.length}</div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setCurrentStep(0); setIsPlaying(false); }} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors">
                <RotateCcw size={14} /><span className="hidden sm:inline">Reset</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)} disabled={currentStep === 0} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <SkipBack size={14} /><span className="hidden sm:inline">Previous</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors">
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}{isPlaying ? 'Pause' : 'Play'}
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)} disabled={currentStep === steps.length - 1} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="hidden sm:inline">Next</span><SkipForward size={14} />
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Speed:</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button key={s} onClick={() => setSpeed(s)} className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${speed === s ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'}`}>{s}x</button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          {/* Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {nums.map((num, index) => {
                const isCurrent = step.i === index;
                const isInBestSubarray = index >= 3 && index <= 6 && step.phase === 'return';
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">{index}</div>
                    <motion.div animate={{ scale: isCurrent ? 1.1 : 1, backgroundColor: isInBestSubarray ? '#d1fae5' : isCurrent ? '#ede9fe' : '#ffffff', borderColor: isInBestSubarray ? '#10b981' : isCurrent ? '#8b5cf6' : '#e5e7eb' }} className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-lg sm:text-xl font-bold text-gray-900">
                      {num}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Decision Panel */}
          {step.phase === 'decide' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 mb-8">
              <div className="text-center">
                <div className="text-sm text-amber-600 font-semibold mb-4">Decision: Extend or Start Fresh?</div>
                <div className="flex items-center justify-center gap-4 text-xl font-bold">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Start fresh</div>
                    <div className="text-purple-600">nums[{step.i}] = {nums[step.i!]}</div>
                  </div>
                  <div className="text-2xl text-gray-400">vs</div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Extend</div>
                    <div className="text-blue-600">current + nums[{step.i}]</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-amber-700 mt-4">
                  {step.current === nums[step.i!] ? 'Starting fresh is better!' : 'Extending is better!'}
                </div>
              </div>
            </motion.div>
          )}

          {/* Variables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (loop index)</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">current (running sum)</div>
              <motion.div key={step.current} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-blue-900">{step.current}</motion.div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">best (max sum)</div>
              <motion.div key={step.best} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-emerald-900">{step.best}</motion.div>
            </div>
          </div>

          {/* Explanation */}
          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        {/* Code */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code — Kadane's Algorithm</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    int maxSubArray(vector<int>& nums) {', '        int current = nums[0];', '        int best = nums[0];', '', '        for (int i = 1; i < nums.size(); i++) {', '            current = max(nums[i], current + nums[i]);', '            best = max(best, current);', '        }', '', '        return best;', '    }', '};'].map((line, index) => (
                <motion.div key={index} animate={{ backgroundColor: step.codeLine === index ? 'rgba(139, 92, 246, 0.2)' : 'transparent' }} className={`px-3 py-1 rounded ${step.codeLine === index ? 'border-l-4 border-purple-400' : ''}`}>
                  <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  <code className="text-gray-100">{line}</code>
                </motion.div>
              ))}
            </pre>
          </div>
        </div>

        {/* Complexity */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Single pass through the array. Each element is processed once with constant-time operations.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only two variables (current and best) are used, regardless of input size.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MaximumSubarrayWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={5}
      title="Maximum Subarray — Kadane's Algorithm"
      topic="Array"
      pattern="Kadane's Algorithm"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Check Every Subarray',
          description: 'Check every possible subarray and calculate its sum.',
          intuition: 'Use three nested loops: two to define the subarray boundaries and one to calculate the sum.',
          howItWorks: 'For each starting index i and ending index j (where j ≥ i), calculate the sum of elements from i to j. Track the maximum sum found.',
          tradeoff: 'Extremely slow. For an array of size n, there are O(n²) subarrays, and calculating each sum takes O(n), giving O(n³) total time.',
        },
        better: {
          title: 'Better: Fix Start, Extend End',
          description: 'Fix a starting index and extend the ending index while maintaining a running sum.',
          intuition: 'Instead of recalculating the sum from scratch, maintain a running sum as we extend the subarray to the right.',
          howItWorks: 'For each starting index i, initialize sum = 0. Then for each ending index j from i to n-1, add nums[j] to sum and update the maximum. This avoids the innermost loop.',
          tradeoff: 'Better than brute force at O(n²), but still too slow for large arrays.',
        },
        optimal: {
          title: 'Optimal: Kadane\'s Algorithm',
          description: 'Track the maximum subarray sum ending at each position using a single pass.',
          intuition: 'At each position, we have two choices: extend the previous subarray, or start a new subarray from the current element. We choose whichever gives a larger sum.',
          howItWorks: 'Maintain two variables: current (max sum ending at current position) and best (overall max). At each step, current = max(nums[i], current + nums[i]). If current becomes negative, starting fresh is better.',
          tradeoff: 'Optimal O(n) time and O(1) space. The most efficient solution possible.',
        },
      }}
    >
      {(approach) => {
        if (approach === 'optimal') return <KadaneVisualizer />;
        return <div className="p-12 text-center text-gray-500">Visualization for this approach coming soon. Try the Optimal approach to see Kadane's Algorithm in action!</div>;
      }}
    </WorkspaceTemplate>
  );
}
