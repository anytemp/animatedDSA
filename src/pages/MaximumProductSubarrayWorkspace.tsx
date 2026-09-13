import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import WorkspaceTemplate from '../components/WorkspaceTemplate';

function BruteForceVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [2, 3, -2, 4];
  const steps = [
    { id: 0, phase: 'init', i: null, j: null, product: null, maxProduct: -Infinity, codeLine: 3, explanation: 'Initialize maxProduct = -∞. We will check every possible subarray.' },
    { id: 1, phase: 'outer', i: 0, j: null, product: null, maxProduct: -Infinity, codeLine: 4, explanation: 'Start outer loop: i = 0 (starting index).' },
    { id: 2, phase: 'inner', i: 0, j: 0, product: 1, maxProduct: -Infinity, codeLine: 5, explanation: 'Inner loop: j = 0. Initialize product = 1.' },
    { id: 3, phase: 'inner', i: 0, j: 0, product: 2, maxProduct: -Infinity, codeLine: 6, explanation: 'Multiply by nums[0] = 2. product = 2.' },
    { id: 4, phase: 'update', i: 0, j: 0, product: 2, maxProduct: 2, codeLine: 8, explanation: 'Update maxProduct = max(-∞, 2) = 2.' },
    { id: 5, phase: 'inner', i: 0, j: 1, product: 2, maxProduct: 2, codeLine: 5, explanation: 'Extend to j = 1. product is still 2.' },
    { id: 6, phase: 'inner', i: 0, j: 1, product: 6, maxProduct: 2, codeLine: 6, explanation: 'Multiply by nums[1] = 3. product = 2 × 3 = 6.' },
    { id: 7, phase: 'update', i: 0, j: 1, product: 6, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(2, 6) = 6.' },
    { id: 8, phase: 'inner', i: 0, j: 2, product: 6, maxProduct: 6, codeLine: 5, explanation: 'Extend to j = 2. product is still 6.' },
    { id: 9, phase: 'inner', i: 0, j: 2, product: -12, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[2] = -2. product = 6 × (-2) = -12.' },
    { id: 10, phase: 'update', i: 0, j: 2, product: -12, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, -12) = 6.' },
    { id: 11, phase: 'inner', i: 0, j: 3, product: -12, maxProduct: 6, codeLine: 5, explanation: 'Extend to j = 3. product is still -12.' },
    { id: 12, phase: 'inner', i: 0, j: 3, product: -48, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[3] = 4. product = -12 × 4 = -48.' },
    { id: 13, phase: 'update', i: 0, j: 3, product: -48, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, -48) = 6.' },
    { id: 14, phase: 'outer', i: 1, j: null, product: null, maxProduct: 6, codeLine: 4, explanation: 'Outer loop: i = 1.' },
    { id: 15, phase: 'inner', i: 1, j: 1, product: 1, maxProduct: 6, codeLine: 5, explanation: 'Inner loop: j = 1. Initialize product = 1.' },
    { id: 16, phase: 'inner', i: 1, j: 1, product: 3, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[1] = 3. product = 3.' },
    { id: 17, phase: 'update', i: 1, j: 1, product: 3, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, 3) = 6.' },
    { id: 18, phase: 'inner', i: 1, j: 2, product: 3, maxProduct: 6, codeLine: 5, explanation: 'Extend to j = 2. product is still 3.' },
    { id: 19, phase: 'inner', i: 1, j: 2, product: -6, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[2] = -2. product = 3 × (-2) = -6.' },
    { id: 20, phase: 'update', i: 1, j: 2, product: -6, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, -6) = 6.' },
    { id: 21, phase: 'inner', i: 1, j: 3, product: -6, maxProduct: 6, codeLine: 5, explanation: 'Extend to j = 3. product is still -6.' },
    { id: 22, phase: 'inner', i: 1, j: 3, product: -24, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[3] = 4. product = -6 × 4 = -24.' },
    { id: 23, phase: 'update', i: 1, j: 3, product: -24, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, -24) = 6.' },
    { id: 24, phase: 'outer', i: 2, j: null, product: null, maxProduct: 6, codeLine: 4, explanation: 'Outer loop: i = 2.' },
    { id: 25, phase: 'inner', i: 2, j: 2, product: 1, maxProduct: 6, codeLine: 5, explanation: 'Inner loop: j = 2. Initialize product = 1.' },
    { id: 26, phase: 'inner', i: 2, j: 2, product: -2, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[2] = -2. product = -2.' },
    { id: 27, phase: 'update', i: 2, j: 2, product: -2, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, -2) = 6.' },
    { id: 28, phase: 'inner', i: 2, j: 3, product: -2, maxProduct: 6, codeLine: 5, explanation: 'Extend to j = 3. product is still -2.' },
    { id: 29, phase: 'inner', i: 2, j: 3, product: -8, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[3] = 4. product = -2 × 4 = -8.' },
    { id: 30, phase: 'update', i: 2, j: 3, product: -8, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, -8) = 6.' },
    { id: 31, phase: 'outer', i: 3, j: null, product: null, maxProduct: 6, codeLine: 4, explanation: 'Outer loop: i = 3.' },
    { id: 32, phase: 'inner', i: 3, j: 3, product: 1, maxProduct: 6, codeLine: 5, explanation: 'Inner loop: j = 3. Initialize product = 1.' },
    { id: 33, phase: 'inner', i: 3, j: 3, product: 4, maxProduct: 6, codeLine: 6, explanation: 'Multiply by nums[3] = 4. product = 4.' },
    { id: 34, phase: 'update', i: 3, j: 3, product: 4, maxProduct: 6, codeLine: 8, explanation: 'Update maxProduct = max(6, 4) = 6.' },
    { id: 35, phase: 'return', i: null, j: null, product: null, maxProduct: 6, codeLine: 11, explanation: 'All subarrays checked. Return maxProduct = 6. The maximum product subarray is [2, 3].' },
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
            <p className="text-gray-600">Check every possible subarray (O(n²))</p>
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
                const isInSubarray = step.i !== null && step.j !== null && index >= step.i && index <= step.j;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isInSubarray ? 1.1 : 1, backgroundColor: isInSubarray ? '#ede9fe' : '#ffffff', borderColor: isInSubarray ? '#8b5cf6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                      {num}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (start)</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">j (end)</div>
              <div className="text-3xl font-bold text-blue-900">{step.j !== null ? step.j : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">product</div>
              <motion.div key={step.product} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-emerald-900">{step.product !== null ? step.product : '—'}</motion.div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">maxProduct</div>
              <motion.div key={step.maxProduct} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-amber-900">{step.maxProduct !== -Infinity ? step.maxProduct : '-∞'}</motion.div>
            </div>
          </div>

          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    int maxProduct(vector<int>& nums) {', '        int maxProduct = INT_MIN;', '', '        for (int i = 0; i < nums.size(); i++) {', '            int product = 1;', '            for (int j = i; j < nums.size(); j++) {', '                product *= nums[j];', '                maxProduct = max(maxProduct, product);', '            }', '        }', '', '        return maxProduct;', '    }', '};'].map((line, index) => (
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
              <p className="text-sm text-blue-700 leading-relaxed">Two nested loops. For each starting index, we extend to all ending indices.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only a few variables used regardless of input size.</p>
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

  const nums = [2, 3, -2, 4];
  const steps = [
    { id: 0, phase: 'init', prefix: 1, suffix: 1, maxProduct: -Infinity, i: null, direction: null, codeLine: 3, explanation: 'Initialize prefix = 1, suffix = 1, maxProduct = -∞. We will traverse left-to-right and right-to-left.' },
    { id: 1, phase: 'prefix-start', prefix: 1, suffix: 1, maxProduct: -Infinity, i: 0, direction: 'left', codeLine: 5, explanation: 'Start left-to-right pass. i = 0.' },
    { id: 2, phase: 'prefix', prefix: 2, suffix: 1, maxProduct: 2, i: 0, direction: 'left', codeLine: 6, explanation: 'prefix = prefix × nums[0] = 1 × 2 = 2. Update maxProduct = max(-∞, 2) = 2.' },
    { id: 3, phase: 'prefix', prefix: 6, suffix: 1, maxProduct: 6, i: 1, direction: 'left', codeLine: 6, explanation: 'prefix = prefix × nums[1] = 2 × 3 = 6. Update maxProduct = max(2, 6) = 6.' },
    { id: 4, phase: 'prefix', prefix: -12, suffix: 1, maxProduct: 6, i: 2, direction: 'left', codeLine: 6, explanation: 'prefix = prefix × nums[2] = 6 × (-2) = -12. maxProduct remains 6.' },
    { id: 5, phase: 'prefix', prefix: -48, suffix: 1, maxProduct: 6, i: 3, direction: 'left', codeLine: 6, explanation: 'prefix = prefix × nums[3] = -12 × 4 = -48. maxProduct remains 6.' },
    { id: 6, phase: 'prefix-zero', prefix: 1, suffix: 1, maxProduct: 6, i: null, direction: null, codeLine: 7, explanation: 'Reset prefix = 1 for the next pass.' },
    { id: 7, phase: 'suffix-start', prefix: 1, suffix: 1, maxProduct: 6, i: 3, direction: 'right', codeLine: 9, explanation: 'Start right-to-left pass. i = 3.' },
    { id: 8, phase: 'suffix', prefix: 1, suffix: 4, maxProduct: 6, i: 3, direction: 'right', codeLine: 10, explanation: 'suffix = suffix × nums[3] = 1 × 4 = 4. maxProduct remains 6.' },
    { id: 9, phase: 'suffix', prefix: 1, suffix: -8, maxProduct: 6, i: 2, direction: 'right', codeLine: 10, explanation: 'suffix = suffix × nums[2] = 4 × (-2) = -8. maxProduct remains 6.' },
    { id: 10, phase: 'suffix', prefix: 1, suffix: -24, maxProduct: 6, i: 1, direction: 'right', codeLine: 10, explanation: 'suffix = suffix × nums[1] = -8 × 3 = -24. maxProduct remains 6.' },
    { id: 11, phase: 'suffix', prefix: 1, suffix: -48, maxProduct: 6, i: 0, direction: 'right', codeLine: 10, explanation: 'suffix = suffix × nums[0] = -24 × 2 = -48. maxProduct remains 6.' },
    { id: 12, phase: 'return', prefix: 1, suffix: -48, maxProduct: 6, i: null, direction: null, codeLine: 13, explanation: 'Both passes complete. Return maxProduct = 6. The maximum product subarray is [2, 3].' },
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
            <p className="text-gray-600">Prefix and suffix products (O(n))</p>
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
                const isCurrent = step.i === index;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isCurrent ? 1.1 : 1, backgroundColor: isCurrent ? '#ede9fe' : '#ffffff', borderColor: isCurrent ? '#8b5cf6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                      {num}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">Pass Direction</div>
              <div className="text-lg font-bold text-blue-900">{step.direction === 'left' ? 'Left → Right' : step.direction === 'right' ? 'Right → Left' : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">Index i</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">{step.direction === 'left' ? 'prefix' : step.direction === 'right' ? 'suffix' : 'product'}</div>
              <motion.div key={step.direction === 'left' ? step.prefix : step.suffix} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-emerald-900">{step.direction === 'left' ? step.prefix : step.direction === 'right' ? step.suffix : '—'}</motion.div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">maxProduct</div>
              <motion.div key={step.maxProduct} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-amber-900">{step.maxProduct !== -Infinity ? step.maxProduct : '-∞'}</motion.div>
            </div>
          </div>

          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    int maxProduct(vector<int>& nums) {', '        int prefix = 1, suffix = 1;', '        int maxProduct = INT_MIN;', '', '        for (int i = 0; i < nums.size(); i++) {', '            prefix *= nums[i];', '            maxProduct = max(maxProduct, prefix);', '            if (prefix == 0) prefix = 1;', '        }', '', '        for (int i = nums.size() - 1; i >= 0; i--) {', '            suffix *= nums[i];', '            maxProduct = max(maxProduct, suffix);', '            if (suffix == 0) suffix = 1;', '        }', '', '        return maxProduct;', '    }', '};'].map((line, index) => (
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
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Two passes through the array: left-to-right and right-to-left.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only a few variables (prefix, suffix, maxProduct) used.</p>
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

  const nums = [2, 3, -2, 4];
  const steps = [
    { id: 0, phase: 'init', i: null, currentMax: 2, currentMin: 2, answer: 2, codeLine: 3, explanation: 'Initialize: currentMax = nums[0] = 2, currentMin = nums[0] = 2, answer = nums[0] = 2.' },
    { id: 1, phase: 'loop', i: 1, currentMax: 2, currentMin: 2, answer: 2, codeLine: 5, explanation: 'Start loop at i = 1. nums[1] = 3. value = 3 (positive, no swap needed).' },
    { id: 2, phase: 'update', i: 1, currentMax: 6, currentMin: 3, answer: 6, codeLine: 8, explanation: 'currentMax = max(3, 2 × 3) = 6. currentMin = min(3, 2 × 3) = 3. answer = max(2, 6) = 6.' },
    { id: 3, phase: 'loop', i: 2, currentMax: 6, currentMin: 3, answer: 6, codeLine: 5, explanation: 'Move to i = 2. nums[2] = -2. value = -2 (negative, swap currentMax and currentMin!).' },
    { id: 4, phase: 'swap', i: 2, currentMax: 3, currentMin: 6, answer: 6, codeLine: 7, explanation: 'Swap: currentMax = 3, currentMin = 6. Now currentMax holds the smaller value.' },
    { id: 5, phase: 'update', i: 2, currentMax: 3, currentMin: -12, answer: 6, codeLine: 8, explanation: 'currentMax = max(-2, 3 × -2) = -2. currentMin = min(-2, 6 × -2) = -12. answer = max(6, -2) = 6.' },
    { id: 6, phase: 'loop', i: 3, currentMax: 3, currentMin: -12, answer: 6, codeLine: 5, explanation: 'Move to i = 3. nums[3] = 4. value = 4 (positive, no swap needed).' },
    { id: 7, phase: 'update', i: 3, currentMax: 4, currentMin: -48, answer: 6, codeLine: 8, explanation: 'currentMax = max(4, -2 × 4) = 4. currentMin = min(4, -12 × 4) = -48. answer = max(6, 4) = 6.' },
    { id: 8, phase: 'return', i: null, currentMax: 4, currentMin: -48, answer: 6, codeLine: 11, explanation: 'Return answer = 6. The maximum product subarray is [2, 3].' },
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
            <p className="text-gray-600">Track max and min products (O(n))</p>
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
                const isCurrent = step.i === index;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isCurrent ? 1.1 : 1, backgroundColor: isCurrent ? '#ede9fe' : '#ffffff', borderColor: isCurrent ? '#8b5cf6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                      {num}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {step.phase === 'swap' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 mb-8">
              <div className="text-center">
                <div className="text-2xl mb-2">🔄</div>
                <div className="text-xl font-bold text-rose-700 mb-2">Swap currentMax and currentMin!</div>
                <div className="text-lg text-rose-600">Negative number detected. The smallest product can become the largest.</div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (loop index)</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">currentMax</div>
              <motion.div key={step.currentMax} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-emerald-900">{step.currentMax}</motion.div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">currentMin</div>
              <motion.div key={step.currentMin} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-blue-900">{step.currentMin}</motion.div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">answer</div>
              <motion.div key={step.answer} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-amber-900">{step.answer}</motion.div>
            </div>
          </div>

          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    int maxProduct(vector<int>& nums) {', '        int currentMax = nums[0];', '        int currentMin = nums[0];', '        int answer = nums[0];', '', '        for (int i = 1; i < nums.size(); i++) {', '            int value = nums[i];', '', '            if (value < 0) {', '                swap(currentMax, currentMin);', '            }', '', '            currentMax = max(value, currentMax * value);', '            currentMin = min(value, currentMin * value);', '', '            answer = max(answer, currentMax);', '        }', '', '        return answer;', '    }', '};'].map((line, index) => (
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
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Single pass through the array. Each element is processed once with constant-time operations.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only three variables (currentMax, currentMin, answer) are used, regardless of input size.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MaximumProductSubarrayWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={6}
      title="Maximum Product Subarray"
      topic="Array"
      pattern="Dynamic Programming"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Check Every Subarray',
          description: 'Check every possible subarray and calculate its product.',
          intuition: 'Use two nested loops to define subarray boundaries and calculate the product of each subarray.',
          howItWorks: 'For each starting index i and ending index j, calculate the product of elements from i to j. Track the maximum product found.',
          tradeoff: 'O(n²) time complexity. Too slow for large arrays.',
        },
        better: {
          title: 'Better: Prefix and Suffix Products',
          description: 'Maintain prefix and suffix products while traversing the array.',
          intuition: 'A negative number can turn a small negative product into a large positive product. Track both prefix and suffix products.',
          howItWorks: 'Traverse from left to right maintaining prefix product, then right to left maintaining suffix product. The answer is the maximum of all prefix and suffix products.',
          tradeoff: 'O(n) time and O(1) space. Handles negative numbers and zeros effectively.',
        },
        optimal: {
          title: 'Optimal: Track Max and Min',
          description: 'Track both currentMax and currentMin at each position.',
          intuition: 'A negative number can turn the smallest negative product into the largest positive product. We need to track both maximum and minimum products.',
          howItWorks: 'At each position, if the current number is negative, swap currentMax and currentMin. Then update currentMax = max(nums[i], currentMax * nums[i]) and currentMin = min(nums[i], currentMin * nums[i]). Track the global maximum.',
          tradeoff: 'O(n) time and O(1) space. The most efficient solution.',
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
