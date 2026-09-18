"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SIDEBAR_ITEMS } from "@/shared/constants/sidebar.constant";
import { cn } from "@/lib/utils";
import {
  ArrowSquareOutIcon,
  SignOutIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("Admin");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 min-w-64 h-screen sticky top-0 flex flex-col justify-between border-r-2 border-border bg-card font-sans select-none z-40">
      {/* Brand Header */}
      <div className="p-4 border-b-2 border-border bg-background/50">
        <Link
          href="/admin-dashboard"
          className="flex items-center gap-3 group transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <div className="flex aspect-square size-9 items-center justify-center bg-accent text-accent-foreground border-2 border-border font-extrabold shadow-retro">
            <Image
              src="/logo/hand-horns-icon.svg"
              alt="Wanks Logo"
              className="size-5 object-contain"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-chillax font-extrabold text-foreground text-sm tracking-wider uppercase leading-none">
              WANKS ADMIN
            </span>
            <span className="text-[10px] font-mono text-muted-foreground mt-1 uppercase font-bold tracking-tight">
              Control Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Menu Items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
        <div className="px-2.5 py-1 text-[10px] font-mono uppercase font-bold text-muted-foreground tracking-wider">
          Navigation
        </div>

        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.url === "/admin-dashboard"
              ? pathname === "/admin-dashboard"
              : pathname.startsWith(item.url);

          return (
            <Link
              key={item.key}
              href={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-xs font-chillax font-bold uppercase transition-all rounded-none border-2",
                isActive
                  ? "bg-primary text-primary-foreground border-border shadow-retro -translate-x-0.5 -translate-y-0.5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5",
              )}
            >
              <Icon
                className="size-4 shrink-0"
                weight={isActive ? "fill" : "bold"}
              />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions & Profile */}
      <div className="p-3 border-t-2 border-border bg-background/50 space-y-2.5">
        {/* Quick View Site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-chillax font-bold uppercase border-2 border-border bg-background hover:bg-accent hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-muted-foreground hover:text-foreground"
        >
          <div className="flex items-center gap-2">
            <ArrowSquareOutIcon className="size-3.5" weight="bold" />
            <span>View Site</span>
          </div>
          <span className="text-[9px] font-mono bg-accent px-1.5 py-0.2 border border-border font-bold">
            LIVE
          </span>
        </Link>

        {/* User Card & Logout */}
        <div className="flex items-center justify-between p-2 border-2 border-border bg-card shadow-retro">
          <div className="flex items-center gap-2 min-w-0 pr-1">
            <div className="flex aspect-square size-7 items-center justify-center bg-accent text-accent-foreground border border-border shrink-0">
              <UserCircleIcon className="size-4" weight="bold" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-chillax font-bold uppercase truncate leading-tight">
                Admin
              </span>
              <span
                className="text-[10px] font-mono text-muted-foreground truncate leading-tight max-w-[120px]"
                title={userEmail}
              >
                {userEmail}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            title="Sign Out"
            className="flex size-7 items-center justify-center border border-border bg-destructive/15 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            <SignOutIcon className="size-3.5" weight="bold" />
          </button>
        </div>
      </div>
    </aside>
  );
}