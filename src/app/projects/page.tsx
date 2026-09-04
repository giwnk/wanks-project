"use client";

import React, { useMemo, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter } from "@/components/Filter";
import { Pagination } from "@/components/Pagination";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import { useGetProjects } from "@/features/projects/hooks/useGetProjects";
import { useGetProjectFilterOptions } from "@/features/projects/hooks/useGetProjectFilterOptions";
import Header from "@/components/Header";

function ProjectsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read current filter and page state directly from URL query params
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const category = searchParams.get("category") || "";
  const techStack = searchParams.get("techStack") || "";

  const limit = 6;

  // Helper function to update URL query parameters cleanly
  const updateQueryParams = (newParams: {
    page?: number;
    search?: string;
    status?: string;
    category?: string;
    techStack?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    const updateOrDelete = (key: string, val?: string) => {
      if (val !== undefined) {
        if (val.trim()) {
          params.set(key, val.trim());
        } else {
          params.delete(key);
        }
      }
    };

    if (newParams.page !== undefined) {
      if (newParams.page > 1) {
        params.set("page", newParams.page.toString());
      } else {
        params.delete("page");
      }
    }

    updateOrDelete("search", newParams.search);
    updateOrDelete("status", newParams.status);
    updateOrDelete("category", newParams.category);
    updateOrDelete("techStack", newParams.techStack);

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  // Fetch complete, unfiltered filter options from Supabase
  const { data: optionsData } = useGetProjectFilterOptions();

  // Fetch paginated & filtered projects from Supabase via React Query hook
  const { data, isLoading, isError, error } = useGetProjects({
    page,
    limit,
    search,
    status,
    category,
    techStack,
  });

  const filterOptions = useMemo(() => {
    return {
      statuses: optionsData?.statuses || ["Completed", "In Progress", "Planned"],
      categories: optionsData?.categories || ["Web", "Mobile", "UI/UX", "Backend"],
      techStacks: optionsData?.techStacks || ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Supabase"],
    };
  }, [optionsData]);

  const handleSearchChange = (val: string) => {
    updateQueryParams({ search: val, page: 1 });
  };

  const handleStatusChange = (val: string) => {
    updateQueryParams({ status: val, page: 1 });
  };

  const handleCategoryChange = (val: string) => {
    updateQueryParams({ category: val, page: 1 });
  };

  const handleTechStackChange = (val: string) => {
    updateQueryParams({ techStack: val, page: 1 });
  };

  const handleResetFilter = () => {
    router.push(pathname);
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-3">
      {/* Page Header */}
      <Header
        title="Semua Project"
        subtitle="Jelajahi kumpulan karya, eksperimen, dan aplikasi yang telah saya bangun. Gunakan pencarian dan filter untuk menemukan project tertentu."
        iconName="FolderIcon"
      />

      {/* Universal Filter Component with 3 Dropdowns (Status, Category, TechStack) Side-by-Side */}
      <Filter
        search={search}
        onSearchChange={handleSearchChange}
        selectedStatus={status}
        statuses={filterOptions.statuses}
        onStatusChange={handleStatusChange}
        selectedCategory={category}
        categories={filterOptions.categories}
        onCategoryChange={handleCategoryChange}
        selectedTechStack={techStack}
        techStacks={filterOptions.techStacks}
        onTechStackChange={handleTechStackChange}
        onReset={handleResetFilter}
        placeholder="Cari project berdasarkan nama, deskripsi, atau kata kunci..."
      />

      {/* Project Grid */}
      <ProjectGrid
        projects={data?.items}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error instanceof Error ? error.message : "Gagal memuat daftar project"}
      />

      {/* Universal Pagination Component */}
      <Pagination
        meta={data?.meta}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-muted-foreground">Memuat halaman project...</div>}>
      <ProjectsPageContent />
    </Suspense>
  );
}
