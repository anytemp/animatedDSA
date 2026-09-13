import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StepControls from './StepControls';
import CodePanel from './CodePanel';
import ComplexityCard from './ComplexityCard';

const bruteForceCode = `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxProfit = 0;

        for (int buy = 0; buy < prices.size(); buy++) {
            for (int sell = buy + 1; sell < prices.size(); sell++) {
                int profit = prices[sell] - prices[buy];
                maxProfit = max(maxProfit, profit);
            }
        }

        return maxProfit;
    }
};`;

interface Step {
  id: number;
  description: string;
  explanation: string;
  buy: number | null;
  sell: number | null;
  profit: number | null;
  maxProfit: number;
  activeLine: number;
  currentIndices: number[];
  highlightBuy: boolean;
  highlightSell: boolean;
  showArrow: boolean;
}

const steps: Step[] = [
  {
    id: 0,
    description: 'Problem Setup',
    explanation: 'We have prices = [7, 1, 5, 3, 6, 4]. We need to find the maximum profit by buying on one day and selling on a later day.',
    buy: null,
    sell: null,
    profit: null,
    maxProfit: 0,
    activeLine: 3,
    currentIndices: [],
    highlightBuy: false,
    highlightSell: false,
    showArrow: false,
  },
  {
    id: 1,
    description: 'Initialize maxProfit',
    explanation: 'Start with maxProfit = 0. This will track the best profit we find.',
    buy: null,
    sell: null,
    profit: null,
    maxProfit: 0,
    activeLine: 3,
    currentIndices: [],
    highlightBuy: false,
    highlightSell: false,
    showArrow: false,
  },
  {
    id: 2,
    description: 'First Loop: buy = 0',
    explanation: 'The first loop chooses the day on which we buy. Start with buy = 0, so we look at prices[0] = 7.',
    buy: 0,
    sell: null,
    profit: null,
    maxProfit: 0,
    activeLine: 5,
    currentIndices: [0],
    highlightBuy: true,
    highlightSell: false,
    showArrow: false,
  },
  {
    id: 3,
    description: 'Second Loop: sell = 1',
    explanation: 'The second loop chooses a later day on which we sell. Start with sell = 1, so we look at prices[1] = 1.',
    buy: 0,
    sell: 1,
    profit: null,
    maxProfit: 0,
    activeLine: 6,
    currentIndices: [0, 1],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 4,
    description: 'Calculate Profit',
    explanation: 'profit = selling price - buying price = 1 - 7 = -6. This transaction loses money, so it does not improve our maximum profit.',
    buy: 0,
    sell: 1,
    profit: -6,
    maxProfit: 0,
    activeLine: 7,
    currentIndices: [0, 1],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 5,
    description: 'Update maxProfit',
    explanation: 'maxProfit = max(0, -6) = 0. The maximum profit remains 0.',
    buy: 0,
    sell: 1,
    profit: -6,
    maxProfit: 0,
    activeLine: 8,
    currentIndices: [0, 1],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 6,
    description: 'Move sell to index 2',
    explanation: 'sell = 2, prices[2] = 5. Calculate profit = 5 - 7 = -2.',
    buy: 0,
    sell: 2,
    profit: -2,
    maxProfit: 0,
    activeLine: 7,
    currentIndices: [0, 2],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 7,
    description: 'Move sell to index 3',
    explanation: 'sell = 3, prices[3] = 3. Calculate profit = 3 - 7 = -4.',
    buy: 0,
    sell: 3,
    profit: -4,
    maxProfit: 0,
    activeLine: 7,
    currentIndices: [0, 3],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 8,
    description: 'Move sell to index 4',
    explanation: 'sell = 4, prices[4] = 6. Calculate profit = 6 - 7 = -1.',
    buy: 0,
    sell: 4,
    profit: -1,
    maxProfit: 0,
    activeLine: 7,
    currentIndices: [0, 4],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 9,
    description: 'Move sell to index 5',
    explanation: 'sell = 5, prices[5] = 4. Calculate profit = 4 - 7 = -3.',
    buy: 0,
    sell: 5,
    profit: -3,
    maxProfit: 0,
    activeLine: 7,
    currentIndices: [0, 5],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 10,
    description: 'Inner Loop Finished',
    explanation: 'The inner loop has finished. All selling days for buy = 0 have been checked. Now the first loop chooses another buying day.',
    buy: 0,
    sell: null,
    profit: null,
    maxProfit: 0,
    activeLine: 5,
    currentIndices: [0],
    highlightBuy: true,
    highlightSell: false,
    showArrow: false,
  },
  {
    id: 11,
    description: 'First Loop: buy = 1',
    explanation: 'Move to buy = 1, so we look at prices[1] = 1.',
    buy: 1,
    sell: null,
    profit: null,
    maxProfit: 0,
    activeLine: 5,
    currentIndices: [1],
    highlightBuy: true,
    highlightSell: false,
    showArrow: false,
  },
  {
    id: 12,
    description: 'sell = 2',
    explanation: 'sell = 2, prices[2] = 5. Calculate profit = 5 - 1 = 4.',
    buy: 1,
    sell: 2,
    profit: 4,
    maxProfit: 4,
    activeLine: 8,
    currentIndices: [1, 2],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 13,
    description: 'sell = 3',
    explanation: 'sell = 3, prices[3] = 3. Calculate profit = 3 - 1 = 2.',
    buy: 1,
    sell: 3,
    profit: 2,
    maxProfit: 4,
    activeLine: 8,
    currentIndices: [1, 3],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 14,
    description: 'sell = 4 - Found Better Profit!',
    explanation: 'sell = 4, prices[4] = 6. Calculate profit = 6 - 1 = 5. This is better than our previous maxProfit of 4!',
    buy: 1,
    sell: 4,
    profit: 5,
    maxProfit: 5,
    activeLine: 8,
    currentIndices: [1, 4],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 15,
    description: 'sell = 5',
    explanation: 'sell = 5, prices[5] = 4. Calculate profit = 4 - 1 = 3.',
    buy: 1,
    sell: 5,
    profit: 3,
    maxProfit: 5,
    activeLine: 8,
    currentIndices: [1, 5],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
  {
    id: 16,
    description: 'Continue Checking...',
    explanation: 'The algorithm continues checking all remaining buy/sell pairs (buy = 2, 3, 4, 5), but none produce a profit greater than 5.',
    buy: null,
    sell: null,
    profit: null,
    maxProfit: 5,
    activeLine: 5,
    currentIndices: [],
    highlightBuy: false,
    highlightSell: false,
    showArrow: false,
  },
  {
    id: 17,
    description: 'Return the Result',
    explanation: 'After checking all possible pairs, the maximum profit is 5. This comes from buying at price 1 (day 1) and selling at price 6 (day 4).',
    buy: 1,
    sell: 4,
    profit: 5,
    maxProfit: 5,
    activeLine: 11,
    currentIndices: [1, 4],
    highlightBuy: true,
    highlightSell: true,
    showArrow: true,
  },
];

export default function StockBruteForceVisualizer() {
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
          {/* Array Visualization */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Prices Array
            </div>
            <div className="flex items-end gap-3 mb-2 flex-wrap">
              {prices.map((price, i) => {
                const isBuy = step.highlightBuy && step.buy === i;
                const isSell = step.highlightSell && step.sell === i;
                const isCurrent = step.currentIndices.includes(i);

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    {(isBuy || isSell) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`text-xs font-bold px-2 py-1 rounded-lg mb-1 ${
                            isBuy
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {isBuy ? 'BUY' : 'SELL'}
                        </div>
                        <div
                          className="w-0.5 h-3"
                          style={{ backgroundColor: isBuy ? '#10b981' : '#3b82f6' }}
                        />
                      </motion.div>
                    )}
                    <div className="text-xs font-mono text-white/40">Day {i}</div>
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-mono font-bold border-2 transition-all duration-300 ${
                        isBuy
                          ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 text-white shadow-lg shadow-emerald-500/20'
                          : isSell
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-300 text-white shadow-lg shadow-blue-500/20'
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

          {/* Variables Panel */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              Variables
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1625] border border-emerald-500/30 rounded-xl p-4">
                <div className="text-xs text-emerald-400 font-semibold mb-1">buy (first pointer)</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.buy !== null ? step.buy : '—'}
                </div>
              </div>
              <div className="bg-[#1a1625] border border-blue-500/30 rounded-xl p-4">
                <div className="text-xs text-blue-400 font-semibold mb-1">sell (second pointer)</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.sell !== null ? step.sell : '—'}
                </div>
              </div>
            </div>

            {/* Profit Calculation */}
            {step.profit !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1625] border border-purple-500/30 rounded-xl p-4"
              >
                <div className="text-xs text-purple-400 font-semibold mb-2">Profit Calculation</div>
                <div className="text-lg font-mono text-white">
                  prices[{step.sell}] - prices[{step.buy}] = {prices[step.sell!]} - {prices[step.buy!]} ={' '}
                  <span className={`text-2xl font-bold ${step.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {step.profit}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Max Profit */}
            <div className="bg-[#1a1625] border border-amber-500/30 rounded-xl p-4">
              <div className="text-xs text-amber-400 font-semibold mb-1">maxProfit</div>
              <div className="text-2xl font-mono font-bold text-amber-300">{step.maxProfit}</div>
            </div>
          </div>
        </div>

        {/* Right: Code */}
        <CodePanel
          code={bruteForceCode}
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
        timeComplexity="O(n²)"
        spaceComplexity="O(1)"
        timeExplanation="The nested loops examine many possible pairs. For each buying day, we check all later selling days. The number of comparisons grows quadratically with the array size."
        spaceExplanation="Only a few variables are used (buy, sell, profit, maxProfit), so extra space is constant O(1)."
      />
    </div>
  );
}
