"use client";

import React from "react";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
} from "@phosphor-icons/react";
import { PaginationMeta } from "@/shared/types/response.type";
import { cn } from "@/lib/utils";

interface PaginationProps {
  meta?: PaginationMeta | null;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  meta,
  onPageChange,
  className,
}: PaginationProps) {
  if (!meta || meta.totalPages <= 1) return null;

  const { page, totalPages, totalItems, limit, hasPrevPage, hasNextPage } = meta;

  const startItem = Math.min((page - 1) * limit + 1, totalItems);
  const endItem = Math.min(page * limit, totalItems);

  // Generate page array with smart truncation (max 5 buttons visible)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border-2 border-border p-4 shadow-retro my-6",
        className
      )}
    >
      {/* Informative Label */}
      <p className="font-mono text-xs text-muted-foreground font-semibold">
        Menampilkan <span className="text-foreground font-bold">{startItem}</span> -{" "}
        <span className="text-foreground font-bold">{endItem}</span> dari{" "}
        <span className="text-foreground font-bold">{totalItems}</span> data
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {/* First Page */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={!hasPrevPage}
          title="Halaman Pertama"
          className="bg-background border-2 border-border p-2 text-xs font-bold shadow-retro hover-retro-lift disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none transition-all"
        >
          <CaretDoubleLeftIcon size={16} weight="bold" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          title="Halaman Sebelumnya"
          className="bg-background border-2 border-border px-3 py-2 text-xs font-bold flex items-center gap-1 shadow-retro hover-retro-lift disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none transition-all font-sans"
        >
          <CaretLeftIcon size={16} weight="bold" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((p, idx) => {
          if (typeof p === "string") {
            return (
              <span
                key={`dots-${idx}`}
                className="px-2 py-1 font-mono text-xs font-bold text-muted-foreground select-none"
              >
                ...
              </span>
            );
          }

          const isActive = p === page;

          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={cn(
                "border-2 border-border min-w-[36px] h-[36px] text-xs font-bold font-mono transition-all flex items-center justify-center",
                isActive
                  ? "bg-primary text-primary-foreground shadow-retro scale-105"
                  : "bg-background text-foreground shadow-retro hover-retro-lift"
              )}
            >
              {p}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          title="Halaman Selanjutnya"
          className="bg-background border-2 border-border px-3 py-2 text-xs font-bold flex items-center gap-1 shadow-retro hover-retro-lift disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none transition-all font-sans"
        >
          <span className="hidden sm:inline">Selanjutnya</span>
          <CaretRightIcon size={16} weight="bold" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNextPage}
          title="Halaman Terakhir"
          className="bg-background border-2 border-border p-2 text-xs font-bold shadow-retro hover-retro-lift disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none transition-all"
        >
          <CaretDoubleRightIcon size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
