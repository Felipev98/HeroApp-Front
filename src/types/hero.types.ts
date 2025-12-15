
export interface Hero {
  id: string;
  name: string;
  description: string;
  power: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface CreateHeroData {
  name: string;
  description?: string;
  power?: string;
}


export interface UpdateHeroData {
  name?: string;
  description?: string;
  power?: string;
}


export interface GetAllHeroesResponse {
  success: boolean;
  data: Hero[];
  count: number;
}


export interface GetHeroByIdResponse {
  success: boolean;
  data: Hero;
}


export interface CreateHeroResponse {
  success: boolean;
  data?: Hero;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}


export interface UpdateHeroResponse {
  success: boolean;
  data?: Hero;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}


export interface DeleteHeroResponse {
  success: boolean;
  message: string;
}


export interface MarkHeroAsDoneResponse {
  success: boolean;
  data: Hero;
  message: string;
}

export interface UseHeroesState {
  heroes: Hero[];
  loading: boolean;
  error: string | null;
}

