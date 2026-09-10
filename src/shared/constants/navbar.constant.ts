import { ArticleIcon, CertificateIcon, EnvelopeIcon, FolderIcon, HouseIcon, IdentificationBadgeIcon } from "@phosphor-icons/react"

export const NAVBAR_ITEMS = [
  {
    title: "Home",
    key: "home",
    url: "/",
    icon: HouseIcon
  },
  {
    title: "About Me",
    key: "about-me",
    url: "/about-me",
    icon: IdentificationBadgeIcon
  },
  {
    title: "Projects",
    key: "projects",
    url: "/projects",
    icon: FolderIcon
  },
  {
    title: "Certificates",
    key: "certificates",
    url: "/certificates",
    icon: CertificateIcon
  },
  // {
  //   title: "Blog",
  //   key: "blog",
  //   url: "/blog",
  //   icon: ArticleIcon
  // },
];
