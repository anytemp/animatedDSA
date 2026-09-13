import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ExternalLink, CheckCircle, Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';

interface Step {
  id: number;
  description: string;
  currentElement: number | null;
  complement: number | null;
  mapContents: Map<number, number>;
  foundInMap: boolean;
  foundIndex: number | null;
  activeLine: number;
  codeExplanation: string;
}

const steps: Step[] = [
  {
    id: 0,
    description: 'Start with an empty hash map.',
    currentElement: null,
    complement: null,
    mapContents: new Map(),
    foundInMap: false,
    foundIndex: null,
    activeLine: 0,
    codeExplanation: 'Initialize the hash map and begin iterating through the array.',
  },
  {
    id: 1,
    description: 'Read nums[0] = 2. Required complement = 7.',
    currentElement: 0,
    complement: 7,
    mapContents: new Map(),
    foundInMap: false,
    foundIndex: null,
    activeLine: 4,
    codeExplanation: 'Calculate the complement needed to reach the target.',
  },
  {
    id: 2,
    description: '7 is not found. Store 2 → index 0.',
    currentElement: 0,
    complement: 7,
    mapContents: new Map([[2, 0]]),
    foundInMap: false,
    foundIndex: null,
    activeLine: 9,
    codeExplanation: 'Store the current number and its index in the hash map.',
  },
  {
    id: 3,
    description: 'Read nums[1] = 7. Required complement = 2.',
    currentElement: 1,
    complement: 2,
    mapContents: new Map([[2, 0]]),
    foundInMap: false,
    foundIndex: null,
    activeLine: 4,
    codeExplanation: 'Calculate the complement for the current element.',
  },
  {
    id: 4,
    description: '2 is found in the map at index 0.',
    currentElement: 1,
    complement: 2,
    mapContents: new Map([[2, 0]]),
    foundInMap: true,
    foundIndex: 0,
    activeLine: 6,
    codeExplanation: 'Check whether the required complement already exists in the hash map.',
  },
  {
    id: 5,
    description: 'Highlight values 2 and 7. Show: 2 + 7 = 9',
    currentElement: 1,
    complement: 2,
    mapContents: new Map([[2, 0]]),
    foundInMap: true,
    foundIndex: 0,
    activeLine: 7,
    codeExplanation: 'Return the indices of the two numbers that add up to the target.',
  },
  {
    id: 6,
    description: 'Return: [0, 1]',
    currentElement: 1,
    complement: 2,
    mapContents: new Map([[2, 0]]),
    foundInMap: true,
    foundIndex: 0,
    activeLine: 7,
    codeExplanation: 'Solution found! Return the indices [0, 1].',
  },
];

const cppCode = `class Solution {
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

export default function TwoSumVisualization() {
  const { updateProblemStatus, getProblem } = useProblems();
  const navigate = useNavigate();
  const problem = getProblem(1);
  const [isCompleted, setIsCompleted] = useState(problem?.status === 'Completed');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];
  const nums = [2, 7, 11, 15];
  const target = 9;

  const handleMarkComplete = () => {
    updateProblemStatus(1, 'Completed');
    setIsCompleted(true);
  };

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
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  const getCellStyle = (index: number) => {
    if (step.id === 6 && (index === 0 || index === 1)) {
      return 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 text-white scale-110 shadow-xl shadow-emerald-500/30';
    }
    if (step.currentElement === index) {
      return 'bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-300 text-white scale-105 shadow-lg shadow-blue-500/20';
    }
    if (step.foundInMap && step.foundIndex === index) {
      return 'bg-gradient-to-br from-purple-400 to-violet-500 border-purple-300 text-white scale-105 shadow-lg shadow-purple-500/20';
    }
    return 'bg-[#1a1625] border-[#2d2640] text-white/80';
  };

  const codeLines = cppCode.split('\n');

  return (
    <div
      className="min-h-screen pt-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D0B18 0%, #171326 40%, #211B35 100%)',
      }}
    >
      {/* Subtle violet accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Top Navigation */}
      <div className="relative border-b border-white/10 bg-[#171326]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <Home size={16} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link
                to="/blind75"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <span>Blind 75</span>
              </Link>
              <span className="text-white/30">/</span>
              <Link
                to="/problem/1"
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Two Sum</span>
              </Link>
            </motion.div>

            {/* Center: Problem info */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-mono text-white/50">01</span>
              <span className="font-mono font-semibold text-white text-lg">Two Sum</span>
            </motion.div>

            {/* Right: Badges and Actions */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/80 bg-white/5">
                Array
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-400/30 text-purple-300 bg-purple-400/10">
                Hash Map
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-400/30 text-emerald-300 bg-emerald-400/10">
                Easy
              </span>
              <a
                href="https://leetcode.com/problems/two-sum/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-full text-xs font-semibold transition-all"
              >
                <ExternalLink size={12} />
                LeetCode
              </a>
              <button
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isCompleted
                    ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 cursor-default'
                    : 'bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20'
                }`}
              >
                <CheckCircle size={12} />
                {isCompleted ? 'Completed' : 'Complete'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Panel: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              {/* Step Info */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{step.id}</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                      Step {step.id} of {steps.length - 1}
                    </div>
                    <p className="text-lg font-semibold text-white leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Array Visualization */}
              <div className="mb-8">
                <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Array
                </div>
                <div className="flex items-end gap-3 mb-2">
                  {nums.map((num, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="text-xs font-mono text-white/40">{i}</div>
                      <motion.div
                        animate={{
                          scale: step.currentElement === i || (step.id === 6 && (i === 0 || i === 1)) ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-mono font-bold border-2 transition-all duration-300 ${getCellStyle(i)}`}
                      >
                        {num}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-sm font-mono text-white/60">target =</span>
                  <span className="text-xl font-mono font-bold text-blue-400 bg-blue-400/10 px-4 py-2 rounded-xl border-2 border-blue-400/30">
                    {target}
                  </span>
                </div>
              </div>

              {/* Hash Map Visualization */}
              <div className="mb-8">
                <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Hash Map
                </div>
                <div className="bg-[#1a1625] border border-white/10 rounded-2xl p-6">
                  {step.mapContents.size === 0 ? (
                    <div className="text-center py-4">
                      <span className="text-base text-white/40">Empty</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-white/50 uppercase tracking-wider pb-2 border-b border-white/10">
                        <div>Value</div>
                        <div>Index</div>
                      </div>
                      {Array.from(step.mapContents.entries()).map(([value, index]) => (
                        <motion.div
                          key={value}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="grid grid-cols-2 gap-4 text-base font-mono"
                        >
                          <div className="text-purple-300 font-bold">{value}</div>
                          <div className="text-white/80">{index}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-sm font-semibold transition-all"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <SkipBack size={16} />
                  Previous
                </button>
                <button
                  onClick={handlePlayPause}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                  <SkipForward size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sticky top-28">
              <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                C++ Solution
              </div>
              <div className="bg-[#0D0B18] rounded-2xl p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        backgroundColor: i === step.activeLine ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                      }}
                      transition={{ duration: 0.3 }}
                      className={`px-3 py-1 rounded font-mono ${
                        i === step.activeLine
                          ? 'border-l-4 border-purple-400 bg-purple-500/10'
                          : 'border-l-4 border-transparent'
                      }`}
                    >
                      <span className="text-white/30 mr-4 select-none">{String(i + 1).padStart(2, '0')}</span>
                      <code className="text-white/90">{line}</code>
                    </motion.div>
                  ))}
                </pre>
              </div>
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Current Operation
                </div>
                <p className="text-base text-white/90 leading-relaxed">
                  {step.codeExplanation}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Time Complexity
              </div>
              <div className="text-2xl font-mono font-bold text-blue-400">O(n)</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Space Complexity
              </div>
              <div className="text-2xl font-mono font-bold text-purple-400">O(n)</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/problem/1"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-base font-semibold transition-all"
            >
              <ArrowLeft size={18} />
              Back to Problem
            </Link>
            <a
              href="https://leetcode.com/problems/two-sum/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-base font-semibold transition-all"
            >
              <ExternalLink size={18} />
              Practice on LeetCode
            </a>
            <button
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
                isCompleted
                  ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 cursor-default'
                  : 'bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20'
              }`}
            >
              <CheckCircle size={18} />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
