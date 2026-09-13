import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface Step {
  id: number;
  phase: 'init' | 'outer-loop' | 'inner-loop' | 'compare' | 'match' | 'no-match' | 'return';
  i: number | null;
  j: number | null;
  numsI: number | null;
  numsJ: number | null;
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
    j: null,
    numsI: null,
    numsJ: null,
    comparison: null,
    result: null,
    codeLine: 3,
    explanation: 'We start with the array nums = [1, 2, 3, 1]. We need to check if any value appears at least twice.',
  },
  
  // i = 0, j = 1
  {
    id: 1,
    phase: 'outer-loop',
    i: 0,
    j: null,
    numsI: 1,
    numsJ: null,
    comparison: null,
    result: null,
    codeLine: 4,
    explanation: 'Start outer loop: i = 0. We will compare nums[0] with all later elements.',
  },
  {
    id: 2,
    phase: 'inner-loop',
    i: 0,
    j: 1,
    numsI: 1,
    numsJ: 2,
    comparison: null,
    result: null,
    codeLine: 5,
    explanation: 'Start inner loop: j = 1. Compare nums[0] with nums[1].',
  },
  {
    id: 3,
    phase: 'compare',
    i: 0,
    j: 1,
    numsI: 1,
    numsJ: 2,
    comparison: '1 == 2',
    result: false,
    codeLine: 6,
    explanation: 'Check if nums[0] == nums[1]: Is 1 equal to 2? No, they are different.',
  },
  {
    id: 4,
    phase: 'no-match',
    i: 0,
    j: 1,
    numsI: 1,
    numsJ: 2,
    comparison: '1 == 2',
    result: false,
    codeLine: 6,
    explanation: 'Not a match. Continue to next j.',
  },
  
  // i = 0, j = 2
  {
    id: 5,
    phase: 'inner-loop',
    i: 0,
    j: 2,
    numsI: 1,
    numsJ: 3,
    comparison: null,
    result: null,
    codeLine: 5,
    explanation: 'Move inner loop: j = 2. Compare nums[0] with nums[2].',
  },
  {
    id: 6,
    phase: 'compare',
    i: 0,
    j: 2,
    numsI: 1,
    numsJ: 3,
    comparison: '1 == 3',
    result: false,
    codeLine: 6,
    explanation: 'Check if nums[0] == nums[2]: Is 1 equal to 3? No, they are different.',
  },
  {
    id: 7,
    phase: 'no-match',
    i: 0,
    j: 2,
    numsI: 1,
    numsJ: 3,
    comparison: '1 == 3',
    result: false,
    codeLine: 6,
    explanation: 'Not a match. Continue to next j.',
  },
  
  // i = 0, j = 3 - MATCH!
  {
    id: 8,
    phase: 'inner-loop',
    i: 0,
    j: 3,
    numsI: 1,
    numsJ: 1,
    comparison: null,
    result: null,
    codeLine: 5,
    explanation: 'Move inner loop: j = 3. Compare nums[0] with nums[3].',
  },
  {
    id: 9,
    phase: 'compare',
    i: 0,
    j: 3,
    numsI: 1,
    numsJ: 1,
    comparison: '1 == 1',
    result: true,
    codeLine: 6,
    explanation: 'Check if nums[0] == nums[3]: Is 1 equal to 1? YES! We found a duplicate!',
  },
  {
    id: 10,
    phase: 'match',
    i: 0,
    j: 3,
    numsI: 1,
    numsJ: 1,
    comparison: '1 == 1',
    result: true,
    codeLine: 7,
    explanation: 'Duplicate found! The value 1 appears at both index 0 and index 3.',
  },
  {
    id: 11,
    phase: 'return',
    i: 0,
    j: 3,
    numsI: 1,
    numsJ: 1,
    comparison: null,
    result: true,
    codeLine: 7,
    explanation: 'Return true. The array contains a duplicate.',
  },
];

export default function ContainsDuplicateBruteVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const step = steps[currentStep];
  const nums = [1, 2, 3, 1];

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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Brute Force Visualization</h2>
            <p className="text-gray-600">Watch the nested loops check every pair</p>
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
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {nums.map((num, index) => {
                const isI = step.i === index;
                const isJ = step.j === index;
                const isMatch = step.phase === 'match' && (step.i === index || step.j === index);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="text-xs text-gray-400 mb-2 font-mono">
                      Index {index}
                    </div>
                    
                    <motion.div
                      animate={{
                        scale: isI || isJ ? 1.1 : 1,
                        backgroundColor: isMatch ? '#fee2e2' : isI ? '#ede9fe' : isJ ? '#dbeafe' : '#ffffff',
                        borderColor: isMatch ? '#f87171' : isI ? '#8b5cf6' : isJ ? '#3b82f6' : '#e5e7eb',
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
                          <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                            i = {index}
                          </div>
                          <div className="w-0.5 h-3 bg-purple-500 mx-auto" />
                        </motion.div>
                      )}
                      
                      {isJ && !isI && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2"
                        >
                          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                            j = {index}
                          </div>
                          <div className="w-0.5 h-3 bg-blue-500 mx-auto" />
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
                  <div className="text-sm text-gray-600 font-semibold mb-4">Comparing values</div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">nums[{step.i}]</div>
                      <div className="text-4xl font-bold text-purple-600">{step.numsI}</div>
                    </div>
                    <div className="text-2xl text-gray-400">==</div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">nums[{step.j}]</div>
                      <div className="text-4xl font-bold text-blue-600">{step.numsJ}</div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">i (outer loop)</div>
              <div className="text-3xl font-bold text-purple-900">
                {step.i !== null ? step.i : '—'}
              </div>
              <div className="text-xs text-purple-600 mt-1">Current position</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">j (inner loop)</div>
              <div className="text-3xl font-bold text-blue-900">
                {step.j !== null ? step.j : '—'}
              </div>
              <div className="text-xs text-blue-600 mt-1">Comparing with</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">nums[i]</div>
              <div className="text-3xl font-bold text-emerald-900">
                {step.numsI !== null ? step.numsI : '—'}
              </div>
              <div className="text-xs text-emerald-600 mt-1">First value</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">nums[j]</div>
              <div className="text-3xl font-bold text-amber-900">
                {step.numsJ !== null ? step.numsJ : '—'}
              </div>
              <div className="text-xs text-amber-600 mt-1">Second value</div>
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
                '        for (int i = 0; i < nums.size(); i++) {',
                '            for (int j = i + 1; j < nums.size(); j++) {',
                '                if (nums[i] == nums[j]) {',
                '                    return true;',
                '                }',
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
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n²)</div>
              <p className="text-sm text-blue-700 leading-relaxed">
                Two nested loops. For each element, we compare it with all later elements. In the worst case, we check almost every pair.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">
                No extra data structures needed. We only use two loop variables i and j.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
