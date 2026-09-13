import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export default function ContainerBetterVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  
  // Same as brute force but with early termination hint
  const pairs: Array<{ left: number; right: number; waterHeight: number; width: number; area: number }> = [];
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      const waterHeight = Math.min(height[left], height[right]);
      const width = right - left;
      const area = waterHeight * width;
      pairs.push({ left, right, waterHeight, width, area });
    }
  }

  const steps = [
    { id: 0, phase: 'init', left: null, right: null, waterHeight: null, width: null, area: null, maxArea: 0, codeLine: 3, explanation: 'Initialize maxArea = 0. This is still O(n²) but we can add a simple optimization hint.', isNewMax: false },
    ...pairs.slice(0, 20).map((pair, idx) => {
      const newMaxArea = Math.max(idx === 0 ? 0 : pairs[idx - 1].area, pair.area);
      const isNewMax = pair.area > (idx === 0 ? 0 : pairs[idx - 1].area);
      
      return [
        {
          id: idx * 2 + 1,
          phase: 'calculate',
          left: pair.left,
          right: pair.right,
          waterHeight: pair.waterHeight,
          width: pair.width,
          area: pair.area,
          maxArea: idx === 0 ? pair.area : pairs[idx - 1].area,
          codeLine: 7,
          explanation: `Check pair (${pair.left}, ${pair.right}). waterHeight = min(${height[pair.left]}, ${height[pair.right]}) = ${pair.waterHeight}. width = ${pair.right} - ${pair.left} = ${pair.width}. area = ${pair.waterHeight} × ${pair.width} = ${pair.area}.`,
          isNewMax: false,
        },
        {
          id: idx * 2 + 2,
          phase: 'update',
          left: pair.left,
          right: pair.right,
          waterHeight: pair.waterHeight,
          width: pair.width,
          area: pair.area,
          maxArea: newMaxArea,
          codeLine: 9,
          explanation: isNewMax 
            ? `New maximum! maxArea = max(${idx === 0 ? 0 : pairs[idx - 1].area}, ${pair.area}) = ${newMaxArea}.`
            : `maxArea = max(${idx === 0 ? pair.area : pairs[idx - 1].area}, ${pair.area}) = ${newMaxArea}. No change.`,
          isNewMax,
        }
      ];
    }).flat(),
    {
      id: 41,
      phase: 'note',
      left: null,
      right: null,
      waterHeight: null,
      width: null,
      area: null,
      maxArea: 49,
      codeLine: 12,
      explanation: 'Note: This is still O(n²). The real improvement comes from the two-pointer approach which achieves O(n). Let\'s move to the optimal solution!',
      isNewMax: false,
    }
  ];

  const step = steps[currentStep];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 1500 / speed);
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, speed, steps.length]);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Improved Brute Force (Still O(n²))</h2>
            <p className="text-gray-600">Same as brute force - no asymptotic improvement</p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="text-sm text-gray-500 font-mono">Step {currentStep + 1} of {steps.length}</div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setCurrentStep(0); setIsPlaying(false); }} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors">
                <RotateCcw size={14} /><span className="hidden sm:inline">Reset</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)} disabled={currentStep === 0} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <SkipBack size={14} /><span className="hidden sm:inline">Previous</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors">
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}{isPlaying ? 'Pause' : 'Play'}
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)} disabled={currentStep === steps.length - 1} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="hidden sm:inline">Next</span><SkipForward size={14} />
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Speed:</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button key={s} onClick={() => setSpeed(s)} className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${speed === s ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'}`}>{s}x</button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 mb-8">
          {/* Water Container */}
          <div className="relative h-64 mb-8">
            <div className="ml-12 h-full relative">
              {/* Water between selected walls */}
              {step.left !== null && step.right !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 bg-cyan-200/40 border-t-2 border-cyan-400"
                  style={{
                    left: `${(step.left / (height.length - 1)) * 100}%`,
                    right: `${100 - ((step.right / (height.length - 1)) * 100)}%`,
                    height: `${(step.waterHeight! / 8) * 100}%`,
                  }}
                />
              )}

              {/* Walls */}
              <div className="absolute inset-0 flex items-end justify-between gap-1">
                {height.map((h, i) => {
                  const isSelected = step.left === i || step.right === i;
                  const isNewMax = step.isNewMax && isSelected;
                  
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        backgroundColor: isNewMax ? '#10b981' : isSelected ? '#8b5cf6' : '#64748b',
                        borderColor: isNewMax ? '#059669' : isSelected ? '#7c3aed' : '#475569',
                      }}
                      className="flex-1 rounded-t-lg border-2 relative"
                      style={{ height: `${(h / 8) * 100}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-600">
                        {h}
                      </div>
                      {step.left === i && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600">
                          left
                        </div>
                      )}
                      {step.right === i && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600">
                          right
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Variables */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">left</div>
              <div className="text-2xl font-bold text-purple-900">{step.left !== null ? step.left : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">right</div>
              <div className="text-2xl font-bold text-blue-900">{step.right !== null ? step.right : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-4 border-2 border-cyan-200">
              <div className="text-xs text-cyan-600 font-semibold mb-1">waterHeight</div>
              <div className="text-2xl font-bold text-cyan-900">{step.waterHeight !== null ? step.waterHeight : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-4 border-2 border-teal-200">
              <div className="text-xs text-teal-600 font-semibold mb-1">width</div>
              <div className="text-2xl font-bold text-teal-900">{step.width !== null ? step.width : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-200">
              <div className="text-xs text-emerald-600 font-semibold mb-1">area</div>
              <div className="text-2xl font-bold text-emerald-900">{step.area !== null ? step.area : '—'}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
              <div className="text-xs text-amber-600 font-semibold mb-1">maxArea</div>
              <motion.div key={step.maxArea} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold text-amber-900">{step.maxArea}</motion.div>
            </div>
          </div>

          {/* Explanation */}
          <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
