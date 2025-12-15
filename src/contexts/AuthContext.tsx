'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import type { RegisterData, LoginData, User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        try {
          setToken(savedToken);
          const parsedUser: User = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      const response = await authAPI.login(data);

      if (response.success && response.token) {
        setToken(response.token);
        setIsAuthenticated(true);

        if (response.user) {
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        localStorage.setItem('token', response.token);
        router.push('/heroes');
      } else {
        const errorMessage = response.message || 'Error al iniciar sesión';
        throw new Error(errorMessage);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        throw error;
      }
      throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.');
    }
  };


  const register = async (data: RegisterData): Promise<void> => {
    try {
      const response = await authAPI.register(data);

      if (response.success && response.token) {
        setToken(response.token);
        setIsAuthenticated(true);

        if (response.user) {
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        localStorage.setItem('token', response.token);
        router.push('/heroes');
      } else {
        const errorMessage = response.message || 'Error al registrar usuario';
        throw new Error(errorMessage);
      }
    } catch (error: unknown) {
      console.error('Register error:', error);
      if (error instanceof Error && error.message) {
        throw error;
      }
      throw new Error('Error al registrar usuario. Por favor, verifica tus datos e intenta nuevamente.');
    }
  };


  const logout = (): void => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
