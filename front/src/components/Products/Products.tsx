import { ProductCard } from "../ProductCard";
import { useFetchProducts } from "../../hooks/useFetchProducts";

export function Products ({ search }: { search: string }) {
  const { products, loading, error } = useFetchProducts(search);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error.message}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div>
        <p>No hay resultados para tu búsqueda</p>
      </div>
    )
  }

  return (
    <ul className="products">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}