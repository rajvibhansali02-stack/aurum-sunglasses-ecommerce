"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Men", href: "/category/men" },
    { name: "Women", href: "/category/women" },
    { name: "Unisex", href: "/category/unisex" },
    { name: "Premium", href: "/category/premium" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-gold-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-serif tracking-[0.2em] font-bold text-white uppercase"
        >
          AURUM
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-5 text-white">
          <button className="hover:text-gold-500 transition-colors hidden md:block">
            <Search size={20} />
          </button>
          <Link href="/wishlist" className="hover:text-gold-500 transition-colors hidden md:block">
            <Heart size={20} />
          </Link>
          <Link href="/login" className="hover:text-gold-500 transition-colors">
            <User size={20} />
          </Link>
          <Link href="/cart" className="hover:text-gold-500 transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 flex flex-col items-center justify-center gap-8 text-xl font-serif uppercase tracking-widest h-screen"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-gold-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-8 mt-8">
              <button className="text-gray-400 hover:text-gold-500">
                <Search size={24} />
              </button>
              <Link href="/wishlist" className="text-gray-400 hover:text-gold-500" onClick={() => setMobileMenuOpen(false)}>
                <Heart size={24} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
