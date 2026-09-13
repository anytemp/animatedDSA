import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ContainerWithMostWaterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedLeft, setSelectedLeft] = useState(1);
  const [selectedRight, setSelectedRight] = useState(8);

  const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  
  const waterHeight = Math.min(height[selectedLeft], height[selectedRight]);
  const width = selectedRight - selectedLeft;
  const area = waterHeight * width;

  const handleStartLearning = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/problem/10/visualize');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20">
      {/* Subtle vertical lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 40px)`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-gray-500">10</span>
            <span className="text-gray-400">·</span>
            <span className="text-sm font-medium text-gray-600">Array</span>
            <span className="text-gray-400">·</span>
            <span className="text-sm font-medium text-gray-600">Two Pointers</span>
            <span className="text-gray-400">·</span>
            <span className="text-sm font-medium text-amber-600">Medium</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Container With Most Water
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
            You are given an integer array <code className="font-mono bg-gray-100 px-2 py-1 rounded">height</code> of length <code className="font-mono bg-gray-100 px-2 py-1 rounded">n</code>. There are <code className="font-mono bg-gray-100 px-2 py-1 rounded">n</code> vertical lines where the endpoints of the <code className="font-mono bg-gray-100 px-2 py-1 rounded">i-th</code> line are <code className="font-mono bg-gray-100 px-2 py-1 rounded">(i, 0)</code> and <code className="font-mono bg-gray-100 px-2 py-1 rounded">(i, height[i])</code>.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mt-4">
            Find two lines that, together with the x-axis, form a container that holds the most water. Return the maximum amount of water the container can store. You may not slant the container.
          </p>
        </motion.div>

        {/* Visual Input/Output Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Visualize the Problem</h2>
          
          <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 mb-6">
            {/* Water Container Visualization */}
            <div className="relative h-96 mb-8">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-400 font-mono">
                <span>8</span>
                <span>6</span>
                <span>4</span>
                <span>2</span>
                <span>0</span>
              </div>

              {/* Container area */}
              <div className="ml-12 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[8, 6, 4, 2, 0].map((level, i) => (
                    <div key={i} className="border-t border-gray-100 w-full" />
                  ))}
                </div>

                {/* Water between selected walls */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 bg-cyan-200/40 border-t-2 border-cyan-400"
                  style={{
                    left: `${(selectedLeft / (height.length - 1)) * 100}%`,
                    right: `${100 - ((selectedRight / (height.length - 1)) * 100)}%`,
                    height: `${(waterHeight / 8) * 100}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/30 to-cyan-400/50" />
                </motion.div>

                {/* Walls */}
                <div className="absolute inset-0 flex items-end justify-between gap-1">
                  {height.map((h, i) => {
                    const isSelected = i === selectedLeft || i === selectedRight;
                    const isLeft = i === selectedLeft;
                    const isRight = i === selectedRight;
                    const isShorter = isSelected && h === waterHeight;
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer"
                        onClick={() => {
                          if (i < selectedRight) setSelectedLeft(i);
                          else if (i > selectedLeft) setSelectedRight(i);
                        }}
                      >
                        {/* Wall */}
                        <motion.div
                          animate={{
                            backgroundColor: isShorter ? '#fb923c' : isSelected ? '#8b5cf6' : '#64748b',
                            borderColor: isShorter ? '#f97316' : isSelected ? '#7c3aed' : '#475569',
                          }}
                          className="w-full rounded-t-lg border-2 relative"
                          style={{ height: `${(h / 8) * 100}%` }}
                        >
                          {/* Height label */}
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-600">
                            {h}
                          </div>
                          
                          {/* Pointer labels */}
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
                        
                        {/* Index label */}
                        <div className="mt-2 text-xs font-mono text-gray-500">
                          {i}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Width indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-12 flex items-center justify-center"
                  style={{
                    left: `${(selectedLeft / (height.length - 1)) * 100}%`,
                    right: `${100 - ((selectedRight / (height.length - 1)) * 100)}%`,
                  }}
                >
                  <div className="bg-white/90 px-3 py-1 rounded-lg border border-gray-300 text-sm font-mono text-gray-700">
                    width = {width}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Calculation Panel */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="text-sm text-blue-600 font-semibold mb-3">Current Selection</div>
                <div className="space-y-2 text-lg font-mono text-gray-900">
                  <div>height[{selectedLeft}] = <span className="font-bold text-purple-600">{height[selectedLeft]}</span></div>
                  <div>height[{selectedRight}] = <span className="font-bold text-purple-600">{height[selectedRight]}</span></div>
                  <div className="pt-2 border-t border-blue-200">
                    waterHeight = min({height[selectedLeft]}, {height[selectedRight]}) = <span className="font-bold text-cyan-600">{waterHeight}</span>
                  </div>
                  <div>
                    width = {selectedRight} - {selectedLeft} = <span className="font-bold text-cyan-600">{width}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200">
                <div className="text-sm text-emerald-600 font-semibold mb-3">Area Calculation</div>
                <div className="space-y-2 text-lg font-mono text-gray-900">
                  <div>area = waterHeight × width</div>
                  <div>area = {waterHeight} × {width}</div>
                  <div className="pt-2 border-t border-emerald-200">
                    area = <span className="text-3xl font-bold text-emerald-600">{area}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                💡 The amount of water depends on the <span className="font-bold text-orange-600">shorter wall</span> and the <span className="font-bold text-cyan-600">distance between the two walls</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Example 1</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-3">Input</div>
                  <div className="font-mono text-lg text-gray-900">
                    height = [1,8,6,2,5,4,8,3,7]
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-3">Output</div>
                  <div className="font-mono text-2xl text-emerald-600 font-bold">
                    49
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-3">Explanation</div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The lines at index 1 and index 8 form the maximum container. Area = min(8, 7) × (8 - 1) = 7 × 7 = 49
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">2</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Example 2</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-3">Input</div>
                  <div className="font-mono text-lg text-gray-900">
                    height = [1,1]
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-3">Output</div>
                  <div className="font-mono text-2xl text-emerald-600 font-bold">
                    1
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-3">Explanation</div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The two walls both have height 1. Area = min(1, 1) × (1 - 0) = 1 × 1 = 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Constraints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Constraints</h2>
          <div className="bg-white rounded-2xl p-8 border-2 border-blue-200">
            <div className="border-l-4 border-blue-400 pl-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-lg text-gray-700">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span className="font-mono leading-relaxed">2 ≤ height.length ≤ 10⁵</span>
                </li>
                <li className="flex items-start gap-4 text-lg text-gray-700">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span className="font-mono leading-relaxed">0 ≤ height[i] ≤ 10⁴</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Key Observation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Observation</h2>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
            <p className="text-xl text-gray-700 leading-relaxed">
              The area is determined by the <span className="font-bold text-orange-600">shorter wall</span> and the <span className="font-bold text-cyan-600">distance between walls</span>. 
              To maximize area, we need to find the optimal balance between wall height and width.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartLearning}
            className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
          >
            Start Learning
            <ArrowRight size={20} />
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://leetcode.com/problems/container-with-most-water/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200"
          >
            Practice on LeetCode
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
