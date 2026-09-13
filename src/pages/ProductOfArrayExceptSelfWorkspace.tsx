import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import WorkspaceTemplate from '../components/WorkspaceTemplate';

// Brute Force Visualizer
function BruteForceVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [1, 2, 3, 4];
  const steps = [
    { id: 0, phase: 'init', i: null, j: null, product: null, result: [1, 1, 1, 1], codeLine: 3, explanation: 'We start with nums = [1, 2, 3, 4]. Initialize answer array with all 1s: answer = [1, 1, 1, 1].' },
    { id: 1, phase: 'outer', i: 0, j: null, product: null, result: [1, 1, 1, 1], codeLine: 5, explanation: 'Outer loop: i = 0. We will calculate answer[0] by multiplying all elements except nums[0].' },
    { id: 2, phase: 'inner', i: 0, j: 0, product: null, result: [1, 1, 1, 1], codeLine: 7, explanation: 'Inner loop: j = 0. Since i == j (0 == 0), we skip this iteration.' },
    { id: 3, phase: 'inner', i: 0, j: 1, product: 2, result: [2, 1, 1, 1], codeLine: 9, explanation: 'j = 1. i != j, so multiply: answer[0] = 1 × nums[1] = 1 × 2 = 2.' },
    { id: 4, phase: 'inner', i: 0, j: 2, product: 6, result: [6, 1, 1, 1], codeLine: 9, explanation: 'j = 2. Multiply: answer[0] = 2 × nums[2] = 2 × 3 = 6.' },
    { id: 5, phase: 'inner', i: 0, j: 3, product: 24, result: [24, 1, 1, 1], codeLine: 9, explanation: 'j = 3. Multiply: answer[0] = 6 × nums[3] = 6 × 4 = 24. answer[0] is complete!' },
    { id: 6, phase: 'outer', i: 1, j: null, product: null, result: [24, 1, 1, 1], codeLine: 5, explanation: 'Outer loop: i = 1. Calculate answer[1] by multiplying all elements except nums[1].' },
    { id: 7, phase: 'inner', i: 1, j: 0, product: 1, result: [24, 1, 1, 1], codeLine: 9, explanation: 'j = 0. Multiply: answer[1] = 1 × nums[0] = 1 × 1 = 1.' },
    { id: 8, phase: 'inner', i: 1, j: 1, product: null, result: [24, 1, 1, 1], codeLine: 7, explanation: 'j = 1. Since i == j (1 == 1), skip.' },
    { id: 9, phase: 'inner', i: 1, j: 2, product: 3, result: [24, 3, 1, 1], codeLine: 9, explanation: 'j = 2. Multiply: answer[1] = 1 × nums[2] = 1 × 3 = 3.' },
    { id: 10, phase: 'inner', i: 1, j: 3, product: 12, result: [24, 12, 1, 1], codeLine: 9, explanation: 'j = 3. Multiply: answer[1] = 3 × nums[3] = 3 × 4 = 12. answer[1] is complete!' },
    { id: 11, phase: 'outer', i: 2, j: null, product: null, result: [24, 12, 1, 1], codeLine: 5, explanation: 'Outer loop: i = 2. Calculate answer[2].' },
    { id: 12, phase: 'inner', i: 2, j: 0, product: 1, result: [24, 12, 1, 1], codeLine: 9, explanation: 'j = 0. Multiply: answer[2] = 1 × nums[0] = 1 × 1 = 1.' },
    { id: 13, phase: 'inner', i: 2, j: 1, product: 2, result: [24, 12, 2, 1], codeLine: 9, explanation: 'j = 1. Multiply: answer[2] = 1 × nums[1] = 1 × 2 = 2.' },
    { id: 14, phase: 'inner', i: 2, j: 2, product: null, result: [24, 12, 2, 1], codeLine: 7, explanation: 'j = 2. Since i == j (2 == 2), skip.' },
    { id: 15, phase: 'inner', i: 2, j: 3, product: 8, result: [24, 12, 8, 1], codeLine: 9, explanation: 'j = 3. Multiply: answer[2] = 2 × nums[3] = 2 × 4 = 8. answer[2] is complete!' },
    { id: 16, phase: 'outer', i: 3, j: null, product: null, result: [24, 12, 8, 1], codeLine: 5, explanation: 'Outer loop: i = 3. Calculate answer[3].' },
    { id: 17, phase: 'inner', i: 3, j: 0, product: 1, result: [24, 12, 8, 1], codeLine: 9, explanation: 'j = 0. Multiply: answer[3] = 1 × nums[0] = 1 × 1 = 1.' },
    { id: 18, phase: 'inner', i: 3, j: 1, product: 2, result: [24, 12, 8, 2], codeLine: 9, explanation: 'j = 1. Multiply: answer[3] = 1 × nums[1] = 1 × 2 = 2.' },
    { id: 19, phase: 'inner', i: 3, j: 2, product: 6, result: [24, 12, 8, 6], codeLine: 9, explanation: 'j = 2. Multiply: answer[3] = 2 × nums[2] = 2 × 3 = 6.' },
    { id: 20, phase: 'inner', i: 3, j: 3, product: null, result: [24, 12, 8, 6], codeLine: 7, explanation: 'j = 3. Since i == j (3 == 3), skip.' },
    { id: 21, phase: 'return', i: null, j: null, product: null, result: [24, 12, 8, 6], codeLine: 13, explanation: 'All iterations complete! Return answer = [24, 12, 8, 6].' },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Brute Force Visualization</h2>
            <p className="text-gray-600">For each index, multiply all other elements</p>
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
          {/* Input Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nums.map((num, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <motion.div animate={{ scale: step.i === index ? 1.1 : 1, backgroundColor: step.i === index ? '#ede9fe' : '#ffffff', borderColor: step.i === index ? '#8b5cf6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                    {num}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Result Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Result Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {step.result.map((val, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <motion.div animate={{ scale: step.i === index && step.phase === 'inner' && step.j === 3 ? 1.1 : 1, backgroundColor: step.i === index && step.phase === 'inner' && step.j === 3 ? '#d1fae5' : val !== 0 ? '#dbeafe' : '#f3f4f6', borderColor: step.i === index && step.phase === 'inner' && step.j === 3 ? '#10b981' : val !== 0 ? '#3b82f6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                    {val}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Current Product */}
          {step.product !== null && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 mb-8">
              <div className="text-center">
                <div className="text-sm text-purple-600 font-semibold mb-4">Current Product Calculation</div>
                <div className="text-4xl font-bold text-purple-900">{step.product}</div>
                <div className="text-sm text-purple-600 mt-2">Storing in result[{step.i}]</div>
              </div>
            </motion.div>
          )}

          {/* Variables */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (outer loop)</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">j (inner loop)</div>
              <div className="text-3xl font-bold text-blue-900">{step.j !== null ? step.j : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">product</div>
              <div className="text-3xl font-bold text-emerald-900">{step.product !== null ? step.product : '—'}</div>
            </div>
          </div>

          {/* Explanation */}
          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        {/* Code */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    vector<int> productExceptSelf(vector<int>& nums) {', '        int n = nums.size();', '        vector<int> result(n);', '', '        for (int i = 0; i < n; i++) {', '            int product = 1;', '            for (int j = 0; j < n; j++) {', '                if (i != j) {', '                    product *= nums[j];', '                }', '            }', '            result[i] = product;', '        }', '', '        return result;', '    }', '};'].map((line, index) => (
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
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n²)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Two nested loops. For each element, we iterate through all other elements.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Auxiliary space excluding the output array. We only use a few variables.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductOfArrayExceptSelfWorkspace() {
// Better Approach Visualizer
function BetterApproachVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [1, 2, 3, 4];
  const steps = [
    { id: 0, phase: 'init', prefix: [1, 1, 1, 1], suffix: [1, 1, 1, 1], answer: [1, 1, 1, 1], i: null, codeLine: 3, explanation: 'Initialize three arrays: prefix = [1, 1, 1, 1], suffix = [1, 1, 1, 1], answer = [1, 1, 1, 1].' },
    { id: 1, phase: 'prefix-start', prefix: [1, 1, 1, 1], suffix: [1, 1, 1, 1], answer: [1, 1, 1, 1], i: 1, codeLine: 8, explanation: 'Build prefix array. Start at i = 1.' },
    { id: 2, phase: 'prefix', prefix: [1, 1, 1, 1], suffix: [1, 1, 1, 1], answer: [1, 1, 1, 1], i: 1, codeLine: 9, explanation: 'prefix[1] = prefix[0] × nums[0] = 1 × 1 = 1.' },
    { id: 3, phase: 'prefix', prefix: [1, 1, 1, 1], suffix: [1, 1, 1, 1], answer: [1, 1, 1, 1], i: 2, codeLine: 9, explanation: 'prefix[2] = prefix[1] × nums[1] = 1 × 2 = 2.' },
    { id: 4, phase: 'prefix', prefix: [1, 1, 2, 1], suffix: [1, 1, 1, 1], answer: [1, 1, 1, 1], i: 3, codeLine: 9, explanation: 'prefix[3] = prefix[2] × nums[2] = 2 × 3 = 6. Prefix array complete: [1, 1, 2, 6].' },
    { id: 5, phase: 'prefix', prefix: [1, 1, 2, 6], suffix: [1, 1, 1, 1], answer: [1, 1, 1, 1], i: null, codeLine: 9, explanation: 'Prefix array built: prefix = [1, 1, 2, 6]. Each prefix[i] contains product of all elements before index i.' },
    { id: 6, phase: 'suffix-start', prefix: [1, 1, 2, 6], suffix: [1, 1, 1, 1], answer: [1, 1, 1, 1], i: 2, codeLine: 12, explanation: 'Build suffix array from right to left. Start at i = 2.' },
    { id: 7, phase: 'suffix', prefix: [1, 1, 2, 6], suffix: [1, 1, 1, 4], answer: [1, 1, 1, 1], i: 1, codeLine: 13, explanation: 'suffix[2] = suffix[3] × nums[3] = 1 × 4 = 4.' },
    { id: 8, phase: 'suffix', prefix: [1, 1, 2, 6], suffix: [1, 1, 4, 4], answer: [1, 1, 1, 1], i: 0, codeLine: 13, explanation: 'suffix[1] = suffix[2] × nums[2] = 4 × 3 = 12.' },
    { id: 9, phase: 'suffix', prefix: [1, 1, 2, 6], suffix: [1, 12, 4, 4], answer: [1, 1, 1, 1], i: null, codeLine: 13, explanation: 'suffix[0] = suffix[1] × nums[1] = 12 × 2 = 24. Suffix array complete: [24, 12, 4, 1].' },
    { id: 10, phase: 'suffix', prefix: [1, 1, 2, 6], suffix: [24, 12, 4, 1], answer: [1, 1, 1, 1], i: null, codeLine: 13, explanation: 'Suffix array built: suffix = [24, 12, 4, 1]. Each suffix[i] contains product of all elements after index i.' },
    { id: 11, phase: 'answer-start', prefix: [1, 1, 2, 6], suffix: [24, 12, 4, 1], answer: [1, 1, 1, 1], i: 0, codeLine: 16, explanation: 'Build answer array. Start at i = 0.' },
    { id: 12, phase: 'answer', prefix: [1, 1, 2, 6], suffix: [24, 12, 4, 1], answer: [24, 1, 1, 1], i: 1, codeLine: 17, explanation: 'answer[0] = prefix[0] × suffix[0] = 1 × 24 = 24.' },
    { id: 13, phase: 'answer', prefix: [1, 1, 2, 6], suffix: [24, 12, 4, 1], answer: [24, 12, 1, 1], i: 2, codeLine: 17, explanation: 'answer[1] = prefix[1] × suffix[1] = 1 × 12 = 12.' },
    { id: 14, phase: 'answer', prefix: [1, 1, 2, 6], suffix: [24, 12, 4, 1], answer: [24, 12, 8, 1], i: 3, codeLine: 17, explanation: 'answer[2] = prefix[2] × suffix[2] = 2 × 4 = 8.' },
    { id: 15, phase: 'answer', prefix: [1, 1, 2, 6], suffix: [24, 12, 4, 1], answer: [24, 12, 8, 6], i: null, codeLine: 17, explanation: 'answer[3] = prefix[3] × suffix[3] = 6 × 1 = 6. Answer array complete!' },
    { id: 16, phase: 'return', prefix: [1, 1, 2, 6], suffix: [24, 12, 4, 1], answer: [24, 12, 8, 6], i: null, codeLine: 20, explanation: 'Return answer = [24, 12, 8, 6].' },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Better Approach Visualization</h2>
            <p className="text-gray-600">Build prefix and suffix arrays, then combine</p>
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
          {/* Input Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nums.map((num, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-gray-300 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 bg-white">
                    {num}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Prefix Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Prefix Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {step.prefix.map((val, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <motion.div animate={{ scale: step.i === index && step.phase === 'prefix' ? 1.1 : 1, backgroundColor: step.i === index && step.phase === 'prefix' ? '#dbeafe' : val !== 1 ? '#dbeafe' : '#f3f4f6', borderColor: step.i === index && step.phase === 'prefix' ? '#3b82f6' : val !== 1 ? '#3b82f6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                    {val}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Suffix Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Suffix Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {step.suffix.map((val, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <motion.div animate={{ scale: step.i === index && step.phase === 'suffix' ? 1.1 : 1, backgroundColor: step.i === index && step.phase === 'suffix' ? '#fce7f3' : val !== 1 ? '#fce7f3' : '#f3f4f6', borderColor: step.i === index && step.phase === 'suffix' ? '#ec4899' : val !== 1 ? '#ec4899' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                    {val}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Answer Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Answer Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {step.answer.map((val, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <motion.div animate={{ scale: step.i === index && step.phase === 'answer' ? 1.1 : 1, backgroundColor: step.i === index && step.phase === 'answer' ? '#d1fae5' : val !== 1 ? '#d1fae5' : '#f3f4f6', borderColor: step.i === index && step.phase === 'answer' ? '#10b981' : val !== 1 ? '#10b981' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                    {val}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Variables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">Phase</div>
              <div className="text-lg font-bold text-blue-900">{step.phase.includes('prefix') ? 'Building Prefix' : step.phase.includes('suffix') ? 'Building Suffix' : step.phase.includes('answer') ? 'Building Answer' : 'Complete'}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">Current Index</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">Operation</div>
              <div className="text-sm font-bold text-emerald-900">{step.phase === 'prefix' ? 'prefix[i] = prefix[i-1] × nums[i-1]' : step.phase === 'suffix' ? 'suffix[i] = suffix[i+1] × nums[i+1]' : step.phase === 'answer' ? 'answer[i] = prefix[i] × suffix[i]' : 'Done'}</div>
            </div>
          </div>

          {/* Explanation */}
          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        {/* Code */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    vector<int> productExceptSelf(vector<int>& nums) {', '        int n = nums.size();', '', '        vector<int> prefix(n, 1);', '        vector<int> suffix(n, 1);', '        vector<int> answer(n, 1);', '', '        for (int i = 1; i < n; i++) {', '            prefix[i] = prefix[i - 1] * nums[i - 1];', '        }', '', '        for (int i = n - 2; i >= 0; i--) {', '            suffix[i] = suffix[i + 1] * nums[i + 1];', '        }', '', '        for (int i = 0; i < n; i++) {', '            answer[i] = prefix[i] * suffix[i];', '        }', '', '        return answer;', '    }', '};'].map((line, index) => (
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
              <p className="text-sm text-blue-700 leading-relaxed">Three separate passes through the array: one for prefix, one for suffix, one for answer.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(n)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Two extra arrays (prefix and suffix) of size n.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optimal Approach Visualizer
function OptimalApproachVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [1, 2, 3, 4];
  const steps = [
    { id: 0, phase: 'init', answer: [1, 1, 1, 1], prefix: 1, suffix: null, i: null, codeLine: 3, explanation: 'Initialize answer = [1, 1, 1, 1] and prefix = 1.' },
    { id: 1, phase: 'prefix-pass', answer: [1, 1, 1, 1], prefix: 1, suffix: null, i: 0, codeLine: 6, explanation: 'First pass: Build prefix products. Start at i = 0.' },
    { id: 2, phase: 'prefix', answer: [1, 1, 1, 1], prefix: 1, suffix: null, i: 0, codeLine: 7, explanation: 'answer[0] = prefix = 1. Then prefix = prefix × nums[0] = 1 × 1 = 1.' },
    { id: 3, phase: 'prefix', answer: [1, 1, 1, 1], prefix: 1, suffix: null, i: 1, codeLine: 7, explanation: 'answer[1] = prefix = 1. Then prefix = prefix × nums[1] = 1 × 2 = 2.' },
    { id: 4, phase: 'prefix', answer: [1, 1, 1, 1], prefix: 2, suffix: null, i: 2, codeLine: 7, explanation: 'answer[2] = prefix = 2. Then prefix = prefix × nums[2] = 2 × 3 = 6.' },
    { id: 5, phase: 'prefix', answer: [1, 1, 2, 1], prefix: 6, suffix: null, i: 3, codeLine: 7, explanation: 'answer[3] = prefix = 6. Then prefix = prefix × nums[3] = 6 × 4 = 24. First pass complete!' },
    { id: 6, phase: 'prefix', answer: [1, 1, 2, 6], prefix: 24, suffix: null, i: null, codeLine: 7, explanation: 'After first pass: answer = [1, 1, 2, 6]. Each answer[i] contains the product of all elements to the left of i.' },
    { id: 7, phase: 'suffix-pass', answer: [1, 1, 2, 6], prefix: 24, suffix: 1, i: 3, codeLine: 10, explanation: 'Second pass: Multiply by suffix products from right to left. Initialize suffix = 1. Start at i = 3.' },
    { id: 8, phase: 'suffix', answer: [1, 1, 2, 6], prefix: 24, suffix: 1, i: 3, codeLine: 11, explanation: 'answer[3] = answer[3] × suffix = 6 × 1 = 6. Then suffix = suffix × nums[3] = 1 × 4 = 4.' },
    { id: 9, phase: 'suffix', answer: [1, 1, 2, 6], prefix: 24, suffix: 4, i: 2, codeLine: 11, explanation: 'answer[2] = answer[2] × suffix = 2 × 4 = 8. Then suffix = suffix × nums[2] = 4 × 3 = 12.' },
    { id: 10, phase: 'suffix', answer: [1, 1, 8, 6], prefix: 24, suffix: 12, i: 1, codeLine: 11, explanation: 'answer[1] = answer[1] × suffix = 1 × 12 = 12. Then suffix = suffix × nums[1] = 12 × 2 = 24.' },
    { id: 11, phase: 'suffix', answer: [1, 12, 8, 6], prefix: 24, suffix: 24, i: 0, codeLine: 11, explanation: 'answer[0] = answer[0] × suffix = 1 × 24 = 24. Then suffix = suffix × nums[0] = 24 × 1 = 24. Second pass complete!' },
    { id: 12, phase: 'suffix', answer: [24, 12, 8, 6], prefix: 24, suffix: 24, i: null, codeLine: 11, explanation: 'After second pass: answer = [24, 12, 8, 6]. Each answer[i] now contains the product of all elements except nums[i].' },
    { id: 13, phase: 'return', answer: [24, 12, 8, 6], prefix: 24, suffix: 24, i: null, codeLine: 14, explanation: 'Return answer = [24, 12, 8, 6].' },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Optimal Approach Visualization</h2>
            <p className="text-gray-600">Two passes with O(1) extra space</p>
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
          {/* Input Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nums.map((num, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-gray-300 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 bg-white">
                    {num}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Answer Array */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Answer Array (reused as storage)</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {step.answer.map((val, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <motion.div animate={{ scale: step.i === index ? 1.1 : 1, backgroundColor: step.i === index ? '#d1fae5' : val !== 1 ? '#d1fae5' : '#f3f4f6', borderColor: step.i === index ? '#10b981' : val !== 1 ? '#10b981' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                    {val}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Variables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">Pass</div>
              <div className="text-lg font-bold text-blue-900">{step.phase.includes('prefix') ? 'First (Left to Right)' : step.phase.includes('suffix') ? 'Second (Right to Left)' : 'Complete'}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">prefix</div>
              <motion.div key={step.prefix} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-purple-900">{step.prefix}</motion.div>
              <div className="text-xs text-purple-600 mt-1">Running product from left</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">suffix</div>
              <motion.div key={step.suffix} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-emerald-900">{step.suffix !== null ? step.suffix : '—'}</motion.div>
              <div className="text-xs text-emerald-600 mt-1">Running product from right</div>
            </div>
          </div>

          {/* Explanation */}
          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        {/* Code */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    vector<int> productExceptSelf(vector<int>& nums) {', '        int n = nums.size();', '        vector<int> answer(n, 1);', '', '        int prefix = 1;', '        for (int i = 0; i < n; i++) {', '            answer[i] = prefix;', '            prefix *= nums[i];', '        }', '', '        int suffix = 1;', '        for (int i = n - 1; i >= 0; i--) {', '            answer[i] *= suffix;', '            suffix *= nums[i];', '        }', '', '        return answer;', '    }', '};'].map((line, index) => (
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
              <p className="text-sm text-blue-700 leading-relaxed">Two passes through the array. Each pass is O(n).</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only two variables (prefix and suffix). The answer array is not counted as extra space.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <WorkspaceTemplate
      problemId={4}
      title="Product of Array Except Self"
      topic="Array"
      pattern="Prefix / Suffix"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force Approach',
          description: 'For every index i, multiply all elements except nums[i].',
          intuition: 'Use two nested loops. The outer loop selects the index i, and the inner loop calculates the product of all other elements.',
          howItWorks: 'For each position i, iterate through all positions j. If i ≠ j, multiply nums[j] into a running product. Store the final product in result[i].',
          tradeoff: 'Simple to understand but very slow. For an array of size n, we perform n × n operations.',
        },
        better: {
          title: 'Better Approach: Prefix and Suffix Arrays',
          description: 'Use two separate arrays to store prefix and suffix products.',
          intuition: 'For each index i, the answer is the product of all elements to its left (prefix) multiplied by the product of all elements to its right (suffix).',
          howItWorks: 'Create a prefix array where prefix[i] = product of nums[0] to nums[i-1]. Create a suffix array where suffix[i] = product of nums[i+1] to nums[n-1]. Then answer[i] = prefix[i] × suffix[i].',
          tradeoff: 'Much faster than brute force O(n²), but requires O(n) extra space for the two arrays.',
        },
        optimal: {
          title: 'Optimal Approach: Space-Optimized',
          description: 'Use the output array for prefix products and a single variable for suffix.',
          intuition: 'We can reuse the output array to store prefix products, then traverse from right to left while maintaining a running suffix product.',
          howItWorks: 'First pass: store prefix products in the result array. Second pass: traverse from right to left, multiplying each result[i] by the running suffix product, then update the suffix product.',
          tradeoff: 'Achieves O(n) time and O(1) auxiliary space by reusing the output array.',
        },
      }}
    >
      {(approach) => {
        if (approach === 'brute') return <BruteForceVisualizer />;
        if (approach === 'better') return <BetterApproachVisualizer />;
        return <OptimalApproachVisualizer />;
      }}
    </WorkspaceTemplate>
  );
}
