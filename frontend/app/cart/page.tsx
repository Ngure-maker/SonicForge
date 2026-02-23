'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cart-store';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCartStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between rounded border border-white/10 bg-surface p-4">
            <div>
              <p className="font-bold">{item.product.name}</p>
              <p className="text-muted">KES {item.product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                className="w-20 rounded border border-white/20 bg-bg px-2 py-1"
              />
              <button onClick={() => removeFromCart(item.product.id)} className="text-neon">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded border border-white/10 bg-surface p-4">
        <p className="text-xl font-bold">Total: KES {total().toFixed(2)}</p>
      </div>
      <Link href="/checkout" className="inline-block rounded bg-neon px-5 py-3 font-bold text-black">
        Proceed to Checkout
      </Link>
    </div>
  );
}
