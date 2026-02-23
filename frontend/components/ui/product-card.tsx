'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/lib/stores/cart-store';

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const imageSrc = product.image ? product.image : '/images/placeholder.svg';

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-surface/90 shadow-glow transition hover:-translate-y-1 hover:border-electric/70">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-bold text-text">{product.name}</h3>
          <p className="text-sm text-muted">{product.brand} • {product.category}</p>
        </div>
        <p className="text-xl font-black text-neon">KES {product.price}</p>
        <div className="flex gap-2">
          <Link href={`/products/${product.slug}`} className="rounded bg-electric px-3 py-2 text-sm font-semibold text-black">
            View
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="rounded border border-electric px-3 py-2 text-sm font-semibold text-electric"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
