import { Iuser } from "./user";

export interface IauthState {
  isLoading: boolean;
  error: string;
  isChackAuthLoading: boolean,
  user: Iuser | null;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Iuser;
}
