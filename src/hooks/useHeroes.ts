import { useState, useCallback } from 'react';
import { heroesAPI } from '@/lib/api';
import type {
  Hero,
  CreateHeroData,
  UpdateHeroData,
  GetAllHeroesResponse,
  CreateHeroResponse,
  UpdateHeroResponse,
  DeleteHeroResponse,
  MarkHeroAsDoneResponse,
  UseHeroesState,
} from '@/types';

export function useHeroes() {
  const [state, setState] = useState<UseHeroesState>({
    heroes: [],
    loading: false,
    error: null,
  });


  const getAllHeroes = useCallback(async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response: GetAllHeroesResponse = await heroesAPI.getAll();

      if (response.success) {
        setState({
          heroes: response.data,
          loading: false,
          error: null,
        });
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Error al cargar los héroes',
        }));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los héroes';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const getHeroById = useCallback(async (id: string): Promise<Hero | null> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await heroesAPI.getById(id);

      if (response.success) {
        setState((prev) => ({ ...prev, loading: false }));
        return response.data;
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Error al obtener el héroe',
        }));
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener el héroe';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return null;
    }
  }, []);

  const createHero = useCallback(async (data: CreateHeroData): Promise<{ success: boolean; data: Hero | null; error: string | null }> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response: CreateHeroResponse = await heroesAPI.create(data);
      
      if (response.success && response.data) {
        const newHero = response.data;
        setState((prev) => ({
          heroes: [newHero, ...prev.heroes],
          loading: false,
          error: null,
        }));
        return { success: true, data: newHero, error: null };
      } else {
        const baseMessage = response.message || 'Error al crear el héroe';
        let errorMessage = baseMessage;
        
        if (response.errors && Array.isArray(response.errors) && response.errors.length > 0) {
          const errorDetails = response.errors
            .filter(err => err && err.field && err.message)
            .map(err => {
              const fieldName = err.field.charAt(0).toUpperCase() + err.field.slice(1);
              return `${fieldName}: ${err.message}`;
            });
          
          if (errorDetails.length > 0) {
            errorMessage = errorDetails.join(', ');
          }
        }
        
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return { success: false, data: null, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear el héroe';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, data: null, error: errorMessage };
    }
  }, []);

  const updateHero = useCallback(async (
    id: string,
    data: UpdateHeroData
  ): Promise<{ success: boolean; data: Hero | null; error: string | null }> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response: UpdateHeroResponse = await heroesAPI.update(id, data);

      if (response.success && response.data) {
        const updatedHero = response.data;
        setState((prev) => ({
          heroes: prev.heroes.map((hero) =>
            hero.id === id ? updatedHero : hero
          ),
          loading: false,
          error: null,
        }));
        return { success: true, data: updatedHero, error: null };
      } else {
        const baseMessage = response.message || 'Error al actualizar el héroe';
        let errorMessage = baseMessage;
        
        if (response.errors && Array.isArray(response.errors) && response.errors.length > 0) {
          const errorDetails = response.errors
            .filter(err => err && err.field && err.message)
            .map(err => {
              const fieldName = err.field.charAt(0).toUpperCase() + err.field.slice(1);
              return `${fieldName}: ${err.message}`;
            });
          
          if (errorDetails.length > 0) {
            errorMessage = errorDetails.join(', ');
          }
        }
        
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return { success: false, data: null, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el héroe';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, data: null, error: errorMessage };
    }
  }, []);

  const deleteHero = useCallback(async (id: string): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response: DeleteHeroResponse = await heroesAPI.delete(id);

      if (response.success) {
        setState((prev) => ({
          heroes: prev.heroes.filter((hero) => hero.id !== id),
          loading: false,
          error: null,
        }));
        return true;
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Error al eliminar el héroe',
        }));
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el héroe';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const markHeroAsDone = useCallback(async (id: string): Promise<Hero | null> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response: MarkHeroAsDoneResponse = await heroesAPI.markAsDone(id);

      if (response.success) {
        setState((prev) => ({
          heroes: prev.heroes.map((hero) =>
            hero.id === id ? response.data : hero
          ),
          loading: false,
          error: null,
        }));
        return response.data;
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Error al marcar el héroe como completado',
        }));
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al marcar el héroe como completado';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return null;
    }
  }, []);

  const clearError = useCallback((): void => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const setHeroes = useCallback((heroes: Hero[]): void => {
    setState((prev) => ({ ...prev, heroes }));
  }, []);

  return {
    heroes: state.heroes,
    loading: state.loading,
    error: state.error,

    getAllHeroes,
    getHeroById,
    createHero,
    updateHero,
    deleteHero,
    markHeroAsDone,

    clearError,
    setHeroes,
  };
}

