import type { Product } from "../../types/types";
import { Link } from "react-router";
import "./ProductCard.css";
import { useState } from "react";

export function ProductCard ({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const fee = Math.round(product.price / 6);
  const clpFormatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });

  const formattedPrice = clpFormatter.format(product.price);
  const formattedFee = clpFormatter.format(fee);

  const productStock = product.stock < 5 ? `Sólo quedan ${product.stock} unidades` : "Disponible";

  return (
    <li className="product">
      <button 
        className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
        onClick={() => setIsFavorite(!isFavorite)}
        aria-label="Añadir a favoritos"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <div className="card">
        <Link to={`/products/${product.id}`}>
          <img src={product.img} alt={product.name} loading="lazy" />
          <h3>{product.name}</h3>
          <p className="price">{formattedPrice}</p>
          <p className="fee">6 cuotas de {formattedFee} sin interés</p>
          <p className="stock">{productStock}</p>
        </Link>
      </div>
      
      <div className="product-actions">
        {/* <Link to={`/products/${product.id}`}><button className="card-link">Ver Producto</button></Link> */}
        {/* <button className="btn-primary">Añadir al Carrito</button> */}
      </div>
    </li>
  )
}