
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'tenant';
  company?: string;
  avatarUrl?: string;
  profileImage?: string;
  createdAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: { name: string, company?: string }) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: 'admin' | 'manager' | 'tenant') => Promise<void>;
  signOut: () => Promise<void> | void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
