import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export default function ContainerOptimalVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  
  const steps = [
    { id: 0, phase: 'init', left: 0, right: 8, waterHeight: null, width: null, area: null, maxArea: 0, codeLine: 3, explanation: 'Initialize: left = 0, right = 8, maxArea = 0. We start with the widest possible container.' },
    { id: 1, phase: 'calculate', left: 0, right: 8, waterHeight: 1, width: 8, area: 8, maxArea: 8, codeLine: 7, explanation: 'Calculate: waterHeight = min(1, 7) = 1. width = 8 - 0 = 8. area = 1 × 8 = 8. maxArea = max(0, 8) = 8.' },
    { id: 2, phase: 'reason', left: 0, right: 8, waterHeight: 1, width: 8, area: 8, maxArea: 8, codeLine: 10, explanation: 'The left wall (height 1) is shorter, so it limits the water level. Moving the taller right wall cannot increase the height because the left wall would still be the bottleneck. Therefore, move left inward.', moveLeft: true },
    { id: 3, phase: 'move', left: 1, right: 8, waterHeight: null, width: null, area: null, maxArea: 8, codeLine: 11, explanation: 'Move left pointer: left = left + 1 = 1.' },
    { id: 4, phase: 'calculate', left: 1, right: 8, waterHeight: 7, width: 7, area: 49, maxArea: 49, codeLine: 7, explanation: 'Calculate: waterHeight = min(8, 7) = 7. width = 8 - 1 = 7. area = 7 × 7 = 49. maxArea = max(8, 49) = 49. New maximum!' },
    { id: 5, phase: 'reason', left: 1, right: 8, waterHeight: 7, width: 7, area: 49, maxArea: 49, codeLine: 10, explanation: 'The right wall (height 7) is shorter, so it limits the water level. Moving the taller left wall cannot increase the height because the right wall would still be the bottleneck. Therefore, move right inward.', moveRight: true },
    { id: 6, phase: 'move', left: 1, right: 7, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 13, explanation: 'Move right pointer: right = right - 1 = 7.' },
    { id: 7, phase: 'calculate', left: 1, right: 7, waterHeight: 3, width: 6, area: 18, maxArea: 49, codeLine: 7, explanation: 'Calculate: waterHeight = min(8, 3) = 3. width = 7 - 1 = 6. area = 3 × 6 = 18. maxArea = max(49, 18) = 49. No change.' },
    { id: 8, phase: 'reason', left: 1, right: 7, waterHeight: 3, width: 6, area: 18, maxArea: 49, codeLine: 10, explanation: 'The right wall (height 3) is shorter. Move right inward.', moveRight: true },
    { id: 9, phase: 'move', left: 1, right: 6, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 13, explanation: 'Move right pointer: right = right - 1 = 6.' },
    { id: 10, phase: 'calculate', left: 1, right: 6, waterHeight: 8, width: 5, area: 40, maxArea: 49, codeLine: 7, explanation: 'Calculate: waterHeight = min(8, 8) = 8. width = 6 - 1 = 5. area = 8 × 5 = 40. maxArea = max(49, 40) = 49. No change.' },
    { id: 11, phase: 'reason', left: 1, right: 6, waterHeight: 8, width: 5, area: 40, maxArea: 49, codeLine: 10, explanation: 'Both walls have the same height. Either wall can be moved inward. We move right inward.', moveRight: true },
    { id: 12, phase: 'move', left: 1, right: 5, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 13, explanation: 'Move right pointer: right = right - 1 = 5.' },
    { id: 13, phase: 'calculate', left: 1, right: 5, waterHeight: 4, width: 4, area: 16, maxArea: 49, codeLine: 7, explanation: 'Calculate: waterHeight = min(8, 4) = 4. width = 5 - 1 = 4. area = 4 × 4 = 16. maxArea = max(49, 16) = 49. No change.' },
    { id: 14, phase: 'reason', left: 1, right: 5, waterHeight: 4, width: 4, area: 16, maxArea: 49, codeLine: 10, explanation: 'The right wall (height 4) is shorter. Move right inward.', moveRight: true },
    { id: 15, phase: 'move', left: 1, right: 4, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 13, explanation: 'Move right pointer: right = right - 1 = 4.' },
    { id: 16, phase: 'calculate', left: 1, right: 4, waterHeight: 5, width: 3, area: 15, maxArea: 49, codeLine: 7, explanation: 'Calculate: waterHeight = min(8, 5) = 5. width = 4 - 1 = 3. area = 5 × 3 = 15. maxArea = max(49, 15) = 49. No change.' },
    { id: 17, phase: 'reason', left: 1, right: 4, waterHeight: 5, width: 3, area: 15, maxArea: 49, codeLine: 10, explanation: 'The right wall (height 5) is shorter. Move right inward.', moveRight: true },
    { id: 18, phase: 'move', left: 1, right: 3, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 13, explanation: 'Move right pointer: right = right - 1 = 3.' },
    { id: 19, phase: 'calculate', left: 1, right: 3, waterHeight: 2, width: 2, area: 4, maxArea: 49, codeLine: 7, explanation: 'Calculate: waterHeight = min(8, 2) = 2. width = 3 - 1 = 2. area = 2 × 2 = 4. maxArea = max(49, 4) = 49. No change.' },
    { id: 20, phase: 'reason', left: 1, right: 3, waterHeight: 2, width: 2, area: 4, maxArea: 49, codeLine: 10, explanation: 'The right wall (height 2) is shorter. Move right inward.', moveRight: true },
    { id: 21, phase: 'move', left: 1, right: 2, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 13, explanation: 'Move right pointer: right = right - 1 = 2.' },
    { id: 22, phase: 'calculate', left: 1, right: 2, waterHeight: 6, width: 1, area: 6, maxArea: 49, codeLine: 7, explanation: 'Calculate: waterHeight = min(8, 6) = 6. width = 2 - 1 = 1. area = 6 × 1 = 6. maxArea = max(49, 6) = 49. No change.' },
    { id: 23, phase: 'reason', left: 1, right: 2, waterHeight: 6, width: 1, area: 6, maxArea: 49, codeLine: 10, explanation: 'The right wall (height 6) is shorter. Move right inward.', moveRight: true },
    { id: 24, phase: 'move', left: 1, right: 1, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 13, explanation: 'Move right pointer: right = right - 1 = 1. Now left = right, so the loop ends.' },
    { id: 25, phase: 'return', left: 1, right: 1, waterHeight: null, width: null, area: null, maxArea: 49, codeLine: 16, explanation: 'Return maxArea = 49. The maximum water container has area 49.' },
  ];

  const step = steps[currentStep];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 2000 / speed);
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Optimal Two-Pointer Visualization</h2>
            <p className="text-gray-600">Two pointers moving inward (O(n))</p>
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
          <div className="relative h-80 mb-8">
            <div className="ml-12 h-full relative">
              {/* Water between selected walls */}
              {step.waterHeight !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 bg-cyan-200/40 border-t-2 border-cyan-400"
                  style={{
                    left: `${(step.left / (height.length - 1)) * 100}%`,
                    right: `${100 - ((step.right / (height.length - 1)) * 100)}%`,
                    height: `${(step.waterHeight / 8) * 100}%`,
                  }}
                />
              )}

              {/* Walls */}
              <div className="absolute inset-0 flex items-end justify-between gap-1">
                {height.map((h, i) => {
                  const isLeft = step.left === i;
                  const isRight = step.right === i;
                  const isSelected = isLeft || isRight;
                  const isShorter = isSelected && step.waterHeight !== null && h === step.waterHeight;
                  const isBest = step.maxArea === 49 && ((i === 1 && step.left >= 1) || (i === 8 && step.right <= 8));
                  
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        backgroundColor: isBest && isSelected ? '#10b981' : isShorter ? '#fb923c' : isSelected ? '#8b5cf6' : '#64748b',
                        borderColor: isBest && isSelected ? '#059669' : isShorter ? '#f97316' : isSelected ? '#7c3aed' : '#475569',
                      }}
                      className="flex-1 rounded-t-lg border-2 relative"
                      style={{ height: `${(h / 8) * 100}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-600">
                        {h}
                      </div>
                      {isLeft && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600">
                          left
                        </div>
                      )}
                      {isRight && (
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-1">left</div>
              <div className="text-2xl font-bold text-purple-900">{step.left}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-1">right</div>
              <div className="text-2xl font-bold text-blue-900">{step.right}</div>
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
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200 md:col-span-3">
              <div className="text-xs text-amber-600 font-semibold mb-1">maxArea</div>
              <motion.div key={step.maxArea} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold text-amber-900">{step.maxArea}</motion.div>
            </div>
          </div>

          {/* Reasoning Panel */}
          {step.phase === 'reason' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">💡</div>
                <div>
                  <div className="text-sm text-orange-600 font-semibold mb-2">Why move this pointer?</div>
                  <p className="text-lg text-gray-700 leading-relaxed">{step.explanation}</p>
                  {step.moveLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-4 text-lg font-mono text-purple-600 font-bold"
                    >
                      left = left + 1
                    </motion.div>
                  )}
                  {step.moveRight && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-4 text-lg font-mono text-purple-600 font-bold"
                    >
                      right = right - 1
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Explanation */}
          {step.phase !== 'reason' && (
            <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed text-center">{step.explanation}</p>
            </motion.div>
          )}
        </div>

        {/* Code */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">C++ Code</h3>
          <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              {['class Solution {', 'public:', '    int maxArea(vector<int>& height) {', '        int maxArea = 0;', '        int left = 0;', '        int right = height.size() - 1;', '', '        while (left < right) {', '            int waterHeight = min(height[left], height[right]);', '            int width = right - left;', '            int area = waterHeight * width;', '', '            maxArea = max(maxArea, area);', '', '            if (height[left] < height[right]) {', '                left++;', '            } else {', '                right--;', '            }', '        }', '', '        return maxArea;', '    }', '};'].map((line, index) => (
                <motion.div key={index} animate={{ backgroundColor: step.codeLine === index ? 'rgba(139, 92, 246, 0.2)' : 'transparent' }} className={`px-3 py-1 rounded ${step.codeLine === index ? 'border-l-4 border-purple-400' : ''}`}>
                  <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  <code className="text-gray-100">{line}</code>
                </motion.div>
              ))}
            </pre>
          </div>
        </div>

        {/* Complexity */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
              <div className="text-4xl font-bold text-blue-900 mb-3">O(n)</div>
              <p className="text-sm text-blue-700 leading-relaxed">Single pass with two pointers moving inward. Each step processes one pair.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
              <div className="text-4xl font-bold text-purple-900 mb-3">O(1)</div>
              <p className="text-sm text-purple-700 leading-relaxed">Only three variables (left, right, maxArea) used.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
