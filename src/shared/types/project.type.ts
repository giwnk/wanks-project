import { CoreTechStack } from "./tech-stack.type";

export interface ContentType {
  permasalahan?: string;
  problem?: string;
  masalah?: string;
  perencanaan?: string;
  planning?: string;
  solusi?: string;
  solution?: string;
  proses?: string;
  process?: string;
  pengerjaan?: string;
  hasil?: string;
  result?: string;
  outcome?: string;
  impact?: string;
  [key: string]: unknown;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content?: ContentType | Record<string, unknown> | string;
  thumbnail_url?: string;
  live_url?: string;
  source_url?: string;
  is_featured?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  description?: string;
  tags?: CoreTechStack[];
  client?: string;
  client_name?: string;
  role?: string;
  my_role?: string;
  duration?: string;
  timeline?: string;
  gallery?: string[];
  gallery_urls?: string[];
}
