import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArrayVisualizer from './ArrayVisualizer';
import CodePanel from './CodePanel';
import StepControls from './StepControls';
import ComplexityCard from './ComplexityCard';

interface BruteForceVisualizerProps {
  isVisible: boolean;
}

const bruteForceCode = `for i from 0 to n - 1:
    for j from i + 1 to n - 1:
        if nums[i] + nums[j] == target:
            return [i, j]`;

interface Step {
  id: number;
  description: string;
  explanation: string;
  i: number | null;
  j: number | null;
  sum: number | null;
  isEqual: boolean | null;
  activeLine: number;
  currentIndices: number[];
  foundIndices: number[];
}

const steps: Step[] = [
  {
    id: 0,
    description: 'Problem Setup',
    explanation: 'We have an array [2, 7, 11, 15] and target = 9. We need to find two numbers that add up to 9.',
    i: null,
    j: null,
    sum: null,
    isEqual: null,
    activeLine: 0,
    currentIndices: [],
    foundIndices: [],
  },
  {
    id: 1,
    description: 'Two Pointers Needed',
    explanation: 'We need to choose two different positions from the array. Let\'s use two pointers: i for the first number and j for the second number.',
    i: null,
    j: null,
    sum: null,
    isEqual: null,
    activeLine: 0,
    currentIndices: [],
    foundIndices: [],
  },
  {
    id: 2,
    description: 'First Loop: i = 0',
    explanation: 'The first loop chooses the first number. Start with i = 0, so we look at nums[0] = 2.',
    i: 0,
    j: null,
    sum: null,
    isEqual: null,
    activeLine: 0,
    currentIndices: [0],
    foundIndices: [],
  },
  {
    id: 3,
    description: 'Second Loop: j = 1',
    explanation: 'The second loop chooses another number after the first number. Start with j = 1, so we look at nums[1] = 7.',
    i: 0,
    j: 1,
    sum: null,
    isEqual: null,
    activeLine: 1,
    currentIndices: [0, 1],
    foundIndices: [],
  },
  {
    id: 4,
    description: 'Calculate Sum',
    explanation: 'Now we add the two numbers: nums[i] + nums[j] = 2 + 7 = 9',
    i: 0,
    j: 1,
    sum: 9,
    isEqual: null,
    activeLine: 2,
    currentIndices: [0, 1],
    foundIndices: [],
  },
  {
    id: 5,
    description: 'Check if Sum Equals Target',
    explanation: 'Is 9 == 9? Yes! We found the answer.',
    i: 0,
    j: 1,
    sum: 9,
    isEqual: true,
    activeLine: 2,
    currentIndices: [0, 1],
    foundIndices: [0, 1],
  },
  {
    id: 6,
    description: 'Return the Result',
    explanation: 'Return [i, j] = [0, 1]. These are the indices of the two numbers that add up to the target.',
    i: 0,
    j: 1,
    sum: 9,
    isEqual: true,
    activeLine: 3,
    currentIndices: [0, 1],
    foundIndices: [0, 1],
  },
  {
    id: 7,
    description: 'What if the first pair didn\'t work?',
    explanation: 'Let\'s see what happens if we continue. Reset j and try the next position: j = 2, so nums[2] = 11.',
    i: 0,
    j: 2,
    sum: null,
    isEqual: null,
    activeLine: 1,
    currentIndices: [0, 2],
    foundIndices: [],
  },
  {
    id: 8,
    description: 'Calculate Sum Again',
    explanation: 'nums[i] + nums[j] = 2 + 11 = 13',
    i: 0,
    j: 2,
    sum: 13,
    isEqual: null,
    activeLine: 2,
    currentIndices: [0, 2],
    foundIndices: [],
  },
  {
    id: 9,
    description: 'Check if Sum Equals Target',
    explanation: 'Is 13 == 9? No. This pair doesn\'t work. The inner loop continues to try j = 3.',
    i: 0,
    j: 2,
    sum: 13,
    isEqual: false,
    activeLine: 2,
    currentIndices: [0, 2],
    foundIndices: [],
  },
  {
    id: 10,
    description: 'Inner Loop Finishes',
    explanation: 'After the inner loop finishes (j goes through all positions), the outer loop moves i forward to i = 1, and the process repeats.',
    i: 1,
    j: null,
    sum: null,
    isEqual: null,
    activeLine: 0,
    currentIndices: [1],
    foundIndices: [],
  },
];

export default function BruteForceVisualizer({ isVisible }: BruteForceVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];
  const nums = [2, 7, 11, 15];
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
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
        {/* Left: Array and Variables */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <ArrayVisualizer
            nums={nums}
            pointers={[
              ...(step.i !== null ? [{ index: step.i, label: 'i', color: '#3b82f6' }] : []),
              ...(step.j !== null ? [{ index: step.j, label: 'j', color: '#ec4899' }] : []),
            ]}
            currentIndices={step.currentIndices}
            foundIndices={step.foundIndices}
          />

          {/* Variables Panel */}
          <div className="mt-6 space-y-3">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              Variables
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1625] border border-blue-500/30 rounded-xl p-4">
                <div className="text-xs text-blue-400 font-semibold mb-1">i (first pointer)</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.i !== null ? step.i : '—'}
                </div>
              </div>
              <div className="bg-[#1a1625] border border-pink-500/30 rounded-xl p-4">
                <div className="text-xs text-pink-400 font-semibold mb-1">j (second pointer)</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.j !== null ? step.j : '—'}
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
                  nums[{step.i}] + nums[{step.j}] = {nums[step.i!]} + {nums[step.j!]} ={' '}
                  <span className="text-2xl font-bold text-purple-300">{step.sum}</span>
                </div>
                {step.isEqual !== null && (
                  <div className="mt-2 text-base font-semibold">
                    {step.isEqual ? (
                      <span className="text-emerald-400">
                        {step.sum} == {target} ✓ Found!
                      </span>
                    ) : (
                      <span className="text-rose-400">
                        {step.sum} != {target} ✗ Not equal
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
          code={bruteForceCode}
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
        timeComplexity="O(n²)"
        spaceComplexity="O(1)"
        timeExplanation="The first loop chooses each element. The second loop compares it with the remaining elements. In the worst case, we check n×(n-1)/2 pairs."
        spaceExplanation="No extra data structure is required. We only use two pointer variables i and j."
      />
    </div>
  );
}
