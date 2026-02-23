'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { login, me } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const tokens = await login(form);
      localStorage.setItem('access', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);
      const user = await me();
      setAuth({ user, access: tokens.access, refresh: tokens.refresh });
      router.push('/dashboard');
      toast.success('Logged in successfully');
    } catch (_e) {
      toast.error('Invalid credentials');
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-4 rounded-xl border border-white/10 bg-surface p-6">
      <h1 className="text-3xl font-black">Login</h1>
      <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full rounded bg-electric px-4 py-3 font-bold text-black">Login</button>
    </form>
  );
}
