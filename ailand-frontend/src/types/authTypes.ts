import { User } from "./userTypes";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string,
    refresh_token: string,
    user: User;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}