import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onReset: () => void;
}

export default function StepControls({
  currentStep,
  totalSteps,
  isPlaying,
  onPrevious,
  onNext,
  onPlayPause,
  onReset,
}: StepControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-sm font-semibold transition-all"
      >
        <RotateCcw size={16} />
        Reset
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <SkipBack size={16} />
        Previous
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? 'Pause' : 'Play'}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
        <SkipForward size={16} />
      </motion.button>
    </div>
  );
}
