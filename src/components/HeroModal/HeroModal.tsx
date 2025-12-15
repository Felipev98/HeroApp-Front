import type { HeroModalProps, CreateHeroData, UpdateHeroData } from '@/types';
import styles from './HeroModal.module.css';


export default function HeroModal({
  isOpen,
  mode,
  hero,
  formData,
  loading = false,
  onClose,
  onSubmit,
  onFormDataChange,
}: HeroModalProps) {
  if (!isOpen) return null;

  const isEditMode = mode === 'edit';
  const title = isEditMode ? 'Editar Héroe' : 'Crear Nuevo Héroe';
  const submitContent = loading
    ? (
      <>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {isEditMode ? 'Actualizando...' : 'Creando...'}
      </>
    )
    : (isEditMode ? 'Actualizar' : 'Crear');

  const handleInputChange = (field: keyof (CreateHeroData | UpdateHeroData), value: string) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            disabled={loading}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor={`${mode}-name`}>Nombre <span className={styles.required}>*</span></label>
            <input
              id={`${mode}-name`}
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Nombre del héroe"
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`${mode}-description`}>Descripción</label>
            <textarea
              id={`${mode}-description`}
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descripción del héroe"
              rows={4}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`${mode}-power`}>Poder</label>
            <input
              id={`${mode}-power`}
              type="text"
              value={formData.power || ''}
              onChange={(e) => handleInputChange('power', e.target.value)}
              placeholder="Poder del héroe"
              disabled={loading}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {submitContent}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

