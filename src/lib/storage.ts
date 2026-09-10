import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "portfolio-assets";

/**
 * Mengubah path relatif (misal: "avatar/profile.jpg") menjadi Public URL Supabase CDN
 */
export function getStorageUrl(path: string | null | undefined): string {
  if (!path) return "";
  // Jika sudah berupa URL lengkap (http/https), langsung kembalikan
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const supabase = createClient();
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
}
