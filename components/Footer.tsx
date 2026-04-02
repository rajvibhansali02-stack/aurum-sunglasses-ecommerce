import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400 py-16 px-6 md:px-12 border-t border-gray-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-3xl font-serif tracking-[0.2em] font-bold text-white uppercase">
            AURUM
          </Link>
          <p className="text-sm leading-relaxed">
            Discover the ultimate in luxury eyewear. Handcrafted frames, premium materials, and timeless designs for the discerning individual.
          </p>
          <div className="flex gap-4 text-white">
            <a href="#" className="hover:text-gold-500 transition-colors uppercase tracking-widest text-xs">IG</a>
            <a href="#" className="hover:text-gold-500 transition-colors uppercase tracking-widest text-xs">FB</a>
            <a href="#" className="hover:text-gold-500 transition-colors uppercase tracking-widest text-xs">X</a>
            <a href="#" className="hover:text-gold-500 transition-colors uppercase tracking-widest text-xs">YT</a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-wider mb-6">Shop</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/category/men" className="hover:text-gold-500 transition-colors">Men's Collection</Link></li>
            <li><Link href="/category/women" className="hover:text-gold-500 transition-colors">Women's Collection</Link></li>
            <li><Link href="/category/premium" className="hover:text-gold-500 transition-colors">Premium Line</Link></li>
            <li><Link href="/category/sports" className="hover:text-gold-500 transition-colors">Sports & Active</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-gold-500 transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-wider mb-6">Help & Info</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold-500 transition-colors">Contact Support</Link></li>
            <li><Link href="/faq" className="hover:text-gold-500 transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-gold-500 transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/track-order" className="hover:text-gold-500 transition-colors">Order Tracking</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-wider mb-6">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-secondary text-white px-4 py-3 rounded-none border border-gray-700 focus:outline-none focus:border-gold-500 transition-colors w-full"
            />
            <button 
              type="submit" 
              className="bg-white text-black font-semibold uppercase tracking-widest text-xs py-3 px-6 hover:bg-gold-500 hover:text-white transition-colors duration-300 w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs">
        <p>&copy; {new Date().getFullYear()} AURUM Luxury Eyewear. All Rights Reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
