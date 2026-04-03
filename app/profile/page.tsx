"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { LogOut, Package, Wallet, Tag, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { user, orders, logout, isInitialized } = useAppContext();
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "coupons">("dashboard");

  useEffect(() => {
    if (isInitialized && !user) {
      window.location.href = "/login";
    }
  }, [user, isInitialized]);

  if (!isInitialized || !user) return null;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0 border-r border-white/10 md:pr-8">
            <div className="mb-10">
              <div className="w-16 h-16 bg-gold-500 text-black text-2xl font-serif flex items-center justify-center rounded-full mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-serif text-white">{user.name}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`flex gap-3 items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors text-left ${activeTab === 'dashboard' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <Wallet size={18} /> Overview
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex gap-3 items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors text-left ${activeTab === 'orders' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <Package size={18} /> Order Tracking
              </button>
              <button 
                onClick={() => setActiveTab("coupons")}
                className={`flex gap-3 items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors text-left ${activeTab === 'coupons' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <Tag size={18} /> Rewards & Coupons
              </button>
              <button 
                className={`flex gap-3 items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors text-left text-gray-400 hover:bg-white/5 hover:text-white`}
              >
                <MapPin size={18} /> Addresses
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex gap-3 items-center px-4 py-3 text-sm tracking-widest uppercase text-red-500 hover:bg-white/5 mt-8 text-left"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">Account Dashboard</h1>
                
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-gold-500 to-yellow-600 p-8 text-black mb-12 shadow-2xl relative overflow-hidden rounded-sm">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Aurum Store Credit</h3>
                  <div className="text-5xl font-serif font-bold mb-6">${user.balance.toFixed(2)}</div>
                  <p className="text-sm font-medium">Available for immediate use on all collections.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-secondary p-8 border border-white/10">
                    <h3 className="text-gold-500 uppercase tracking-widest text-sm font-bold mb-4">Contact Information</h3>
                    <div className="text-gray-300 space-y-2">
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <div className="bg-secondary p-8 border border-white/10 relative">
                    <h3 className="text-gold-500 uppercase tracking-widest text-sm font-bold mb-4">VIP Status</h3>
                    <div className="text-white font-serif text-2xl mb-2">Gold Tier</div>
                    <p className="text-gray-400 text-sm">You receive complimentary expedited shipping and early presale access.</p>
                    <ShieldCheck size={48} className="absolute right-8 top-8 text-gold-500/20" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">Order History</h1>
                
                {orders.length === 0 ? (
                  <div className="text-center py-20 bg-secondary border border-white/10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package size={24} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2">No Orders Yet</h3>
                    <p className="text-gray-400 mb-6">Discover the perfect piece to start your collection.</p>
                    <Link href="/shop" className="text-gold-500 uppercase tracking-widest font-bold text-xs hover:text-white transition-colors border-b border-gold-500 pb-1">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-secondary border border-white/10 p-6">
                        <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-4 mb-4">
                          <div>
                            <div className="text-xs text-gold-500 uppercase tracking-widest font-bold mb-1">{order.id}</div>
                            <div className="text-sm text-gray-400">Placed on {order.date}</div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <span className="bg-white/10 text-white text-xs uppercase tracking-widest px-3 py-1 font-bold flex items-center gap-2">
                              {order.status === 'Delivered' && <CheckCircle2 size={12} className="text-green-500" />}
                              {order.status}
                            </span>
                            <span className="text-white font-serif ml-4">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={item.id + idx} className="flex items-center gap-4">
                              <div className="w-16 h-16 relative bg-black shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                              <div>
                                <div className="text-white font-serif">{item.name}</div>
                                <div className="text-gray-500 text-xs uppercase tracking-widest">{item.brand || item.category}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "coupons" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">Your Vouchers & Coupons</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gold-500/50 p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">New</div>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gold-500">
                      <Tag size={20} />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">15% Off Next Purchase</h3>
                    <p className="text-gray-400 text-sm mb-6">Exclusive welcome gift for VIP members. Valid on all full-priced items.</p>
                    <div className="flex justify-between items-center px-4 py-3 bg-black border border-white/10 text-sm tracking-[0.2em] font-mono">
                      <span>AURUM-VIP-15</span>
                      <button className="text-gold-500 hover:text-white transition-colors" onClick={() => alert("Code copied!")}>Copy</button>
                    </div>
                  </div>

                  <div className="border border-white/10 p-6 grayscale opacity-50 pointer-events-none">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                      <Tag size={20} />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">$50 Birthday Gift</h3>
                    <p className="text-gray-400 text-sm mb-6">Unlocks during your birthday month. Cannot be combined with other offers.</p>
                    <div className="flex justify-between items-center px-4 py-3 bg-black border border-white/10 text-sm font-mono text-gray-500">
                      <span>LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
