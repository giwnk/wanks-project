"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  EnvelopeSimpleIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { NAVBAR_ITEMS } from "@/shared/constants/navbar.constant";
import Image from "next/image";
import { useTheme } from "@/components/providers/theme-provider";

const navItems = NAVBAR_ITEMS;

export default function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur font-sans">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <div className="flex aspect-square size-9 items-center justify-center bg-accent text-accent-foreground border-2 border-border font-extrabold shadow-retro">
            <Image
              src={"./logo/hand-horns-icon.svg"}
              alt="Wanks Logo"
              className="size-5 object-contain"
              width={24}
              height={24}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-chillax font-extrabold text-foreground text-base tracking-wider uppercase">
              WANKS PROJECT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-xs font-chillax font-bold uppercase transition-all rounded-none border-2",
                  isActive
                    ? "bg-primary text-primary-foreground border-border shadow-retro -translate-x-0.5 -translate-y-0.5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5",
                )}
              >
                <Icon className="size-4" weight={isActive ? "fill" : "bold"} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contact Button */}
          <a
            href="mailto:giwank.abhinaya@example.com"
          >
            <Button
              size="sm"
              className="h-8 px-2.5 sm:px-3 rounded-none bg-primary text-primary-foreground font-chillax font-extrabold text-xs border-2 border-border shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all gap-1.5"
            >
              <EnvelopeSimpleIcon className="size-3.5" weight="bold" />
              <span className="tracking-normal">CONTACT</span>
            </Button>
          </a>

          

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex size-9 items-center justify-center rounded-none border-2 border-border bg-accent text-accent-foreground shadow-retro transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <XIcon className="size-5" weight="bold" />
            ) : (
              <ListIcon className="size-5" weight="bold" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-border bg-card p-4 space-y-2 font-sans shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;

              return (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 p-2.5 text-xs font-mono font-bold uppercase border-2 transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "border-border bg-background text-foreground hover:bg-accent",
                  )}
                >
                  <Icon
                    className="size-4"
                    weight={isActive ? "fill" : "bold"}
                  />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
