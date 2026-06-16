import { useFetchProducts } from "../hooks/useFetchProducts";
import { useSearch } from "../hooks/useSearch";
import type { Product } from "../types/types";

const url = `https://fakestoreapi.com/products/`

export function Products ({ products }: { products: Product[] | null }) {
  if (!(products && products.length > 0)) return null;
  
  return (
    <ul className="products">
      {products.map(product => (
        <li className="product" key={product.id}>
          <img src={product.img} alt={product.name} />
          <h3>{product.name}</h3>
          <p>$ {product.price}</p>
        </li> 
      ))}
    </ul>
  )
}