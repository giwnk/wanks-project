"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { LoginPayload } from "../types/auth.type";

interface UseAuthOptions {
  autoFetch?: boolean;
}

export const useAuth = (options?: UseAuthOptions) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, login, logout, fetchCurrentAdmin } =
    useAuthStore();

  // 1. Auto-fetch data admin jika opsi autoFetch aktif dan user belum terisi di store
  useEffect(() => {
    if (options?.autoFetch && !user && !isAuthenticated) {
      fetchCurrentAdmin();
    }
  }, [options?.autoFetch, user, isAuthenticated, fetchCurrentAdmin]);

  // 2. Wrapper Login: Memanggil store + toast notifikasi + redirect ke dashboard
  const handleLogin = async (payload: LoginPayload) => {
    const res = await login(payload);

    if (res.success) {
      toast.success(res.message || "Login berhasil. Selamat datang kembali!");
      router.push("/admin-dashboard");
      router.refresh();
      return { success: true, data: res.data };
    } else {
      toast.error(
        res.error || "Gagal masuk. Periksa kembali email dan password.",
      );
      return { success: false, error: res.error };
    }
  };

  // 3. Wrapper Logout: Memanggil store + toast notifikasi + redirect ke halaman utama
  const handleLogout = async () => {
    const res = await logout();

    if (res.success) {
      toast.success("Berhasil keluar dari admin portal.");
      router.push("/");
      router.refresh();
      return { success: true };
    } else {
      toast.error(res.error || "Gagal keluar. Silakan coba lagi.");
      return { success: false, error: res.error };
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    fetchCurrentAdmin,
  };
};
