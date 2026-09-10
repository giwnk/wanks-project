import { ActionResponse } from "@/shared/types";
import { CertificateType } from "../types/certificates.type";
import { MESSAGES } from "@/shared/constants/message.constant";
import { getSupabase } from "@/lib/supabase/get-supabase";

export async function getCertificate(): Promise<
  ActionResponse<CertificateType[]>
> {
  try {
    const supabase = await getSupabase();

    const { data, error } = await supabase
      .from("certificates")
      .select("*")

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
      data: data as CertificateType[],
    };
  } catch (err) {
    console.error("--> Catch Error in getProfileInfo:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}

export async function getCertificateById(
  id: string,
): Promise<ActionResponse<CertificateType>> {
  try {
    const supabase = await getSupabase();

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("id", id)
      .single();

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
      data: data as CertificateType,
    };
  } catch (err) {
    console.error("--> Catch Error in getProfileInfo:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}
