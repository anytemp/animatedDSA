import { motion } from 'framer-motion';

export type ApproachType = 'brute' | 'better' | 'optimal';

interface ApproachTabsProps {
  currentApproach: ApproachType;
  onApproachChange: (approach: ApproachType) => void;
}

export default function ApproachTabs({
  currentApproach,
  onApproachChange,
}: ApproachTabsProps) {
  const approaches = [
    { id: 'brute' as ApproachType, label: 'Brute Force' },
    { id: 'better' as ApproachType, label: 'Better Approach' },
    { id: 'optimal' as ApproachType, label: 'Optimal Approach' },
  ];

  return (
    <div className="flex items-center gap-2 mb-8 flex-wrap">
      {approaches.map((approach) => (
        <motion.button
          key={approach.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onApproachChange(approach.id)}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
            currentApproach === approach.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20'
              : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20'
          }`}
        >
          {approach.label}
        </motion.button>
      ))}
    </div>
  );
}
