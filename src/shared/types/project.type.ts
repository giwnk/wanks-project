import { CoreTechStack } from "./tech-stack.type";

export interface ContentType {
  permasalahan: string;
  perencanaan: string;
  proses: string;
  hasil: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: ContentType;
  thumbnail_url: string;
  live_url: string;
  source_url: string;
  is_featured: boolean;
  status: string;
  category: string;
  description: string;
  tags: CoreTechStack[];
}
