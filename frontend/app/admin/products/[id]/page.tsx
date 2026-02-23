'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { AdminGuard } from '@/components/guards/admin-guard';
import { updateProduct } from '@/lib/api/products';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [price, setPrice] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateProduct(Number(params.id), { price } as any);
      toast.success('Product updated');
    } catch (_e) {
      toast.error('Update failed');
    }
  }

  return (
    <AdminGuard>
      <form onSubmit={submit} className="space-y-4 rounded border border-white/10 bg-surface p-6">
        <h1 className="text-3xl font-black">Edit Product #{params.id}</h1>
        <input className="w-full rounded border border-white/20 bg-bg px-4 py-2" placeholder="New price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className="rounded bg-electric px-4 py-3 font-bold text-black">Save</button>
      </form>
    </AdminGuard>
  );
}
