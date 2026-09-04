import { CoreTechStack } from "./tech-stack.type";

export interface ContentType {
  permasalahan?: string;
  perencanaan?: string;
  proses?: string;
  hasil?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content?: ContentType | Record<string, any> | string;
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
}
