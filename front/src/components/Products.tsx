import { useFetchProducts } from "../hooks/useFetchProducts";

export function Products ({ search }: { search: string }) {
  const { products } = useFetchProducts(search);
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