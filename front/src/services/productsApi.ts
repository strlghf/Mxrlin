import type { Product, ProductsResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts(
  search: string,
  signal?: AbortSignal
): Promise<ProductsResponse> {
  const url = search.trim() === "" ? `${API_URL}/api/products` : `${API_URL}/api/products?search=${encodeURIComponent(search)}`;
  
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Error fetching products");
  }

  const result: ProductsResponse = await response.json();

  return result;
}

export async function getProductById(
  id: string,
  signal?: AbortSignal
): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}`, { signal });
  if (!response.ok) {
    throw new Error("Error fetching products");
  }

  const result: Product = await response.json();

  return result;
}