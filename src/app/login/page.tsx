'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { showSuccessToast, showErrorToast } from '@/helpers';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import type { AuthFormData } from '@/types';
import styles from './login.module.css';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login, register } = useAuth();


  const handleFormDataChange = (field: keyof AuthFormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
          showErrorToast('Por favor, completa todos los campos requeridos');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          showErrorToast('La contraseña debe tener al menos 6 caracteres');
          setLoading(false);
          return;
        }
        await register({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
        });
        showSuccessToast('Usuario registrado exitosamente');
      } else {
        if (!formData.email.trim() || !formData.password.trim()) {
          showErrorToast('Por favor, completa todos los campos');
          setLoading(false);
          return;
        }
        await login({
          email: formData.email.trim(),
          password: formData.password.trim(),
        });
        showSuccessToast('Sesión iniciada exitosamente');
      }
    } catch (err: unknown) {
      console.error('Submit error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error. Por favor, intenta nuevamente.';
      showErrorToast(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = (): void => {
    setIsRegister(!isRegister);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <AuthForm
        mode={isRegister ? 'register' : 'login'}
        formData={formData}
        error={error}
        loading={loading}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleSubmit}
        onToggleMode={handleToggleMode}
      />
      </div>
    </>
  );
}
