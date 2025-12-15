
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  count?: number;
}

export interface ApiErrorResponse {
  success: false;
  error?: string;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface AuthenticatedRequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

