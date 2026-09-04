"use server";

import { getSupabase } from "@/lib/supabase/get-supabase";
import { MESSAGES } from "@/shared/constants/message.constant";
import { ActionResponse, FeaturedProject, PaginatedResponse } from "@/shared/types";

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  techStack?: string;
}

/**
 * Service untuk mengambil data daftar project dengan pagination dan filter dari Supabase
 */
export async function getProjects({
  page = 1,
  limit = 10,
  search = "",
  category = "",
  status = "",
  techStack = "",
}: GetProjectsParams = {}): Promise<PaginatedResponse<FeaturedProject>> {
  try {
    const supabase = await getSupabase();

    // Hitung offset range untuk Supabase pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Inisialisasi query Supabase dengan exact count
    let query = supabase
      .from("projects")
      .select(
        `
        *,
        tags (
          *
        )
      `,
        { count: "exact" }
      );

    // Apply Filter Search (Judul atau Deskripsi)
    if (search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm},subtitle.ilike.${searchTerm}`);
    }

    // Apply Filter Category
    if (category.trim() && category !== "Semua") {
      query = query.ilike("category", `%${category.trim()}%`);
    }

    // Apply Filter Status
    if (status.trim() && status !== "Semua") {
      query = query.ilike("status", `%${status.trim()}%`);
    }

    // Range Pagination
    query = query.order("created_at", { ascending: false }).range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error("--> Supabase getProjects Error:", error.message);
      return {
        success: false,
        error: error.message || MESSAGES.ERROR.DEFAULT,
      };
    }

    const totalItems = count ?? 0;
    const totalPages = Math.ceil(totalItems / limit) || 1;

    // Normalisasi format data tags jika menggunakan pivot table / relasi
    let formattedData = (data || []).map((item: any) => {
      let tags = item.tags;
      if (!tags && item.project_tags) {
        tags = item.project_tags.map((pt: any) => pt.tags).filter(Boolean);
      }
      return {
        ...item,
        tags: tags || [],
      };
    });

    // Apply Filter Tech Stack pada array tags
    if (techStack.trim() && techStack !== "Semua") {
      const targetTech = techStack.trim().toLowerCase();
      formattedData = formattedData.filter((item: any) =>
        item.tags?.some((tag: any) =>
          tag.name?.toLowerCase().includes(targetTech)
        )
      );
    }

    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
      data: {
        items: formattedData as FeaturedProject[],
        meta: {
          page,
          limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    };
  } catch (err) {
    console.error("--> Catch Error in getProjects:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}

/**
 * Service untuk mengambil detail single project berdasarkan slug
 */
export async function getProjectBySlug(
  slug: string
): Promise<ActionResponse<FeaturedProject>> {
  try {
    const supabase = await getSupabase();

    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        *,
        tags (
          *
        )
      `
      )
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("--> Supabase getProjectBySlug Error:", error.message);
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

    let tags = data.tags;
    if (!tags && (data as any).project_tags) {
      tags = (data as any).project_tags.map((pt: any) => pt.tags).filter(Boolean);
    }

    const formattedProject: FeaturedProject = {
      ...data,
      tags: tags || [],
    };

    return {
      success: true,
      message: MESSAGES.SUCCESS.DEFAULT,
      data: formattedProject,
    };
  } catch (err) {
    console.error("--> Catch Error in getProjectBySlug:", err);
    return {
      success: false,
      error: MESSAGES.ERROR.SERVER_ERROR,
    };
  }
}

/**
 * Service untuk mengambil opsi filter (status, category, techStack) secara utuh dari Supabase
 * agar opsi dropdown tidak hilang saat filter aktif.
 */
export async function getProjectFilterOptions(): Promise<{
  statuses: string[];
  categories: string[];
  techStacks: string[];
}> {
  try {
    const supabase = await getSupabase();

    // Query status dan kategori dari tabel projects
    const { data: projects } = await supabase
      .from("projects")
      .select("status, category");

    // Query nama tag dari tabel tags
    const { data: tags } = await supabase
      .from("tags")
      .select("name");

    const statuses = Array.from(
      new Set((projects || []).map((p: any) => p.status).filter(Boolean))
    );
    const categories = Array.from(
      new Set((projects || []).map((p: any) => p.category).filter(Boolean))
    );
    const techStacks = Array.from(
      new Set((tags || []).map((t: any) => t.name).filter(Boolean))
    );

    return {
      statuses: statuses.length > 0 ? statuses : ["Completed", "In Progress", "Planned"],
      categories: categories.length > 0 ? categories : ["Web", "Mobile", "UI/UX", "Backend"],
      techStacks: techStacks.length > 0 ? techStacks : ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Supabase"],
    };
  } catch (err) {
    console.error("--> Catch Error in getProjectFilterOptions:", err);
    return {
      statuses: ["Completed", "In Progress", "Planned"],
      categories: ["Web", "Mobile", "UI/UX", "Backend"],
      techStacks: ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Supabase"],
    };
  }
}

