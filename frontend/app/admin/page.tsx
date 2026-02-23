'use client';

import Link from 'next/link';
import { AdminGuard } from '@/components/guards/admin-guard';

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <div className="space-y-4">
        <h1 className="text-3xl font-black">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/admin/products/new" className="rounded border border-electric/30 bg-surface p-6">Create Product</Link>
          <Link href="/admin/orders" className="rounded border border-neon/30 bg-surface p-6">Manage Orders</Link>
        </div>
      </div>
    </AdminGuard>
  );
}
