import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodePanel from './CodePanel';
import StepControls from './StepControls';
import ComplexityCard from './ComplexityCard';

interface BetterApproachVisualizerProps {
  isVisible: boolean;
}

const betterApproachCode = `# Create pairs of (value, original_index)
pairs = [(nums[i], i) for i in range(n)]

# Sort pairs by value
pairs.sort()

# Use two pointers
left = 0
right = n - 1

while left < right:
    sum = pairs[left].value + pairs[right].value
    
    if sum == target:
        return [pairs[left].index, pairs[right].index]
    elif sum < target:
        left = left + 1
    else:
        right = right - 1`;

interface Step {
  id: number;
  description: string;
  explanation: string;
  pairs: { value: number; index: number }[];
  sorted: boolean;
  left: number | null;
  right: number | null;
  sum: number | null;
  comparison: 'equal' | 'less' | 'greater' | null;
  activeLine: number;
  foundPair: boolean;
}

const steps: Step[] = [
  {
    id: 0,
    description: 'Problem with Brute Force',
    explanation: 'Brute force checks all pairs, which is slow O(n²). Can we do better by sorting the array first?',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: false,
    left: null,
    right: null,
    sum: null,
    comparison: null,
    activeLine: 0,
    foundPair: false,
  },
  {
    id: 1,
    description: 'Create Value-Index Pairs',
    explanation: 'We create pairs of (value, original_index) so we can sort by value but remember the original positions.',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: false,
    left: null,
    right: null,
    sum: null,
    comparison: null,
    activeLine: 1,
    foundPair: false,
  },
  {
    id: 2,
    description: 'Sort the Pairs',
    explanation: 'Sort the pairs by value. Now we can use two pointers efficiently. The array is already sorted in this example.',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: null,
    right: null,
    sum: null,
    comparison: null,
    activeLine: 4,
    foundPair: false,
  },
  {
    id: 3,
    description: 'Initialize Two Pointers',
    explanation: 'Place left pointer at the start (smallest value) and right pointer at the end (largest value).',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 3,
    sum: null,
    comparison: null,
    activeLine: 5,
    foundPair: false,
  },
  {
    id: 4,
    description: 'Calculate Sum',
    explanation: 'Add the values at left and right pointers: pairs[0].value + pairs[3].value = 2 + 15 = 17',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 3,
    sum: 17,
    comparison: null,
    activeLine: 9,
    foundPair: false,
  },
  {
    id: 5,
    description: 'Compare with Target',
    explanation: 'Is 17 == 9? No. Is 17 < 9? No. So 17 > 9. The sum is too large, so we need smaller values.',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 3,
    sum: 17,
    comparison: 'greater',
    activeLine: 14,
    foundPair: false,
  },
  {
    id: 6,
    description: 'Move Right Pointer Left',
    explanation: 'Since the sum is too large, move the right pointer left to try a smaller value. right = 2.',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 2,
    sum: null,
    comparison: null,
    activeLine: 14,
    foundPair: false,
  },
  {
    id: 7,
    description: 'Calculate Sum Again',
    explanation: 'Now add pairs[0].value + pairs[2].value = 2 + 11 = 13',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 2,
    sum: 13,
    comparison: null,
    activeLine: 9,
    foundPair: false,
  },
  {
    id: 8,
    description: 'Compare with Target',
    explanation: 'Is 13 == 9? No. Is 13 < 9? No. So 13 > 9. Still too large. Move right pointer left again.',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 2,
    sum: 13,
    comparison: 'greater',
    activeLine: 14,
    foundPair: false,
  },
  {
    id: 9,
    description: 'Move Right Pointer Left',
    explanation: 'right = 1. Now we\'re looking at pairs[0] and pairs[1].',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 1,
    sum: null,
    comparison: null,
    activeLine: 14,
    foundPair: false,
  },
  {
    id: 10,
    description: 'Calculate Sum',
    explanation: 'pairs[0].value + pairs[1].value = 2 + 7 = 9',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 1,
    sum: 9,
    comparison: null,
    activeLine: 9,
    foundPair: false,
  },
  {
    id: 11,
    description: 'Found the Answer!',
    explanation: 'Is 9 == 9? Yes! We found the pair. Return the original indices: [pairs[0].index, pairs[1].index] = [0, 1]',
    pairs: [
      { value: 2, index: 0 },
      { value: 7, index: 1 },
      { value: 11, index: 2 },
      { value: 15, index: 3 },
    ],
    sorted: true,
    left: 0,
    right: 1,
    sum: 9,
    comparison: 'equal',
    activeLine: 11,
    foundPair: true,
  },
];

export default function BetterApproachVisualizer({ isVisible }: BetterApproachVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];
  const target = 9;

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
      }, 2500);
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  if (!isVisible) return null;

  return (
    <div className="space-y-8">
      {/* Step Info */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">{step.id}</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
              Step {step.id + 1} of {steps.length}
            </div>
            <h3 className="text-2xl font-bold text-white">{step.description}</h3>
          </div>
        </div>
        <p className="text-lg text-white/80 leading-relaxed">{step.explanation}</p>
      </motion.div>

      {/* Visualization Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Pairs and Pointers */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {/* Pairs Visualization */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              {step.sorted ? 'Sorted Pairs (value, index)' : 'Original Pairs (value, index)'}
            </div>
            <div className="flex items-end gap-3 flex-wrap">
              {step.pairs.map((pair, i) => {
                const isLeft = step.left === i;
                const isRight = step.right === i;
                const isFound = step.foundPair && (isLeft || isRight);

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    {(isLeft || isRight) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`text-xs font-bold px-2 py-1 rounded-lg mb-1 ${
                            isLeft
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-pink-500/20 text-pink-400'
                          }`}
                        >
                          {isLeft ? 'left' : 'right'}
                        </div>
                        <div
                          className="w-0.5 h-3"
                          style={{ backgroundColor: isLeft ? '#3b82f6' : '#ec4899' }}
                        />
                      </motion.div>
                    )}
                    <motion.div
                      animate={{
                        scale: isFound ? 1.1 : isLeft || isRight ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-24 h-24 flex flex-col items-center justify-center rounded-2xl text-lg font-mono font-bold border-2 transition-all duration-300 ${
                        isFound
                          ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 text-white shadow-xl shadow-emerald-500/30'
                          : isLeft
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-300 text-white shadow-lg shadow-blue-500/20'
                          : isRight
                          ? 'bg-gradient-to-br from-pink-400 to-rose-500 border-pink-300 text-white shadow-lg shadow-pink-500/20'
                          : 'bg-[#1a1625] border-[#2d2640] text-white/80'
                      }`}
                    >
                      <div className="text-2xl">{pair.value}</div>
                      <div className="text-xs opacity-70">idx: {pair.index}</div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Variables Panel */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              Pointers
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1625] border border-blue-500/30 rounded-xl p-4">
                <div className="text-xs text-blue-400 font-semibold mb-1">left pointer</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.left !== null ? step.left : '—'}
                </div>
              </div>
              <div className="bg-[#1a1625] border border-pink-500/30 rounded-xl p-4">
                <div className="text-xs text-pink-400 font-semibold mb-1">right pointer</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.right !== null ? step.right : '—'}
                </div>
              </div>
            </div>

            {/* Sum Calculation */}
            {step.sum !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1625] border border-purple-500/30 rounded-xl p-4"
              >
                <div className="text-xs text-purple-400 font-semibold mb-2">Sum Calculation</div>
                <div className="text-lg font-mono text-white">
                  {step.pairs[step.left!].value} + {step.pairs[step.right!].value} ={' '}
                  <span className="text-2xl font-bold text-purple-300">{step.sum}</span>
                </div>
                {step.comparison && (
                  <div className="mt-2 text-base font-semibold">
                    {step.comparison === 'equal' && (
                      <span className="text-emerald-400">
                        {step.sum} == {target} ✓ Found!
                      </span>
                    )}
                    {step.comparison === 'less' && (
                      <span className="text-amber-400">
                        {step.sum} &lt; {target} → Move left pointer right
                      </span>
                    )}
                    {step.comparison === 'greater' && (
                      <span className="text-rose-400">
                        {step.sum} &gt; {target} → Move right pointer left
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Target */}
            <div className="bg-[#1a1625] border border-white/10 rounded-xl p-4">
              <div className="text-xs text-white/60 font-semibold mb-1">Target</div>
              <div className="text-2xl font-mono font-bold text-blue-400">{target}</div>
            </div>
          </div>
        </div>

        {/* Right: Code */}
        <CodePanel
          code={betterApproachCode}
          activeLine={step.activeLine}
          language="pseudocode"
          title="Pseudocode"
        />
      </div>

      {/* Controls */}
      <StepControls
        currentStep={currentStep}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
      />

      {/* Complexity */}
      <ComplexityCard
        timeComplexity="O(n log n)"
        spaceComplexity="O(n)"
        timeExplanation="Sorting takes O(n log n). The two-pointer traversal takes O(n). Overall: O(n log n)."
        spaceExplanation="We need O(n) space to store the value-index pairs. The original indices must be preserved."
      />
    </div>
  );
}
