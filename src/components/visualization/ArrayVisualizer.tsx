import { motion } from 'framer-motion';

interface ArrayVisualizerProps {
  nums: number[];
  pointers?: { index: number; label: string; color: string }[];
  highlightedIndices?: number[];
  foundIndices?: number[];
  currentIndices?: number[];
  visitedIndices?: number[];
}

export default function ArrayVisualizer({
  nums,
  pointers = [],
  highlightedIndices = [],
  foundIndices = [],
  currentIndices = [],
  visitedIndices = [],
}: ArrayVisualizerProps) {
  const getCellStyle = (index: number) => {
    if (foundIndices.includes(index)) {
      return 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 text-white scale-110 shadow-xl shadow-emerald-500/30';
    }
    if (currentIndices.includes(index)) {
      return 'bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-300 text-white scale-105 shadow-lg shadow-blue-500/20';
    }
    if (highlightedIndices.includes(index)) {
      return 'bg-gradient-to-br from-purple-400 to-violet-500 border-purple-300 text-white scale-105 shadow-lg shadow-purple-500/20';
    }
    if (visitedIndices.includes(index)) {
      return 'bg-[#2d2640] border-purple-500/30 text-white/60';
    }
    return 'bg-[#1a1625] border-[#2d2640] text-white/80';
  };

  return (
    <div className="mb-6">
      <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Array
      </div>
      <div className="flex items-end gap-3 mb-2 flex-wrap">
        {nums.map((num, i) => {
          const pointer = pointers.find(p => p.index === i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex flex-col items-center gap-2"
            >
              {pointer && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="text-xs font-bold px-2 py-1 rounded-lg mb-1"
                    style={{ backgroundColor: pointer.color + '20', color: pointer.color }}
                  >
                    {pointer.label}
                  </div>
                  <div
                    className="w-0.5 h-3"
                    style={{ backgroundColor: pointer.color }}
                  />
                </motion.div>
              )}
              <div className="text-xs font-mono text-white/40">{i}</div>
              <motion.div
                animate={{
                  scale:
                    foundIndices.includes(i) || currentIndices.includes(i)
                      ? 1.05
                      : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-mono font-bold border-2 transition-all duration-300 ${getCellStyle(i)}`}
              >
                {num}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
