"use client"
import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../services/home.service";

export const useGetProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEY.PROFILE],
    queryFn: async () => {
      const res = await getProfileInfo();
      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};
