import { api } from './client';

export async function createOrder(items: { product_id: number; quantity: number }[]) {
  const { data } = await api.post('/orders/', { items });
  return data;
}

export async function myOrders() {
  const { data } = await api.get('/orders/my-orders/');
  return data;
}

export async function getOrder(id: number) {
  const { data } = await api.get(`/orders/${id}/`);
  return data;
}
