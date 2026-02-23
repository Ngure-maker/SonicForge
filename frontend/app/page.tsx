import Link from 'next/link';
import { listProducts } from '@/lib/api/products';
import { ProductCard } from '@/components/ui/product-card';

export default async function HomePage() {
  const products = await listProducts({ featured: 'true', page_size: 4 }).catch(() => ({ results: [] }));

  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 rounded-2xl border border-white/10 bg-surface/70 p-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-electric">Premium Audio Commerce</p>
          <h1 className="animate-rise text-4xl font-black leading-tight md:text-6xl">
            Pro Gear for Studios, Events, and Creators
          </h1>
          <p className="max-w-xl text-muted">
            Buy and rent world-class audio equipment with seamless M-Pesa checkout and transparent order tracking.
          </p>
          <Link href="/products" className="inline-block rounded bg-neon px-5 py-3 font-bold text-black">
            Explore Catalog
          </Link>
        </div>
        <div className="rounded-xl border border-electric/30 bg-black/40 p-6">
          <p className="text-sm text-muted">Featured workflow</p>
          <p className="mt-2 text-2xl font-bold">Search -> Add to Cart -> Checkout -> STK Push -> Confirmation</p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Featured Products</h2>
          <Link href="/products" className="text-electric">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
