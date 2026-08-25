export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  id: string;
  full_name: string;
  nickname: string;
  tagline: string;
  about_me: string;
  avatar_url: string;
  resume_url: string;
  social_links: SocialLink;
  location: string;
  status_message: string;
}

export interface CoreTechStack {
  id: string,
  name: string,
  slug: string,
  icon_name: string,
  type: string,
  description: string,
  badge_category: string,
  is_core: boolean
}

export interface ContentType {
  permasalahan: string,
  perencanaan: string,
  proses: string,
  hasil: string
}

export interface FeaturedProject {
  id: string,
  title: string,
  subtitle: string,
  slug: string,
  content: ContentType,
  thumbnail_url: string,
  live_url: string,
  source_url: string,
  is_featured: boolean,
  status: string,
  category: string,
  description: string,
  tags: CoreTechStack[]
}
