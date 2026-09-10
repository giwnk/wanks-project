"use client";

import React, { useState, useEffect } from "react";
import { useDebounce } from "@/lib/useDebounce";
import {
  MagnifyingGlassIcon,
  XIcon,
  ArrowsCounterClockwiseIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterProps {
  search?: string;
  onSearchChange?: (val: string) => void;
  debounceMs?: number;

  selectedStatus?: string;
  statuses?: string[];
  onStatusChange?: (status: string) => void;

  selectedCategory?: string;
  categories?: string[];
  categoryLabel?: string;
  onCategoryChange?: (category: string) => void;

  selectedTechStack?: string;
  techStacks?: string[];
  onTechStackChange?: (tech: string) => void;

  onReset?: () => void;
  placeholder?: string;
  className?: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const ALL_VALUE = "__ALL__";
  const currentValue = value || ALL_VALUE;

  const handleValueChange = (val: string) => {
    onChange(val === ALL_VALUE ? "" : val);
  };

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn(
          value
            ? "bg-primary text-primary-foreground font-bold"
            : "bg-background text-foreground font-serif"
        )}
      >
        <SelectValue placeholder={`${label}: Semua`}>
          {value ? `${label}: ${value}` : `${label}: Semua`}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_VALUE}>{label}: Semua</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function Filter({
  search = "",
  onSearchChange,
  debounceMs = 300,
  selectedStatus = "",
  statuses = ["Completed", "In Progress", "Planned"],
  onStatusChange,
  selectedCategory = "",
  categories = ["Web", "Mobile", "UI/UX", "Backend"],
  categoryLabel = "Kategori",
  onCategoryChange,
  selectedTechStack = "",
  techStacks = ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Supabase"],
  onTechStackChange,
  onReset,
  placeholder = "Cari berdasarkan nama atau deskripsi...",
  className,
}: FilterProps) {
  // Local state for smooth, lag-free search input typing
  const [localSearch, setLocalSearch] = useState<string>(search);
  const debouncedSearch = useDebounce(localSearch, debounceMs);

  // Sync internal local state when external `search` prop changes (e.g. URL change or reset)
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Notify parent `onSearchChange` only after user stops typing for `debounceMs`
  useEffect(() => {
    if (debouncedSearch !== search) {
      onSearchChange?.(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleClearSearch = () => {
    setLocalSearch("");
    onSearchChange?.("");
  };

  const hasActiveFilter = Boolean(
    localSearch || selectedStatus || selectedCategory || selectedTechStack
  );

  return (
    <div
      className={cn(
        "bg-card border-2 border-border p-4 shadow-retro my-2 flex flex-col lg:flex-row items-center gap-3 w-full",
        className
      )}
    >
      {/* 1. Debounced Search Bar Input */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <MagnifyingGlassIcon size={18} weight="bold" />
        </div>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-background border-2 border-border font-serif text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-retro placeholder:text-muted-foreground transition-all"
        />
        {localSearch && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer"
            title="Bersihkan Pencarian"
          >
            <XIcon size={16} weight="bold" />
          </button>
        )}
      </div>

      {/* 2. Dropdown Filters Side-by-Side */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto">
        {/* Status Dropdown */}
        {onStatusChange && (
          <FilterSelect
            label="Status"
            value={selectedStatus}
            options={statuses}
            onChange={(val) => onStatusChange(val)}
          />
        )}

        {/* Category Dropdown */}
        {onCategoryChange && (
          <FilterSelect
            label={categoryLabel}
            value={selectedCategory}
            options={categories}
            onChange={(val) => onCategoryChange(val)}
          />
        )}

        {/* Tech Stack Dropdown */}
        {onTechStackChange && (
          <FilterSelect
            label="Tech Stack"
            value={selectedTechStack}
            options={techStacks}
            onChange={(val) => onTechStackChange(val)}
          />
        )}

        {/* Reset Filter Button */}
        {hasActiveFilter && onReset && (
          <button
            type="button"
            onClick={() => {
              setLocalSearch("");
              onReset();
            }}
            className="w-full sm:w-auto bg-accent text-accent-foreground border-2 border-border px-3 py-2.5 text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-retro hover-retro-lift cursor-pointer whitespace-nowrap"
            title="Reset semua filter"
          >
            <ArrowsCounterClockwiseIcon size={16} weight="bold" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
