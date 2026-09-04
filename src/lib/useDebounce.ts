"use client";

import { useEffect, useState } from "react";

/**
 * Hook custom useDebounce untuk menunda pembaruan nilai (misal input pencarian)
 * sampai pengguna berhenti mengetik selama durasi `delay` (dalam milidetik).
 *
 * @param value Nilai input yang akan di-debounce
 * @param delay Durasi penundaan dalam milidetik (default: 300ms)
 * @returns Nilai hasil debounce yang telah tertunda
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
