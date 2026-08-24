export type ActionResponse<T = void> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  statusCode?: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaginatedResponse<T> = ActionResponse<{
  items: T[];
  meta: PaginationMeta;
}>;
