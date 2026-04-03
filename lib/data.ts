import { Product } from "@/components/ProductCard";

export const allProducts: Product[] = [
  { id: "prod_001", name: "Tortoise Elegance", price: 450, category: "Cat Eye", image: "/sunglass-1.jpg", isNew: true, rating: 4.8, color: ["Tortoise", "Gold"], brand: "Versace", gender: "Women", isTrending: true },
  { id: "prod_002", name: "Gold Standard", price: 520, category: "Oval", image: "/sunglass-2.jpg", rating: 4.5, color: ["Gold", "Brown"], brand: "Bottega Veneta", gender: "Unisex", isTrending: false },
  { id: "prod_003", name: "Rimless Stealth", price: 380, category: "Rectangle", image: "/sunglass-3.jpg", rating: 4.9, color: ["Black"], brand: "Gucci", gender: "Men", isTrending: true },
  { id: "prod_004", name: "Baroque Round", price: 550, category: "Round", image: "/sunglass-4.jpg", isNew: true, rating: 4.7, color: ["Black", "Gold"], brand: "Versace", gender: "Unisex", isTrending: true },
  { id: "prod_005", name: "Serpenti Charm", price: 610, category: "Oval", image: "/sunglass-5.jpg", rating: 4.3, color: ["Gold", "Brown"], brand: "Bvlgari", gender: "Women", isTrending: false },
  { id: "prod_006", name: "The Monte Carlo", price: 450, category: "Premium Aviator", image: "/product1.png", isNew: true, rating: 4.8, color: ["Black", "Gold"], brand: "Tom Ford", gender: "Men", isTrending: true },
  { id: "prod_007", name: "Obsidian Square", price: 320, category: "Modern Classic", image: "/product2.png", rating: 4.5, color: ["Black"], brand: "Prada", gender: "Unisex", isTrending: false },
  { id: "prod_008", name: "Azure Horizon", price: 380, category: "Minimalist", image: "/product3.png", rating: 4.9, color: ["Blue", "Silver"], brand: "Ray-Ban", gender: "Women", isTrending: true },
  { id: "prod_009", name: "Crystal Glamour", price: 650, category: "Cat Eye", image: "/sunglass-6.jpg", rating: 4.9, color: ["Black", "Gold"], brand: "Swarovski", gender: "Women", isTrending: true },
  { id: "prod_010", name: "Onyx Rectangle", price: 350, category: "Rectangle", image: "/sunglass-7.jpg", rating: 4.6, color: ["Black"], brand: "Prada", gender: "Unisex", isNew: true },
  { id: "prod_011", name: "Ruby Sunset", price: 290, category: "Rectangle", image: "/sunglass-8.jpg", rating: 4.4, color: ["Red", "Gold"], brand: "Vintage", gender: "Women", isTrending: false },
  { id: "prod_012", name: "Geometric Paris", price: 480, category: "Geometric", image: "/sunglass-9.jpg", rating: 4.8, color: ["Black", "Gold"], brand: "Celine", gender: "Women", isTrending: true, isNew: true },
  { id: "prod_013", name: "Urban Square", price: 310, category: "Square", image: "/sunglass-10.jpg", rating: 4.5, color: ["Black"], brand: "Ray-Ban", gender: "Men", isTrending: false },
  { id: "prod_014", name: "Hexagon Minimalist", price: 120, category: "Geometric", image: "/sunglass-11.jpg", rating: 4.2, color: ["Black", "Gold"], brand: "Shein", gender: "Unisex", isTrending: true },
  { id: "prod_015", name: "Crimson Oval", price: 210, category: "Oval", image: "/sunglass-12.jpg", rating: 4.1, color: ["Red", "Gold"], brand: "Vintage", gender: "Women" },
  { id: "prod_016", name: "Hexagonal Icons", price: 180, category: "Geometric", image: "/sunglass-13.jpg", rating: 4.7, color: ["Black", "Gold"], brand: "Ray-Ban", gender: "Unisex", isTrending: true },
  { id: "prod_017", name: "Gucci Signature", price: 420, category: "Rectangle", image: "/sunglass-14.jpg", rating: 4.9, color: ["Black"], brand: "Gucci", gender: "Unisex", isNew: true },
  { id: "prod_018", name: "Chanel Rose Detail", price: 580, category: "Rectangle", image: "/sunglass-15.jpg", rating: 4.8, color: ["Pink", "Gold"], brand: "Chanel", gender: "Women", isTrending: true },
  { id: "prod_019", name: "Gucci Twin Set", price: 750, category: "Rectangle", image: "/sunglass-16.jpg", rating: 4.6, color: ["Brown", "Green"], brand: "Gucci", gender: "Unisex" },
  { id: "prod_020", name: "Gucci Velvet Azure", price: 460, category: "Rectangle", image: "/sunglass-17.jpg", rating: 4.9, color: ["Black"], brand: "Gucci", gender: "Unisex", isNew: true },
];

export const BRANDS = ["Versace", "Bottega Veneta", "Gucci", "Bvlgari", "Tom Ford", "Prada", "Ray-Ban", "Oakley", "Oliver Peoples", "Swarovski", "Celine", "Vintage", "Shein", "Chanel"];
export const COLORS = ["Black", "Gold", "Silver", "Blue", "Red", "Tortoise", "Pink", "Brown", "Crystal"];
export const GENDERS = ["Men", "Women", "Unisex"];
