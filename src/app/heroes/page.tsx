'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useHeroes } from '@/hooks';
import { filterHeroesByName, showSuccessToast, showErrorToast } from '@/helpers';
import HeroCard from '@/components/HeroCard';
import HeroModal from '@/components/HeroModal';
import SearchInput from '@/components/SearchInput';
import { GeneralPrompt } from '@/components/GeneralComponents';
import type { Hero, CreateHeroData, UpdateHeroData } from '@/types';
import styles from './heroes.module.css';

export default function HeroesPage() {
  const router = useRouter();
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const {
    heroes,
    loading,
    error: heroesError,
    getAllHeroes,
    createHero,
    updateHero,
    deleteHero,
    markHeroAsDone,
    clearError,
  } = useHeroes();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingHero, setEditingHero] = useState<Hero | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [formData, setFormData] = useState<CreateHeroData | UpdateHeroData>({
    name: '',
    description: '',
    power: '',
  });

  const [promptState, setPromptState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated) {
      getAllHeroes();
    }
  }, [isAuthenticated, authLoading, router, getAllHeroes]);

  const filteredHeroes = useMemo(() => {
    return filterHeroesByName(heroes, filterText);
  }, [filterText, heroes]);

  const handleCreate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    clearError();

    const result = await createHero(formData as CreateHeroData);
    if (result.success && result.data) {
      showSuccessToast('Héroe creado exitosamente');
      setFormData({ name: '', description: '', power: '' });
      setShowCreateModal(false);
    } else {
      // Mostrar error inmediatamente desde el resultado
      const errorMessage = result.error || 'Error al crear el héroe';
      showErrorToast(errorMessage);
    }
  };

  const handleUpdate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!editingHero) return;

    clearError();
    const result = await updateHero(editingHero.id, formData as UpdateHeroData);
    if (result.success && result.data) {
      showSuccessToast('Héroe actualizado exitosamente');
      setFormData({ name: '', description: '', power: '' });
      setEditingHero(null);
      setShowEditModal(false);
    } else {
      // Mostrar error inmediatamente desde el resultado
      const errorMessage = result.error || 'Error al actualizar el héroe';
      showErrorToast(errorMessage);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    const heroToDelete = heroes.find((h) => h.id === id);
    setPromptState({
      isOpen: true,
      title: 'Eliminar Héroe',
      message: `¿Estás seguro de que quieres eliminar "${heroToDelete?.name || 'este héroe'}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        setPromptState((prev) => ({ ...prev, isOpen: false }));
        clearError();
        const result = await deleteHero(id);
        if (result) {
          showSuccessToast('Héroe eliminado exitosamente');
        } else if (heroesError) {
          showErrorToast(heroesError);
        }
      },
    });
  };

  const handleClosePrompt = (): void => {
    setPromptState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleMarkAsDone = async (id: string): Promise<void> => {
    clearError();
    const result = await markHeroAsDone(id);
    if (result) {
      showSuccessToast('Héroe marcado como completado');
    } else if (heroesError) {
      showErrorToast(heroesError);
    }
  };

  const openEditModal = (hero: Hero): void => {
    setEditingHero(hero);
    setFormData({
      name: hero.name,
      description: hero.description || '',
      power: hero.power || '',
    });
    setShowEditModal(true);
  };

  const closeModals = (): void => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setEditingHero(null);
    setFormData({ name: '', description: '', power: '' });
    clearError();
  };

  if (authLoading || (loading && heroes.length === 0)) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Todos los Héroes</h1>
        <button onClick={logout} className={styles.logoutButton}>
          Cerrar sesión
        </button>
      </div>


      <div className={styles.actionsBar}>
        <SearchInput
          value={filterText}
          onChange={setFilterText}
          placeholder="Buscar por nombre..."
        />
        <button
          onClick={() => {
            setFormData({ name: '', description: '', power: '' });
            setShowCreateModal(true);
          }}
          className={styles.addButton}
        >
          Crear Héroe
        </button>
      </div>

      <HeroModal
        isOpen={showCreateModal}
        mode="create"
        formData={formData}
        loading={loading}
        onClose={closeModals}
        onSubmit={handleCreate}
        onFormDataChange={setFormData}
      />

      <HeroModal
        isOpen={showEditModal}
        mode="edit"
        hero={editingHero}
        formData={formData}
        loading={loading}
        onClose={closeModals}
        onSubmit={handleUpdate}
        onFormDataChange={setFormData}
      />

      <GeneralPrompt
        isOpen={promptState.isOpen}
        title={promptState.title}
        message={promptState.message}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={promptState.onConfirm}
        onCancel={handleClosePrompt}
      />

      <div className={`row g-3 ${styles.heroesGrid}`}>
        {filteredHeroes.length === 0 ? (
          <div className={`col-12 ${styles.emptyState}`}>
            <p>
              {filterText.trim()
                ? `No se encontraron héroes con el nombre "${filterText}"`
                : 'No hay héroes aún. ¡Crea tu primer héroe!'}
            </p>
          </div>
        ) : (
          filteredHeroes.map((hero) => (
            <div key={hero.id} className="col-12 col-md-6 col-lg-6 col-xl-4">
              <HeroCard
                hero={hero}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onMarkAsDone={handleMarkAsDone}
                loading={loading}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
