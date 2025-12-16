import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUser } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (phone: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'anilhasBalance' | 'referralCode' | 'referralCount' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  loginAsAdmin: (email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (phone: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For MVP, accept any valid phone format
    if (phone.replace(/\D/g, '').length >= 10) {
      setUser(mockUser);
      setIsAdmin(false);
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'anilhasBalance' | 'referralCode' | 'referralCount' | 'createdAt'>): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      anilhasBalance: 100, // Welcome bonus
      referralCode: userData.name.split(' ')[0].toUpperCase() + '2024',
      referralCount: 0,
      createdAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    setIsAdmin(false);
    return true;
  };

  const loginAsAdmin = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For MVP demo purposes
    if (email === 'admin@body.com' && password === 'admin123') {
      setIsAdmin(true);
      setUser(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user || isAdmin,
        isAdmin,
        login,
        register,
        logout,
        loginAsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
