export interface Product {
  id?: number;
  name: string;
  price: number;
  img: string;
  category?: string;
  stock: number;
  created_at?: Date;
}

export interface ProductsResponse {
  data: Product[];
  pagination: Pagination;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
}