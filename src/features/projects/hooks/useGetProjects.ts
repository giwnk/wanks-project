"use client";

import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getProjects, GetProjectsParams } from "../services/project.service";

export const useGetProjects = (params: GetProjectsParams = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category = "",
    status = "",
    techStack = "",
  } = params;

  return useQuery({
    queryKey: [
      QUERY_KEY.PROJECTS,
      page,
      limit,
      search,
      category,
      status,
      techStack,
    ],
    queryFn: async () => {
      const res = await getProjects({
        page,
        limit,
        search,
        category,
        status,
        techStack,
      });
      if (!res.success) {
        throw new Error(res.error || "Gagal mengambil data project");
      }
      return res.data;
    },
  });
};