import { useFetchProducts } from "../../hooks/useFetchProducts";
import { ProductCard } from "../ProductCard";

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

  return (
    <ul className="products">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}