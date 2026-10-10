import { create } from "zustand";
import { AdminData, LoginPayload } from "@/features/admin/types/auth.type";
import {
  signInWithPassword,
  signOut,
  getCurrentAdmin,
} from "@/features/admin/services/auth.service";
import { ActionResponse } from "@/shared/types";

interface AuthState {
  user: AdminData | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (payload: LoginPayload) => Promise<ActionResponse<AdminData>>;
  logout: () => Promise<ActionResponse<null>>;
  fetchCurrentAdmin: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (payload: LoginPayload) => {
    set({ isLoading: true });
    const response = await signInWithPassword(payload);

    if (response.success && response.data) {
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }

    return response;
  },

  logout: async () => {
    set({ isLoading: true });
    const response = await signOut();

    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    return response;
  },

  fetchCurrentAdmin: async () => {
    set({ isLoading: true });
    const response = await getCurrentAdmin();

    if (response.success && response.data) {
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
