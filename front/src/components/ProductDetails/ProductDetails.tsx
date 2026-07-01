import { useState } from "react";
import { Link, useParams } from "react-router";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import type { Product } from "../../types/types";

export function ProductDetails ({ product }: { product: Product }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);

  const { products, error } = useFetchProducts(`${id}`);

  if (!products) {
    return (
      <div className="detail-error">
        <h2>{error ? 'Error de conexión' : 'Producto no encontrado'}</h2>
        <Link to="/" className="btn-back">Volver a la tienda</Link>
      </div>
    )
  }

  const clpFormatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  const formattedPrice = clpFormatter.format(product.price / 6);
  const formattedFee = clpFormatter.format(Math.round(product.price / 6));

  return (
    <main className="detail-container">
      <Link to="/" className="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Volver a la tienda
      </Link>

      <section className="detail-layout">
        <div className="detail-image-wrapper">
          <img src={product.img} alt={product.name} />
          
          <button 
            className={`detail-wishlist ${favorite ? 'active' : ''}`}
            onClick={() => setFavorite(!favorite)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>

        <div className="detail-info-wrapper">
          <span className="detail-brand">{product.name}</span>
          <h1 className="detail-title">{product.name}</h1>
          
          <div className="detail-pricing">
            <h2 className="detail-price">{formattedPrice}</h2>
            <p className="detail-cuotas">6 cuotas de <span>{formattedFee}</span> sin interés</p>
          </div>

          {product.stock < 5 && (
            <p className="detail-stock-alert">🔥 Solo quedan {product.stock} unidades</p>
          )}

          <p className="detail-description">{product.name}</p>

          {/* <div className="detail-specs">
            <h3>Especificaciones técnicas:</h3>
            <ul>
              {product..map((spec, i) => <li key={i}>{spec}</li>)}
            </ul>
          </div> */}

          <div className="detail-actions-box">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} disabled={quantity >= product.stock}>+</button>
            </div>

            <button className="detail-btn-buy">
              Añadir al Carrito
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}