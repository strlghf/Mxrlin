import type { Product } from "../../types/types";
import "./ProductCard.css";
import { Link } from "react-router";

export function ProductCard ({ product }: { product: Product }) {
  return (
    <li className="product">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">$ {product.price}</p>
      <div className="product-actions">
        <Link to={`/api/products/${product.id}`}><button className="btn-secondary">Ver Producto</button></Link>
        <button className="btn-primary">Añadir al Carrito</button>
      </div>
    </li>
  )
}