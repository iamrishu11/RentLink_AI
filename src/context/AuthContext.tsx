
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>; // Alias for login
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  signUp: (email: string, password: string, userData?: { name: string, company?: string }) => Promise<void>; // Alias for signup
  logout: () => void;
  signOut: () => void; // Alias for logout
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API
      // For demo, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user based on the email
      let role: UserRole = "manager";
      if (email.includes('tenant')) {
        role = "tenant";
      } else if (email.includes('admin')) {
        role = "admin";
      }
      
      const userData: User = {
        id: '123',
        email,
        name: email.split('@')[0],
        role,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add signIn as an alias for login
  const signIn = login;

  const signup = async (name: string, email: string, password: string, role: UserRole = "manager") => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API
      // For demo, we'll simulate a successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add signUp with new signature but call the original signup
  const signUp = async (email: string, password: string, userData?: { name: string, company?: string }) => {
    if (!userData || !userData.name) {
      throw new Error('Name is required for signup');
    }
    
    const user: User = {
      ...userData,
      email,
      id: Math.random().toString(36).substr(2, 9),
      role: 'manager',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
    };
    
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Add signOut as an alias for logout
  const signOut = logout;

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      // In a real app, this would call an API
      // For demo, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update failed:', error);
      throw new Error('Profile update failed. Please try again.');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signIn,
    signup,
    signUp,
    logout,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
