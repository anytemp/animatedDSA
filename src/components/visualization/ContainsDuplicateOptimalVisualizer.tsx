import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface Step {
  id: number;
  phase: 'init' | 'loop-start' | 'read' | 'search' | 'found' | 'not-found' | 'insert' | 'return';
  currentIndex: number | null;
  currentValue: number | null;
  seen: number[];
  operation: string;
  codeLine: number;
  explanation: string;
  showConnection?: boolean;
  duplicateIndex?: number;
}

type InputType = 'duplicate' | 'no-duplicate';

const inputs = {
  'duplicate': [1, 2, 3, 1],
  'no-duplicate': [1, 2, 3, 4],
};

function generateSteps(nums: number[]): Step[] {
  const steps: Step[] = [];
  let stepId = 0;
  const seen: number[] = [];

  // Initialization
  steps.push({
    id: stepId++,
    phase: 'init',
    currentIndex: null,
    currentValue: null,
    seen: [],
    operation: 'INITIALIZE EMPTY SET',
    codeLine: 3,
    explanation: 'We create an empty hash set called "seen". It will store the values we have already visited.',
  });

  // Process each element
  for (let i = 0; i < nums.length; i++) {
    const currentValue = nums[i];
    
    // Loop start
    steps.push({
      id: stepId++,
      phase: 'loop-start',
      currentIndex: i,
      currentValue,
      seen: [...seen],
      operation: i === 0 ? 'START LOOP' : 'INCREMENT LOOP',
      codeLine: 5,
      explanation: i === 0 
        ? 'Loop starts. Current index i = 0.'
        : `i++ → i becomes ${i}. Moving to the next iteration.`,
    });

    // Read current value
    steps.push({
      id: stepId++,
      phase: 'read',
      currentIndex: i,
      currentValue,
      seen: [...seen],
      operation: 'READ CURRENT VALUE',
      codeLine: 6,
      explanation: `Read the current value: nums[${i}] = ${currentValue}`,
    });

    // Search in set
    steps.push({
      id: stepId++,
      phase: 'search',
      currentIndex: i,
      currentValue,
      seen: [...seen],
      operation: 'SEARCH SET',
      codeLine: 6,
      explanation: `Search for ${currentValue} in the seen set. The set currently contains {${seen.join(', ')}}.`,
    });

    // Check if found
    const isDuplicate = seen.includes(currentValue);
    
    if (isDuplicate) {
      // Found - duplicate detected
      const duplicateIndex = seen.indexOf(currentValue);
      steps.push({
        id: stepId++,
        phase: 'found',
        currentIndex: i,
        currentValue,
        seen: [...seen],
        operation: 'VALUE ALREADY EXISTS',
        codeLine: 6,
        explanation: `${currentValue} is already in the seen set! We found a duplicate!`,
        showConnection: true,
        duplicateIndex,
      });

      // Return true
      steps.push({
        id: stepId++,
        phase: 'return',
        currentIndex: i,
        currentValue,
        seen: [...seen],
        operation: 'DUPLICATE FOUND',
        codeLine: 7,
        explanation: `The value ${currentValue} appeared before. Therefore, the array contains a duplicate. Return true.`,
        showConnection: true,
        duplicateIndex,
      });

      // Stop here - we found a duplicate
      break;
    } else {
      // Not found
      steps.push({
        id: stepId++,
        phase: 'not-found',
        currentIndex: i,
        currentValue,
        seen: [...seen],
        operation: 'VALUE NOT FOUND',
        codeLine: 6,
        explanation: `${currentValue} is not in the seen set. This is not a duplicate.`,
      });

      // Insert into set
      seen.push(currentValue);
      steps.push({
        id: stepId++,
        phase: 'insert',
        currentIndex: i,
        currentValue,
        seen: [...seen],
        operation: 'STORE VALUE',
        codeLine: 10,
        explanation: `Because ${currentValue} was not found, we store it in the seen set so that future elements can be compared against it.`,
      });
    }
  }

  // If we processed all elements without finding a duplicate
  if (!steps.some(s => s.phase === 'return')) {
    steps.push({
      id: stepId++,
      phase: 'return',
      currentIndex: null,
      currentValue: null,
      seen: [...seen],
      operation: 'NO DUPLICATE',
      codeLine: 13,
      explanation: 'We have checked all elements and found no duplicates. Return false.',
    });
  }

  return steps;
}

export default function ContainsDuplicateOptimalVisualizer() {
  const [inputType, setInputType] = useState<InputType>('duplicate');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const nums = inputs[inputType];
  const steps = generateSteps(nums);
  const step = steps[currentStep];

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

  const handleInputChange = (type: InputType) => {
    setInputType(type);
    setCurrentStep(0);
    setIsPlaying(false);
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
  }, [isPlaying, currentStep, speed, steps.length]);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Input Selector */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="text-sm font-semibold text-gray-700">Example:</span>
          <button
            onClick={() => handleInputChange('duplicate')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              inputType === 'duplicate'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            With Duplicate [1, 2, 3, 1]
          </button>
          <button
            onClick={() => handleInputChange('no-duplicate')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              inputType === 'no-duplicate'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            No Duplicate [1, 2, 3, 4]
          </button>
        </div>

        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Optimal Approach Visualization</h2>
            <p className="text-gray-600">Watch the hash set detect duplicates step by step</p>
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
                const isCurrent = step.currentIndex === index;
                const isDuplicate = step.showConnection && step.duplicateIndex === index;
                
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
                        scale: isCurrent ? 1.1 : 1,
                        backgroundColor: isDuplicate ? '#fee2e2' : isCurrent ? '#ede9fe' : '#ffffff',
                        borderColor: isDuplicate ? '#f87171' : isCurrent ? '#8b5cf6' : '#e5e7eb',
                      }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 relative"
                    >
                      {num}
                      
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2"
                        >
                          <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                            i = {index}
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

          {/* Hash Set Visualization */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hash Set: seen</h3>
              <p className="text-sm text-gray-600">Values we have already visited</p>
            </div>
            
            <motion.div
              layout
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[120px] flex items-center justify-center"
            >
              {step.seen.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2">∅</div>
                  <div className="text-sm text-gray-500">Empty set</div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <AnimatePresence>
                    {step.seen.map((value, index) => (
                      <motion.div
                        key={value}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl px-4 py-3 border-2 border-purple-300 shadow-sm"
                      >
                        <div className="text-2xl font-bold text-purple-700">{value}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>

          {/* Search Animation */}
          <AnimatePresence mode="wait">
            {step.phase === 'search' && step.currentValue !== null && (
              <motion.div
                key={`search-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 mb-8"
              >
                <div className="text-center">
                  <div className="text-sm text-pink-600 font-semibold mb-4">Searching for value</div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Current value</div>
                      <div className="text-4xl font-bold text-purple-600">{step.currentValue}</div>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">In seen set?</div>
                      <div className="text-2xl font-bold text-pink-600">?</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Found/Not Found Display */}
          <AnimatePresence mode="wait">
            {step.phase === 'found' && (
              <motion.div
                key={`found-${step.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-6 border-2 border-rose-300 mb-8"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">✓</div>
                  <div className="text-2xl font-bold text-rose-700 mb-2">Duplicate Found!</div>
                  <div className="text-lg text-rose-600">
                    Value {step.currentValue} already exists in the seen set
                  </div>
                </div>
              </motion.div>
            )}

            {step.phase === 'not-found' && (
              <motion.div
                key={`not-found-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-200 mb-8"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">✗</div>
                  <div className="text-xl font-bold text-gray-700 mb-2">Value Not Found</div>
                  <div className="text-lg text-gray-600">
                    {step.currentValue} is not in the seen set. This is not a duplicate.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Variables Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">currentIndex (i)</div>
              <div className="text-3xl font-bold text-purple-900">
                {step.currentIndex !== null ? step.currentIndex : '—'}
              </div>
              <div className="text-xs text-purple-600 mt-1">Current position</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">currentValue</div>
              <div className="text-3xl font-bold text-blue-900">
                {step.currentValue !== null ? step.currentValue : '—'}
              </div>
              <div className="text-xs text-blue-600 mt-1">Value at index i</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">seen.size()</div>
              <div className="text-3xl font-bold text-emerald-900">{step.seen.length}</div>
              <div className="text-xs text-emerald-600 mt-1">Values stored</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">result</div>
              <div className="text-3xl font-bold text-amber-900">
                {step.phase === 'return' ? (step.operation === 'DUPLICATE FOUND' ? 'true' : 'false') : '—'}
              </div>
              <div className="text-xs text-amber-600 mt-1">Final answer</div>
            </div>
          </div>

          {/* Operation Label */}
          <AnimatePresence mode="wait">
            {step.operation && (
              <motion.div
                key={step.operation + step.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mb-8"
              >
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 ${
                  step.operation === 'INITIALIZE EMPTY SET' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                  step.operation === 'START LOOP' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                  step.operation === 'READ CURRENT VALUE' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                  step.operation === 'SEARCH SET' ? 'bg-pink-100 text-pink-700 border-pink-200' :
                  step.operation === 'VALUE NOT FOUND' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                  step.operation === 'STORE VALUE' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  step.operation === 'VALUE ALREADY EXISTS' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                  step.operation === 'DUPLICATE FOUND' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                  step.operation === 'INCREMENT LOOP' ? 'bg-violet-100 text-violet-700 border-violet-200' :
                  step.operation === 'NO DUPLICATE' ? 'bg-green-100 text-green-700 border-green-200' :
                  'bg-gray-100 text-gray-700 border-gray-200'
                }`}>
                  <span className="text-sm font-bold">{step.operation}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                '        unordered_set<int> seen;',
                '',
                '        for (int i = 0; i < nums.size(); i++) {',
                '            if (seen.find(nums[i]) != seen.end()) {',
                '                return true;',
                '            }',
                '',
                '            seen.insert(nums[i]);',
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
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n) average</div>
              <p className="text-sm text-blue-700 leading-relaxed">
                Each value is searched for and inserted into the hash set once on average. Hash set operations (find and insert) are O(1) on average.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(n)</div>
              <p className="text-sm text-purple-700 leading-relaxed">
                The hash set can store up to n values in the worst case (when all elements are distinct).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
