import { motion } from 'framer-motion';

interface ComplexityCardProps {
  timeComplexity: string;
  spaceComplexity: string;
  timeExplanation?: string;
  spaceExplanation?: string;
}

export default function ComplexityCard({
  timeComplexity,
  spaceComplexity,
  timeExplanation,
  spaceExplanation,
}: ComplexityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
    >
      <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-6">
        Complexity Analysis
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Time Complexity
          </div>
          <div className="text-3xl font-mono font-bold text-blue-400 mb-2">
            {timeComplexity}
          </div>
          {timeExplanation && (
            <p className="text-sm text-white/70 leading-relaxed">
              {timeExplanation}
            </p>
          )}
        </div>
        <div>
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Space Complexity
          </div>
          <div className="text-3xl font-mono font-bold text-purple-400 mb-2">
            {spaceComplexity}
          </div>
          {spaceExplanation && (
            <p className="text-sm text-white/70 leading-relaxed">
              {spaceExplanation}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
