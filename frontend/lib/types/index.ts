export type User = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  role: 'admin' | 'customer';
  created_at: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  brand: string;
  image?: string | null;
  is_featured: boolean;
  created_at: string;
};

export type OrderItem = {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  price: string;
};

export type Order = {
  id: number;
  user: number;
  total_amount: string;
  status: 'pending' | 'paid' | 'failed' | 'shipped';
  payment_reference: string;
  created_at: string;
  items: OrderItem[];
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
