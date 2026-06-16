import { useState, useEffect } from "react";
import type { Product } from "../types/types";

export const useFetchProducts = (url: string) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData () {
      setLoading(true);
      try {
        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) throw new Error("Error fetching data");

        const data: Product[] = await response.json();

        setProducts(data);
        setError(null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(err as Error)
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { products, loading, error }
}