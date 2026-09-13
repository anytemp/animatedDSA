import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BruteForceVisualizer from '../components/visualization/ContainerBruteForceVisualizer';
import BetterVisualizer from '../components/visualization/ContainerBetterVisualizer';
import OptimalVisualizer from '../components/visualization/ContainerOptimalVisualizer';

export default function ContainerWithMostWaterLearningPage() {
  const [currentApproach, setCurrentApproach] = useState<'brute' | 'better' | 'optimal'>('optimal');

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
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
              Container With Most Water
            </h1>
            <Link
              to="/problem/10"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200"
            >
              <ArrowRight size={18} className="rotate-180" />
              Back to Problem Intro
            </Link>
          </div>
        </motion.div>

        {/* Approach Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setCurrentApproach('brute')}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                currentApproach === 'brute'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400'
              }`}
            >
              Brute Force
            </button>
            <button
              onClick={() => setCurrentApproach('better')}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                currentApproach === 'better'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400'
              }`}
            >
              Better / Improved
            </button>
            <button
              onClick={() => setCurrentApproach('optimal')}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                currentApproach === 'optimal'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400'
              }`}
            >
              Optimal: Two Pointers
            </button>
          </div>
        </motion.div>

        {/* Approach Content */}
        <motion.div
          key={currentApproach}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {currentApproach === 'brute' && (
            <>
              {/* 1. Explanation */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Brute Force Approach</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Try every possible pair of lines. For each pair, calculate the water level using the shorter line, calculate the width, calculate the area, and update the maximum area.
                </p>
              </div>

              {/* 2. Visualization */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
                <BruteForceVisualizer />
              </div>

              {/* 3. C++ Code */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">C++ Code</h3>
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-100 leading-relaxed">
{`class Solution {
public:
    int maxArea(vector<int>& height) {
        int maxArea = 0;

        for (int left = 0; left < height.size(); left++) {
            for (int right = left + 1; right < height.size(); right++) {
                int waterHeight = min(height[left], height[right]);
                int width = right - left;
                int area = waterHeight * width;

                maxArea = max(maxArea, area);
            }
        }

        return maxArea;
    }
};`}
                  </pre>
                </div>
              </div>

              {/* 4. Complexity Analysis */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">O(n²)</div>
                    <p className="text-sm text-blue-700">Two nested loops check every pair</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">O(1)</div>
                    <p className="text-sm text-purple-700">Only a few variables used</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentApproach === 'better' && (
            <>
              {/* 1. Explanation */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Improved Brute Force — Still O(n²)</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This is an optional intermediate approach. The code is the same as brute force, but we can add simple optimizations like early termination hints. However, the asymptotic complexity remains O(n²). The standard optimal solution is the two-pointer method.
                </p>
              </div>

              {/* 2. Visualization */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
                <BetterVisualizer />
              </div>

              {/* 3. C++ Code */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">C++ Code</h3>
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-100 leading-relaxed">
{`class Solution {
public:
    int maxArea(vector<int>& height) {
        int maxArea = 0;

        for (int left = 0; left < height.size(); left++) {
            for (int right = left + 1; right < height.size(); right++) {
                int waterHeight = min(height[left], height[right]);
                int width = right - left;
                int area = waterHeight * width;

                maxArea = max(maxArea, area);
            }
        }

        return maxArea;
    }
};`}
                  </pre>
                </div>
              </div>

              {/* 4. Complexity Analysis */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">O(n²)</div>
                    <p className="text-sm text-blue-700">Still O(n²) - no asymptotic improvement</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">O(1)</div>
                    <p className="text-sm text-purple-700">Only a few variables used</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentApproach === 'optimal' && (
            <>
              {/* 1. Explanation */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimal: Two-Pointer Approach</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Start with the widest possible container using the first and last lines. Calculate its area. The shorter line limits the water level, so moving the taller line cannot improve the result. Therefore, move the shorter line inward and repeat.
                </p>
              </div>

              {/* 2. Visualization */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
                <OptimalVisualizer />
              </div>

              {/* 3. C++ Code */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">C++ Code</h3>
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-100 leading-relaxed">
{`class Solution {
public:
    int maxArea(vector<int>& height) {
        int maxArea = 0;
        int left = 0;
        int right = height.size() - 1;

        while (left < right) {
            int waterHeight = min(height[left], height[right]);
            int width = right - left;
            int area = waterHeight * width;

            maxArea = max(maxArea, area);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
};`}
                  </pre>
                </div>
              </div>

              {/* 4. Complexity Analysis */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Complexity Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Time Complexity</div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">O(n)</div>
                    <p className="text-sm text-blue-700">Single pass with two pointers</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Space Complexity</div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">O(1)</div>
                    <p className="text-sm text-purple-700">Only three variables used</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
