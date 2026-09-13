import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import WorkspaceTemplate from '../components/WorkspaceTemplate';

function BruteForceVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [-1, 0, 1, 2, -1, -4];
  const steps = [
    { id: 0, phase: 'init', i: null, j: null, k: null, sum: null, result: [], codeLine: 3, explanation: 'Initialize result = []. We will check every possible triplet (i, j, k) where i < j < k.' },
    { id: 1, phase: 'outer', i: 0, j: null, k: null, sum: null, result: [], codeLine: 4, explanation: 'Start outer loop: i = 0. nums[0] = -1.' },
    { id: 2, phase: 'middle', i: 0, j: 1, k: null, sum: null, result: [], codeLine: 5, explanation: 'Middle loop: j = 1. nums[1] = 0.' },
    { id: 3, phase: 'inner', i: 0, j: 1, k: 2, sum: 0, result: [], codeLine: 6, explanation: 'Inner loop: k = 2. sum = nums[0] + nums[1] + nums[2] = -1 + 0 + 1 = 0.' },
    { id: 4, phase: 'check', i: 0, j: 1, k: 2, sum: 0, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check: sum = 0 == 0? Yes! Add triplet [-1, 0, 1] to result.' },
    { id: 5, phase: 'inner', i: 0, j: 1, k: 3, sum: 1, result: [[-1, 0, 1]], codeLine: 6, explanation: 'k = 3. sum = -1 + 0 + 2 = 1.' },
    { id: 6, phase: 'check', i: 0, j: 1, k: 3, sum: 1, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check: sum = 1 == 0? No.' },
    { id: 7, phase: 'inner', i: 0, j: 1, k: 4, sum: -2, result: [[-1, 0, 1]], codeLine: 6, explanation: 'k = 4. sum = -1 + 0 + (-1) = -2.' },
    { id: 8, phase: 'check', i: 0, j: 1, k: 4, sum: -2, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check: sum = -2 == 0? No.' },
    { id: 9, phase: 'inner', i: 0, j: 1, k: 5, sum: -3, result: [[-1, 0, 1]], codeLine: 6, explanation: 'k = 5. sum = -1 + 0 + (-4) = -3.' },
    { id: 10, phase: 'check', i: 0, j: 1, k: 5, sum: -3, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check: sum = -3 == 0? No.' },
    { id: 11, phase: 'middle', i: 0, j: 2, k: null, sum: null, result: [[-1, 0, 1]], codeLine: 5, explanation: 'Middle loop: j = 2. nums[2] = 1.' },
    { id: 12, phase: 'inner', i: 0, j: 2, k: 3, sum: 2, result: [[-1, 0, 1]], codeLine: 6, explanation: 'k = 3. sum = -1 + 1 + 2 = 2.' },
    { id: 13, phase: 'check', i: 0, j: 2, k: 3, sum: 2, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check: sum = 2 == 0? No.' },
    { id: 14, phase: 'inner', i: 0, j: 2, k: 4, sum: -1, result: [[-1, 0, 1]], codeLine: 6, explanation: 'k = 4. sum = -1 + 1 + (-1) = -1.' },
    { id: 15, phase: 'check', i: 0, j: 2, k: 4, sum: -1, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check: sum = -1 == 0? No.' },
    { id: 16, phase: 'inner', i: 0, j: 2, k: 5, sum: -4, result: [[-1, 0, 1]], codeLine: 6, explanation: 'k = 5. sum = -1 + 1 + (-4) = -4.' },
    { id: 17, phase: 'check', i: 0, j: 2, k: 5, sum: -4, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check: sum = -4 == 0? No.' },
    { id: 18, phase: 'middle', i: 0, j: 3, k: null, sum: null, result: [[-1, 0, 1]], codeLine: 5, explanation: 'Middle loop: j = 3. nums[3] = 2.' },
    { id: 19, phase: 'inner', i: 0, j: 3, k: 4, sum: 0, result: [[-1, 0, 1]], codeLine: 6, explanation: 'k = 4. sum = -1 + 2 + (-1) = 0.' },
    { id: 20, phase: 'check', i: 0, j: 3, k: 4, sum: 0, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 7, explanation: 'Check: sum = 0 == 0? Yes! Add triplet [-1, 2, -1] to result.' },
    { id: 21, phase: 'inner', i: 0, j: 3, k: 5, sum: -3, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 6, explanation: 'k = 5. sum = -1 + 2 + (-4) = -3.' },
    { id: 22, phase: 'check', i: 0, j: 3, k: 5, sum: -3, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 7, explanation: 'Check: sum = -3 == 0? No.' },
    { id: 23, phase: 'middle', i: 0, j: 4, k: null, sum: null, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 5, explanation: 'Middle loop: j = 4. nums[4] = -1.' },
    { id: 24, phase: 'inner', i: 0, j: 4, k: 5, sum: -6, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 6, explanation: 'k = 5. sum = -1 + (-1) + (-4) = -6.' },
    { id: 25, phase: 'check', i: 0, j: 4, k: 5, sum: -6, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 7, explanation: 'Check: sum = -6 == 0? No.' },
    { id: 26, phase: 'outer', i: 1, j: null, k: null, sum: null, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 4, explanation: 'Outer loop: i = 1. nums[1] = 0.' },
    { id: 27, phase: 'middle', i: 1, j: 2, k: null, sum: null, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 5, explanation: 'Middle loop: j = 2. nums[2] = 1.' },
    { id: 28, phase: 'inner', i: 1, j: 2, k: 3, sum: 3, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 6, explanation: 'k = 3. sum = 0 + 1 + 2 = 3.' },
    { id: 29, phase: 'check', i: 1, j: 2, k: 3, sum: 3, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 7, explanation: 'Check: sum = 3 == 0? No.' },
    { id: 30, phase: 'inner', i: 1, j: 2, k: 4, sum: 0, result: [[-1, 0, 1], [-1, 2, -1]], codeLine: 6, explanation: 'k = 4. sum = 0 + 1 + (-1) = 0.' },
    { id: 31, phase: 'check', i: 1, j: 2, k: 4, sum: 0, result: [[-1, 0, 1], [-1, 2, -1], [0, 1, -1]], codeLine: 7, explanation: 'Check: sum = 0 == 0? Yes! Add triplet [0, 1, -1] to result.' },
    { id: 32, phase: 'inner', i: 1, j: 2, k: 5, sum: -3, result: [[-1, 0, 1], [-1, 2, -1], [0, 1, -1]], codeLine: 6, explanation: 'k = 5. sum = 0 + 1 + (-4) = -3.' },
    { id: 33, phase: 'check', i: 1, j: 2, k: 5, sum: -3, result: [[-1, 0, 1], [-1, 2, -1], [0, 1, -1]], codeLine: 7, explanation: 'Check: sum = -3 == 0? No.' },
    { id: 34, phase: 'return', i: null, j: null, k: null, sum: null, result: [[-1, 0, 1], [-1, 2, -1], [0, 1, -1]], codeLine: 15, explanation: 'All triplets checked. Return result = [[-1, 0, 1], [-1, 2, -1], [0, 1, -1]].' },
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Brute Force Visualization</h2>
            <p className="text-gray-600">Check every triplet (O(n³))</p>
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

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nums.map((num, index) => {
                const isInTriplet = (step.i === index || step.j === index || step.k === index);
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isInTriplet ? 1.1 : 1, backgroundColor: isInTriplet ? '#ede9fe' : '#ffffff', borderColor: isInTriplet ? '#8b5cf6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                      {num}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">j</div>
              <div className="text-3xl font-bold text-blue-900">{step.j !== null ? step.j : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">k</div>
              <div className="text-3xl font-bold text-emerald-900">{step.k !== null ? step.k : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">sum</div>
              <motion.div key={step.sum} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-amber-900">{step.sum !== null ? step.sum : '—'}</motion.div>
            </div>
          </div>

          {step.result.length > 0 && (
            <div className="mb-8">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Result Triplets</div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {step.result.map((triplet, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 border-2 border-emerald-200">
                    <div className="text-lg font-bold text-emerald-900">[{triplet.join(', ')}]</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    vector<vector<int>> threeSum(vector<int>& nums) {', '        vector<vector<int>> result;', '', '        for (int i = 0; i < nums.size(); i++) {', '            for (int j = i + 1; j < nums.size(); j++) {', '                for (int k = j + 1; k < nums.size(); k++) {', '                    int sum = nums[i] + nums[j] + nums[k];', '                    if (sum == 0) {', '                        result.push_back({nums[i], nums[j], nums[k]});', '                    }', '                }', '            }', '        }', '', '        return result;', '    }', '};'].map((line, index) => (
                <motion.div key={index} animate={{ backgroundColor: step.codeLine === index ? 'rgba(139, 92, 246, 0.2)' : 'transparent' }} className={`px-3 py-1 rounded ${step.codeLine === index ? 'border-l-4 border-purple-400' : ''}`}>
                  <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  <code className="text-gray-100">{line}</code>
                </motion.div>
              ))}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n³)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Three nested loops to check every possible triplet.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Auxiliary space excluding the output array.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BetterVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [-1, 0, 1, 2, -1, -4];
  const steps = [
    { id: 0, phase: 'init', i: null, target: null, left: null, right: null, sum: null, result: [], codeLine: 3, explanation: 'Initialize result = []. We will fix one element and use a hash set to find the other two.' },
    { id: 1, phase: 'outer', i: 0, target: null, left: null, right: null, sum: null, result: [], codeLine: 4, explanation: 'Fix i = 0. nums[0] = -1. We need to find two numbers that sum to -(-1) = 1.' },
    { id: 2, phase: 'inner', i: 0, target: 1, left: 1, right: null, sum: null, result: [], codeLine: 5, explanation: 'For j = 1, we need to find if (target - nums[j]) = 1 - 0 = 1 exists in the set.' },
    { id: 3, phase: 'check', i: 0, target: 1, left: 1, right: null, sum: null, result: [], codeLine: 6, explanation: 'Check if 1 exists in set. No. Add nums[1] = 0 to set.' },
    { id: 4, phase: 'inner', i: 0, target: 1, left: 2, right: null, sum: null, result: [], codeLine: 5, explanation: 'For j = 2, we need to find if (target - nums[j]) = 1 - 1 = 0 exists in the set.' },
    { id: 5, phase: 'check', i: 0, target: 1, left: 2, right: null, sum: null, result: [[-1, 0, 1]], codeLine: 7, explanation: 'Check if 0 exists in set. Yes! Add triplet [-1, 0, 1] to result.' },
    { id: 6, phase: 'return', i: null, target: null, left: null, right: null, sum: null, result: [[-1, 0, 1]], codeLine: 12, explanation: 'Continue this process for all i. Return result = [[-1, 0, 1], [-1, 2, -1], [0, 1, -1]].' },
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Better Approach Visualization</h2>
            <p className="text-gray-600">Fix one element, use hash set (O(n²))</p>
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

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nums.map((num, index) => {
                const isFixed = step.i === index;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isFixed ? 1.1 : 1, backgroundColor: isFixed ? '#ede9fe' : '#ffffff', borderColor: isFixed ? '#8b5cf6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                      {num}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (fixed)</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">target</div>
              <div className="text-3xl font-bold text-blue-900">{step.target !== null ? step.target : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">j</div>
              <div className="text-3xl font-bold text-emerald-900">{step.left !== null ? step.left : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">Hash Set</div>
              <div className="text-sm font-bold text-amber-900">{step.target !== null ? '{...}' : '—'}</div>
            </div>
          </div>

          {step.result.length > 0 && (
            <div className="mb-8">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Result Triplets</div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {step.result.map((triplet, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 border-2 border-emerald-200">
                    <div className="text-lg font-bold text-emerald-900">[{triplet.join(', ')}]</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    vector<vector<int>> threeSum(vector<int>& nums) {', '        vector<vector<int>> result;', '', '        for (int i = 0; i < nums.size(); i++) {', '            unordered_set<int> seen;', '            int target = -nums[i];', '            for (int j = i + 1; j < nums.size(); j++) {', '                int complement = target - nums[j];', '                if (seen.count(complement)) {', '                    result.push_back({nums[i], complement, nums[j]});', '                }', '                seen.insert(nums[j]);', '            }', '        }', '', '        return result;', '    }', '};'].map((line, index) => (
                <motion.div key={index} animate={{ backgroundColor: step.codeLine === index ? 'rgba(139, 92, 246, 0.2)' : 'transparent' }} className={`px-3 py-1 rounded ${step.codeLine === index ? 'border-l-4 border-purple-400' : ''}`}>
                  <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  <code className="text-gray-100">{line}</code>
                </motion.div>
              ))}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n²)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Two nested loops. Hash set operations are O(1) on average.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(n)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Hash set stores up to n elements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptimalVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [-4, -1, -1, 0, 1, 2];
  const steps = [
    { id: 0, phase: 'sort', sorted: [-4, -1, -1, 0, 1, 2], i: null, left: null, right: null, sum: null, result: [], codeLine: 4, explanation: 'Sort the array: [-4, -1, -1, 0, 1, 2]. This allows us to use two pointers.' },
    { id: 1, phase: 'outer', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 1, right: 5, sum: null, result: [], codeLine: 6, explanation: 'Fix i = 0. nums[0] = -4. Set left = 1, right = 5.' },
    { id: 2, phase: 'inner', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 1, right: 5, sum: -1, result: [], codeLine: 9, explanation: 'Calculate sum = nums[0] + nums[1] + nums[5] = -4 + (-1) + 2 = -3.' },
    { id: 3, phase: 'check', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 1, right: 5, sum: -3, result: [], codeLine: 10, explanation: 'Check: sum = -3 < 0? Yes! Move left pointer right: left = 2.' },
    { id: 4, phase: 'inner', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 2, right: 5, sum: -2, result: [], codeLine: 9, explanation: 'Calculate sum = -4 + (-1) + 2 = -3.' },
    { id: 5, phase: 'check', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 2, right: 5, sum: -3, result: [], codeLine: 10, explanation: 'Check: sum = -3 < 0? Yes! Move left pointer right: left = 3.' },
    { id: 6, phase: 'inner', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 3, right: 5, sum: -1, result: [], codeLine: 9, explanation: 'Calculate sum = -4 + 0 + 2 = -2.' },
    { id: 7, phase: 'check', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 3, right: 5, sum: -2, result: [], codeLine: 10, explanation: 'Check: sum = -2 < 0? Yes! Move left pointer right: left = 4.' },
    { id: 8, phase: 'inner', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 4, right: 5, sum: -1, result: [], codeLine: 9, explanation: 'Calculate sum = -4 + 1 + 2 = -1.' },
    { id: 9, phase: 'check', sorted: [-4, -1, -1, 0, 1, 2], i: 0, left: 4, right: 5, sum: -1, result: [], codeLine: 10, explanation: 'Check: sum = -1 < 0? Yes! Move left pointer right: left = 5. Now left >= right, so move to next i.' },
    { id: 10, phase: 'outer', sorted: [-4, -1, -1, 0, 1, 2], i: 1, left: 2, right: 5, sum: null, result: [], codeLine: 6, explanation: 'Fix i = 1. nums[1] = -1. Set left = 2, right = 5.' },
    { id: 11, phase: 'inner', sorted: [-4, -1, -1, 0, 1, 2], i: 1, left: 2, right: 5, sum: 0, result: [], codeLine: 9, explanation: 'Calculate sum = -1 + (-1) + 2 = 0.' },
    { id: 12, phase: 'check', sorted: [-4, -1, -1, 0, 1, 2], i: 1, left: 2, right: 5, sum: 0, result: [[-1, -1, 2]], codeLine: 11, explanation: 'Check: sum = 0 == 0? Yes! Add triplet [-1, -1, 2] to result. Move both pointers.' },
    { id: 13, phase: 'inner', sorted: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4, sum: 0, result: [[-1, -1, 2]], codeLine: 9, explanation: 'Calculate sum = -1 + 0 + 1 = 0.' },
    { id: 14, phase: 'check', sorted: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4, sum: 0, result: [[-1, -1, 2], [-1, 0, 1]], codeLine: 11, explanation: 'Check: sum = 0 == 0? Yes! Add triplet [-1, 0, 1] to result. Move both pointers.' },
    { id: 15, phase: 'outer', sorted: [-4, -1, -1, 0, 1, 2], i: 2, left: 3, right: 5, sum: null, result: [[-1, -1, 2], [-1, 0, 1]], codeLine: 6, explanation: 'Fix i = 2. nums[2] = -1 (same as nums[1], skip to avoid duplicates).' },
    { id: 16, phase: 'outer', sorted: [-4, -1, -1, 0, 1, 2], i: 3, left: 4, right: 5, sum: null, result: [[-1, -1, 2], [-1, 0, 1]], codeLine: 6, explanation: 'Fix i = 3. nums[3] = 0. Set left = 4, right = 5.' },
    { id: 17, phase: 'inner', sorted: [-4, -1, -1, 0, 1, 2], i: 3, left: 4, right: 5, sum: 3, result: [[-1, -1, 2], [-1, 0, 1]], codeLine: 9, explanation: 'Calculate sum = 0 + 1 + 2 = 3.' },
    { id: 18, phase: 'check', sorted: [-4, -1, -1, 0, 1, 2], i: 3, left: 4, right: 5, sum: 3, result: [[-1, -1, 2], [-1, 0, 1]], codeLine: 14, explanation: 'Check: sum = 3 > 0? Yes! Move right pointer left: right = 4. Now left >= right, so move to next i.' },
    { id: 19, phase: 'return', sorted: [-4, -1, -1, 0, 1, 2], i: null, left: null, right: null, sum: null, result: [[-1, -1, 2], [-1, 0, 1]], codeLine: 18, explanation: 'All i values checked. Return result = [[-1, -1, 2], [-1, 0, 1]].' },
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Optimal Approach Visualization</h2>
            <p className="text-gray-600">Sort + two pointers (O(n²))</p>
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

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Sorted Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {step.sorted.map((num, index) => {
                const isFixed = step.i === index;
                const isLeft = step.left === index;
                const isRight = step.right === index;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isFixed || isLeft || isRight ? 1.1 : 1, backgroundColor: isFixed ? '#ede9fe' : isLeft ? '#dbeafe' : isRight ? '#fce7f3' : '#ffffff', borderColor: isFixed ? '#8b5cf6' : isLeft ? '#3b82f6' : isRight ? '#ec4899' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 relative">
                      {num}
                      {isFixed && <div className="absolute -top-6 text-xs font-bold text-purple-600">i</div>}
                      {isLeft && <div className="absolute -top-6 text-xs font-bold text-blue-600">L</div>}
                      {isRight && <div className="absolute -top-6 text-xs font-bold text-pink-600">R</div>}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (fixed)</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">left</div>
              <div className="text-3xl font-bold text-blue-900">{step.left !== null ? step.left : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4 border-2 border-pink-200">
              <div className="text-xs text-pink-600 font-semibold mb-1">right</div>
              <div className="text-3xl font-bold text-pink-900">{step.right !== null ? step.right : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">sum</div>
              <motion.div key={step.sum} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-amber-900">{step.sum !== null ? step.sum : '—'}</motion.div>
            </div>
          </div>

          {step.result.length > 0 && (
            <div className="mb-8">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Result Triplets</div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {step.result.map((triplet, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 border-2 border-emerald-200">
                    <div className="text-lg font-bold text-emerald-900">[{triplet.join(', ')}]</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    vector<vector<int>> threeSum(vector<int>& nums) {', '        vector<vector<int>> result;', '        sort(nums.begin(), nums.end());', '', '        for (int i = 0; i < nums.size(); i++) {', '            if (i > 0 && nums[i] == nums[i - 1]) continue;', '', '            int left = i + 1;', '            int right = nums.size() - 1;', '', '            while (left < right) {', '                int sum = nums[i] + nums[left] + nums[right];', '', '                if (sum == 0) {', '                    result.push_back({nums[i], nums[left], nums[right]});', '                    left++;', '                    right--;', '                    while (left < right && nums[left] == nums[left - 1]) left++;', '                    while (left < right && nums[right] == nums[right + 1]) right--;', '                } else if (sum < 0) {', '                    left++;', '                } else {', '                    right--;', '                }', '            }', '        }', '', '        return result;', '    }', '};'].map((line, index) => (
                <motion.div key={index} animate={{ backgroundColor: step.codeLine === index ? 'rgba(139, 92, 246, 0.2)' : 'transparent' }} className={`px-3 py-1 rounded ${step.codeLine === index ? 'border-l-4 border-purple-400' : ''}`}>
                  <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  <code className="text-gray-100">{line}</code>
                </motion.div>
              ))}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n²)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Sorting takes O(n log n). Two nested loops take O(n²). Overall: O(n²).</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Auxiliary space excluding the output array. Sorting is done in-place.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThreeSumWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={9}
      title="3Sum"
      topic="Array"
      pattern="Two Pointers"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Three Nested Loops',
          description: 'Use three nested loops to check every triplet.',
          intuition: 'Check all possible combinations of three different indices.',
          howItWorks: 'Use three nested loops with indices i, j, k where i < j < k. Check if nums[i] + nums[j] + nums[k] == 0. Store valid triplets in a set to avoid duplicates.',
          tradeoff: 'O(n³) time. Extremely slow for large arrays.',
        },
        better: {
          title: 'Better: Hash Set for Third Element',
          description: 'Fix one element and use a hash set to find the required third element.',
          intuition: 'For each pair (i, j), we need nums[k] = -(nums[i] + nums[j]). Use a hash set to check if this value exists.',
          howItWorks: 'Fix the first element with index i. For each j > i, calculate the required third value and check if it exists in a hash set of previously seen values.',
          tradeoff: 'O(n²) time and O(n) space. Better than brute force but uses extra space.',
        },
        optimal: {
          title: 'Optimal: Sort + Two Pointers',
          description: 'Sort the array and use two pointers to find triplets.',
          intuition: 'After sorting, we can fix one element and use two pointers (left and right) to find pairs that sum to the negative of the fixed element.',
          howItWorks: 'Sort the array. For each index i, set left = i+1 and right = n-1. Calculate sum = nums[i] + nums[left] + nums[right]. If sum == 0, record the triplet. If sum < 0, move left right. If sum > 0, move right left. Skip duplicates to avoid duplicate triplets.',
          tradeoff: 'O(n²) time and O(1) auxiliary space. The most efficient solution.',
        },
      }}
    >
      {(approach) => {
        if (approach === 'brute') return <BruteForceVisualizer />;
        if (approach === 'better') return <BetterVisualizer />;
        return <OptimalVisualizer />;
      }}
    </WorkspaceTemplate>
  );
}
