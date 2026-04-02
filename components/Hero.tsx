"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero.png" 
          alt="Luxury Sunglasses" 
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <p className="text-gold-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
            The Definition of Elegance
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
            Vision of <br />
            <span className="italic font-light">Luxury</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-md font-light leading-relaxed">
            Discover our premium 2026 collection. Handcrafted Italian acetate, polarized clarity, and timeless designs for the modern visionary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/shop" 
              className="bg-white text-black font-semibold uppercase tracking-widest text-xs px-10 py-4 hover:bg-gold-500 hover:text-white transition-all duration-300 transform hover:scale-105 inline-block text-center"
            >
              Explore Collection
            </Link>
            <Link 
              href="/collections/premium" 
              className="bg-transparent text-white border border-white/30 font-semibold uppercase tracking-widest text-xs px-10 py-4 hover:border-gold-500 hover:text-gold-500 transition-all duration-300 inline-block text-center glass"
            >
              The Premium Line
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
