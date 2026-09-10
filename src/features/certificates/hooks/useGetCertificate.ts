"use client";

import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getCertificate } from "../services/certificates.service";

export const useGetCertificate = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CERTIFICATE],
    queryFn: async () => {
      const res = await getCertificate();
      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};