import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArrayVisualizer from './ArrayVisualizer';
import HashMapVisualizer from './HashMapVisualizer';
import CodePanel from './CodePanel';
import StepControls from './StepControls';
import ComplexityCard from './ComplexityCard';

interface OptimalApproachVisualizerProps {
  isVisible: boolean;
}

const optimalCode = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            if (mp.find(complement) != mp.end()) {
                return {mp[complement], i};
            }

            mp[nums[i]] = i;
        }

        return {};
    }
};`;

interface Step {
  id: number;
  description: string;
  explanation: string;
  currentIndex: number | null;
  currentValue: number | null;
  complement: number | null;
  mapContents: Map<number, number>;
  searchingKey: number | null;
  foundKey: number | null;
  insertingKey: number | null;
  foundIndex: number | null;
  activeLine: number;
  currentIndices: number[];
  foundIndices: number[];
  visitedIndices: number[];
  showResult: boolean;
}

const steps: Step[] = [
  {
    id: 0,
    description: 'What is a Hash Map?',
    explanation: 'A hash map stores a value together with information about where we saw it. Think of it like a dictionary: you look up a word (key) and find its meaning (value).',
    currentIndex: null,
    currentValue: null,
    complement: null,
    mapContents: new Map(),
    searchingKey: null,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 3,
    currentIndices: [],
    foundIndices: [],
    visitedIndices: [],
    showResult: false,
  },
  {
    id: 1,
    description: 'The Key Idea',
    explanation: 'For the current number, we don\'t need to search every other number. We can calculate the exact number we need: complement = target - current number.',
    currentIndex: null,
    currentValue: null,
    complement: null,
    mapContents: new Map(),
    searchingKey: null,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 3,
    currentIndices: [],
    foundIndices: [],
    visitedIndices: [],
    showResult: false,
  },
  {
    id: 2,
    description: 'Create Empty Hash Map',
    explanation: 'We will store each number we have already visited and its index. Start with an empty hash map.',
    currentIndex: null,
    currentValue: null,
    complement: null,
    mapContents: new Map(),
    searchingKey: null,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 3,
    currentIndices: [],
    foundIndices: [],
    visitedIndices: [],
    showResult: false,
  },
  {
    id: 3,
    description: 'Start Loop: i = 0',
    explanation: 'Begin iterating through the array. Current index i = 0, current value = nums[0] = 2.',
    currentIndex: 0,
    currentValue: 2,
    complement: null,
    mapContents: new Map(),
    searchingKey: null,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 5,
    currentIndices: [0],
    foundIndices: [],
    visitedIndices: [],
    showResult: false,
  },
  {
    id: 4,
    description: 'Calculate Complement',
    explanation: 'Required complement = target - current number = 9 - 2 = 7. If we have already seen 7, then 2 and 7 make the target.',
    currentIndex: 0,
    currentValue: 2,
    complement: 7,
    mapContents: new Map(),
    searchingKey: null,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 6,
    currentIndices: [0],
    foundIndices: [],
    visitedIndices: [],
    showResult: false,
  },
  {
    id: 5,
    description: 'Search for Complement in Map',
    explanation: 'Look for 7 in the hash map. The map is empty, so 7 is not found.',
    currentIndex: 0,
    currentValue: 2,
    complement: 7,
    mapContents: new Map(),
    searchingKey: 7,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 8,
    currentIndices: [0],
    foundIndices: [],
    visitedIndices: [],
    showResult: false,
  },
  {
    id: 6,
    description: 'Store Current Value',
    explanation: 'Since 7 is not in the map, store the current value 2 with its index 0. Now the map contains: 2 → 0.',
    currentIndex: 0,
    currentValue: 2,
    complement: 7,
    mapContents: new Map([[2, 0]]),
    searchingKey: null,
    foundKey: null,
    insertingKey: 2,
    foundIndex: null,
    activeLine: 12,
    currentIndices: [0],
    foundIndices: [],
    visitedIndices: [0],
    showResult: false,
  },
  {
    id: 7,
    description: 'Move to Next Element: i = 1',
    explanation: 'Move to the next array element. Current index i = 1, current value = nums[1] = 7.',
    currentIndex: 1,
    currentValue: 7,
    complement: null,
    mapContents: new Map([[2, 0]]),
    searchingKey: null,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 5,
    currentIndices: [1],
    foundIndices: [],
    visitedIndices: [0],
    showResult: false,
  },
  {
    id: 8,
    description: 'Calculate Complement',
    explanation: 'Required complement = target - current number = 9 - 7 = 2. If we have already seen 2, then 7 and 2 make the target.',
    currentIndex: 1,
    currentValue: 7,
    complement: 2,
    mapContents: new Map([[2, 0]]),
    searchingKey: null,
    foundKey: null,
    insertingKey: null,
    foundIndex: null,
    activeLine: 6,
    currentIndices: [1],
    foundIndices: [],
    visitedIndices: [0],
    showResult: false,
  },
  {
    id: 9,
    description: 'Search for Complement in Map',
    explanation: 'Look for 2 in the hash map. The map contains 2 → 0. Found it!',
    currentIndex: 1,
    currentValue: 7,
    complement: 2,
    mapContents: new Map([[2, 0]]),
    searchingKey: 2,
    foundKey: 2,
    insertingKey: null,
    foundIndex: 0,
    activeLine: 8,
    currentIndices: [1],
    foundIndices: [],
    visitedIndices: [0],
    showResult: false,
  },
  {
    id: 10,
    description: 'Return the Result',
    explanation: 'We found 2 at index 0 in the map. Return [map[2], i] = [0, 1]. These are the indices of the two numbers that add up to the target.',
    currentIndex: 1,
    currentValue: 7,
    complement: 2,
    mapContents: new Map([[2, 0]]),
    searchingKey: null,
    foundKey: 2,
    insertingKey: null,
    foundIndex: 0,
    activeLine: 9,
    currentIndices: [0, 1],
    foundIndices: [0, 1],
    visitedIndices: [],
    showResult: true,
  },
];

export default function OptimalApproachVisualizer({ isVisible }: OptimalApproachVisualizerProps) {
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
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
        {/* Left: Array, Hash Map, and Variables */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <ArrayVisualizer
            nums={nums}
            pointers={[
              ...(step.currentIndex !== null
                ? [{ index: step.currentIndex, label: 'i', color: '#3b82f6' }]
                : []),
            ]}
            currentIndices={step.currentIndices}
            foundIndices={step.foundIndices}
            visitedIndices={step.visitedIndices}
          />

          <HashMapVisualizer
            mapContents={step.mapContents}
            searchingKey={step.searchingKey}
            foundKey={step.foundKey}
            insertingKey={step.insertingKey}
          />

          {/* Variables Panel */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              Current Operation
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1625] border border-blue-500/30 rounded-xl p-4">
                <div className="text-xs text-blue-400 font-semibold mb-1">Index i</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.currentIndex !== null ? step.currentIndex : '—'}
                </div>
              </div>
              <div className="bg-[#1a1625] border border-cyan-500/30 rounded-xl p-4">
                <div className="text-xs text-cyan-400 font-semibold mb-1">Current Value</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.currentValue !== null ? step.currentValue : '—'}
                </div>
              </div>
            </div>

            {/* Complement Calculation */}
            {step.complement !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1625] border border-purple-500/30 rounded-xl p-4"
              >
                <div className="text-xs text-purple-400 font-semibold mb-2">
                  Complement Calculation
                </div>
                <div className="text-lg font-mono text-white">
                  target - nums[{step.currentIndex}] = {target} - {step.currentValue} ={' '}
                  <span className="text-2xl font-bold text-purple-300">{step.complement}</span>
                </div>
                {step.foundKey !== null && (
                  <div className="mt-2 text-base font-semibold text-emerald-400">
                    Found {step.complement} in map at index {step.foundIndex} ✓
                  </div>
                )}
                {step.searchingKey !== null && step.foundKey === null && (
                  <div className="mt-2 text-base font-semibold text-amber-400">
                    Searching for {step.complement} in map...
                  </div>
                )}
              </motion.div>
            )}

            {/* Result */}
            {step.showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-xl p-4"
              >
                <div className="text-xs text-emerald-400 font-semibold mb-2">Result</div>
                <div className="text-2xl font-mono font-bold text-emerald-300">
                  [{step.foundIndex}, {step.currentIndex}]
                </div>
                <div className="mt-2 text-sm text-white/70">
                  {nums[step.foundIndex!]} + {nums[step.currentIndex!]} = {target}
                </div>
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
          code={optimalCode}
          activeLine={step.activeLine}
          language="C++"
          title="C++ Solution"
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
        timeComplexity="O(n) average"
        spaceComplexity="O(n)"
        timeExplanation="Each array element is processed once. Hash map lookup and insertion are O(1) on average. Note: worst-case hash map operations can be O(n), but this is rare with good hash functions."
        spaceExplanation="The hash map may store up to n elements in the worst case (when no pair is found until the end)."
      />
    </div>
  );
}
