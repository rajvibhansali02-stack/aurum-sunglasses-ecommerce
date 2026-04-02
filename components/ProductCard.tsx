"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import ImageComponent from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] bg-secondary overflow-hidden flex items-center justify-center cursor-pointer">
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
            New
          </div>
        )}
        
        <ImageComponent 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
            <ShoppingCart size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            <Heart size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150">
            <Eye size={20} />
          </button>
        </div>
      </div>
      
      <div className="pt-6 pb-4 flex flex-col gap-2">
        <div className="text-xs text-gray-400 uppercase tracking-widest font-mono">{product.category}</div>
        <Link href={`/product/${product.id}`} className="text-lg font-serif hover:text-gold-500 transition-colors">
          {product.name}
        </Link>
        <div className="text-gold-500 font-medium">${product.price.toFixed(2)}</div>
      </div>
    </motion.div>
  );
}
