'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { AuthGuard } from '@/components/guards/auth-guard';
import { createOrder } from '@/lib/api/orders';
import { stkPush, verifyPayment } from '@/lib/api/payments';
import { useCartStore } from '@/lib/stores/cart-store';

export default function CheckoutPage() {
  const { items, clearCart, total } = useCartStore();
  const [phone, setPhone] = useState('254700000000');
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);
      const order = await createOrder(
        items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        }))
      );
      const payment = await stkPush(order.id, phone);
      toast.success('STK push sent. Complete payment on your phone.');
      if (payment.CheckoutRequestID) {
        setTimeout(async () => {
          try {
            await verifyPayment(payment.CheckoutRequestID);
            toast.success('Payment status updated.');
            clearCart();
          } catch (_e) {
            toast.error('Unable to verify payment yet.');
          }
        }, 8000);
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.detail || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <div className="space-y-5 rounded-xl border border-white/10 bg-surface p-6">
        <h1 className="text-3xl font-black">Checkout</h1>
        <p className="text-muted">Total: KES {total().toFixed(2)}</p>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="2547XXXXXXXX"
          className="w-full rounded border border-white/20 bg-bg px-4 py-2"
        />
        <button
          disabled={loading || items.length === 0}
          onClick={handleCheckout}
          className="rounded bg-electric px-4 py-3 font-bold text-black disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay with M-Pesa'}
        </button>
      </div>
    </AuthGuard>
  );
}
