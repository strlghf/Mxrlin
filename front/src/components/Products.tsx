import { useFetchProducts } from "../hooks/useFetchProducts";

export function Products ({ search }: { search: string }) {
  const { products, loading, error } = useFetchProducts(search);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Ha ocurrido un error</p>;
  if (!products.length) return <p>No se han encontrado productos</p>;

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