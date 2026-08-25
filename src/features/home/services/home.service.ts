"use server";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { MESSAGES } from "@/shared/constants/message.constant";
import { ActionResponse } from "@/shared/types/response.type";
import { CoreTechStack, FeaturedProject, Profile } from "../types/home.type";

/**
 * Helper untuk inisialisasi Supabase Client yang aman baik di Client maupun Server
 */
async function getSupabase() {
  if (typeof window !== "undefined") {
    return createBrowserClient();
  }
  const { createClient: createServerClient } =
    await import("@/lib/supabase/server");
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

    if (error) {
      return {
        success: false,
        error: MESSAGES.ERROR.DEFAULT,
      };
    }

    if (!data) {
      return {
        success: false,
        error: MESSAGES.ERROR.NOT_FOUND,
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
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}

export async function getTechStack(): Promise<ActionResponse<CoreTechStack[]>> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .eq("is_core", true);

    if (error) {
      return {
        success: false,
        error: MESSAGES.ERROR.DEFAULT,
      };
    }

    if (!data) {
      return {
        success: false,
        error: MESSAGES.ERROR.NOT_FOUND,
      };
    }

    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
      data: data as CoreTechStack[],
    };
  } catch (err) {
    console.error("--> Catch Error in getProfileInfo:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}

export async function getFeaturedProject(): Promise<ActionResponse<FeaturedProject[]>> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        tags (
          *
        )
      `)
      .eq("is_featured", true);

    console.log("--> Supabase Featured Projects Raw Data:", data);
    if (error) {
      console.error("--> Supabase Featured Projects Error:", error.message, error);
    }

    if (error) {
      return {
        success: false,
        error: error.message || MESSAGES.ERROR.DEFAULT,
      };
    }

    if (!data) {
      return {
        success: false,
        error: MESSAGES.ERROR.NOT_FOUND,
      };
    }

    // Normalisasi data tags jika menggunakan pivot table
    const formattedData = data.map((item: any) => {
      let tags = item.tags;
      if (!tags && item.project_tags) {
        tags = item.project_tags.map((pt: any) => pt.tags).filter(Boolean);
      }
      return {
        ...item,
        tags: tags || [],
      };
    });

    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
      data: formattedData as FeaturedProject[],
    };
  } catch (err) {
    console.error("--> Catch Error in getFeaturedProject:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}
