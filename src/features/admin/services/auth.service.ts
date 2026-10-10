import { getSupabase } from "@/lib/supabase/get-supabase";
import { ActionResponse } from "@/shared/types";
import { AdminData, LoginPayload } from "../types/auth.type";
import { MESSAGES } from "@/shared/constants/message.constant";

export async function signInWithPassword(
  payload: LoginPayload,
): Promise<ActionResponse<AdminData>> {
  try {
    const supabase = await getSupabase();

    // 1. Eksekusi login ke Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email.trim(),
      password: payload.password,
    });

    if (error) {
      console.error("--> Supabase Auth Error:", error.message);
      return {
        success: false,
        error: error.message || MESSAGES.ERROR.DEFAULT,
      };
    }

    if (!data.user) {
      return {
        success: false,
        error: MESSAGES.ERROR.NOT_FOUND,
      };
    }

    // 2. Validasi apakah email yang login sesuai dengan email whitelist admin
    const adminEmail = (
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      process.env.ADMIN_EMAIL ||
      ""
    )
      .trim()
      .toLowerCase();

    if (adminEmail && data.user.email?.toLowerCase() !== adminEmail) {
      // Jika bukan akun admin yang sah, langsung sign out kembali
      await supabase.auth.signOut();
      return {
        success: false,
        error: MESSAGES.ERROR.FORBIDDEN,
      };
    }

    // 3. Bentuk response data sesuai interface AdminData
    const adminData: AdminData = {
      id: data.user.id,
      email: data.user.email || "",
      lastSignInAt: data.user.last_sign_in_at,
    };

    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
      data: adminData,
    };
  } catch (err) {
    console.error("--> Catch Error in signInWithPassword:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}

export async function signOut(): Promise<ActionResponse<null>> {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("--> Supabase SignOut Error:", error.message);
      return {
        success: false,
        error: error.message || MESSAGES.ERROR.DEFAULT,
      };
    }

    return {
      success: true,
      message: "Logout berhasil!",
      data: null,
    };
  } catch (err) {
    console.error("--> Catch Error in signOut:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}

export async function getCurrentAdmin(): Promise<ActionResponse<AdminData>> {
  try {
    const supabase = await getSupabase();

    // 1. Ambil session user yang sedang aktif dari Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return {
        success: false,
        error: error?.message || MESSAGES.ERROR.NOT_FOUND,
      };
    }

    // 2. Validasi apakah email cocok dengan whitelist admin
    const adminEmail = (
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      process.env.ADMIN_EMAIL ||
      ""
    )
      .trim()
      .toLowerCase();

    if (adminEmail && user.email?.toLowerCase() !== adminEmail) {
      return {
        success: false,
        error: MESSAGES.ERROR.FORBIDDEN,
      };
    }

    // 3. Format data sesuai AdminData
    const adminData: AdminData = {
      id: user.id,
      email: user.email || "",
      lastSignInAt: user.last_sign_in_at,
    };

    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
      data: adminData,
    };
  } catch (err) {
    console.error("--> Catch Error in getCurrentAdmin:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}
