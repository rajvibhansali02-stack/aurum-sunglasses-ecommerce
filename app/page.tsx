import Hero from "@/components/Hero";
import ProductCard, { Product } from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

import { allProducts } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Curated Selection</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Trending Elegance</h3>
          </div>
          <Link href="/shop" className="text-sm uppercase tracking-widest font-semibold border-b border-gold-500 pb-1 hover:text-gold-500 transition-colors">
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-10">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Identity Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/3] w-full bg-black">
               <Image 
                  src="/sunglass-1.jpg" 
                  alt="Craftsmanship" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
               />
               <div className="absolute inset-0 border border-gold-500/30 m-6 pointer-events-none" />
            </div>
            <div className="flex flex-col gap-8 max-w-xl">
              <h2 className="text-sm text-gold-500 uppercase tracking-widest font-bold">Our Heritage</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">Mastering the Art of Optical Luxury</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Since inception, AURUM has defined the pinnacle of eyewear. Each frame is meticulously handcrafted in Italy, requiring over 80 distinct steps and taking weeks to perfect. We blend timeless design with state-of-the-art optical engineering.
              </p>
              <div className="flex gap-12 mt-4">
                 <div>
                    <div className="text-3xl font-serif text-gold-500 mb-2">80+</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500">Steps to Craft</div>
                 </div>
                 <div>
                    <div className="text-3xl font-serif text-gold-500 mb-2">100%</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500">UV Protection</div>
                 </div>
              </div>
              <Link href="/about" className="mt-4 text-sm uppercase tracking-widest font-semibold border-b border-gold-500 pb-1 w-fit hover:text-gold-500 transition-colors">
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories / Featured Collections */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
         <div className="text-center mb-16">
            <h2 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Collections</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Find Your Signature</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/category/men" className="group relative aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
               <Image src="/sunglass-3.jpg" alt="Men" fill className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
               <div className="relative z-10 text-center">
                  <h4 className="text-3xl font-serif text-white mb-2">Men's Collection</h4>
                  <span className="text-xs uppercase tracking-widest text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 block">Explore</span>
               </div>
            </Link>
            <Link href="/category/women" className="group relative aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
               <Image src="/sunglass-5.jpg" alt="Women" fill className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
               <div className="relative z-10 text-center">
                  <h4 className="text-3xl font-serif text-white mb-2">Women's Collection</h4>
                  <span className="text-xs uppercase tracking-widest text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 block">Explore</span>
               </div>
            </Link>
         </div>
      </section>

    </div>
  );
}
