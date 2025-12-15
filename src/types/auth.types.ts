
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface RegisterData {
  username: string;
  email: string;
  phone?: string;
  password: string;
}


export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: User;
}

export interface JWTPayload {
  sub: string;
  email: string;
  username?: string;
  iat?: number;
  exp?: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface UseAuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthFormData {
  username: string;
  email: string;
  password: string;
}

export interface AuthFormProps {
  mode: 'login' | 'register';
  formData: AuthFormData;
  error?: string;
  loading?: boolean;
  onFormDataChange: (field: keyof AuthFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
}

