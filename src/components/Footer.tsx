"use client";
import { DynamicIcon } from "@/lib/DynamicIcon";
import { ArrowUpIcon } from "@phosphor-icons/react";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t-2 border-border bg-card py-3 px-4 sm:px-6 font-sans mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Copyright */}
        <div className="flex items-center gap-3 text-xs font-mono font-bold text-muted-foreground">
          <div className="flex aspect-square size-10 items-center shadow-retro justify-center bg-accent text-accent-foreground border-2 border-border">
            <Image
              src={"./logo/hand-horns-icon.svg"}
              alt="Wanks Logo"
              className="size-5 object-contain"
              width={24}
              height={24}
            />
          </div>
          <span>
            &copy; {new Date().getFullYear()} WANKS PROJECT. ALL RIGHTS
            RESERVED.
          </span>
        </div>

        {/* Social & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/giwnk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover-retro-lift bg-background border-2 border-border hover:bg-accent text-foreground shadow-retro"
              aria-label="GitHub"
            >
              <DynamicIcon
                name="siGithub"
                size={14}
                className="text-foreground"
              />
            </a>
            <a
              href="https://linkedin.com/in/giwnk"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover-retro-lift p-1.5 bg-background border-2 border-border hover:bg-accent text-foreground shadow-retro"
              aria-label="LinkedIn"
            >
              <DynamicIcon
                name="LinkedinLogo"
                size={14}
                className="text-foreground"
              />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex cursor-pointer items-center gap-1 text-xs font-mono font-bold uppercase bg-secondary text-secondary-foreground border-2 border-border px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
          >
            <span>TOP</span>
            <ArrowUpIcon className="size-3" weight="bold" />
          </button>
        </div>
      </div>
    </footer>
  );
}
