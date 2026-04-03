"use client";

import { useState } from "react";
import { useAppContext } from "@/app/providers";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, addOrder } = useAppContext();
  const [complete, setComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setComplete(true);
      
      // Save order to history
      addOrder({
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toLocaleDateString(),
        status: "Processing",
        total: total,
        items: [...cartItems]
      });

      clearCart();
    }, 1500);
  };

  if (complete) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md bg-secondary p-12 border border-white/10">
          <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-white mb-4">Payment Successful</h2>
          <p className="text-gray-400 mb-8">
            Thank you for your luxurious taste. Your order is being meticulously prepared for shipment.
          </p>
          <Link href="/shop" className="text-sm text-gold-500 uppercase tracking-widest font-bold border-b border-gold-500 pb-1 hover:text-white transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-12 border-b border-white/10 pb-6">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <p className="text-gray-400 mb-6 text-lg">Your cart is currently empty.</p>
            <Link href="/shop" className="bg-white text-black font-semibold uppercase tracking-widest text-xs px-10 py-4 hover:bg-gold-500 hover:text-white transition-all duration-300">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {cartItems.map((item, index) => (
                <div key={item.id + index} className="flex gap-6 items-center bg-secondary p-4 border border-white/5">
                  <div className="relative w-24 h-24 shrink-0 bg-black">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">{item.brand || item.category}</div>
                    <Link href={`/product/${item.id}`} className="text-xl font-serif text-white hover:text-gold-500 transition-colors">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-gold-500 font-medium text-lg w-20 text-right">
                    ${item.price.toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div>
              <div className="bg-secondary p-8 border border-white/10 sticky top-32">
                <h2 className="text-xl font-serif text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Order Summary</h2>
                
                <div className="flex justify-between items-center mb-4 text-gray-300">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-gray-300">
                  <span>Shipping</span>
                  <span className="text-gold-500 text-sm tracking-widest uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between items-center mb-8 border-t border-white/10 pt-4">
                  <span className="text-white font-serif text-xl">Total</span>
                  <span className="text-gold-500 font-serif text-2xl">${total.toFixed(2)}</span>
                </div>

                <form onSubmit={handleCheckout} className="flex flex-col gap-4">
                  <h3 className="text-sm text-white uppercase tracking-widest mt-2 mb-2 font-bold">Delivery Address</h3>
                  <input 
                    type="text" 
                    placeholder="Street Address" 
                    required 
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="City" 
                      required 
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                    <input 
                      type="text" 
                      placeholder="ZIP Code" 
                      required 
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  
                  <h3 className="text-sm text-white uppercase tracking-widest mt-4 mb-2 font-bold">Payment Method</h3>
                  <div className="flex gap-4 mb-2">
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold border transition-colors ${paymentMethod === 'card' ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                    >
                      Credit Card
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold border transition-colors ${paymentMethod === 'cod' ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-4">
                      <input 
                        type="text" 
                        placeholder="Cardholder Name" 
                        required 
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                      />
                      <input 
                        type="text" 
                        placeholder="Card Number" 
                        required 
                        minLength={16}
                        maxLength={16}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                      />
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          required 
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                        />
                        <input 
                          type="text" 
                          placeholder="CVC" 
                          required 
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gold-500 text-black font-bold uppercase tracking-widest text-sm px-6 py-4 mt-6 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:text-gray-400"
                  >
                    {isProcessing ? "Authenticating..." : "Complete Purchase"}
                    {!isProcessing && <ArrowRight size={16} />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
