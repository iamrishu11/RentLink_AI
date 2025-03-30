
export type UserRole = 'manager' | 'tenant' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  avatarUrl?: string;
  company?: string;
  properties?: string[];
}
