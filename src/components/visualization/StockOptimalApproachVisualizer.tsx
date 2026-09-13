import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepControls from './StepControls';
import CodePanel from './CodePanel';
import ComplexityCard from './ComplexityCard';

const optimalCode = `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = prices[0];
        int bestProfit = 0;

        for (int day = 0; day < prices.size(); day++) {
            if (prices[day] < minPrice) {
                minPrice = prices[day];
            }

            int currentProfit = prices[day] - minPrice;
            bestProfit = max(bestProfit, currentProfit);
        }

        return bestProfit;
    }
};`;

interface Step {
  id: number;
  description: string;
  explanation: string;
  day: number | null;
  currentPrice: number | null;
  minPrice: number;
  bestProfit: number;
  currentProfit: number | null;
  phase: 'init' | 'read' | 'compare-min' | 'update-min' | 'calc-profit' | 'compare-profit' | 'update-profit' | 'next-day' | 'result';
  activeLine: number;
  showDecision: boolean;
  decisionText: string;
  showUpdate: boolean;
  updateText: string;
  highlightBuy: boolean;
  highlightSell: boolean;
  showConnection: boolean;
}

const steps: Step[] = [
  {
    id: 0,
    description: 'The Real-World Idea',
    explanation: 'We want to buy the stock on one day and sell it on a later day. We want the largest possible difference between the selling price and the buying price.',
    day: null,
    currentPrice: null,
    minPrice: 0,
    bestProfit: 0,
    currentProfit: null,
    phase: 'init',
    activeLine: 0,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 1,
    description: 'Initialize Variables',
    explanation: 'Start with minPrice = prices[0] = 7 (the first price we see) and bestProfit = 0 (no profit yet).',
    day: null,
    currentPrice: null,
    minPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    phase: 'init',
    activeLine: 3,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 2,
    description: 'Start Loop: day = 0',
    explanation: 'Begin iterating through the array. Current day = 0, current price = prices[0] = 7.',
    day: 0,
    currentPrice: 7,
    minPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    phase: 'read',
    activeLine: 6,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 3,
    description: 'Compare with Minimum Price',
    explanation: 'Is 7 < 7? No. The current price is not less than the minimum price we\'ve seen.',
    day: 0,
    currentPrice: 7,
    minPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    phase: 'compare-min',
    activeLine: 7,
    showDecision: true,
    decisionText: 'Is 7 < 7? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 4,
    description: 'Calculate Current Profit',
    explanation: 'currentProfit = current price - minPrice = 7 - 7 = 0. If we sell today, we make no profit.',
    day: 0,
    currentPrice: 7,
    minPrice: 7,
    bestProfit: 0,
    currentProfit: 0,
    phase: 'calc-profit',
    activeLine: 11,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 5,
    description: 'Compare with Best Profit',
    explanation: 'Is currentProfit (0) > bestProfit (0)? No. The profit of 0 is not better than our current best.',
    day: 0,
    currentPrice: 7,
    minPrice: 7,
    bestProfit: 0,
    currentProfit: 0,
    phase: 'compare-profit',
    activeLine: 12,
    showDecision: true,
    decisionText: 'Is 0 > 0? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 6,
    description: 'Move to Next Day: day = 1',
    explanation: 'Move the loop to the next day. Current day = 1, current price = prices[1] = 1.',
    day: 1,
    currentPrice: 1,
    minPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    phase: 'read',
    activeLine: 6,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 7,
    description: 'Compare with Minimum Price',
    explanation: 'Is 1 < 7? Yes! We found a cheaper buying price.',
    day: 1,
    currentPrice: 1,
    minPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    phase: 'compare-min',
    activeLine: 7,
    showDecision: true,
    decisionText: 'Is 1 < 7? Yes!',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 8,
    description: 'Update Minimum Price',
    explanation: 'minPrice: 7 → 1. Now the cheapest price we\'ve seen is 1.',
    day: 1,
    currentPrice: 1,
    minPrice: 1,
    bestProfit: 0,
    currentProfit: null,
    phase: 'update-min',
    activeLine: 8,
    showDecision: false,
    decisionText: '',
    showUpdate: true,
    updateText: 'minPrice: 7 → 1',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 9,
    description: 'Calculate Current Profit',
    explanation: 'currentProfit = current price - minPrice = 1 - 1 = 0. Selling on the same day we buy gives zero profit.',
    day: 1,
    currentPrice: 1,
    minPrice: 1,
    bestProfit: 0,
    currentProfit: 0,
    phase: 'calc-profit',
    activeLine: 11,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 10,
    description: 'Compare with Best Profit',
    explanation: 'Is currentProfit (0) > bestProfit (0)? No. Still no profit.',
    day: 1,
    currentPrice: 1,
    minPrice: 1,
    bestProfit: 0,
    currentProfit: 0,
    phase: 'compare-profit',
    activeLine: 12,
    showDecision: true,
    decisionText: 'Is 0 > 0? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 11,
    description: 'Move to Next Day: day = 2',
    explanation: 'Move the loop to the next day. Current day = 2, current price = prices[2] = 5.',
    day: 2,
    currentPrice: 5,
    minPrice: 1,
    bestProfit: 0,
    currentProfit: null,
    phase: 'read',
    activeLine: 6,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 12,
    description: 'Compare with Minimum Price',
    explanation: 'Is 5 < 1? No. The current price is not less than the minimum price.',
    day: 2,
    currentPrice: 5,
    minPrice: 1,
    bestProfit: 0,
    currentProfit: null,
    phase: 'compare-min',
    activeLine: 7,
    showDecision: true,
    decisionText: 'Is 5 < 1? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 13,
    description: 'Calculate Current Profit',
    explanation: 'currentProfit = current price - minPrice = 5 - 1 = 4. If we bought at 1 and sell today at 5, we make a profit of 4!',
    day: 2,
    currentPrice: 5,
    minPrice: 1,
    bestProfit: 0,
    currentProfit: 4,
    phase: 'calc-profit',
    activeLine: 11,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 14,
    description: 'Compare with Best Profit',
    explanation: 'Is currentProfit (4) > bestProfit (0)? Yes! We found our first profitable transaction.',
    day: 2,
    currentPrice: 5,
    minPrice: 1,
    bestProfit: 0,
    currentProfit: 4,
    phase: 'compare-profit',
    activeLine: 12,
    showDecision: true,
    decisionText: 'Is 4 > 0? Yes!',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 15,
    description: 'Update Best Profit',
    explanation: 'bestProfit: 0 → 4. We found a better profit!',
    day: 2,
    currentPrice: 5,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: 4,
    phase: 'update-profit',
    activeLine: 12,
    showDecision: false,
    decisionText: '',
    showUpdate: true,
    updateText: 'bestProfit: 0 → 4',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 16,
    description: 'Move to Next Day: day = 3',
    explanation: 'Move the loop to the next day. Current day = 3, current price = prices[3] = 3.',
    day: 3,
    currentPrice: 3,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    phase: 'read',
    activeLine: 6,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 17,
    description: 'Compare with Minimum Price',
    explanation: 'Is 3 < 1? No. The current price is not less than the minimum price.',
    day: 3,
    currentPrice: 3,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    phase: 'compare-min',
    activeLine: 7,
    showDecision: true,
    decisionText: 'Is 3 < 1? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 18,
    description: 'Calculate Current Profit',
    explanation: 'currentProfit = current price - minPrice = 3 - 1 = 2. If we bought at 1 and sell today at 3, we make a profit of 2.',
    day: 3,
    currentPrice: 3,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: 2,
    phase: 'calc-profit',
    activeLine: 11,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 19,
    description: 'Compare with Best Profit',
    explanation: 'Is currentProfit (2) > bestProfit (4)? No. The profit of 2 is not better than our current best of 4.',
    day: 3,
    currentPrice: 3,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: 2,
    phase: 'compare-profit',
    activeLine: 12,
    showDecision: true,
    decisionText: 'Is 2 > 4? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 20,
    description: 'Move to Next Day: day = 4',
    explanation: 'Move the loop to the next day. Current day = 4, current price = prices[4] = 6.',
    day: 4,
    currentPrice: 6,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    phase: 'read',
    activeLine: 6,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 21,
    description: 'Compare with Minimum Price',
    explanation: 'Is 6 < 1? No. The current price is not less than the minimum price.',
    day: 4,
    currentPrice: 6,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    phase: 'compare-min',
    activeLine: 7,
    showDecision: true,
    decisionText: 'Is 6 < 1? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 22,
    description: 'Calculate Current Profit',
    explanation: 'currentProfit = current price - minPrice = 6 - 1 = 5. If we bought at 1 and sell today at 6, we make a profit of 5!',
    day: 4,
    currentPrice: 6,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: 5,
    phase: 'calc-profit',
    activeLine: 11,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 23,
    description: 'Compare with Best Profit',
    explanation: 'Is currentProfit (5) > bestProfit (4)? Yes! We found an even better profit!',
    day: 4,
    currentPrice: 6,
    minPrice: 1,
    bestProfit: 4,
    currentProfit: 5,
    phase: 'compare-profit',
    activeLine: 12,
    showDecision: true,
    decisionText: 'Is 5 > 4? Yes!',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 24,
    description: 'Update Best Profit',
    explanation: 'bestProfit: 4 → 5. We found the best profit so far!',
    day: 4,
    currentPrice: 6,
    minPrice: 1,
    bestProfit: 5,
    currentProfit: 5,
    phase: 'update-profit',
    activeLine: 12,
    showDecision: false,
    decisionText: '',
    showUpdate: true,
    updateText: 'bestProfit: 4 → 5',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 25,
    description: 'Move to Next Day: day = 5',
    explanation: 'Move the loop to the next day. Current day = 5, current price = prices[5] = 4.',
    day: 5,
    currentPrice: 4,
    minPrice: 1,
    bestProfit: 5,
    currentProfit: null,
    phase: 'read',
    activeLine: 6,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 26,
    description: 'Compare with Minimum Price',
    explanation: 'Is 4 < 1? No. The current price is not less than the minimum price.',
    day: 5,
    currentPrice: 4,
    minPrice: 1,
    bestProfit: 5,
    currentProfit: null,
    phase: 'compare-min',
    activeLine: 7,
    showDecision: true,
    decisionText: 'Is 4 < 1? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: false,
    highlightSell: false,
    showConnection: false,
  },
  {
    id: 27,
    description: 'Calculate Current Profit',
    explanation: 'currentProfit = current price - minPrice = 4 - 1 = 3. If we bought at 1 and sell today at 4, we make a profit of 3.',
    day: 5,
    currentPrice: 4,
    minPrice: 1,
    bestProfit: 5,
    currentProfit: 3,
    phase: 'calc-profit',
    activeLine: 11,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 28,
    description: 'Compare with Best Profit',
    explanation: 'Is currentProfit (3) > bestProfit (5)? No. The profit of 3 is not better than our current best of 5.',
    day: 5,
    currentPrice: 4,
    minPrice: 1,
    bestProfit: 5,
    currentProfit: 3,
    phase: 'compare-profit',
    activeLine: 12,
    showDecision: true,
    decisionText: 'Is 3 > 5? No',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 29,
    description: 'Loop Complete',
    explanation: 'We have checked all days. The best decision is to buy at price 1 (day 1) and sell at price 6 (day 4).',
    day: null,
    currentPrice: null,
    minPrice: 1,
    bestProfit: 5,
    currentProfit: null,
    phase: 'result',
    activeLine: 15,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
  {
    id: 30,
    description: 'Return the Result',
    explanation: 'return bestProfit = 5. The maximum profit is 5.',
    day: null,
    currentPrice: null,
    minPrice: 1,
    bestProfit: 5,
    currentProfit: null,
    phase: 'result',
    activeLine: 15,
    showDecision: false,
    decisionText: '',
    showUpdate: false,
    updateText: '',
    highlightBuy: true,
    highlightSell: true,
    showConnection: true,
  },
];

export default function StockOptimalApproachVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

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
      }, 2500 / speed);
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, speed]);

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
              Stock Prices
            </div>
            <div className="flex items-end gap-3 mb-2 flex-wrap">
              {prices.map((price, i) => {
                const isCurrent = step.day === i;
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
                    {step.day === i && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="text-xs font-bold px-2 py-1 rounded-lg mb-1 bg-purple-500/20 text-purple-400">
                          day
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
                  <span className="text-white/70">Buy day (price 1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-400" />
                  <span className="text-white/70">Sell day (price 6)</span>
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
                <div className="text-xs text-emerald-400 font-semibold mb-1">minPrice</div>
                <motion.div
                  key={step.minPrice}
                  initial={{ scale: step.showUpdate && step.updateText.includes('minPrice') ? 1.2 : 1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-mono font-bold ${
                    step.showUpdate && step.updateText.includes('minPrice') ? 'text-emerald-300' : 'text-white'
                  }`}
                >
                  {step.minPrice}
                </motion.div>
              </div>
              <div className="bg-[#1a1625] border border-amber-500/30 rounded-xl p-4">
                <div className="text-xs text-amber-400 font-semibold mb-1">bestProfit</div>
                <motion.div
                  key={step.bestProfit}
                  initial={{ scale: step.showUpdate && step.updateText.includes('bestProfit') ? 1.2 : 1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-mono font-bold ${
                    step.showUpdate && step.updateText.includes('bestProfit') ? 'text-amber-300' : 'text-white'
                  }`}
                >
                  {step.bestProfit}
                </motion.div>
              </div>
              <div className="bg-[#1a1625] border border-purple-500/30 rounded-xl p-4">
                <div className="text-xs text-purple-400 font-semibold mb-1">day</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {step.day !== null ? step.day : '—'}
                </div>
              </div>
            </div>

            {/* Current Price */}
            {step.currentPrice !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1625] border border-cyan-500/30 rounded-xl p-4"
              >
                <div className="text-xs text-cyan-400 font-semibold mb-1">Current Price</div>
                <div className="text-2xl font-mono font-bold text-cyan-300">
                  {step.currentPrice}
                </div>
              </motion.div>
            )}

            {/* Current Profit */}
            {step.currentProfit !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1625] border border-pink-500/30 rounded-xl p-4"
              >
                <div className="text-xs text-pink-400 font-semibold mb-2">Current Profit Calculation</div>
                <div className="text-lg font-mono text-white">
                  {step.currentPrice} - {step.minPrice} ={' '}
                  <span className={`text-2xl font-bold ${step.currentProfit > 0 ? 'text-emerald-400' : 'text-white/60'}`}>
                    {step.currentProfit}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Decision Panel */}
            <AnimatePresence>
              {step.showDecision && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#1a1625] border border-blue-500/30 rounded-xl p-4"
                >
                  <div className="text-xs text-blue-400 font-semibold mb-2">Decision</div>
                  <div className="text-lg font-semibold text-white">
                    {step.decisionText}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Update Panel */}
            <AnimatePresence>
              {step.showUpdate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-xl p-4"
                >
                  <div className="text-xs text-emerald-400 font-semibold mb-2">Update</div>
                  <div className="text-lg font-semibold text-emerald-300">
                    {step.updateText}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
        speed={speed}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onSpeedChange={setSpeed}
      />

      {/* Complexity */}
      <ComplexityCard
        timeComplexity="O(n)"
        spaceComplexity="O(1)"
        timeExplanation="The array is scanned once. Each day performs constant-time operations (comparison, subtraction, max). Time complexity is O(n)."
        spaceExplanation="Only three variables are used: minPrice, bestProfit, and currentProfit. All use constant extra space. Space complexity is O(1)."
      />
    </div>
  );
}
