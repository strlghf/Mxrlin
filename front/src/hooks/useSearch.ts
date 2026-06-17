import { useState, useEffect, useRef, type FormEvent } from "react";

export const useSearch = (delay = 500) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const firstInput = useRef(true);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = search === "";
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  // useEffect(() => {
  //   if (!debouncedSearch || debouncedSearch.trim() === "") return;

  //   // Api fetch call goes here;
  // }, [debouncedSearch]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim();

    if (!query) return;

    setDebouncedSearch(query);
  }

  return { search, setSearch, debouncedSearch, handleSearchSubmit }
}