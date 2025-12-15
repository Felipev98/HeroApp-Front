import { useState, useCallback } from 'react';
import { authAPI } from '@/lib/api';
import type { RegisterData, LoginData, AuthResponse, User, UseAuthState } from '@/types';

export function useAuth() {
  const [state, setState] = useState<UseAuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
  });

  const initializeAuth = useCallback((): void => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        try {
          const parsedUser: User = JSON.parse(savedUser);
          setState({
            isAuthenticated: true,
            token: savedToken,
            user: parsedUser,
            loading: false,
            error: null,
          });
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  }, []);

  const login = useCallback(async (data: LoginData): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response: AuthResponse = await authAPI.login(data);

      if (response.success && response.token) {
        const user = response.user || null;

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }
        }

        setState({
          isAuthenticated: true,
          token: response.token,
          user,
          loading: false,
          error: null,
        });

        return true;
      } else {
        const errorMessage = response.message || 'Error al iniciar sesión';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response: AuthResponse = await authAPI.register(data);

      if (response.success && response.token) {
        const user = response.user || null;

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }
        }

        setState({
          isAuthenticated: true,
          token: response.token,
          user,
          loading: false,
          error: null,
        });

        return true;
      } else {
        const errorMessage = response.message || 'Error al registrar usuario';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar usuario';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const logout = useCallback((): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    setState({
      isAuthenticated: false,
      token: null,
      user: null,
      loading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback((): void => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const checkAuth = useCallback((): boolean => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token && state.isAuthenticated;
    }
    return state.isAuthenticated;
  }, [state.isAuthenticated]);

  return {
    isAuthenticated: state.isAuthenticated,
    token: state.token,
    user: state.user,
    loading: state.loading,
    error: state.error,

    login,
    register,
    logout,
    initializeAuth,
    clearError,
    checkAuth,
  };
}

