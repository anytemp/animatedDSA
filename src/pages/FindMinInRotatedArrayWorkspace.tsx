import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import WorkspaceTemplate from '../components/WorkspaceTemplate';

function BruteForceVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [3, 4, 5, 1, 2];
  const steps = [
    { id: 0, phase: 'init', i: null, min: null, codeLine: 3, explanation: 'Initialize min = nums[0] = 3. We will scan through the array to find the minimum.' },
    { id: 1, phase: 'loop', i: 0, min: 3, codeLine: 4, explanation: 'Start loop at i = 0. nums[0] = 3.' },
    { id: 2, phase: 'compare', i: 0, min: 3, codeLine: 5, explanation: 'Compare: nums[0] = 3 < min = 3? No. min remains 3.' },
    { id: 3, phase: 'loop', i: 1, min: 3, codeLine: 4, explanation: 'Move to i = 1. nums[1] = 4.' },
    { id: 4, phase: 'compare', i: 1, min: 3, codeLine: 5, explanation: 'Compare: nums[1] = 4 < min = 3? No. min remains 3.' },
    { id: 5, phase: 'loop', i: 2, min: 3, codeLine: 4, explanation: 'Move to i = 2. nums[2] = 5.' },
    { id: 6, phase: 'compare', i: 2, min: 3, codeLine: 5, explanation: 'Compare: nums[2] = 5 < min = 3? No. min remains 3.' },
    { id: 7, phase: 'loop', i: 3, min: 3, codeLine: 4, explanation: 'Move to i = 3. nums[3] = 1.' },
    { id: 8, phase: 'compare', i: 3, min: 1, codeLine: 5, explanation: 'Compare: nums[3] = 1 < min = 3? Yes! Update min = 1.' },
    { id: 9, phase: 'loop', i: 4, min: 1, codeLine: 4, explanation: 'Move to i = 4. nums[4] = 2.' },
    { id: 10, phase: 'compare', i: 4, min: 1, codeLine: 5, explanation: 'Compare: nums[4] = 2 < min = 1? No. min remains 1.' },
    { id: 11, phase: 'return', i: null, min: 1, codeLine: 8, explanation: 'Return min = 1. The minimum element in the rotated sorted array is 1.' },
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
            <p className="text-gray-600">Linear scan to find minimum (O(n))</p>
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
                const isMin = step.min === num && step.phase === 'compare' && num < nums[step.i!];
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (loop index)</div>
              <div className="text-3xl font-bold text-purple-900">{step.i !== null ? step.i : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">min</div>
              <motion.div key={step.min} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-emerald-900">{step.min !== null ? step.min : '—'}</motion.div>
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
              {['class Solution {', 'public:', '    int findMin(vector<int>& nums) {', '        int min = nums[0];', '', '        for (int i = 0; i < nums.size(); i++) {', '            if (nums[i] < min) {', '                min = nums[i];', '            }', '        }', '', '        return min;', '    }', '};'].map((line, index) => (
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
              <p className="text-sm text-blue-700 leading-relaxed">Single pass through the array. Each element is checked once.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only one variable (min) is used, regardless of input size.</p>
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

  const nums = [3, 4, 5, 1, 2];
  const steps = [
    { id: 0, phase: 'init', sorted: null, codeLine: 3, explanation: 'We will sort the array first, then return the first element.' },
    { id: 1, phase: 'sort', sorted: [1, 2, 3, 4, 5], codeLine: 4, explanation: 'After sorting: [1, 2, 3, 4, 5]. The minimum element is now at index 0.' },
    { id: 2, phase: 'return', sorted: [1, 2, 3, 4, 5], codeLine: 5, explanation: 'Return sorted[0] = 1. The minimum element is 1.' },
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
            <p className="text-gray-600">Sort and return first element (O(n log n))</p>
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
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">{step.phase === 'sort' ? 'Sorted Array' : 'Original Array'}</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {(step.sorted || nums).map((num, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                  <motion.div animate={{ backgroundColor: step.phase === 'return' && index === 0 ? '#d1fae5' : '#ffffff', borderColor: step.phase === 'return' && index === 0 ? '#10b981' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
                    {num}
                  </motion.div>
                </motion.div>
              ))}
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
              {['class Solution {', 'public:', '    int findMin(vector<int>& nums) {', '        sort(nums.begin(), nums.end());', '        return nums[0];', '    }', '};'].map((line, index) => (
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
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n log n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Sorting takes O(n log n) time. This is unnecessary for finding the minimum.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Sorting is done in-place with O(1) auxiliary space.</p>
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

  const nums = [3, 4, 5, 1, 2];
  const steps = [
    { id: 0, phase: 'init', left: 0, right: 4, mid: null, codeLine: 3, explanation: 'Initialize left = 0, right = 4. We will use binary search to find the minimum.' },
    { id: 1, phase: 'loop', left: 0, right: 4, mid: 2, codeLine: 5, explanation: 'Calculate mid = (0 + 4) / 2 = 2. nums[2] = 5.' },
    { id: 2, phase: 'compare', left: 0, right: 4, mid: 2, codeLine: 6, explanation: 'Compare: nums[mid] = 5 > nums[right] = 2? Yes! The minimum must be in the right half.' },
    { id: 3, phase: 'update', left: 3, right: 4, mid: null, codeLine: 7, explanation: 'Update left = mid + 1 = 3. Search range is now [3, 4].' },
    { id: 4, phase: 'loop', left: 3, right: 4, mid: 3, codeLine: 5, explanation: 'Calculate mid = (3 + 4) / 2 = 3. nums[3] = 1.' },
    { id: 5, phase: 'compare', left: 3, right: 4, mid: 3, codeLine: 6, explanation: 'Compare: nums[mid] = 1 > nums[right] = 2? No! The minimum is at mid or in the left half.' },
    { id: 6, phase: 'update', left: 3, right: 3, mid: null, codeLine: 9, explanation: 'Update right = mid = 3. Search range is now [3, 3].' },
    { id: 7, phase: 'return', left: 3, right: 3, mid: null, codeLine: 12, explanation: 'left == right. Return nums[left] = nums[3] = 1. The minimum element is 1.' },
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
            <p className="text-gray-600">Binary search to find minimum (O(log n))</p>
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
                const isLeft = step.left === index;
                const isRight = step.right === index;
                const isMid = step.mid === index;
                const isInRange = index >= step.left && index <= step.right;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isMid ? 1.15 : isInRange ? 1.05 : 1, backgroundColor: isMid ? '#fef3c7' : isLeft ? '#ede9fe' : isRight ? '#dbeafe' : isInRange ? '#f3f4f6' : '#ffffff', borderColor: isMid ? '#f59e0b' : isLeft ? '#8b5cf6' : isRight ? '#3b82f6' : isInRange ? '#9ca3af' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 relative">
                      {num}
                      {isLeft && <div className="absolute -top-6 text-xs font-bold text-purple-600">L</div>}
                      {isRight && <div className="absolute -top-6 text-xs font-bold text-blue-600">R</div>}
                      {isMid && <div className="absolute -top-6 text-xs font-bold text-amber-600">M</div>}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">left</div>
              <div className="text-3xl font-bold text-purple-900">{step.left}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">right</div>
              <div className="text-3xl font-bold text-blue-900">{step.right}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">mid</div>
              <div className="text-3xl font-bold text-amber-900">{step.mid !== null ? step.mid : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">Search Range</div>
              <div className="text-lg font-bold text-emerald-900">[{step.left}, {step.right}]</div>
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
              {['class Solution {', 'public:', '    int findMin(vector<int>& nums) {', '        int left = 0;', '        int right = nums.size() - 1;', '', '        while (left < right) {', '            int mid = left + (right - left) / 2;', '', '            if (nums[mid] > nums[right]) {', '                left = mid + 1;', '            } else {', '                right = mid;', '            }', '        }', '', '        return nums[left];', '    }', '};'].map((line, index) => (
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
              <div className="text-4xl font-bold text-blue-900 mb-3">O(log n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Binary search halves the search space at each step.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only three variables (left, right, mid) are used.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FindMinInRotatedArrayWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={7}
      title="Find Minimum in Rotated Sorted Array"
      topic="Array"
      pattern="Binary Search"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Linear Scan',
          description: 'Scan the entire array and track the smallest value.',
          intuition: 'Simply iterate through all elements and keep track of the minimum.',
          howItWorks: 'Initialize min = nums[0]. For each element, if it is smaller than min, update min. Return min at the end.',
          tradeoff: 'O(n) time. Does not take advantage of the sorted property.',
        },
        better: {
          title: 'Better: Sorting',
          description: 'Sort the array and return the first element.',
          intuition: 'After sorting, the minimum will be at index 0.',
          howItWorks: 'Sort the array using any sorting algorithm, then return nums[0].',
          tradeoff: 'O(n log n) time. Sorting destroys the original ordering and is unnecessary.',
        },
        optimal: {
          title: 'Optimal: Binary Search',
          description: 'Use binary search to find the minimum in O(log n) time.',
          intuition: 'In a rotated sorted array, the minimum element is the only element that is smaller than its previous element. We can use binary search to find it.',
          howItWorks: 'Compare nums[mid] with nums[right]. If nums[mid] > nums[right], the minimum is in the right half. Otherwise, it is in the left half (including mid). Continue until left == right.',
          tradeoff: 'O(log n) time and O(1) space. Takes full advantage of the sorted property.',
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
