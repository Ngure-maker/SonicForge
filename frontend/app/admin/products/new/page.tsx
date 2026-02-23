'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { AdminGuard } from '@/components/guards/admin-guard';
import { createProduct } from '@/lib/api/products';

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: 0,
    category: '',
    brand: '',
    is_featured: false,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createProduct(form as any);
      toast.success('Product created');
    } catch (_e) {
      toast.error('Failed to create product');
    }
  }

  return (
    <AdminGuard>
      <form onSubmit={submit} className="space-y-4 rounded border border-white/10 bg-surface p-6">
        <h1 className="text-3xl font-black">Create Product</h1>
        <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input type="number" className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Stock" onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
        <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="Brand" onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <button className="rounded bg-electric px-4 py-3 font-bold text-black">Create</button>
      </form>
    </AdminGuard>
  );
}
