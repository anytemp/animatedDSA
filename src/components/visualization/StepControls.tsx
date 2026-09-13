import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed?: number;
  onPrevious: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  onSpeedChange?: (speed: number) => void;
}

export default function StepControls({
  currentStep,
  totalSteps,
  isPlaying,
  speed = 1,
  onPrevious,
  onNext,
  onPlayPause,
  onReset,
  onSpeedChange,
}: StepControlsProps) {
  const speeds = [0.5, 1, 1.5, 2];
  
  return (
    <div className="space-y-4">
      {/* Step Counter */}
      <div className="text-center">
        <span className="text-sm font-mono text-white/60">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
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

      {/* Speed Control */}
      {onSpeedChange && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-white/50">Speed:</span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                speed === s
                  ? 'bg-purple-500/20 border border-purple-400/30 text-purple-300'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
