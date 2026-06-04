export type UserRole = "admin" | "user";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
  dataCreated?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
