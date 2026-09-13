import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import WorkspaceTemplate from '../components/WorkspaceTemplate';

function BruteForceVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = [4, 5, 6, 7, 0, 1, 2];
  const target = 0;
  const steps = [
    { id: 0, phase: 'init', i: null, codeLine: 3, explanation: 'Initialize. We will scan through the array to find the target.' },
    { id: 1, phase: 'loop', i: 0, codeLine: 4, explanation: 'Start loop at i = 0. nums[0] = 4.' },
    { id: 2, phase: 'compare', i: 0, codeLine: 5, explanation: 'Compare: nums[0] = 4 == target = 0? No.' },
    { id: 3, phase: 'loop', i: 1, codeLine: 4, explanation: 'Move to i = 1. nums[1] = 5.' },
    { id: 4, phase: 'compare', i: 1, codeLine: 5, explanation: 'Compare: nums[1] = 5 == target = 0? No.' },
    { id: 5, phase: 'loop', i: 2, codeLine: 4, explanation: 'Move to i = 2. nums[2] = 6.' },
    { id: 6, phase: 'compare', i: 2, codeLine: 5, explanation: 'Compare: nums[2] = 6 == target = 0? No.' },
    { id: 7, phase: 'loop', i: 3, codeLine: 4, explanation: 'Move to i = 3. nums[3] = 7.' },
    { id: 8, phase: 'compare', i: 3, codeLine: 5, explanation: 'Compare: nums[3] = 7 == target = 0? No.' },
    { id: 9, phase: 'loop', i: 4, codeLine: 4, explanation: 'Move to i = 4. nums[4] = 0.' },
    { id: 10, phase: 'compare', i: 4, codeLine: 5, explanation: 'Compare: nums[4] = 0 == target = 0? Yes! Found it!' },
    { id: 11, phase: 'return', i: 4, codeLine: 6, explanation: 'Return i = 4. The target 0 is at index 4.' },
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
            <p className="text-gray-600">Linear scan to find target (O(n))</p>
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
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array (Target: {target})</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nums.map((num, index) => {
                const isCurrent = step.i === index;
                const isFound = step.phase === 'return' && step.i === index;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isCurrent ? 1.1 : 1, backgroundColor: isFound ? '#d1fae5' : isCurrent ? '#ede9fe' : '#ffffff', borderColor: isFound ? '#10b981' : isCurrent ? '#8b5cf6' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">
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
              <div className="text-xs text-emerald-600 font-semibold mb-1">target</div>
              <div className="text-3xl font-bold text-emerald-900">{target}</div>
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
              {['class Solution {', 'public:', '    int search(vector<int>& nums, int target) {', '        for (int i = 0; i < nums.size(); i++) {', '            if (nums[i] == target) {', '                return i;', '            }', '        }', '        return -1;', '    }', '};'].map((line, index) => (
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
              <p className="text-sm text-purple-700 leading-relaxed">Only one variable (i) is used, regardless of input size.</p>
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

  const nums = [4, 5, 6, 7, 0, 1, 2];
  const target = 0;
  const steps = [
    { id: 0, phase: 'init', pairs: null, codeLine: 3, explanation: 'We will create pairs of (value, original_index) and sort them.' },
    { id: 1, phase: 'create', pairs: [[4, 0], [5, 1], [6, 2], [7, 3], [0, 4], [1, 5], [2, 6]], codeLine: 4, explanation: 'Create pairs: [(4,0), (5,1), (6,2), (7,3), (0,4), (1,5), (2,6)].' },
    { id: 2, phase: 'sort', pairs: [[0, 4], [1, 5], [2, 6], [4, 0], [5, 1], [6, 2], [7, 3]], codeLine: 5, explanation: 'After sorting by value: [(0,4), (1,5), (2,6), (4,0), (5,1), (6,2), (7,3)].' },
    { id: 3, phase: 'search', pairs: [[0, 4], [1, 5], [2, 6], [4, 0], [5, 1], [6, 2], [7, 3]], codeLine: 6, explanation: 'Binary search for target = 0. Found at index 0 with original index 4.' },
    { id: 4, phase: 'return', pairs: [[0, 4], [1, 5], [2, 6], [4, 0], [5, 1], [6, 2], [7, 3]], codeLine: 7, explanation: 'Return original index = 4. The target 0 is at index 4 in the original array.' },
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
            <p className="text-gray-600">Sort with index preservation (O(n log n))</p>
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
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">{step.phase === 'sort' || step.phase === 'search' || step.phase === 'return' ? 'Sorted Pairs (value, original_index)' : 'Original Array (Target: ' + target + ')'}</div>
            {step.pairs ? (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {step.pairs.map((pair, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 border-2 border-purple-200">
                    <div className="text-lg font-bold text-purple-900">({pair[0]}, {pair[1]})</div>
                  </motion.div>
                ))}
              </div>
            ) : (
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
            )}
          </div>

          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    int search(vector<int>& nums, int target) {', '        vector<pair<int, int>> pairs;', '        for (int i = 0; i < nums.size(); i++) {', '            pairs.push_back({nums[i], i});', '        }', '        sort(pairs.begin(), pairs.end());', '        // Binary search for target', '        // Return original index', '    }', '};'].map((line, index) => (
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
              <p className="text-sm text-blue-700 leading-relaxed">Sorting takes O(n log n) time. This changes the original arrangement.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(n)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Extra space needed to store pairs of (value, index).</p>
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

  const nums = [4, 5, 6, 7, 0, 1, 2];
  const target = 0;
  const steps = [
    { id: 0, phase: 'init', left: 0, right: 6, mid: null, codeLine: 3, explanation: 'Initialize left = 0, right = 6. We will use modified binary search.' },
    { id: 1, phase: 'loop', left: 0, right: 6, mid: 3, codeLine: 5, explanation: 'Calculate mid = (0 + 6) / 2 = 3. nums[3] = 7.' },
    { id: 2, phase: 'check', left: 0, right: 6, mid: 3, codeLine: 6, explanation: 'Check: nums[mid] = 7 == target = 0? No.' },
    { id: 3, phase: 'check-left', left: 0, right: 6, mid: 3, codeLine: 8, explanation: 'Check: Is left half sorted? nums[left] = 4 <= nums[mid] = 7? Yes!' },
    { id: 4, phase: 'check-target', left: 0, right: 6, mid: 3, codeLine: 9, explanation: 'Is target in left half? nums[left] = 4 <= target = 0 < nums[mid] = 7? No (0 < 4 is false).' },
    { id: 5, phase: 'update', left: 4, right: 6, mid: null, codeLine: 12, explanation: 'Target not in left half. Update left = mid + 1 = 4. Search range is now [4, 6].' },
    { id: 6, phase: 'loop', left: 4, right: 6, mid: 5, codeLine: 5, explanation: 'Calculate mid = (4 + 6) / 2 = 5. nums[5] = 1.' },
    { id: 7, phase: 'check', left: 4, right: 6, mid: 5, codeLine: 6, explanation: 'Check: nums[mid] = 1 == target = 0? No.' },
    { id: 8, phase: 'check-left', left: 4, right: 6, mid: 5, codeLine: 8, explanation: 'Check: Is left half sorted? nums[left] = 0 <= nums[mid] = 1? Yes!' },
    { id: 9, phase: 'check-target', left: 4, right: 6, mid: 5, codeLine: 9, explanation: 'Is target in left half? nums[left] = 0 <= target = 0 < nums[mid] = 1? Yes!' },
    { id: 10, phase: 'update', left: 4, right: 4, mid: null, codeLine: 10, explanation: 'Target in left half. Update right = mid - 1 = 4. Search range is now [4, 4].' },
    { id: 11, phase: 'loop', left: 4, right: 4, mid: 4, codeLine: 5, explanation: 'Calculate mid = (4 + 4) / 2 = 4. nums[4] = 0.' },
    { id: 12, phase: 'check', left: 4, right: 4, mid: 4, codeLine: 6, explanation: 'Check: nums[mid] = 0 == target = 0? Yes! Found it!' },
    { id: 13, phase: 'return', left: 4, right: 4, mid: 4, codeLine: 7, explanation: 'Return mid = 4. The target 0 is at index 4.' },
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
            <p className="text-gray-600">Modified binary search (O(log n))</p>
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
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Input Array (Target: {target})</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nums.map((num, index) => {
                const isLeft = step.left === index;
                const isRight = step.right === index;
                const isMid = step.mid === index;
                const isInRange = index >= step.left && index <= step.right;
                const isFound = step.phase === 'return' && step.mid === index;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                    <motion.div animate={{ scale: isFound ? 1.2 : isMid ? 1.15 : isInRange ? 1.05 : 1, backgroundColor: isFound ? '#d1fae5' : isMid ? '#fef3c7' : isLeft ? '#ede9fe' : isRight ? '#dbeafe' : isInRange ? '#f3f4f6' : '#ffffff', borderColor: isFound ? '#10b981' : isMid ? '#f59e0b' : isLeft ? '#8b5cf6' : isRight ? '#3b82f6' : isInRange ? '#9ca3af' : '#e5e7eb' }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 relative">
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
              <div className="text-xs text-emerald-600 font-semibold mb-1">target</div>
              <div className="text-3xl font-bold text-emerald-900">{target}</div>
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
              {['class Solution {', 'public:', '    int search(vector<int>& nums, int target) {', '        int left = 0, right = nums.size() - 1;', '', '        while (left <= right) {', '            int mid = left + (right - left) / 2;', '', '            if (nums[mid] == target) {', '                return mid;', '            }', '', '            if (nums[left] <= nums[mid]) {', '                if (nums[left] <= target && target < nums[mid]) {', '                    right = mid - 1;', '                } else {', '                    left = mid + 1;', '                }', '            } else {', '                if (nums[mid] < target && target <= nums[right]) {', '                    left = mid + 1;', '                } else {', '                    right = mid - 1;', '                }', '            }', '        }', '', '        return -1;', '    }', '};'].map((line, index) => (
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
              <p className="text-sm text-blue-700 leading-relaxed">Modified binary search halves the search space at each step.</p>
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

export default function SearchInRotatedArrayWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={8}
      title="Search in Rotated Sorted Array I"
      topic="Array"
      pattern="Binary Search"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Linear Search',
          description: 'Scan every element and compare it with the target.',
          intuition: 'Simply iterate through the array and check if each element equals the target.',
          howItWorks: 'For each index i from 0 to n-1, if nums[i] == target, return i. If no match is found, return -1.',
          tradeoff: 'O(n) time. Does not take advantage of the sorted property.',
        },
        better: {
          title: 'Better: Sort with Index Preservation',
          description: 'Sort paired values while preserving their original indices, then search.',
          intuition: 'Create pairs of (value, original_index), sort by value, then use binary search.',
          howItWorks: 'Create an array of pairs (nums[i], i). Sort by the first element. Use binary search to find the target. Return the original index from the pair.',
          tradeoff: 'O(n log n) time and O(n) space. Sorting changes the original arrangement and takes extra time and space.',
        },
        optimal: {
          title: 'Optimal: Modified Binary Search',
          description: 'Use modified binary search that handles the rotation.',
          intuition: 'In a rotated sorted array, at least one half (left or right of mid) is always sorted. We can determine which half is sorted and whether the target lies in it.',
          howItWorks: 'Check if the left half is sorted (nums[left] <= nums[mid]). If so, check if target is in this range. If yes, search left; otherwise search right. If left half is not sorted, the right half must be sorted, so apply similar logic.',
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
