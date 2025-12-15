import type {
  Hero,
  CreateHeroData,
  UpdateHeroData,
  RegisterData,
  LoginData,
  AuthResponse,
  GetAllHeroesResponse,
  GetHeroByIdResponse,
  CreateHeroResponse,
  UpdateHeroResponse,
  DeleteHeroResponse,
  MarkHeroAsDoneResponse,
  AuthenticatedRequestOptions,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const authenticatedFetch = async (
  url: string,
  options: AuthenticatedRequestOptions = {}
): Promise<Response> => {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  headers.set('Content-Type', 'application/json');

  return fetch(url, {
    ...options,
    headers,
  });
};

export const authAPI = {

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const url = `${API_BASE_URL}/api/auth/register`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData: { message?: string };
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || `Error ${response.status}: ${response.statusText}` };
        }
        return {
          success: false,
          message: errorData.message || 'Error al registrar usuario',
        };
      }

      const result: AuthResponse = await response.json();
      return result;
    } catch (error: unknown) {
      console.error('Register API error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        success: false,
        message: errorMessage || 'Error de conexión al registrar usuario',
      };
    }
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const url = `${API_BASE_URL}/api/auth/login`;
      console.log('Login URL:', url);
      console.log('Login data:', data);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData: { message?: string };
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || `Error ${response.status}: ${response.statusText}` };
        }
        return {
          success: false,
          message: errorData.message || 'Error al iniciar sesión',
        };
      }

      const result: AuthResponse = await response.json();
      return result;
    } catch (error: unknown) {
      console.error('Login API error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        success: false,
        message: errorMessage || 'Error de conexión al iniciar sesión',
      };
    }
  },
};

export const heroesAPI = {

  getAll: async (): Promise<GetAllHeroesResponse> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/heroes`);
    const data: GetAllHeroesResponse = await response.json();
    return data;
  },


  getById: async (id: string): Promise<GetHeroByIdResponse> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/heroes/${id}`);
    const data: GetHeroByIdResponse = await response.json();
    return data;
  },

  create: async (data: CreateHeroData): Promise<CreateHeroResponse> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/heroes`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Error al crear el héroe',
        errors: errorData.errors,
      };
    }
    
    const result: CreateHeroResponse = await response.json();
    return result;
  },


  update: async (id: string, data: UpdateHeroData): Promise<UpdateHeroResponse> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/heroes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Error al actualizar el héroe',
        errors: errorData.errors,
      };
    }
    
    const result: UpdateHeroResponse = await response.json();
    return result;
  },

  delete: async (id: string): Promise<DeleteHeroResponse> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/heroes/${id}`, {
      method: 'DELETE',
    });
    const result: DeleteHeroResponse = await response.json();
    return result;
  },

  markAsDone: async (id: string): Promise<MarkHeroAsDoneResponse> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/heroes/${id}/done`, {
      method: 'PUT',
    });
    const result: MarkHeroAsDoneResponse = await response.json();
    return result;
  },
};
