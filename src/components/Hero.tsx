import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const floatingElements = [
  { label: 'Compare', x: '12%', y: '20%', delay: 0.3 },
  { label: 'Store', x: '75%', y: '15%', delay: 0.5 },
  { label: 'Search', x: '85%', y: '65%', delay: 0.7 },
  { label: 'Solve', x: '8%', y: '72%', delay: 0.9 },
];

const arrayValues = [3, 7, 1, 9, 4, 6, 2, 8];
const highlightedIndices = [1, 5];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-lavender/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-lavender/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-dark/3 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full py-16 lg:py-24">
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest uppercase text-text-light">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-border to-transparent"
          />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dark bg-lavender/20 px-4 py-2 rounded-full border border-lavender/30">
                <span className="w-1.5 h-1.5 rounded-full bg-dark animate-pulse" />
                Visual DSA Learning
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] tracking-tight font-bold text-text-primary mb-8"
            >
              Understand the
              <br />
              <span className="italic font-medium text-dark">algorithm.</span>
              <br />
              Not just the{' '}
              <span className="relative inline-block">
                answer
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <motion.path
                    d="M2 6C50 2 150 2 198 6"
                    stroke="#C5BAE0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg lg:text-xl text-text-body leading-relaxed max-w-lg mb-10"
            >
              Master data structures and algorithms through visual explanations,
              synchronized code, and deliberate practice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/blind75"
                className="group inline-flex items-center gap-3 bg-dark text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-dark-light transition-all duration-300 hover:shadow-xl hover:shadow-dark/10"
              >
                Explore Blind 75
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-border text-text-primary px-7 py-4 rounded-full text-sm font-semibold hover:bg-white hover:border-lavender/40 transition-all duration-300"
              >
                <Play size={14} className="text-dark" />
                See how it works
              </a>
            </motion.div>
          </div>

          {/* Right: Algorithm Canvas */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <AlgorithmCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}

function AlgorithmCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full aspect-square max-w-[580px] mx-auto lg:ml-auto"
    >
      {/* Central orb */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lavender/20 via-dark/5 to-lavender/10 blur-xl" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-lavender/10 to-dark/5 border border-lavender/15" />
        <div className="absolute inset-8 rounded-full bg-white/60 border border-border/40 backdrop-blur-sm" />
      </motion.div>

      {/* Array visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-[30%] left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2"
      >
        {arrayValues.map((val, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
            className={`relative flex flex-col items-center`}
          >
            <span className="text-[9px] text-text-light mb-1 font-mono">{i}</span>
            <div
              className={`w-8 h-10 sm:w-10 sm:h-12 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                highlightedIndices.includes(i)
                  ? 'bg-lavender/25 border border-lavender/50 text-text-primary shadow-sm shadow-lavender/20'
                  : 'bg-white/80 border border-border text-text-primary backdrop-blur-sm'
              }`}
            >
              {val}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Target indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="absolute top-[22%] left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <span className="text-[10px] font-mono text-text-light tracking-wider font-medium">TARGET</span>
        <span className="text-xs font-mono font-bold text-dark bg-lavender/20 px-2 py-0.5 rounded border border-lavender/30">
          13
        </span>
      </motion.div>

      {/* Connector lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 580 580">
        <motion.path
          d="M 200 250 Q 250 300 290 290"
          stroke="#C5BAE0"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />
        <motion.path
          d="M 380 250 Q 340 300 300 290"
          stroke="#9B8EC4"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.7 }}
        />
        <motion.path
          d="M 290 320 Q 290 380 250 420"
          stroke="#C5BAE0"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.9 }}
        />
      </svg>

      {/* Floating labels */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: el.delay + 1.2 },
            scale: { duration: 0.5, delay: el.delay + 1.2 },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: el.delay + 1.5 },
          }}
          className="absolute"
          style={{ left: el.x, top: el.y }}
        >
          <div className="glass-card px-3 py-1.5 rounded-lg">
            <span className="text-[10px] font-mono font-semibold text-text-secondary tracking-wider uppercase">
              {el.label}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Code fragment */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-[18%] left-[5%] glass-card rounded-lg p-3 max-w-[180px]"
      >
        <div className="font-mono text-[10px] leading-relaxed text-text-secondary">
          <span className="text-dark font-semibold">if</span> (nums[i] + nums[j]
          <br />
          &nbsp;&nbsp;=== target)
          <br />
          &nbsp;&nbsp;<span className="text-dark font-semibold">return</span> [i, j]
        </div>
      </motion.div>

      {/* Graph nodes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-[25%] right-[8%]"
      >
        <svg width="100" height="80" viewBox="0 0 100 80" className="opacity-70">
          <motion.line x1="20" y1="20" x2="50" y2="40" stroke="#C5BAE0" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 2.3 }} />
          <motion.line x1="50" y1="40" x2="80" y2="25" stroke="#9B8EC4" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 2.5 }} />
          <motion.line x1="50" y1="40" x2="60" y2="65" stroke="#C5BAE0" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 2.7 }} />
          <motion.circle cx="20" cy="20" r="5" fill="#EBEBEB" stroke="#C5BAE0" strokeWidth="1.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 2.3 }} />
          <motion.circle cx="50" cy="40" r="6" fill="#EBEBEB" stroke="#9B8EC4" strokeWidth="1.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 2.5 }} />
          <motion.circle cx="80" cy="25" r="4" fill="#EBEBEB" stroke="#C5BAE0" strokeWidth="1.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 2.7 }} />
          <motion.circle cx="60" cy="65" r="4" fill="#EBEBEB" stroke="#D4CEE8" strokeWidth="1.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 2.9 }} />
        </svg>
      </motion.div>

      {/* Hash map annotation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        className="absolute top-[55%] right-[15%] glass-card rounded-lg p-2.5"
      >
        <div className="text-[9px] font-mono text-text-light mb-1.5 tracking-wider uppercase font-semibold">Map</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-lavender/20 border border-lavender/30 flex items-center justify-center text-[9px] font-mono font-semibold text-text-primary">3</span>
            <span className="text-[9px] text-text-light">→</span>
            <span className="text-[9px] font-mono text-text-secondary">idx: 0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-dark/10 border border-dark/20 flex items-center justify-center text-[9px] font-mono font-semibold text-text-primary">7</span>
            <span className="text-[9px] text-text-light">→</span>
            <span className="text-[9px] font-mono text-text-secondary">idx: 1</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
