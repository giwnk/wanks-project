"use server";

import { getSupabase } from "@/lib/supabase/get-supabase";
import { MESSAGES } from "@/shared/constants/message.constant";
import { MESSAGE_STATUS } from "@/shared/constants/status.constant";
import { ActionResponse } from "@/shared/types/response.type";
import {
  CoreTechStack,
  CreateMessagePayload,
  FeaturedProject,
  Message,
  Profile,
} from "../types/home.type";
import { MessageSchema } from "../types/message.schema";

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

export async function createPublicMessage(
  payload: CreateMessagePayload
): Promise<ActionResponse<Message>> {
  try {
    const validatedData = MessageSchema.safeParse(payload);
    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0]?.message || MESSAGES.ERROR.CREATE,
      };
    }

    const supabase = await getSupabase();
    const { error } = await supabase.from("messages").insert({
      ...validatedData.data,
      status: MESSAGE_STATUS.UNREAD,
    });

    if (error) {
      console.error("--> Supabase Insert Message Error:", error.message);
      return {
        success: false,
        error: MESSAGES.CONTACT.ERROR || MESSAGES.ERROR.CREATE,
      };
    }

    return {
      success: true,
      message: MESSAGES.CONTACT.SUCCESS,
    };
  } catch (error) {
    console.error("--> Catch Error in createPublicMessage:", error);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}
