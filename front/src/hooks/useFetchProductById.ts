import { useState, useEffect } from "react";
import { getProductById } from "../services/productsApi";
import type { Product } from "../types";

export const useFetchProductById = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // const [quantity, setQuantity] = useState(1);
  // const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);

      try {
        const result = await getProductById(id, controller.signal);
        setProduct(result);
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
  }, [id]);

  return { product, loading, error } 
}