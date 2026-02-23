import { api } from './client';

export async function register(payload: {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
}) {
  const { data } = await api.post('/auth/register/', payload);
  return data;
}

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post('/auth/login/', payload);
  return data;
}

export async function me() {
  const { data } = await api.get('/auth/me/');
  return data;
}
