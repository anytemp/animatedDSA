import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowRight, Filter, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, type Problem } from '../data/problems';
import { useProblems } from '../context/ProblemContext';

export default function Blind75Library() {
  const { problems, completedCount } = useProblems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        problem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.pattern.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;

      // Status filter
      const matchesStatus = selectedStatus === 'All' || problem.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });
  }, [problems, searchQuery, selectedCategory, selectedDifficulty, selectedStatus]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedStatus !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0F0D16 0%, #171321 40%, #1F1A2E 70%, #2B253A 100%)',
    }}>
      {/* Subtle violet light accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-lavender/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-lavender/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-dark/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-lavender mb-4">
              <BookOpen size={12} />
              The Core Collection
            </span>

            <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              Blind 75
            </h1>

            <p className="text-lg lg:text-xl text-text-on-dark/80 leading-relaxed max-w-2xl mb-8">
              Build your algorithmic foundation through carefully organized problems, 
              recognizable patterns, and visual-first learning.
            </p>

            {/* Progress Section */}
            <div className="bg-white/90 backdrop-blur-xl border border-border rounded-2xl p-6 max-w-md shadow-lg shadow-black/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-text-secondary">Progress</span>
                <span className="text-sm font-bold text-dark">{completedCount} / 75 completed</span>
              </div>
              <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / 75) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-lavender to-dark rounded-full"
                />
              </div>
              <p className="text-xs text-text-light mt-3">
                Start with one problem. Build the ability to solve many.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="sticky top-16 lg:top-20 z-40 bg-[#171321]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
              <input
                type="text"
                placeholder="Search problems, topics, or patterns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text-primary transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 transition-all cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 transition-all cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 transition-all cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              {/* Reset Button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 bg-dark text-white rounded-xl text-sm font-semibold hover:bg-dark-light transition-all flex items-center gap-2"
                >
                  <X size={14} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center gap-2">
            <Filter size={14} className="text-text-on-dark/50" />
            <span className="text-sm text-text-on-dark/70">
              Showing <span className="font-semibold text-white">{filteredProblems.length}</span> of 75 problems
            </span>
          </div>
        </div>
      </section>

      {/* Problem Grid */}
      <section className="relative py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {filteredProblems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-lg text-text-on-dark/70 mb-2">No problems found</p>
              <p className="text-sm text-text-on-dark/50">Try adjusting your filters or search query</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {filteredProblems.map((problem, i) => (
                <ProblemCard key={problem.id} problem={problem} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const difficultyColors = {
    Easy: 'text-emerald-700 bg-emerald-50 border-emerald-200/50',
    Medium: 'text-amber-700 bg-amber-50 border-amber-200/50',
    Hard: 'text-rose-700 bg-rose-50 border-rose-200/50',
  };

  const statusColors = {
    'Not Started': 'text-text-light',
    'In Progress': 'text-dark font-semibold',
    'Completed': 'text-emerald-600 font-semibold',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        to={`/problem/${problem.id}`}
        className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-lavender/30 hover:shadow-lg hover:shadow-lavender/10 transition-all duration-300 block"
      >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-mono text-text-light">{String(problem.id).padStart(2, '0')}</span>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>

      <h3 className="font-mono text-lg font-semibold text-text-primary mb-3 group-hover:text-dark transition-colors duration-200 leading-snug tracking-tight">
        {problem.name}
      </h3>

      <div className="flex items-center gap-3 mt-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-secondary">{problem.category}</span>
        </div>
        <span className="text-border">·</span>
        <span className="text-xs text-text-light font-mono">{problem.pattern}</span>
      </div>

      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
        <span className={`text-[10px] uppercase tracking-wider ${statusColors[problem.status]} font-semibold`}>
          {problem.status}
        </span>
        <ArrowRight size={14} className="text-border group-hover:text-dark group-hover:translate-x-0.5 transition-all duration-200" />
      </div>
      </Link>
    </motion.div>
  );
}
