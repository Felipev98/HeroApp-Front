
import type { Hero, CreateHeroData, UpdateHeroData } from './hero.types';

export interface GeneralPromptProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface HeroModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  hero?: Hero | null;
  formData: CreateHeroData | UpdateHeroData;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: CreateHeroData | UpdateHeroData) => void;
}

