"use client";

import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug } from "../services/project.service";

export const useGetProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.PROJECT_DETAIL, slug],
    queryFn: async () => {
      const res = await getProjectBySlug(slug);
      if (!res.success) {
        throw new Error(res.error || "Project tidak ditemukan");
      }
      return res.data;
    },
    enabled: Boolean(slug),
  });
};
