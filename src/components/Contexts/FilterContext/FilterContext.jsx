import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 5000,
    sort: "default",
  });

  const updateFilters = (newValues) =>
    setFilters((prev) => ({ ...prev, ...newValues }));

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
