"use client";

import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getExperience } from "../services/about-me.service";

export const useGetExperience = () => {
  return useQuery({
    queryKey: [QUERY_KEY.EXPERIENCE],
    queryFn: async () => {
      const res = await getExperience();
      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};
