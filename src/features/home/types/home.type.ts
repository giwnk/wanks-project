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
