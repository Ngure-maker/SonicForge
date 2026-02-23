'use client';

import Link from 'next/link';
import { AuthGuard } from '@/components/guards/auth-guard';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <AuthGuard>
      <div className="space-y-4">
        <h1 className="text-3xl font-black">Welcome, {user?.full_name}</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/my-orders" className="rounded border border-electric/40 bg-surface p-6">My Orders</Link>
          {user?.role === 'admin' && <Link href="/admin" className="rounded border border-neon/40 bg-surface p-6">Admin Console</Link>}
        </div>
      </div>
    </AuthGuard>
  );
}
