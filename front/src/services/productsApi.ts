import type { Product } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts(
  search: string,
  signal?: AbortSignal
): Promise<Product[]> {
  const url = search.trim() === "" ? `${API_URL}/api/products` : `${API_URL}/api/products?search=${encodeURIComponent(search)}`;
  
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Error fetching products");
  }

  return response.json()
}