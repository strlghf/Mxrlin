import { useState } from "react";
import { Link, useParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts";

export function ProductPageDetail () {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const { products, error } = useFetchProducts(`/products/${id}`);

  const product = products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      category: product.category,
      stock: product.stock
  }))

  if (!products) {
    return (
      <div className="detail-error">
        <h2>{error ? 'Error de conexión' : 'Producto no encontrado'}</h2>
        <Link to="/" className="btn-back">Volver a la tienda</Link>
      </div>
    )
  }
  
  const clpFormatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  const formattedPrice = clpFormatter.format(products.price / 6);
  const formattedCuota = clpFormatter.format(Math.round(product.price / 6));

  return (
  )
}