import { useState, useEffect, useRef, type FormEvent } from "react";
import { useNavigate } from "react-router";

export const useSearch = (initialValue = "") => {
  const [search, setSearch] = useState(initialValue);
  const navigate = useNavigate();
  const firstInput = useRef(true);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = search === "";
      return;
    }
  }, [search]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;
    
    navigate(`/products?search=${encodeURIComponent(query)}`);
  }

  return { search, setSearch, handleSearchSubmit }
}