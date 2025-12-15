import type { AuthFormProps } from '@/types';
import styles from './AuthForm.module.css';

export default function AuthForm({
  mode,
  formData,
  error,
  loading = false,
  onFormDataChange,
  onSubmit,
  onToggleMode,
}: AuthFormProps) {
  const isRegister = mode === 'register';
  const title = isRegister ? 'Registro' : 'Iniciar Sesión';
  const submitContent = loading
    ? (
      <>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Cargando...
      </>
    )
    : (isRegister ? 'Crear usuario' : 'Iniciar sesión');
  const toggleText = isRegister
    ? '¿Ya tienes cuenta? Inicia sesión'
    : '¿No tienes cuenta? Regístrate';

  return (
    <div className={styles.card}>
      <h1>{title}</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={onSubmit} className={styles.form}>
        {isRegister && (
          <div className={styles.inputGroup}>
            <label htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => onFormDataChange('username', e.target.value)}
              required
              placeholder="Ingresa tu nombre de usuario"
              disabled={loading}
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFormDataChange('email', e.target.value)}
            required
            placeholder="Ingresa tu email"
            disabled={loading}
          />
        </div>

        {isRegister ? (
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => onFormDataChange('password', e.target.value)}
              required
              placeholder="Ingresa tu contraseña (mínimo 6 caracteres)"
              minLength={6}
              disabled={loading}
            />
          </div>
        ) : (
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => onFormDataChange('password', e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {submitContent}
        </button>
      </form>

      <div className={styles.toggle}>
        <button
          type="button"
          onClick={onToggleMode}
          className={styles.toggleButton}
          disabled={loading}
        >
          {toggleText}
        </button>
      </div>
    </div>
  );
}

