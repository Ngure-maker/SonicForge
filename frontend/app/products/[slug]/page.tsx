'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProductBySlug } from '@/lib/api/products';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/lib/stores/cart-store';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    getProductBySlug(params.slug).then(setProduct);
  }, [params.slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative h-96 overflow-hidden rounded-xl border border-white/10">
        <Image src={product.image || '/images/placeholder.svg'} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-black">{product.name}</h1>
        <p className="text-muted">{product.description}</p>
        <p className="text-2xl font-bold text-neon">KES {product.price}</p>
        <button onClick={() => addToCart(product)} className="rounded bg-electric px-4 py-3 font-bold text-black">
          Add to cart
        </button>
      </div>
    </div>
  );
}
