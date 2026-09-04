"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectFilterOptions } from "../services/project.service";

export const useGetProjectFilterOptions = () => {
  return useQuery({
    queryKey: ["project_filter_options"],
    queryFn: getProjectFilterOptions,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
