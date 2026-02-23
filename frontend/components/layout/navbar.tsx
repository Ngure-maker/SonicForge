'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useCartStore } from '@/lib/stores/cart-store';

export function Navbar() {
  const { user, clearAuth } = useAuthStore();
  const cartCount = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-wide text-electric">
          SonicForge
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-muted">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          {!user && <Link href="/login">Login</Link>}
          {!user && <Link href="/register">Register</Link>}
          {user && <Link href="/dashboard">Dashboard</Link>}
          {user?.role === 'admin' && <Link href="/admin">Admin</Link>}
          {user && (
            <button
              onClick={clearAuth}
              className="rounded border border-neon/80 px-3 py-1 text-neon transition hover:bg-neon hover:text-black"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
