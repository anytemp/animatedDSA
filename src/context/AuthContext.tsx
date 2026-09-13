import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserProgress {
  completed: number[];
  inProgress: number[];
}

interface AuthContextType {
  user: User | null;
  progress: UserProgress | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  markComplete: (problemId: number) => void;
  markInProgress: (problemId: number) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'aurora_users',
  CURRENT_USER: 'aurora_current_user',
  PROGRESS: 'aurora_progress',
};

// Mock database functions
const getStoredUsers = (): Array<User & { password: string }> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: Array<User & { password: string }>) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getStoredProgress = (): Record<string, UserProgress> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveProgress = (progress: Record<string, UserProgress>) => {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Load current user on mount
  useEffect(() => {
    const currentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (currentUserId) {
      const users = getStoredUsers();
      const foundUser = users.find(u => u.id === currentUserId);
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        
        const allProgress = getStoredProgress();
        setProgress(allProgress[currentUserId] || { completed: [], inProgress: [] });
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, foundUser.id);
    
    const allProgress = getStoredProgress();
    setProgress(allProgress[foundUser.id] || { completed: [], inProgress: [] });
    
    return { success: true };
  };

  const signup = (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
    };

    users.push(newUser);
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, newUser.id);
    
    const allProgress = getStoredProgress();
    allProgress[newUser.id] = { completed: [], inProgress: [] };
    saveProgress(allProgress);
    setProgress({ completed: [], inProgress: [] });
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setProgress(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  const markComplete = (problemId: number) => {
    if (!user || !progress) return;

    const newProgress: UserProgress = {
      completed: [...new Set([...progress.completed, problemId])],
      inProgress: progress.inProgress.filter(id => id !== problemId),
    };

    setProgress(newProgress);
    
    const allProgress = getStoredProgress();
    allProgress[user.id] = newProgress;
    saveProgress(allProgress);
  };

  const markInProgress = (problemId: number) => {
    if (!user || !progress) return;

    if (progress.completed.includes(problemId)) return;

    const newProgress: UserProgress = {
      completed: progress.completed,
      inProgress: [...new Set([...progress.inProgress, problemId])],
    };

    setProgress(newProgress);
    
    const allProgress = getStoredProgress();
    allProgress[user.id] = newProgress;
    saveProgress(allProgress);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        login,
        signup,
        logout,
        markComplete,
        markInProgress,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
