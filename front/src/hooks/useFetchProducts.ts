import { useState, useEffect } from "react";

export const useFetchProducts = (search: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData () {
      setLoading(true);
      try {
        const url = search.trim() === "" ? `${import.meta.env.VITE_API_URL}/api/products` : `${import.meta.env.VITE_API_URL}/api/products?search=${encodeURIComponent(search)}`

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
  }, [search]);

  return { products, loading, error }
}