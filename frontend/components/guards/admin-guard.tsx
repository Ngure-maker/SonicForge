'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) router.push('/login');
    if (user && user.role !== 'admin') router.push('/dashboard');
  }, [router, user]);

  if (!user || user.role !== 'admin') return null;
  return <>{children}</>;
}
