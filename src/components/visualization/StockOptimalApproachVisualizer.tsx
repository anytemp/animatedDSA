import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StepControls from './StepControls';
import CodePanel from './CodePanel';
import ComplexityCard from './ComplexityCard';

const optimalCode = `class Solution {
public:
    int maxProfit(vector<int>& sp) {
        int cp= sp[0];
        int max_profit=0;
        for(int i=0;i<sp.size();i++)
        {
            if(sp[i]< cp) cp = sp[i];
            int profit= sp[i]-cp;             //sp-cp
            max_profit =max(max_profit, profit);
        }
        return max_profit;

    }
};`;

interface Step {
  id: number;
  description: string;
  explanation: string;
  i: number | null;
  cp: number;
  maxProfit: number;
  profit: number | null;
  activeLine: number;
  currentIdx: number | null;
  cpUpdated: boolean;
  maxProfitUpdated: boolean;
  highlightBuy: boolean;
  highlightSell: boolean;
}

const steps: Step[] = [
  {
    id: 0,
    description: 'Problem Setup',
    explanation: 'We have sp = [7, 1, 5, 3, 6, 4]. We need to find the maximum profit by buying low and selling high.',
    i: null,
    cp: 0,
    maxProfit: 0,
    profit: null,
    activeLine: 2,
    currentIdx: null,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 1,
    description: 'Initialize Variables',
    explanation: 'Create two variables: cp = sp[0] = 7 (the cheapest price seen so far) and max_profit = 0 (the best profit found).',
    i: null,
    cp: 7,
    maxProfit: 0,
    profit: null,
    activeLine: 3,
    currentIdx: null,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 2,
    description: 'cp remembers the cheapest buying price',
    explanation: 'cp remembers the cheapest buying price we have seen so far. Initially, cp = 7 (the first price).',
    i: null,
    cp: 7,
    maxProfit: 0,
    profit: null,
    activeLine: 3,
    currentIdx: null,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 3,
    description: 'Start Loop: i = 0',
    explanation: 'Read index 0: sp[0] = 7. The pointer i is at index 0.',
    i: 0,
    cp: 7,
    maxProfit: 0,
    profit: null,
    activeLine: 5,
    currentIdx: 0,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 4,
    description: 'Check if sp[i] < cp',
    explanation: 'Is 7 < 7? No. So cp remains 7.',
    i: 0,
    cp: 7,
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    currentIdx: 0,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 5,
    description: 'Calculate Profit',
    explanation: 'profit = sp[0] - cp = 7 - 7 = 0. If we sell today, we make no profit.',
    i: 0,
    cp: 7,
    maxProfit: 0,
    profit: 0,
    activeLine: 9,
    currentIdx: 0,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 6,
    description: 'Update max_profit',
    explanation: 'max_profit = max(0, 0) = 0. The maximum profit remains 0.',
    i: 0,
    cp: 7,
    maxProfit: 0,
    profit: 0,
    activeLine: 10,
    currentIdx: 0,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 7,
    description: 'Move to i = 1',
    explanation: 'Move the pointer to index 1. sp[1] = 1.',
    i: 1,
    cp: 7,
    maxProfit: 0,
    profit: null,
    activeLine: 5,
    currentIdx: 1,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 8,
    description: 'Check if sp[i] < cp',
    explanation: 'Is 1 < 7? Yes! We found a cheaper buying price, so we replace cp.',
    i: 1,
    cp: 7,
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    currentIdx: 1,
    cpUpdated: true,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 9,
    description: 'Update cp',
    explanation: 'cp: 7 → 1. Now cp remembers the new cheapest price.',
    i: 1,
    cp: 1,
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    currentIdx: 1,
    cpUpdated: true,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 10,
    description: 'Calculate Profit',
    explanation: 'profit = sp[1] - cp = 1 - 1 = 0. Selling on the same day we buy gives zero profit.',
    i: 1,
    cp: 1,
    maxProfit: 0,
    profit: 0,
    activeLine: 9,
    currentIdx: 1,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 11,
    description: 'Update max_profit',
    explanation: 'max_profit = max(0, 0) = 0. Still no profit.',
    i: 1,
    cp: 1,
    maxProfit: 0,
    profit: 0,
    activeLine: 10,
    currentIdx: 1,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 12,
    description: 'Move to i = 2',
    explanation: 'Move the pointer to index 2. sp[2] = 5.',
    i: 2,
    cp: 1,
    maxProfit: 0,
    profit: null,
    activeLine: 5,
    currentIdx: 2,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 13,
    description: 'Check if sp[i] < cp',
    explanation: 'Is 5 < 1? No. So cp remains 1.',
    i: 2,
    cp: 1,
    maxProfit: 0,
    profit: null,
    activeLine: 8,
    currentIdx: 2,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 14,
    description: 'Calculate Profit',
    explanation: 'profit = sp[2] - cp = 5 - 1 = 4. If we sell today, we make a profit of 4!',
    i: 2,
    cp: 1,
    maxProfit: 0,
    profit: 4,
    activeLine: 9,
    currentIdx: 2,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 15,
    description: 'Update max_profit',
    explanation: 'max_profit: 0 → 4. We found our first profitable transaction!',
    i: 2,
    cp: 1,
    maxProfit: 4,
    profit: 4,
    activeLine: 10,
    currentIdx: 2,
    cpUpdated: false,
    maxProfitUpdated: true,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 16,
    description: 'Move to i = 3',
    explanation: 'Move the pointer to index 3. sp[3] = 3.',
    i: 3,
    cp: 1,
    maxProfit: 4,
    profit: null,
    activeLine: 5,
    currentIdx: 3,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 17,
    description: 'Check if sp[i] < cp',
    explanation: 'Is 3 < 1? No. So cp remains 1.',
    i: 3,
    cp: 1,
    maxProfit: 4,
    profit: null,
    activeLine: 8,
    currentIdx: 3,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 18,
    description: 'Calculate Profit',
    explanation: 'profit = sp[3] - cp = 3 - 1 = 2.',
    i: 3,
    cp: 1,
    maxProfit: 4,
    profit: 2,
    activeLine: 9,
    currentIdx: 3,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 19,
    description: 'Update max_profit',
    explanation: 'max_profit = max(4, 2) = 4. The profit of 2 is not better than our current max of 4.',
    i: 3,
    cp: 1,
    maxProfit: 4,
    profit: 2,
    activeLine: 10,
    currentIdx: 3,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 20,
    description: 'Move to i = 4',
    explanation: 'Move the pointer to index 4. sp[4] = 6.',
    i: 4,
    cp: 1,
    maxProfit: 4,
    profit: null,
    activeLine: 5,
    currentIdx: 4,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 21,
    description: 'Check if sp[i] < cp',
    explanation: 'Is 6 < 1? No. So cp remains 1.',
    i: 4,
    cp: 1,
    maxProfit: 4,
    profit: null,
    activeLine: 8,
    currentIdx: 4,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 22,
    description: 'Calculate Profit',
    explanation: 'profit = sp[4] - cp = 6 - 1 = 5. This is better than our current max!',
    i: 4,
    cp: 1,
    maxProfit: 4,
    profit: 5,
    activeLine: 9,
    currentIdx: 4,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 23,
    description: 'Update max_profit',
    explanation: 'max_profit: 4 → 5. We found an even better profit!',
    i: 4,
    cp: 1,
    maxProfit: 5,
    profit: 5,
    activeLine: 10,
    currentIdx: 4,
    cpUpdated: false,
    maxProfitUpdated: true,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 24,
    description: 'Move to i = 5',
    explanation: 'Move the pointer to index 5. sp[5] = 4.',
    i: 5,
    cp: 1,
    maxProfit: 5,
    profit: null,
    activeLine: 5,
    currentIdx: 5,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 25,
    description: 'Check if sp[i] < cp',
    explanation: 'Is 4 < 1? No. So cp remains 1.',
    i: 5,
    cp: 1,
    maxProfit: 5,
    profit: null,
    activeLine: 8,
    currentIdx: 5,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: false,
    highlightSell: false,
  },
  {
    id: 26,
    description: 'Calculate Profit',
    explanation: 'profit = sp[5] - cp = 4 - 1 = 3.',
    i: 5,
    cp: 1,
    maxProfit: 5,
    profit: 3,
    activeLine: 9,
    currentIdx: 5,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 27,
    description: 'Update max_profit',
    explanation: 'max_profit = max(5, 3) = 5. The profit of 3 is not better than our current max of 5.',
    i: 5,
    cp: 1,
    maxProfit: 5,
    profit: 3,
    activeLine: 10,
    currentIdx: 5,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 28,
    description: 'Loop Complete',
    explanation: 'We have checked all days. The best decision is to buy at price 1 (day 1) and sell at price 6 (day 4).',
    i: null,
    cp: 1,
    maxProfit: 5,
    profit: null,
    activeLine: 11,
    currentIdx: null,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
  {
    id: 29,
    description: 'Return the Result',
    explanation: 'return max_profit = 5. The maximum profit is 5.',
    i: null,
    cp: 1,
    maxProfit: 5,
    profit: null,
    activeLine: 12,
    currentIdx: null,
    cpUpdated: false,
    maxProfitUpdated: false,
    highlightBuy: true,
    highlightSell: true,
  },
];

export default function OptimalApproachVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];
  const sp = [7, 1, 5, 3, 6, 4];

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
        {/* Left: Array and Variables */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {/* Array Visualization */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Stock Prices (sp)
            </div>
            <div className="flex items-end gap-3 mb-2 flex-wrap">
              {sp.map((price, i) => {
                const isCurrent = step.currentIdx === i;
                const isBuy = step.highlightBuy && i === 1;
                const isSell = step.highlightSell && i === 4;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    {step.currentIdx === i && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="text-xs font-bold px-2 py-1 rounded-lg mb-1 bg-purple-500/20 text-purple-400">
                          i
                        </div>
                        <div className="w-0.5 h-3 bg-purple-500" />
                      </motion.div>
                    )}
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
            {step.highlightBuy && step.highlightSell && (
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-400" />
                  <span className="text-white/70">Buy price (cp = 1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-400" />
                  <span className="text-white/70">Sell price (sp[4] = 6)</span>
                </div>
              </div>
            )}
          </div>

          {/* Variables Panel */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              Variables
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#1a1625] border border-emerald-500/30 rounded-xl p-4">
                <div className="text-xs text-emerald-400 font-semibold mb-1">cp (cheapest)</div>
                <motion.div
                  key={step.cp}
                  initial={{ scale: step.cpUpdated ? 1.2 : 1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-mono font-bold ${
                    step.cpUpdated ? 'text-emerald-300' : 'text-white'
                  }`}
                >
                  {step.cp}
                </motion.div>
              </div>
              <div className="bg-[#1a1625] border border-amber-500/30 rounded-xl p-4">
                <div className="text-xs text-amber-400 font-semibold mb-1">max_profit</div>
                <motion.div
                  key={step.maxProfit}
                  initial={{ scale: step.maxProfitUpdated ? 1.2 : 1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-mono font-bold ${
                    step.maxProfitUpdated ? 'text-amber-300' : 'text-white'
                  }`}
                >
                  {step.maxProfit}
                </motion.div>
              </div>
              <div className="bg-[#1a1625] border border-purple-500/30 rounded-xl p-4">
                <div className="text-xs text-purple-400 font-semibold mb-1">i (pointer)</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.i !== null ? step.i : '—'}
                </div>
              </div>
            </div>

            {/* Profit Calculation */}
            {step.profit !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1625] border border-cyan-500/30 rounded-xl p-4"
              >
                <div className="text-xs text-cyan-400 font-semibold mb-2">Profit Calculation</div>
                <div className="text-lg font-mono text-white">
                  sp[{step.i}] - cp = {sp[step.i!]} - {step.cp} ={' '}
                  <span className={`text-2xl font-bold ${step.profit > 0 ? 'text-emerald-400' : 'text-white/60'}`}>
                    {step.profit}
                  </span>
                </div>
              </motion.div>
            )}
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
        timeComplexity="O(n)"
        spaceComplexity="O(1)"
        timeExplanation="The array is scanned once. Each day performs constant-time operations (comparison, subtraction, max). Time complexity is O(n)."
        spaceExplanation="Only two variables are used: cp and max_profit. Both use constant extra space. Space complexity is O(1)."
      />
    </div>
  );
}
