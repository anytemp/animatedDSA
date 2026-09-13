import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { problems as initialProblems, type Problem, type ProblemStatus } from '../data/problems';

type ProblemContextType = {
  problems: Problem[];
  updateProblemStatus: (id: number, status: ProblemStatus) => void;
  getProblem: (id: number) => Problem | undefined;
  completedCount: number;
};

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

const STORAGE_KEY = 'aurora-algorithms-problem-status';

export function ProblemProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>(() => {
    // Load from localStorage on initial render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const statusMap = JSON.parse(stored) as Record<number, ProblemStatus>;
        return initialProblems.map(p => ({
          ...p,
          status: statusMap[p.id] || 'Not Started',
        }));
      }
    } catch (e) {
      console.warn('Failed to load problem status from localStorage');
    }
    return initialProblems;
  });

  // Persist to localStorage when problems change
  useEffect(() => {
    try {
      const statusMap: Record<number, ProblemStatus> = {};
      problems.forEach(p => {
        statusMap[p.id] = p.status;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
    } catch (e) {
      console.warn('Failed to save problem status to localStorage');
    }
  }, [problems]);

  const updateProblemStatus = (id: number, status: ProblemStatus) => {
    setProblems(prev =>
      prev.map(p => (p.id === id ? { ...p, status } : p))
    );
  };

  const getProblem = (id: number) => problems.find(p => p.id === id);

  const completedCount = problems.filter(p => p.status === 'Completed').length;

  return (
    <ProblemContext.Provider
      value={{ problems, updateProblemStatus, getProblem, completedCount }}
    >
      {children}
    </ProblemContext.Provider>
  );
}

export function useProblems() {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblems must be used within a ProblemProvider');
  }
  return context;
}
