import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface Step {
  id: number;
  day: number | null;
  todayPrice: number | null;
  buyPrice: number;
  bestProfit: number;
  currentProfit: number | null;
  operation: string | null;
  label: string | null;
  codeLine: number;
  explanation: string;
  showConnection?: boolean;
  bestBuyDay?: number;
  bestSellDay?: number;
}

const prices = [7, 1, 5, 3, 6, 4];

const steps: Step[] = [
  {
    id: 0,
    day: null,
    todayPrice: null,
    buyPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    operation: null,
    label: null,
    codeLine: 0,
    explanation: 'We start with the prices array. We initially assume that the first day is the cheapest buying day.',
  },
  {
    id: 1,
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    operation: 'READ',
    label: 'Read day 0',
    codeLine: 5,
    explanation: 'Move to day 0. The price today is 7.',
  },
  {
    id: 2,
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    operation: 'COMPARE',
    label: 'Is 7 < 7?',
    codeLine: 6,
    explanation: 'Compare today\'s price (7) with our buying price (7). It\'s not lower, so we keep the same buying price.',
  },
  {
    id: 3,
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    currentProfit: 0,
    operation: 'CALCULATE',
    label: 'Profit = 7 - 7 = 0',
    codeLine: 8,
    explanation: 'If we sell today, our profit would be 7 - 7 = 0.',
  },
  {
    id: 4,
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    currentProfit: 0,
    operation: 'COMPARE',
    label: 'Is 0 > 0?',
    codeLine: 9,
    explanation: 'Compare this profit (0) with our best profit so far (0). It\'s not better, so best profit stays at 0.',
  },
  {
    id: 5,
    day: 1,
    todayPrice: 1,
    buyPrice: 7,
    bestProfit: 0,
    currentProfit: null,
    operation: 'READ',
    label: 'Read day 1',
    codeLine: 5,
    explanation: 'Move to day 1. The price today is 1.',
  },
  {
    id: 6,
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    currentProfit: null,
    operation: 'UPDATE',
    label: 'New cheaper buying price',
    codeLine: 6,
    explanation: 'Compare today\'s price (1) with our buying price (7). It\'s lower! We found a cheaper buying price.',
    showConnection: false,
  },
  {
    id: 7,
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    currentProfit: 0,
    operation: 'CALCULATE',
    label: 'Profit = 1 - 1 = 0',
    codeLine: 8,
    explanation: 'If we sell today, our profit would be 1 - 1 = 0.',
  },
  {
    id: 8,
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    currentProfit: 0,
    operation: 'COMPARE',
    label: 'Is 0 > 0?',
    codeLine: 9,
    explanation: 'Compare this profit (0) with our best profit so far (0). It\'s not better, so best profit stays at 0.',
  },
  {
    id: 9,
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    currentProfit: null,
    operation: 'READ',
    label: 'Read day 2',
    codeLine: 5,
    explanation: 'Move to day 2. The price today is 5.',
  },
  {
    id: 10,
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    currentProfit: null,
    operation: 'COMPARE',
    label: 'Is 5 < 1?',
    codeLine: 6,
    explanation: 'Compare today\'s price (5) with our buying price (1). It\'s not lower, so we keep the same buying price.',
  },
  {
    id: 11,
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 4,
    currentProfit: 4,
    operation: 'UPDATE',
    label: 'New best profit!',
    codeLine: 9,
    explanation: 'If we sell today, our profit would be 5 - 1 = 4. This is better than our best profit (0), so we update!',
    showConnection: true,
    bestBuyDay: 1,
    bestSellDay: 2,
  },
  {
    id: 12,
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    operation: 'READ',
    label: 'Read day 3',
    codeLine: 5,
    explanation: 'Move to day 3. The price today is 3.',
  },
  {
    id: 13,
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    operation: 'COMPARE',
    label: 'Is 3 < 1?',
    codeLine: 6,
    explanation: 'Compare today\'s price (3) with our buying price (1). It\'s not lower, so we keep the same buying price.',
  },
  {
    id: 14,
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    currentProfit: 2,
    operation: 'CALCULATE',
    label: 'Profit = 3 - 1 = 2',
    codeLine: 8,
    explanation: 'If we sell today, our profit would be 3 - 1 = 2.',
  },
  {
    id: 15,
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    currentProfit: 2,
    operation: 'COMPARE',
    label: 'No improvement',
    codeLine: 9,
    explanation: 'Compare this profit (2) with our best profit so far (4). It\'s not better, so best profit stays at 4.',
  },
  {
    id: 16,
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    operation: 'READ',
    label: 'Read day 4',
    codeLine: 5,
    explanation: 'Move to day 4. The price today is 6.',
  },
  {
    id: 17,
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    currentProfit: null,
    operation: 'COMPARE',
    label: 'Is 6 < 1?',
    codeLine: 6,
    explanation: 'Compare today\'s price (6) with our buying price (1). It\'s not lower, so we keep the same buying price.',
  },
  {
    id: 18,
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 5,
    currentProfit: 5,
    operation: 'UPDATE',
    label: 'New best profit!',
    codeLine: 9,
    explanation: 'If we sell today, our profit would be 6 - 1 = 5. This is better than our best profit (4), so we update!',
    showConnection: true,
    bestBuyDay: 1,
    bestSellDay: 4,
  },
  {
    id: 19,
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    currentProfit: null,
    operation: 'READ',
    label: 'Read day 5',
    codeLine: 5,
    explanation: 'Move to day 5. The price today is 4.',
  },
  {
    id: 20,
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    currentProfit: null,
    operation: 'COMPARE',
    label: 'Is 4 < 1?',
    codeLine: 6,
    explanation: 'Compare today\'s price (4) with our buying price (1). It\'s not lower, so we keep the same buying price.',
  },
  {
    id: 21,
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    currentProfit: 3,
    operation: 'CALCULATE',
    label: 'Profit = 4 - 1 = 3',
    codeLine: 8,
    explanation: 'If we sell today, our profit would be 4 - 1 = 3.',
  },
  {
    id: 22,
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    currentProfit: 3,
    operation: 'COMPARE',
    label: 'No improvement',
    codeLine: 9,
    explanation: 'Compare this profit (3) with our best profit so far (5). It\'s not better, so best profit stays at 5.',
  },
  {
    id: 23,
    day: null,
    todayPrice: null,
    buyPrice: 1,
    bestProfit: 5,
    currentProfit: null,
    operation: null,
    label: null,
    codeLine: 11,
    explanation: 'We\'ve checked all days. The best strategy is to buy at price 1 (day 1) and sell at price 6 (day 4) for a maximum profit of 5.',
    showConnection: true,
    bestBuyDay: 1,
    bestSellDay: 4,
  },
];

const codeLines = [
  'class Solution {',
  'public:',
  '    int maxProfit(vector<int>& sp) {',
  '        int cp = sp[0];',
  '        int max_profit = 0;',
  '        for (int i = 0; i < sp.size(); i++) {',
  '            if (sp[i] < cp) cp = sp[i];',
  '',
  '            int profit = sp[i] - cp;',
  '            max_profit = max(max_profit, profit);',
  '        }',
  '        return max_profit;',
  '    }',
  '};',
];

export default function StockMinimalVisualization() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

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

  const getOperationColor = (operation: string | null) => {
    switch (operation) {
      case 'READ': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'COMPARE': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'CALCULATE': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'UPDATE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'STORE': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'SEARCH': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Optimal Approach Visualization</h2>
          <p className="text-gray-600">Watch the algorithm find the best buying and selling days</p>
        </div>

        {/* Main Visualization Area */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          {/* Array Visualization */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {prices.map((price, index) => {
                const isCurrentDay = step.day === index;
                const isBestBuy = step.showConnection && step.bestBuyDay === index;
                const isBestSell = step.showConnection && step.bestSellDay === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center"
                  >
                    {/* Index label */}
                    <div className="text-xs text-gray-400 mb-2 font-mono">
                      Day {index}
                    </div>
                    
                    {/* Price cell */}
                    <motion.div
                      animate={{
                        scale: isCurrentDay ? 1.1 : 1,
                        backgroundColor: isBestBuy ? '#d1fae5' : isBestSell ? '#dbeafe' : isCurrentDay ? '#ede9fe' : '#ffffff',
                        borderColor: isBestBuy ? '#10b981' : isBestSell ? '#3b82f6' : isCurrentDay ? '#8b5cf6' : '#e5e7eb',
                      }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900 relative"
                    >
                      {price}
                      
                      {/* Day indicator */}
                      {isCurrentDay && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2"
                        >
                          <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                            day {index}
                          </div>
                          <div className="w-0.5 h-3 bg-purple-500 mx-auto" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Connection line */}
            <AnimatePresence>
              {step.showConnection && step.bestBuyDay !== undefined && step.bestSellDay !== undefined && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-16 mt-4"
                >
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      d={`M ${(step.bestBuyDay / (prices.length - 1)) * 100}% 0 Q 50% 100%, ${(step.bestSellDay / (prices.length - 1)) * 100}% 0`}
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Variables Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              animate={{
                scale: step.operation === 'UPDATE' && step.label?.includes('buying price') ? 1.05 : 1,
              }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200"
            >
              <div className="text-sm text-emerald-600 font-semibold mb-2">buyPrice</div>
              <div className="text-4xl font-bold text-emerald-900">{step.buyPrice}</div>
              <div className="text-xs text-emerald-600 mt-2">Cheapest price seen</div>
            </motion.div>

            <motion.div
              animate={{
                scale: step.operation === 'UPDATE' && step.label?.includes('best profit') ? 1.05 : 1,
              }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200"
            >
              <div className="text-sm text-amber-600 font-semibold mb-2">bestProfit</div>
              <div className="text-4xl font-bold text-amber-900">{step.bestProfit}</div>
              <div className="text-xs text-amber-600 mt-2">Maximum profit found</div>
            </motion.div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">day</div>
              <div className="text-4xl font-bold text-purple-900">
                {step.day !== null ? step.day : '—'}
              </div>
              <div className="text-xs text-purple-600 mt-2">Current day</div>
            </div>
          </div>

          {/* Current Profit Display */}
          <AnimatePresence>
            {step.currentProfit !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 mb-8"
              >
                <div className="text-sm text-cyan-600 font-semibold mb-2">Today's Profit Calculation</div>
                <div className="flex items-center justify-center gap-4 text-2xl font-bold text-gray-900">
                  <span className="text-blue-600">{step.todayPrice}</span>
                  <span className="text-gray-400">−</span>
                  <span className="text-emerald-600">{step.buyPrice}</span>
                  <span className="text-gray-400">=</span>
                  <span className={step.currentProfit > 0 ? 'text-emerald-600' : 'text-gray-400'}>
                    {step.currentProfit}
                  </span>
                </div>
                <div className="text-center text-sm text-cyan-600 mt-2">
                  Today's price − Best buying price = Today's possible profit
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 ${getOperationColor(step.operation)}`}>
                  <span className="text-sm font-bold">{step.operation}</span>
                  {step.label && (
                    <>
                      <span className="w-px h-4 bg-current opacity-30" />
                      <span className="text-sm">{step.label}</span>
                    </>
                  )}
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
              {codeLines.map((line, index) => (
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

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="flex flex-col items-center gap-6">
            {/* Step counter */}
            <div className="text-sm text-gray-500 font-mono">
              Step {currentStep + 1} of {steps.length}
            </div>

            {/* Main controls */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipBack size={16} />
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayPause}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Pause' : 'Play'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <SkipForward size={16} />
              </motion.button>
            </div>

            {/* Speed control */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Speed:</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
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
      </div>
    </div>
  );
}
