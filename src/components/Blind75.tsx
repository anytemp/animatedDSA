import { motion } from 'framer-motion';
import { ArrowRight, Hash, Layers, Zap, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Problem {
  number: string;
  name: string;
  topic: string;
  pattern: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const problems: Problem[] = [
  { number: '01', name: 'Two Sum', topic: 'Array', pattern: 'Hash Map', difficulty: 'Easy' },
  { number: '02', name: 'Best Time to Buy and Sell Stock', topic: 'Array', pattern: 'Sliding Window', difficulty: 'Easy' },
  { number: '03', name: 'Contains Duplicate', topic: 'Array', pattern: 'Hash Set', difficulty: 'Easy' },
  { number: '04', name: 'Product of Array Except Self', topic: 'Array', pattern: 'Prefix / Suffix', difficulty: 'Medium' },
  { number: '05', name: 'Valid Anagram', topic: 'String', pattern: 'Hash Map', difficulty: 'Easy' },
  { number: '06', name: 'Group Anagrams', topic: 'String', pattern: 'Hash Map', difficulty: 'Medium' },
];

const difficultyColors = {
  Easy: 'text-emerald-700 bg-emerald-50 border-emerald-200/50',
  Medium: 'text-amber-700 bg-amber-50 border-amber-200/50',
  Hard: 'text-rose-700 bg-rose-50 border-rose-200/50',
};

const topicIcons: Record<string, typeof Hash> = {
  Array: Hash,
  String: Layers,
};

export default function Blind75() {
  return (
    <section id="blind75" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px decorative-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px decorative-line" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-lavender/8 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dark mb-4">
              <Zap size={12} />
              Featured Collection
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold text-text-primary mb-6">
              Your path through{' '}
              <span className="italic font-medium text-dark">Blind 75.</span>
            </h2>
            <p className="text-lg text-text-body leading-relaxed">
              Build strong problem-solving foundations through carefully organized questions,
              patterns, and visual learning.
            </p>
          </motion.div>
        </div>

        {/* Problem cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-12">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.number} problem={problem} index={i} />
          ))}

          {/* "More coming" card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[200px] border-dashed border-2 border-border/60 bg-transparent"
          >
            <Circle size={24} className="text-border mb-3" />
            <p className="text-sm font-semibold text-text-secondary">69 more problems</p>
            <p className="text-xs text-text-light mt-1">Organized by pattern</p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Link
            to="/blind75"
            className="group inline-flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-dark-light transition-all duration-300 hover:shadow-xl hover:shadow-dark/10"
          >
            View all 75 problems
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const Icon = topicIcons[problem.topic] || Hash;
  const problemId = parseInt(problem.number);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        to={`/problem/${problemId}`}
        className="glass-card rounded-2xl p-6 text-left group cursor-pointer hover:border-lavender/30 hover:shadow-lg hover:shadow-lavender/10 transition-all duration-300 block"
      >
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-mono text-text-light">{problem.number}</span>
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>

      <h3 className="font-mono text-lg font-semibold text-text-primary mb-3 group-hover:text-dark transition-colors duration-200 leading-snug tracking-tight">
        {problem.name}
      </h3>
        <div className="flex items-center gap-3 mt-auto">
          <div className="flex items-center gap-1.5">
            <Icon size={12} className="text-text-light" />
            <span className="text-xs text-text-secondary">{problem.topic}</span>
          </div>
          <span className="text-border">·</span>
          <span className="text-xs text-text-light font-mono">{problem.pattern}</span>
        </div>

        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-text-light font-semibold">
            Not started
          </span>
          <ArrowRight size={14} className="text-border group-hover:text-dark group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </Link>
    </motion.div>
  );
}
