import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export const useFetchProducts = <T = Product[]>(url: string) => {
  const [data, setData] = useState<T | null>(null);
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

        const data = await response.json();

        setData(data);
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

  return { data, loading, error }
}