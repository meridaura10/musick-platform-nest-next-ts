import React, { useState, useEffect } from "react";

export function useDebounce<T>(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  },[value])
  return debouncedValue
}