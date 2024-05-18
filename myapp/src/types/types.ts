import { User } from "@supabase/supabase-js";
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginSuccessResponse {
  data: User | null;
  error: null;
}

export interface LoginErrorResponse {
  data: null;
  error: string;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
