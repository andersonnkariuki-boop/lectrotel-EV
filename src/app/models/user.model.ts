export type UserRole = "client" | "admin" | "owner" | "super_admin";

export interface User {
  user_id: number;
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  user_amount?: number;
  avatar?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface UserResponse {
  user_id: number;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  user_amount?: number;
}
