import { a as useChemStore, r as reactExports, s as searchElements, E as ELEMENTS, q as getElementById } from "./index-DyyHqAHL.js";
function useElement(symbol) {
  if (!symbol) return void 0;
  return getElementById(symbol);
}
function useFilteredElements() {
  const { searchQuery, categoryFilter, groupFilter, periodFilter } = useChemStore();
  return reactExports.useMemo(() => {
    let results = searchQuery ? searchElements(searchQuery) : ELEMENTS;
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
function useFavoriteElements() {
  const favorites = useChemStore((s) => s.favorites);
  return reactExports.useMemo(
    () => favorites.map((sym) => getElementById(sym)).filter(Boolean),
    [favorites]
  );
}
function useRecentElements() {
  const recentlyViewed = useChemStore((s) => s.recentlyViewed);
  return reactExports.useMemo(
    () => recentlyViewed.map((sym) => getElementById(sym)).filter(Boolean),
    [recentlyViewed]
  );
}
function useCompareElements() {
  const [s1, s2] = useChemStore((s) => s.compareElements);
  return [
    s1 ? getElementById(s1) : void 0,
    s2 ? getElementById(s2) : void 0
  ];
}
export {
  useElement as a,
  useFavoriteElements as b,
  useRecentElements as c,
  useCompareElements as d,
  useFilteredElements as u
};
