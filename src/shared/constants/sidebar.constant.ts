import {
  ChartLineUpIcon,
  FoldersIcon,
  CertificateIcon,
  EnvelopeSimpleIcon,
  BriefcaseIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    key: "dashboard",
    url: "/admin-dashboard",
    icon: ChartLineUpIcon,
  },
  {
    title: "Projects",
    key: "projects",
    url: "/admin-dashboard/projects",
    icon: FoldersIcon,
  },
  {
    title: "Certificates",
    key: "certificates",
    url: "/admin-dashboard/certificates",
    icon: CertificateIcon,
  },
  {
    title: "Messages",
    key: "messages",
    url: "/admin-dashboard/messages",
    icon: EnvelopeSimpleIcon,
  },
  {
    title: "Experiences",
    key: "experiences",
    url: "/admin-dashboard/experiences",
    icon: BriefcaseIcon,
  },
  {
    title: "Profile",
    key: "profile",
    url: "/admin-dashboard/profile",
    icon: UserCircleIcon,
  },
];
