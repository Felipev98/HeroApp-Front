import type { Hero } from '@/types';
import styles from './HeroCard.module.css';

interface HeroCardProps {
  hero: Hero;
  onEdit: (hero: Hero) => void;
  onDelete: (id: string) => void;
  onMarkAsDone: (id: string) => void;
  loading?: boolean;
}

export default function HeroCard({
  hero,
  onEdit,
  onDelete,
  onMarkAsDone,
  loading = false,
}: HeroCardProps) {
  return (
    <div className={styles.heroCard}>
      <div className={styles.heroHeader}>
        <h3>{hero.name}</h3>
        {hero.isDone && <span className={styles.doneBadge}>Completado</span>}
      </div>

      {hero.description && (
        <p className={styles.description}>{hero.description}</p>
      )}

      {hero.power && (
        <p className={styles.power}>
          {hero.power}
        </p>
      )}

      <div className={styles.heroActions}>
        {!hero.isDone && (
          <button
            onClick={() => onMarkAsDone(hero.id)}
            className={styles.doneButton}
            disabled={loading}
          >
            Marcar
          </button>
        )}
        <button
          onClick={() => onEdit(hero)}
          className={styles.editButton}
          disabled={loading}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(hero.id)}
          className={styles.deleteButton}
          disabled={loading}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

