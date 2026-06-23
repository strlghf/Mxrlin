import type { Product } from "../../types/types";
import "./ProductCard.css";

export function ProductCard ({ product }: { product: Product }) {
  return (
    <li className="product">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">$ {product.price}</p>
      <div className="product-actions">
        <button className="btn-secondary">Ver Producto</button>
        <button className="btn-primary">Añadir al Carrito</button>
      </div>
    </li>
  )
}