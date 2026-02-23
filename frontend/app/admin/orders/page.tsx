'use client';

import { useEffect, useState } from 'react';
import { AdminGuard } from '@/components/guards/admin-guard';
import { myOrders } from '@/lib/api/orders';
import type { Order } from '@/lib/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    myOrders().then((data) => setOrders(data.results || []));
  }, []);

  return (
    <AdminGuard>
      <div className="space-y-4">
        <h1 className="text-3xl font-black">Order Management</h1>
        {orders.map((order) => (
          <div key={order.id} className="rounded border border-white/10 bg-surface p-4">
            <p className="font-bold">#{order.id} - {order.status}</p>
            <p>Total: KES {order.total_amount}</p>
          </div>
        ))}
      </div>
    </AdminGuard>
  );
}
