import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { problems as initialProblems, type Problem, type ProblemStatus } from '../data/problems';
import { useAuth } from './AuthContext';

type ProblemContextType = {
  problems: Problem[];
  updateProblemStatus: (id: number, status: ProblemStatus) => void;
  getProblem: (id: number) => Problem | undefined;
  completedCount: number;
};

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

const STORAGE_KEY = 'aurora-algorithms-problem-status';

export function ProblemProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, progress } = useAuth();
  
  const [problems, setProblems] = useState<Problem[]>(() => {
    // If user is authenticated, use their progress from auth context
    if (isAuthenticated && progress) {
      return initialProblems.map(p => ({
        ...p,
        status: progress.completed.includes(p.id) 
          ? 'Completed' 
          : progress.inProgress.includes(p.id)
          ? 'In Progress'
          : 'Not Started',
      }));
    }
    
    // Otherwise, load from localStorage (for non-authenticated users)
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

  // Update problems when auth state changes
  useEffect(() => {
    if (isAuthenticated && progress) {
      setProblems(initialProblems.map(p => ({
        ...p,
        status: progress.completed.includes(p.id) 
          ? 'Completed' 
          : progress.inProgress.includes(p.id)
          ? 'In Progress'
          : 'Not Started',
      })));
    }
  }, [isAuthenticated, progress]);

  // Persist to localStorage when problems change (only for non-authenticated users)
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const statusMap: Record<number, ProblemStatus> = {};
        problems.forEach(p => {
          statusMap[p.id] = p.status;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
      } catch (e) {
        console.warn('Failed to save problem status to localStorage');
      }
    }
  }, [problems, isAuthenticated]);

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
