export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminData {
  id: string;
  email: string;
  lastSignInAt?: string;
}
