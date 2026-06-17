import { useFetchProducts } from "../hooks/useFetchProducts";
import type { Product } from "../types/types";

export function Products ({ search }: { search: string }) {
  const { products, loading, error } = useFetchProducts(search);
  
  const hasProducts = products && products.length > 0
  // if (!(products && products.length > 0)) return null;

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p>An error has ocurred</p>}
      {products && products.length === 0 }
    </>
  )
}