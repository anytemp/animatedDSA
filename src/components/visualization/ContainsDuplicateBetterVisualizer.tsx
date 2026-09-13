import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface Step {
  id: number;
  phase: 'init' | 'sort' | 'scan' | 'compare' | 'match' | 'no-match' | 'return';
  i: number | null;
  numsI: number | null;
  numsIMinus1: number | null;
  comparison: string | null;
  result: boolean | null;
  codeLine: number;
  explanation: string;
}

const steps: Step[] = [
  // Initialization
  {
    id: 0,
    phase: 'init',
    i: null,
    numsI: null,
    numsIMinus1: null,
    comparison: null,
    result: null,
    codeLine: 3,
    explanation: 'We start with the array nums = [1, 2, 3, 1]. First, we need to sort it.',
  },
  
  // Sorting
  {
    id: 1,
    phase: 'sort',
    i: null,
    numsI: null,
    numsIMinus1: null,
    comparison: null,
    result: null,
    codeLine: 3,
    explanation: 'Sort the array in ascending order. After sorting: [1, 1, 2, 3]. Now duplicates are adjacent.',
  },
  
  // i = 1
  {
    id: 2,
    phase: 'scan',
    i: 1,
    numsI: 1,
    numsIMinus1: 1,
    comparison: null,
    result: null,
    codeLine: 5,
    explanation: 'Start scanning from index 1. Compare nums[1] with nums[0].',
  },
  {
    id: 3,
    phase: 'compare',
    i: 1,
    numsI: 1,
    numsIMinus1: 1,
    comparison: '1 == 1',
    result: true,
    codeLine: 6,
    explanation: 'Check if nums[1] == nums[0]: Is 1 equal to 1? YES! We found adjacent duplicates!',
  },
  {
    id: 4,
    phase: 'match',
    i: 1,
    numsI: 1,
    numsIMinus1: 1,
    comparison: '1 == 1',
    result: true,
    codeLine: 7,
    explanation: 'Duplicate found! The sorted array has two 1s next to each other.',
  },
  {
    id: 5,
    phase: 'return',
    i: 1,
    numsI: 1,
    numsIMinus1: 1,
    comparison: null,
    result: true,
    codeLine: 7,
    explanation: 'Return true. The array contains a duplicate.',
  },
];

export default function ContainsDuplicateBetterVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const step = steps[currentStep];
  const originalNums = [1, 2, 3, 1];
  const sortedNums = [1, 1, 2, 3];
  const displayNums = step.phase === 'init' ? originalNums : sortedNums;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2500 / speed);
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, speed]);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Better Approach Visualization</h2>
            <p className="text-gray-600">Sort first, then scan for adjacent duplicates</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="text-sm text-gray-500 font-mono">
              Step {currentStep + 1} of {steps.length}
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">Reset</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipBack size={14} />
                <span className="hidden sm:inline">Previous</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayPause}
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? 'Pause' : 'Play'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Next</span>
                <SkipForward size={14} />
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Speed:</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                    speed === s
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Visualization */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          {/* Array Visualization */}
          <div className="mb-8">
            {step.phase === 'init' && (
              <div className="text-center mb-4">
                <div className="text-sm text-gray-600 font-semibold mb-2">Original Array</div>
              </div>
            )}
            
            {step.phase === 'sort' && (
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 font-semibold mb-2">Original Array</div>
                <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-4">
                  {originalNums.map((num, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col items-center"
                    >
                      <div className="text-xs text-gray-400 mb-2 font-mono">Index {index}</div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-gray-300 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 bg-white">
                        {num}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl text-gray-400 my-4"
                >
                  ↓
                </motion.div>
                
                <div className="text-sm text-gray-600 font-semibold mb-2">Sorted Array</div>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {displayNums.map((num, index) => {
                const isI = step.i === index;
                const isIMinus1 = step.i !== null && step.i - 1 === index;
                const isMatch = step.phase === 'match' && (isI || isIMinus1);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                    className="flex flex-col items-center"
                  >
                    <div className="text-xs text-gray-400 mb-2 font-mono">
                      Index {index}
                    </div>
                    
                    <motion.div
                      animate={{
                        scale: isI || isIMinus1 ? 1.1 : 1,
                        backgroundColor: isMatch ? '#fee2e2' : isI ? '#dbeafe' : isIMinus1 ? '#ede9fe' : '#ffffff',
                        borderColor: isMatch ? '#f87171' : isI ? '#3b82f6' : isIMinus1 ? '#8b5cf6' : '#e5e7eb',
                      }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 relative"
                    >
                      {num}
                      
                      {isI && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2"
                        >
                          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                            i = {index}
                          </div>
                          <div className="w-0.5 h-3 bg-blue-500 mx-auto" />
                        </motion.div>
                      )}
                      
                      {isIMinus1 && !isI && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2"
                        >
                          <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                            i-1 = {index}
                          </div>
                          <div className="w-0.5 h-3 bg-purple-500 mx-auto" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Comparison Panel */}
          <AnimatePresence mode="wait">
            {step.comparison && (
              <motion.div
                key={`compare-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`rounded-2xl p-6 border-2 mb-8 ${
                  step.result
                    ? 'bg-gradient-to-r from-rose-50 to-orange-50 border-rose-300'
                    : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm text-gray-600 font-semibold mb-4">Comparing adjacent elements</div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">nums[{step.i! - 1}]</div>
                      <div className="text-4xl font-bold text-purple-600">{step.numsIMinus1}</div>
                    </div>
                    <div className="text-2xl text-gray-400">==</div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">nums[{step.i}]</div>
                      <div className="text-4xl font-bold text-blue-600">{step.numsI}</div>
                    </div>
                    <div className="text-3xl font-bold">
                      {step.result ? (
                        <span className="text-rose-600">✓ YES</span>
                      ) : (
                        <span className="text-gray-400">✗ NO</span>
                      )}
                    </div>
                  </div>
                  <div className={`text-lg font-semibold mt-4 ${step.result ? 'text-rose-600' : 'text-gray-600'}`}>
                    {step.comparison}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Variables Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (current index)</div>
              <div className="text-3xl font-bold text-purple-900">
                {step.i !== null ? step.i : '—'}
              </div>
              <div className="text-xs text-purple-600 mt-1">Scanning position</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">nums[i]</div>
              <div className="text-3xl font-bold text-emerald-900">
                {step.numsI !== null ? step.numsI : '—'}
              </div>
              <div className="text-xs text-emerald-600 mt-1">Current value</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">nums[i-1]</div>
              <div className="text-3xl font-bold text-amber-900">
                {step.numsIMinus1 !== null ? step.numsIMinus1 : '—'}
              </div>
              <div className="text-xs text-amber-600 mt-1">Previous value</div>
            </div>
          </div>

          {/* Explanation */}
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
          >
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {step.explanation}
            </p>
          </motion.div>
        </div>

        {/* Code Panel */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {[
                'class Solution {',
                'public:',
                '    bool containsDuplicate(vector<int>& nums) {',
                '        sort(nums.begin(), nums.end());',
                '',
                '        for (int i = 1; i < nums.size(); i++) {',
                '            if (nums[i] == nums[i - 1]) {',
                '                return true;',
                '            }',
                '        }',
                '',
                '        return false;',
                '    }',
                '};',
              ].map((line, index) => (
                <motion.div
                  key={index}
                  animate={{
                    backgroundColor: step.codeLine === index ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  }}
                  className={`px-3 py-1 rounded ${
                    step.codeLine === index ? 'border-l-4 border-purple-400' : ''
                  }`}
                >
                  <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  <code className="text-gray-100">{line}</code>
                </motion.div>
              ))}
            </pre>
          </div>
        </div>

        {/* Complexity Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n log n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">
                Sorting takes O(n log n) time. The linear scan takes O(n) time. Overall: O(n log n).
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">
                Auxiliary space for sorting. The sort is done in-place, requiring only O(1) extra space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
