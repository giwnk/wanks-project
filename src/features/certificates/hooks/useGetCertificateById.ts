"use client";

import { QUERY_KEY } from "@/shared/constants/query.constant";
import { useQuery } from "@tanstack/react-query";
import { getCertificateById } from "../services/certificates.service";

export const useGetCertificateById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CERTIFICATE_DETAIL, id],
    queryFn: async () => {
      const res = await getCertificateById(id);
      if (!res.success) {
        throw new Error(res.error || "Sertifikat tidak ditemukan");
      }
      return res.data;
    },
    enabled: Boolean(id),
  });
};
