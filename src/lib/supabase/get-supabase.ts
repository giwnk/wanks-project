import { createClient as createBrowserClient } from "@/lib/supabase/client";

/**
 * Helper untuk inisialisasi Supabase Client yang aman baik di Client maupun Server environment
 */
export async function getSupabase() {
  if (typeof window !== "undefined") {
    return createBrowserClient();
  }
  const { createClient: createServerClient } = await import(
    "@/lib/supabase/server"
  );
  return await createServerClient();
}
