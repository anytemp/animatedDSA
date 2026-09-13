import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StepControls from './StepControls';
import CodePanel from './CodePanel';
import ComplexityCard from './ComplexityCard';

const betterApproachCode = `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> futureMax(n);

        futureMax[n - 1] = prices[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            futureMax[i] = max(prices[i], futureMax[i + 1]);
        }

        int maxProfit = 0;

        for (int i = 0; i < n; i++) {
            int profit = futureMax[i] - prices[i];
            maxProfit = max(maxProfit, profit);
        }

        return maxProfit;
    }
};`;

interface Step {
  id: number;
  description: string;
  explanation: string;
  currentIdx: number | null;
  futureMax: number[];
  maxProfit: number;
  profit: number | null;
  activeLine: number;
  phase: 'init' | 'fill' | 'calculate';
}

const steps: Step[] = [
  {
    id: 0,
    description: 'Problem Setup',
    explanation: 'We have prices = [7, 1, 5, 3, 6, 4]. For each buying day, we need to know the highest price available after that day.',
    currentIdx: null,
    futureMax: [],
    maxProfit: 0,
    profit: null,
    activeLine: 2,
    phase: 'init',
  },
  {
    id: 1,
    description: 'Create futureMax Array',
    explanation: 'Create an array futureMax of the same size. futureMax[i] will store the maximum price from day i onwards.',
    currentIdx: null,
    futureMax: [0, 0, 0, 0, 0, 0],
    maxProfit: 0,
    profit: null,
    activeLine: 3,
    phase: 'init',
  },
  {
    id: 2,
    description: 'Initialize Last Element',
    explanation: 'futureMax[5] = prices[5] = 4. The last day has no future days, so the max is just its own price.',
    currentIdx: 5,
    futureMax: [0, 0, 0, 0, 0, 4],
    maxProfit: 0,
    profit: null,
    activeLine: 5,
    phase: 'fill',
  },
  {
    id: 3,
    description: 'Fill from Right to Left: i = 4',
    explanation: 'futureMax[4] = max(prices[4], futureMax[5]) = max(6, 4) = 6',
    currentIdx: 4,
    futureMax: [0, 0, 0, 0, 6, 4],
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    phase: 'fill',
  },
  {
    id: 4,
    description: 'i = 3',
    explanation: 'futureMax[3] = max(prices[3], futureMax[4]) = max(3, 6) = 6',
    currentIdx: 3,
    futureMax: [0, 0, 0, 6, 6, 4],
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    phase: 'fill',
  },
  {
    id: 5,
    description: 'i = 2',
    explanation: 'futureMax[2] = max(prices[2], futureMax[3]) = max(5, 6) = 6',
    currentIdx: 2,
    futureMax: [0, 0, 6, 6, 6, 4],
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    phase: 'fill',
  },
  {
    id: 6,
    description: 'i = 1',
    explanation: 'futureMax[1] = max(prices[1], futureMax[2]) = max(1, 6) = 6',
    currentIdx: 1,
    futureMax: [0, 6, 6, 6, 6, 4],
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    phase: 'fill',
  },
  {
    id: 7,
    description: 'i = 0',
    explanation: 'futureMax[0] = max(prices[0], futureMax[1]) = max(7, 6) = 7',
    currentIdx: 0,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    phase: 'fill',
  },
  {
    id: 8,
    description: 'futureMax Array Complete',
    explanation: 'Now futureMax[i] tells us the maximum selling price available from day i onwards. For example, at index 1, the best future selling price is 6.',
    currentIdx: null,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 0,
    profit: null,
    activeLine: 10,
    phase: 'calculate',
  },
  {
    id: 9,
    description: 'Calculate Profit: i = 0',
    explanation: 'profit = futureMax[0] - prices[0] = 7 - 7 = 0. maxProfit = max(0, 0) = 0.',
    currentIdx: 0,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 0,
    profit: 0,
    activeLine: 13,
    phase: 'calculate',
  },
  {
    id: 10,
    description: 'i = 1 - Found Better Profit!',
    explanation: 'profit = futureMax[1] - prices[1] = 6 - 1 = 5. maxProfit = max(0, 5) = 5. This is the best profit so far!',
    currentIdx: 1,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 5,
    profit: 5,
    activeLine: 14,
    phase: 'calculate',
  },
  {
    id: 11,
    description: 'i = 2',
    explanation: 'profit = futureMax[2] - prices[2] = 6 - 5 = 1. maxProfit = max(5, 1) = 5.',
    currentIdx: 2,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 5,
    profit: 1,
    activeLine: 14,
    phase: 'calculate',
  },
  {
    id: 12,
    description: 'i = 3',
    explanation: 'profit = futureMax[3] - prices[3] = 6 - 3 = 3. maxProfit = max(5, 3) = 5.',
    currentIdx: 3,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 5,
    profit: 3,
    activeLine: 14,
    phase: 'calculate',
  },
  {
    id: 13,
    description: 'i = 4',
    explanation: 'profit = futureMax[4] - prices[4] = 6 - 6 = 0. maxProfit = max(5, 0) = 5.',
    currentIdx: 4,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 5,
    profit: 0,
    activeLine: 14,
    phase: 'calculate',
  },
  {
    id: 14,
    description: 'i = 5',
    explanation: 'profit = futureMax[5] - prices[5] = 4 - 4 = 0. maxProfit = max(5, 0) = 5.',
    currentIdx: 5,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 5,
    profit: 0,
    activeLine: 14,
    phase: 'calculate',
  },
  {
    id: 15,
    description: 'Return the Result',
    explanation: 'The maximum profit is 5. This comes from buying at price 1 (day 1) and selling at price 6 (day 4).',
    currentIdx: null,
    futureMax: [7, 6, 6, 6, 6, 4],
    maxProfit: 5,
    profit: null,
    activeLine: 16,
    phase: 'calculate',
  },
];

export default function BetterApproachVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];
  const prices = [7, 1, 5, 3, 6, 4];

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
        {/* Left: Arrays and Variables */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {/* Prices Array */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Prices Array
            </div>
            <div className="flex items-end gap-3 mb-2 flex-wrap">
              {prices.map((price, i) => {
                const isCurrent = step.currentIdx === i;
                const isBuy = step.phase === 'calculate' && step.maxProfit === 5 && i === 1;
                const isSell = step.phase === 'calculate' && step.maxProfit === 5 && i === 4;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="text-xs font-mono text-white/40">Day {i}</div>
                    <motion.div
                      animate={{
                        scale: isCurrent || isBuy || isSell ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-mono font-bold border-2 transition-all duration-300 ${
                        isBuy
                          ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 text-white shadow-lg shadow-emerald-500/20'
                          : isSell
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-300 text-white shadow-lg shadow-blue-500/20'
                          : isCurrent
                          ? 'bg-gradient-to-br from-purple-400 to-violet-500 border-purple-300 text-white shadow-lg shadow-purple-500/20'
                          : 'bg-[#1a1625] border-[#2d2640] text-white/80'
                      }`}
                    >
                      {price}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* futureMax Array */}
          {step.futureMax.length > 0 && (
            <div className="mb-6">
              <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                futureMax Array
              </div>
              <div className="flex items-end gap-3 mb-2 flex-wrap">
                {step.futureMax.map((max, i) => {
                  const isCurrent = step.currentIdx === i && step.phase === 'fill';
                  const isHighlighted = max > 0;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="text-xs font-mono text-white/40">Index {i}</div>
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-mono font-bold border-2 transition-all duration-300 ${
                          isCurrent
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white shadow-lg shadow-amber-500/20'
                            : isHighlighted
                            ? 'bg-[#2d2640] border-amber-500/30 text-amber-300'
                            : 'bg-[#1a1625] border-[#2d2640] text-white/40'
                        }`}
                      >
                        {max}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Variables Panel */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              Variables
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1625] border border-purple-500/30 rounded-xl p-4">
                <div className="text-xs text-purple-400 font-semibold mb-1">Current Index i</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.currentIdx !== null ? step.currentIdx : '—'}
                </div>
              </div>
              <div className="bg-[#1a1625] border border-amber-500/30 rounded-xl p-4">
                <div className="text-xs text-amber-400 font-semibold mb-1">maxProfit</div>
                <div className="text-2xl font-mono font-bold text-amber-300">{step.maxProfit}</div>
              </div>
            </div>

            {/* Profit Calculation */}
            {step.profit !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1625] border border-emerald-500/30 rounded-xl p-4"
              >
                <div className="text-xs text-emerald-400 font-semibold mb-2">Profit Calculation</div>
                <div className="text-lg font-mono text-white">
                  futureMax[{step.currentIdx}] - prices[{step.currentIdx}] = {step.futureMax[step.currentIdx!]} - {prices[step.currentIdx!]} ={' '}
                  <span className={`text-2xl font-bold ${step.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {step.profit}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Code */}
        <CodePanel
          code={betterApproachCode}
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
        timeComplexity="O(n)"
        spaceComplexity="O(n)"
        timeExplanation="We scan the array twice: once to build futureMax (right to left) and once to calculate profits (left to right). Each scan is linear, so total time is O(n)."
        spaceExplanation="The futureMax array stores additional information for every index, requiring O(n) extra space."
      />
    </div>
  );
}
