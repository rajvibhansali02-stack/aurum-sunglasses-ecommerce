"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useAppContext } from "@/app/providers";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { cartItems, likedItems, user } = useAppContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/category/men" },
    { name: "Women", href: "/category/women" },
    { name: "Unisex", href: "/category/unisex" },
    { name: "Shop All", href: "/shop" },
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
          <button 
            className="hover:text-gold-500 transition-colors hidden md:block"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={20} />
          </button>
          <Link href="/wishlist" className="hover:text-gold-500 transition-colors hidden md:block relative">
            <Heart size={20} />
            {likedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {likedItems.length}
              </span>
            )}
          </Link>
          <Link href={user ? "/profile" : "/login"} className="hover:text-gold-500 transition-colors">
            <User size={20} className={user ? "text-gold-500" : ""} />
          </Link>
          <Link href="/cart" className="hover:text-gold-500 transition-colors relative">
            <ShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800 p-4 z-40 hidden md:block"
          >
            <div className="container mx-auto px-6 md:px-12">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Search size={20} className="absolute left-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-gray-800 text-white pl-12 pr-12 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="w-full px-8 mb-4 max-w-sm">
              <form onSubmit={handleSearch} className="relative flex items-center w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-600 text-white pb-2 text-sm focus:outline-none focus:border-gold-500 transition-colors placeholder:text-gray-600"
                />
                <button type="submit" className="absolute right-0 text-gray-400 hover:text-gold-500 pb-2">
                  <Search size={18} />
                </button>
              </form>
            </div>
            <div className="flex gap-8">
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
