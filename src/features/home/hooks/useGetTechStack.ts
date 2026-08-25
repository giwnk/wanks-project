"use client"
import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getTechStack } from "../services/home.service";

export const useGetTechStack = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CORE_TECH_STACK],
    queryFn: async () => {
      const res = await getTechStack();
      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};
