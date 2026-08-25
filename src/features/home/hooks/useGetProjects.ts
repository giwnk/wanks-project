"use client"

import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProject } from "../services/home.service";

export const useGetProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEY.FEATURED_PROJECT],
    queryFn: async () => {
      const res = await getFeaturedProject();
      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};
