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
    { id: 0, phase: 'init', i: null, j: null, product: null, result: [0, 0, 0, 0], codeLine: 3, explanation: 'We start with nums = [1, 2, 3, 4]. We need to calculate the product of all elements except the current one for each position.' },
    { id: 1, phase: 'outer', i: 0, j: null, product: null, result: [0, 0, 0, 0], codeLine: 4, explanation: 'For i = 0, we need to calculate the product of all elements except nums[0] = 1.' },
    { id: 2, phase: 'inner', i: 0, j: 1, product: 2, result: [0, 0, 0, 0], codeLine: 6, explanation: 'Start with product = 1. Multiply by nums[1] = 2. Product = 2.' },
    { id: 3, phase: 'inner', i: 0, j: 2, product: 6, result: [0, 0, 0, 0], codeLine: 6, explanation: 'Multiply by nums[2] = 3. Product = 2 × 3 = 6.' },
    { id: 4, phase: 'inner', i: 0, j: 3, product: 24, result: [24, 0, 0, 0], codeLine: 8, explanation: 'Multiply by nums[3] = 4. Product = 6 × 4 = 24. Store result[0] = 24.' },
    { id: 5, phase: 'outer', i: 1, j: null, product: null, result: [24, 0, 0, 0], codeLine: 4, explanation: 'For i = 1, we need to calculate the product of all elements except nums[1] = 2.' },
    { id: 6, phase: 'inner', i: 1, j: 0, product: 1, result: [24, 0, 0, 0], codeLine: 6, explanation: 'Start with product = 1. Multiply by nums[0] = 1. Product = 1.' },
    { id: 7, phase: 'inner', i: 1, j: 2, product: 3, result: [24, 0, 0, 0], codeLine: 6, explanation: 'Multiply by nums[2] = 3. Product = 1 × 3 = 3.' },
    { id: 8, phase: 'inner', i: 1, j: 3, product: 12, result: [24, 12, 0, 0], codeLine: 8, explanation: 'Multiply by nums[3] = 4. Product = 3 × 4 = 12. Store result[1] = 12.' },
    { id: 9, phase: 'outer', i: 2, j: null, product: null, result: [24, 12, 0, 0], codeLine: 4, explanation: 'For i = 2, we need to calculate the product of all elements except nums[2] = 3.' },
    { id: 10, phase: 'inner', i: 2, j: 0, product: 1, result: [24, 12, 0, 0], codeLine: 6, explanation: 'Start with product = 1. Multiply by nums[0] = 1. Product = 1.' },
    { id: 11, phase: 'inner', i: 2, j: 1, product: 2, result: [24, 12, 0, 0], codeLine: 6, explanation: 'Multiply by nums[1] = 2. Product = 1 × 2 = 2.' },
    { id: 12, phase: 'inner', i: 2, j: 3, product: 8, result: [24, 12, 8, 0], codeLine: 8, explanation: 'Multiply by nums[3] = 4. Product = 2 × 4 = 8. Store result[2] = 8.' },
    { id: 13, phase: 'outer', i: 3, j: null, product: null, result: [24, 12, 8, 0], codeLine: 4, explanation: 'For i = 3, we need to calculate the product of all elements except nums[3] = 4.' },
    { id: 14, phase: 'inner', i: 3, j: 0, product: 1, result: [24, 12, 8, 0], codeLine: 6, explanation: 'Start with product = 1. Multiply by nums[0] = 1. Product = 1.' },
    { id: 15, phase: 'inner', i: 3, j: 1, product: 2, result: [24, 12, 8, 0], codeLine: 6, explanation: 'Multiply by nums[1] = 2. Product = 1 × 2 = 2.' },
    { id: 16, phase: 'inner', i: 3, j: 2, product: 6, result: [24, 12, 8, 6], codeLine: 8, explanation: 'Multiply by nums[2] = 3. Product = 2 × 3 = 6. Store result[3] = 6.' },
    { id: 17, phase: 'return', i: null, j: null, product: null, result: [24, 12, 8, 6], codeLine: 11, explanation: 'Return result = [24, 12, 8, 6]. Each element is the product of all other elements.' },
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
        if (approach === 'better') return <div className="p-12 text-center text-gray-500">Better approach visualization coming soon</div>;
        return <div className="p-12 text-center text-gray-500">Optimal approach visualization coming soon</div>;
      }}
    </WorkspaceTemplate>
  );
}
