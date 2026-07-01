import { useState, useEffect } from "react";
import { getProducts } from "../services/productsApi";
import type { Product, Pagination } from "../types/types";

export const useFetchProducts = (search: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData () {
      setLoading(true);

      try {
        const result = await getProducts(search, controller.signal);

        setProducts(result.data);
        setPagination(result.pagination);
        setError(null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [search]);

  return { products, loading, error, pagination }
}