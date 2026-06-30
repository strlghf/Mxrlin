import type { Product } from "../types/types";
import { useState, useEffect } from "react";

export const useFetchProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setProduct({
      id: id || 1,
      name: product?.name
    })
  })
}