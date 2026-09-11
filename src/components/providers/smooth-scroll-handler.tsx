"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SmoothScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Handle hash scroll on route change or page load
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }
    };

    handleHashScroll();

    // Intercept clicks on same-page anchor links for immediate smooth scrolling
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.hash && url.pathname === window.location.pathname) {
          const targetId = url.hash.replace("#", "");
          const element = document.getElementById(targetId);

          if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", url.hash);
          }
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  return null;
}
