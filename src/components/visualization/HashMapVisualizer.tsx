import { motion } from 'framer-motion';

interface HashMapVisualizerProps {
  mapContents: Map<number, number>;
  searchingKey?: number | null;
  foundKey?: number | null;
  insertingKey?: number | null;
}

export default function HashMapVisualizer({
  mapContents,
  searchingKey = null,
  foundKey = null,
  insertingKey = null,
}: HashMapVisualizerProps) {
  return (
    <div className="mb-6">
      <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Hash Map
      </div>
      <div className="bg-[#1a1625] border border-white/10 rounded-2xl p-6">
        {mapContents.size === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <span className="text-base text-white/40">Empty</span>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-white/50 uppercase tracking-wider pb-2 border-b border-white/10">
              <div>Value</div>
              <div>Index</div>
            </div>
            {Array.from(mapContents.entries()).map(([value, index]) => {
              const isSearching = searchingKey === value;
              const isFound = foundKey === value;
              const isInserting = insertingKey === value;

              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    backgroundColor: isSearching
                      ? 'rgba(251, 191, 36, 0.1)'
                      : isFound
                      ? 'rgba(16, 185, 129, 0.1)'
                      : isInserting
                      ? 'rgba(139, 92, 246, 0.1)'
                      : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-2 gap-4 text-base font-mono py-2 px-3 rounded-lg ${
                    isFound
                      ? 'border border-emerald-400/30'
                      : isSearching
                      ? 'border border-amber-400/30'
                      : isInserting
                      ? 'border border-purple-400/30'
                      : ''
                  }`}
                >
                  <div
                    className={`font-bold ${
                      isFound
                        ? 'text-emerald-300'
                        : isSearching
                        ? 'text-amber-300'
                        : isInserting
                        ? 'text-purple-300'
                        : 'text-purple-300'
                    }`}
                  >
                    {value}
                    {isFound && ' ✓'}
                    {isSearching && ' ?'}
                    {isInserting && ' ←'}
                  </div>
                  <div className="text-white/80">{index}</div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
