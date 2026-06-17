export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  stock: number;
  created_at?: Date;
}