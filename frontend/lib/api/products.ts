import { api } from './client';
import type { PaginatedResponse, Product } from '@/lib/types';

export async function listProducts(params?: Record<string, string | number>) {
  const { data } = await api.get<PaginatedResponse<Product>>('/products/', { params });
  return data;
}

export async function getProductBySlug(slug: string) {
  const { data } = await api.get<Product>(`/products/${slug}/`);
  return data;
}

export async function createProduct(payload: Partial<Product>) {
  const { data } = await api.post('/products/', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateProduct(id: number, payload: Partial<Product>) {
  const { data } = await api.put(`/products/${id}/`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteProduct(id: number) {
  const { data } = await api.delete(`/products/${id}/`);
  return data;
}
