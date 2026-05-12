import {
  ELEMENTS,
  getElementById,
  searchElements as localSearch,
} from "@/lib/elements-data";
import { useChemStore } from "@/store/useChemStore";
import type { Element, ElementCategory } from "@/types/element";
import { useMemo } from "react";

export function useAllElements(): Element[] {
  return ELEMENTS;
}

export function useElement(symbol: string | undefined): Element | undefined {
  if (!symbol) return undefined;
  return getElementById(symbol);
}

export function useFilteredElements(): Element[] {
  const { searchQuery, categoryFilter, groupFilter, periodFilter } =
    useChemStore();

  return useMemo(() => {
    let results = searchQuery ? localSearch(searchQuery) : ELEMENTS;

    if (categoryFilter !== "all") {
      results = results.filter((e) => e.category === categoryFilter);
    }
    if (groupFilter !== null) {
      results = results.filter((e) => e.group === groupFilter);
    }
    if (periodFilter !== null) {
      results = results.filter((e) => e.period === periodFilter);
    }
    return results;
  }, [searchQuery, categoryFilter, groupFilter, periodFilter]);
}

export function useFavoriteElements(): Element[] {
  const favorites = useChemStore((s) => s.favorites);
  return useMemo(
    () =>
      favorites.map((sym) => getElementById(sym)).filter(Boolean) as Element[],
    [favorites],
  );
}

export function useRecentElements(): Element[] {
  const recentlyViewed = useChemStore((s) => s.recentlyViewed);
  return useMemo(
    () =>
      recentlyViewed
        .map((sym) => getElementById(sym))
        .filter(Boolean) as Element[],
    [recentlyViewed],
  );
}

export function useCompareElements(): [
  Element | undefined,
  Element | undefined,
] {
  const [s1, s2] = useChemStore((s) => s.compareElements);
  return [
    s1 ? getElementById(s1) : undefined,
    s2 ? getElementById(s2) : undefined,
  ];
}
