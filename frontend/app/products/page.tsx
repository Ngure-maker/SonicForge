'use client';

import { useEffect, useState } from 'react';
import { listProducts } from '@/lib/api/products';
import { ProductCard } from '@/components/ui/product-card';
import type { PaginatedResponse, Product } from '@/lib/types';

export default function ProductsPage() {
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    listProducts({ search: q, category, page })
      .then(setData)
      .catch(() => setData({ count: 0, next: null, previous: null, results: [] }));
  }, [q, category, page]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Products</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          placeholder="Search products"
          className="rounded border border-white/20 bg-surface px-4 py-2"
        />
        <input
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          placeholder="Filter by category"
          className="rounded border border-white/20 bg-surface px-4 py-2"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.results.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className="flex gap-3">
        <button
          disabled={!data?.previous}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded border border-white/20 px-3 py-2 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={!data?.next}
          onClick={() => setPage((p) => p + 1)}
          className="rounded border border-white/20 px-3 py-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
