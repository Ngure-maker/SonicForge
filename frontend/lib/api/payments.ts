import { api } from './client';

export async function stkPush(order_id: number, phone_number: string) {
  const { data } = await api.post('/payments/stk-push/', { order_id, phone_number });
  return data;
}

export async function verifyPayment(checkout_request_id: string) {
  const { data } = await api.post('/payments/verify/', { checkout_request_id });
  return data;
}
