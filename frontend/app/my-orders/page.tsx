'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/guards/auth-guard';
import { myOrders } from '@/lib/api/orders';
import type { Order } from '@/lib/types';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    myOrders().then((data) => setOrders(data.results || []));
  }, []);

  return (
    <AuthGuard>
      <div className="space-y-4">
        <h1 className="text-3xl font-black">My Orders</h1>
        {orders.map((order) => (
          <div key={order.id} className="rounded border border-white/10 bg-surface p-4">
            <p className="font-bold">Order #{order.id}</p>
            <p className="text-muted">Status: {order.status}</p>
            <p>Total: KES {order.total_amount}</p>
          </div>
        ))}
      </div>
    </AuthGuard>
  );
}
