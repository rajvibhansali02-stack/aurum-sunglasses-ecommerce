"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/components/ProductCard";

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: Product[];
}

export interface User {
  name: string;
  email: string;
  phone: string;
  balance: number;
}

interface AppContextType {
  cartItems: Product[];
  likedItems: Product[];
  user: User | null;
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleLike: (product: Product) => void;
  clearCart: () => void;
  login: (userData: User) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  isInitialized: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


export function AppProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [likedItems, setLikedItems] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("aurum_cart");
      const savedLikes = localStorage.getItem("aurum_likes");
      const savedUser = localStorage.getItem("aurum_user");
      const savedOrders = localStorage.getItem("aurum_orders");
      
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedLikes) setLikedItems(JSON.parse(savedLikes));
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      setIsInitialized(true);
    } catch (error) {
      console.error(error);
      setIsInitialized(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("aurum_cart", JSON.stringify(cartItems));
      localStorage.setItem("aurum_likes", JSON.stringify(likedItems));
      localStorage.setItem("aurum_user", JSON.stringify(user));
      localStorage.setItem("aurum_orders", JSON.stringify(orders));
    }
  }, [cartItems, likedItems, user, orders, isInitialized]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter(item => item.id !== productId));
  };

  const toggleLike = (product: Product) => {
    setLikedItems((prev) => {
      if (prev.some(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const clearCart = () => setCartItems([]);
  
  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);

  return (
    <AppContext.Provider value={{ cartItems, likedItems, user, orders, addToCart, removeFromCart, toggleLike, clearCart, login, logout, addOrder, isInitialized }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
