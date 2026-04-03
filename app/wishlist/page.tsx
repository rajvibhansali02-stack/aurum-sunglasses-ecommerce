"use client";

import { useAppContext } from "@/app/providers";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { likedItems } = useAppContext();

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-12 border-b border-white/10 pb-6">Your Wishlist</h1>
        
        {likedItems.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <p className="text-gray-400 mb-6 text-lg">Your wishlist is currently empty.</p>
            <Link href="/shop" className="bg-white text-black font-semibold uppercase tracking-widest text-xs px-10 py-4 hover:bg-gold-500 hover:text-white transition-all duration-300">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {likedItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
