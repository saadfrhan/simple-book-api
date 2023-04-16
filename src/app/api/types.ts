export interface Book {
  name: string;
  type: string;
  available: boolean;
  author: string;
  isbn: string;
  price: number;
  current_stock: number;
}

export interface User {
  client_name: string;
  client_email: string;
}

export interface Order {
  book_id: number;
  customer_name: string;
  quantity: number;
  created_by: string;
  timestamp: Date;
}

export interface OrderRequest {
  book_id: number;
  customer_name: string;
}

export interface Params {
  params: {
    id: number
  }
}