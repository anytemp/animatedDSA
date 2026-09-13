import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface Step {
  id: number;
  phase: 'init' | 'loop-start' | 'read' | 'check-condition' | 'update-buy' | 'calc-profit' | 'compare-profit' | 'update-best' | 'increment' | 'return';
  day: number | null;
  todayPrice: number | null;
  buyPrice: number;
  bestProfit: number;
  todayProfit: number | null;
  operation: string;
  codeLine: number;
  explanation: string;
  showComparison?: { value1: number; value2: number; result: boolean; label: string };
  showProfitCalc?: { price1: number; price2: number; result: number };
  showMaxComparison?: { current: number; today: number; result: number };
  showConnection?: boolean;
  bestBuyDay?: number;
  bestSellDay?: number;
  iteration?: number;
}

const prices = [7, 1, 5, 3, 6, 4];

// Generate comprehensive steps
const steps: Step[] = [
  // INITIALIZATION
  {
    id: 0,
    phase: 'init',
    day: null,
    todayPrice: null,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'INITIALIZE',
    codeLine: 3,
    explanation: 'We start by reading the first price (7) and assuming it\'s the cheapest buying price we\'ve seen so far.',
  },
  {
    id: 1,
    phase: 'init',
    day: null,
    todayPrice: null,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'INITIALIZE',
    codeLine: 4,
    explanation: 'Before checking any selling opportunity, our best profit is zero.',
  },
  
  // DAY 0
  {
    id: 2,
    phase: 'loop-start',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'LOOP START',
    codeLine: 5,
    explanation: 'Starting iteration 0. The loop variable day = 0.',
    iteration: 0,
  },
  {
    id: 3,
    phase: 'read',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'READ CURRENT PRICE',
    codeLine: 6,
    explanation: 'Read the current price: todayPrice = prices[0] = 7',
  },
  {
    id: 4,
    phase: 'check-condition',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'CHECK CONDITION',
    codeLine: 6,
    explanation: 'Check if today\'s price (7) is less than our buying price (7).',
    showComparison: { value1: 7, value2: 7, result: false, label: 'Is 7 < 7?' },
  },
  {
    id: 5,
    phase: 'update-buy',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'NO UPDATE',
    codeLine: 6,
    explanation: 'Condition is FALSE. buyPrice remains 7.',
  },
  {
    id: 6,
    phase: 'calc-profit',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'CALCULATE PROFIT',
    codeLine: 8,
    explanation: 'Calculate today\'s profit: todayProfit = todayPrice - buyPrice = 7 - 7 = 0',
    showProfitCalc: { price1: 7, price2: 7, result: 0 },
  },
  {
    id: 7,
    phase: 'compare-profit',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'COMPARE PROFITS',
    codeLine: 9,
    explanation: 'Compare today\'s profit (0) with our best profit so far (0).',
    showMaxComparison: { current: 0, today: 0, result: 0 },
  },
  {
    id: 8,
    phase: 'update-best',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'NO UPDATE',
    codeLine: 9,
    explanation: 'Today\'s profit (0) is not better than bestProfit (0). bestProfit remains 0.',
  },
  {
    id: 9,
    phase: 'increment',
    day: 0,
    todayPrice: 7,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'INCREMENT LOOP',
    codeLine: 5,
    explanation: 'day++ → day becomes 1. Moving to the next iteration.',
  },
  
  // DAY 1
  {
    id: 10,
    phase: 'loop-start',
    day: 1,
    todayPrice: 1,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'LOOP START',
    codeLine: 5,
    explanation: 'Starting iteration 1. The loop variable day = 1.',
    iteration: 1,
  },
  {
    id: 11,
    phase: 'read',
    day: 1,
    todayPrice: 1,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'READ CURRENT PRICE',
    codeLine: 6,
    explanation: 'Read the current price: todayPrice = prices[1] = 1',
  },
  {
    id: 12,
    phase: 'check-condition',
    day: 1,
    todayPrice: 1,
    buyPrice: 7,
    bestProfit: 0,
    todayProfit: null,
    operation: 'CHECK CONDITION',
    codeLine: 6,
    explanation: 'Check if today\'s price (1) is less than our buying price (7).',
    showComparison: { value1: 1, value2: 7, result: true, label: 'Is 1 < 7?' },
  },
  {
    id: 13,
    phase: 'update-buy',
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: null,
    operation: 'UPDATE BUY PRICE',
    codeLine: 6,
    explanation: 'Condition is TRUE! We found a cheaper buying price. buyPrice updates: 7 → 1',
  },
  {
    id: 14,
    phase: 'calc-profit',
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'CALCULATE PROFIT',
    codeLine: 8,
    explanation: 'Calculate today\'s profit: todayProfit = todayPrice - buyPrice = 1 - 1 = 0',
    showProfitCalc: { price1: 1, price2: 1, result: 0 },
  },
  {
    id: 15,
    phase: 'compare-profit',
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'COMPARE PROFITS',
    codeLine: 9,
    explanation: 'Compare today\'s profit (0) with our best profit so far (0).',
    showMaxComparison: { current: 0, today: 0, result: 0 },
  },
  {
    id: 16,
    phase: 'update-best',
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'NO UPDATE',
    codeLine: 9,
    explanation: 'Today\'s profit (0) is not better than bestProfit (0). bestProfit remains 0.',
  },
  {
    id: 17,
    phase: 'increment',
    day: 1,
    todayPrice: 1,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: 0,
    operation: 'INCREMENT LOOP',
    codeLine: 5,
    explanation: 'day++ → day becomes 2. Moving to the next iteration.',
  },
  
  // DAY 2
  {
    id: 18,
    phase: 'loop-start',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: null,
    operation: 'LOOP START',
    codeLine: 5,
    explanation: 'Starting iteration 2. The loop variable day = 2.',
    iteration: 2,
  },
  {
    id: 19,
    phase: 'read',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: null,
    operation: 'READ CURRENT PRICE',
    codeLine: 6,
    explanation: 'Read the current price: todayPrice = prices[2] = 5',
  },
  {
    id: 20,
    phase: 'check-condition',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: null,
    operation: 'CHECK CONDITION',
    codeLine: 6,
    explanation: 'Check if today\'s price (5) is less than our buying price (1).',
    showComparison: { value1: 5, value2: 1, result: false, label: 'Is 5 < 1?' },
  },
  {
    id: 21,
    phase: 'update-buy',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: null,
    operation: 'NO UPDATE',
    codeLine: 6,
    explanation: 'Condition is FALSE. buyPrice remains 1.',
  },
  {
    id: 22,
    phase: 'calc-profit',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: 4,
    operation: 'CALCULATE PROFIT',
    codeLine: 8,
    explanation: 'Calculate today\'s profit: todayProfit = todayPrice - buyPrice = 5 - 1 = 4',
    showProfitCalc: { price1: 5, price2: 1, result: 4 },
  },
  {
    id: 23,
    phase: 'compare-profit',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 0,
    todayProfit: 4,
    operation: 'COMPARE PROFITS',
    codeLine: 9,
    explanation: 'Compare today\'s profit (4) with our best profit so far (0).',
    showMaxComparison: { current: 0, today: 4, result: 4 },
  },
  {
    id: 24,
    phase: 'update-best',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 4,
    operation: 'UPDATE BEST PROFIT',
    codeLine: 9,
    explanation: 'Today\'s profit (4) is better than bestProfit (0)! bestProfit updates: 0 → 4',
    showConnection: true,
    bestBuyDay: 1,
    bestSellDay: 2,
  },
  {
    id: 25,
    phase: 'increment',
    day: 2,
    todayPrice: 5,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 4,
    operation: 'INCREMENT LOOP',
    codeLine: 5,
    explanation: 'day++ → day becomes 3. Moving to the next iteration.',
  },
  
  // DAY 3
  {
    id: 26,
    phase: 'loop-start',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'LOOP START',
    codeLine: 5,
    explanation: 'Starting iteration 3. The loop variable day = 3.',
    iteration: 3,
  },
  {
    id: 27,
    phase: 'read',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'READ CURRENT PRICE',
    codeLine: 6,
    explanation: 'Read the current price: todayPrice = prices[3] = 3',
  },
  {
    id: 28,
    phase: 'check-condition',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'CHECK CONDITION',
    codeLine: 6,
    explanation: 'Check if today\'s price (3) is less than our buying price (1).',
    showComparison: { value1: 3, value2: 1, result: false, label: 'Is 3 < 1?' },
  },
  {
    id: 29,
    phase: 'update-buy',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'NO UPDATE',
    codeLine: 6,
    explanation: 'Condition is FALSE. buyPrice remains 1.',
  },
  {
    id: 30,
    phase: 'calc-profit',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 2,
    operation: 'CALCULATE PROFIT',
    codeLine: 8,
    explanation: 'Calculate today\'s profit: todayProfit = todayPrice - buyPrice = 3 - 1 = 2',
    showProfitCalc: { price1: 3, price2: 1, result: 2 },
  },
  {
    id: 31,
    phase: 'compare-profit',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 2,
    operation: 'COMPARE PROFITS',
    codeLine: 9,
    explanation: 'Compare today\'s profit (2) with our best profit so far (4).',
    showMaxComparison: { current: 4, today: 2, result: 4 },
  },
  {
    id: 32,
    phase: 'update-best',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 2,
    operation: 'NO UPDATE',
    codeLine: 9,
    explanation: 'Today\'s profit (2) is not better than bestProfit (4). bestProfit remains 4.',
  },
  {
    id: 33,
    phase: 'increment',
    day: 3,
    todayPrice: 3,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 2,
    operation: 'INCREMENT LOOP',
    codeLine: 5,
    explanation: 'day++ → day becomes 4. Moving to the next iteration.',
  },
  
  // DAY 4
  {
    id: 34,
    phase: 'loop-start',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'LOOP START',
    codeLine: 5,
    explanation: 'Starting iteration 4. The loop variable day = 4.',
    iteration: 4,
  },
  {
    id: 35,
    phase: 'read',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'READ CURRENT PRICE',
    codeLine: 6,
    explanation: 'Read the current price: todayPrice = prices[4] = 6',
  },
  {
    id: 36,
    phase: 'check-condition',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'CHECK CONDITION',
    codeLine: 6,
    explanation: 'Check if today\'s price (6) is less than our buying price (1).',
    showComparison: { value1: 6, value2: 1, result: false, label: 'Is 6 < 1?' },
  },
  {
    id: 37,
    phase: 'update-buy',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: null,
    operation: 'NO UPDATE',
    codeLine: 6,
    explanation: 'Condition is FALSE. buyPrice remains 1.',
  },
  {
    id: 38,
    phase: 'calc-profit',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 5,
    operation: 'CALCULATE PROFIT',
    codeLine: 8,
    explanation: 'Calculate today\'s profit: todayProfit = todayPrice - buyPrice = 6 - 1 = 5',
    showProfitCalc: { price1: 6, price2: 1, result: 5 },
  },
  {
    id: 39,
    phase: 'compare-profit',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 4,
    todayProfit: 5,
    operation: 'COMPARE PROFITS',
    codeLine: 9,
    explanation: 'Compare today\'s profit (5) with our best profit so far (4).',
    showMaxComparison: { current: 4, today: 5, result: 5 },
  },
  {
    id: 40,
    phase: 'update-best',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: 5,
    operation: 'UPDATE BEST PROFIT',
    codeLine: 9,
    explanation: 'Today\'s profit (5) is better than bestProfit (4)! bestProfit updates: 4 → 5',
    showConnection: true,
    bestBuyDay: 1,
    bestSellDay: 4,
  },
  {
    id: 41,
    phase: 'increment',
    day: 4,
    todayPrice: 6,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: 5,
    operation: 'INCREMENT LOOP',
    codeLine: 5,
    explanation: 'day++ → day becomes 5. Moving to the next iteration.',
  },
  
  // DAY 5
  {
    id: 42,
    phase: 'loop-start',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: null,
    operation: 'LOOP START',
    codeLine: 5,
    explanation: 'Starting iteration 5. The loop variable day = 5.',
    iteration: 5,
  },
  {
    id: 43,
    phase: 'read',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: null,
    operation: 'READ CURRENT PRICE',
    codeLine: 6,
    explanation: 'Read the current price: todayPrice = prices[5] = 4',
  },
  {
    id: 44,
    phase: 'check-condition',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: null,
    operation: 'CHECK CONDITION',
    codeLine: 6,
    explanation: 'Check if today\'s price (4) is less than our buying price (1).',
    showComparison: { value1: 4, value2: 1, result: false, label: 'Is 4 < 1?' },
  },
  {
    id: 45,
    phase: 'update-buy',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: null,
    operation: 'NO UPDATE',
    codeLine: 6,
    explanation: 'Condition is FALSE. buyPrice remains 1.',
  },
  {
    id: 46,
    phase: 'calc-profit',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: 3,
    operation: 'CALCULATE PROFIT',
    codeLine: 8,
    explanation: 'Calculate today\'s profit: todayProfit = todayPrice - buyPrice = 4 - 1 = 3',
    showProfitCalc: { price1: 4, price2: 1, result: 3 },
  },
  {
    id: 47,
    phase: 'compare-profit',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: 3,
    operation: 'COMPARE PROFITS',
    codeLine: 9,
    explanation: 'Compare today\'s profit (3) with our best profit so far (5).',
    showMaxComparison: { current: 5, today: 3, result: 5 },
  },
  {
    id: 48,
    phase: 'update-best',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: 3,
    operation: 'NO UPDATE',
    codeLine: 9,
    explanation: 'Today\'s profit (3) is not better than bestProfit (5). bestProfit remains 5.',
  },
  {
    id: 49,
    phase: 'increment',
    day: 5,
    todayPrice: 4,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: 3,
    operation: 'INCREMENT LOOP',
    codeLine: 5,
    explanation: 'day++ → day becomes 6. Loop condition (6 < 6) is FALSE. Loop ends.',
  },
  
  // RETURN
  {
    id: 50,
    phase: 'return',
    day: null,
    todayPrice: null,
    buyPrice: 1,
    bestProfit: 5,
    todayProfit: null,
    operation: 'RETURN RESULT',
    codeLine: 11,
    explanation: 'We\'ve checked all days. Return bestProfit = 5. Buy at Day 1 for 1, Sell at Day 4 for 6, Maximum profit = 5.',
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

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case 'INITIALIZE': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'LOOP START': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'READ CURRENT PRICE': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CHECK CONDITION': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'UPDATE BUY PRICE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'NO UPDATE': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'CALCULATE PROFIT': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'COMPARE PROFITS': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'UPDATE BEST PROFIT': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'INCREMENT LOOP': return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'RETURN RESULT': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Optimal Approach Visualization</h2>
            <p className="text-gray-600">Watch the algorithm find the best buying and selling days</p>
          </div>

          {/* Controls - Top Right */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Step counter */}
            <div className="text-sm text-gray-500 font-mono">
              Step {currentStep + 1} of {steps.length}
            </div>

            {/* Main controls */}
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

            {/* Speed control */}
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

        {/* Main Visualization Area */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          {/* Array Visualization */}
          <div className="mb-8">
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

          {/* Comparison/Decision Area */}
          <AnimatePresence mode="wait">
            {step.showComparison && (
              <motion.div
                key={`comparison-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 mb-8"
              >
                <div className="text-sm text-purple-600 font-semibold mb-4 text-center">Condition Check</div>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">todayPrice</div>
                    <div className="text-3xl font-bold text-blue-600">{step.showComparison.value1}</div>
                  </div>
                  <div className="text-2xl text-gray-400">
                    {step.showComparison.result ? '<' : '≥'}
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">buyPrice</div>
                    <div className="text-3xl font-bold text-emerald-600">{step.showComparison.value2}</div>
                  </div>
                  <div className="text-3xl font-bold">
                    {step.showComparison.result ? (
                      <span className="text-emerald-600">✓ YES</span>
                    ) : (
                      <span className="text-gray-400">✗ NO</span>
                    )}
                  </div>
                </div>
                <div className="text-center text-sm text-purple-600 mt-4">
                  {step.showComparison.label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profit Calculation Display */}
          <AnimatePresence mode="wait">
            {step.showProfitCalc && (
              <motion.div
                key={`profit-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 mb-8"
              >
                <div className="text-sm text-cyan-600 font-semibold mb-4 text-center">Profit Calculation</div>
                <div className="flex items-center justify-center gap-4 text-2xl font-bold text-gray-900">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">todayPrice</div>
                    <div className="text-blue-600">{step.showProfitCalc.price1}</div>
                  </div>
                  <span className="text-gray-400">−</span>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">buyPrice</div>
                    <div className="text-emerald-600">{step.showProfitCalc.price2}</div>
                  </div>
                  <span className="text-gray-400">=</span>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">todayProfit</div>
                    <div className={step.showProfitCalc.result > 0 ? 'text-emerald-600' : 'text-gray-400'}>
                      {step.showProfitCalc.result}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Max Comparison Display */}
          <AnimatePresence mode="wait">
            {step.showMaxComparison && (
              <motion.div
                key={`max-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 mb-8"
              >
                <div className="text-sm text-amber-600 font-semibold mb-4 text-center">Best Profit Comparison</div>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">bestProfit</div>
                    <div className="text-3xl font-bold text-amber-600">{step.showMaxComparison.current}</div>
                  </div>
                  <div className="text-xl text-gray-400">vs</div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">todayProfit</div>
                    <div className="text-3xl font-bold text-cyan-600">{step.showMaxComparison.today}</div>
                  </div>
                  <div className="text-2xl font-bold">
                    → <span className="text-amber-600">{step.showMaxComparison.result}</span>
                  </div>
                </div>
                <div className="text-center text-sm text-amber-600 mt-4">
                  max({step.showMaxComparison.current}, {step.showMaxComparison.today}) = {step.showMaxComparison.result}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Variables Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              animate={{
                scale: step.operation === 'UPDATE BUY PRICE' ? 1.05 : 1,
              }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200"
            >
              <div className="text-xs text-emerald-600 font-semibold mb-1">buyPrice</div>
              <div className="text-3xl font-bold text-emerald-900">{step.buyPrice}</div>
              <div className="text-xs text-emerald-600 mt-1">Cheapest price</div>
            </motion.div>

            <motion.div
              animate={{
                scale: step.operation === 'UPDATE BEST PROFIT' ? 1.05 : 1,
              }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200"
            >
              <div className="text-xs text-amber-600 font-semibold mb-1">bestProfit</div>
              <div className="text-3xl font-bold text-amber-900">{step.bestProfit}</div>
              <div className="text-xs text-amber-600 mt-1">Max profit found</div>
            </motion.div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">day</div>
              <div className="text-3xl font-bold text-purple-900">
                {step.day !== null ? step.day : '—'}
              </div>
              <div className="text-xs text-purple-600 mt-1">Current day</div>
            </div>

            <AnimatePresence>
              {step.todayPrice !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200"
                >
                  <div className="text-xs text-blue-600 font-semibold mb-1">todayPrice</div>
                  <div className="text-3xl font-bold text-blue-900">{step.todayPrice}</div>
                  <div className="text-xs text-blue-600 mt-1">Current price</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Today's Profit Display */}
          <AnimatePresence>
            {step.todayProfit !== null && (
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
                  <span className={step.todayProfit > 0 ? 'text-emerald-600' : 'text-gray-400'}>
                    {step.todayProfit}
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

        {/* Complexity Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">
                We visit each price exactly once in a single pass through the array. Each iteration performs constant-time operations (comparisons, calculations, updates).
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">
                We only use a fixed number of variables (buyPrice, bestProfit, todayProfit, day) regardless of input size. No extra data structures are needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
