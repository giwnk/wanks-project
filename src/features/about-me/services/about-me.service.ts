"use server";

import { getSupabase } from "@/lib/supabase/get-supabase";
import { MESSAGES } from "@/shared/constants/message.constant";
import { ActionResponse } from "@/shared/types";
import { CoreTechStack, Profile, Experience } from "../types/about-me.type";

export async function getProfileInfo(): Promise<ActionResponse<Profile>> {
  try {
    const supabase = await getSupabase();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .maybeSingle();
      
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
      .order("is_core", { ascending: false });

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

export async function getExperience(): Promise<ActionResponse<Experience[]>> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase.from("experiences").select("*");

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
      data: data as Experience[],
    };
  } catch (err) {
    console.error("--> Catch Error in getExperience:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}
