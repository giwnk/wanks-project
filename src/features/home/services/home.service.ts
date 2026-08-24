import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { MESSAGES } from "@/shared/constants/message.constant";
import { ActionResponse } from "@/shared/types/response.type";
import { Profile } from "../types/home.type";

/**
 * Helper untuk inisialisasi Supabase Client yang aman baik di Client maupun Server
 */
async function getSupabase() {
  if (typeof window !== "undefined") {
    return createBrowserClient();
  }
  const { createClient: createServerClient } = await import("@/lib/supabase/server");
  return await createServerClient();
}

/**
 * Service untuk mengambil data profil dari tabel `profiles` di Supabase
 */
export async function getProfileInfo(): Promise<ActionResponse<Profile>> {
  try {
    const supabase = await getSupabase();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .maybeSingle();

    // Log debug ke F12 Console Browser untuk pengecekan data Supabase
    console.log("--> Supabase Profiles Query Data:", data);
    if (error) {
      console.error("--> Supabase Profiles Error:", error.message);
    }

    if (error || !data) {
      return {
        success: true,
        message: MESSAGES.SUCCESS.DEFAULT,
        data: (data as Profile),
      };
    }

    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
      data: data as Profile,
    };
  } catch (err) {
    console.error("--> Catch Error in getProfileInfo:", err);
    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
    };
  }
}