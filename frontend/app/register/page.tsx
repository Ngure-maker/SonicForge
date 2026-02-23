'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { register } from '@/lib/api/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: '', email: '', phone_number: '', password: '' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register(form);
      toast.success('Registered successfully. Please login.');
      router.push('/login');
    } catch (_e) {
      toast.error('Registration failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-4 rounded-xl border border-white/10 bg-surface p-6">
      <h1 className="text-3xl font-black">Register</h1>
      <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Phone number" value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
      <input type="password" className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full rounded bg-neon px-4 py-3 font-bold text-black">Create account</button>
    </form>
  );
}
