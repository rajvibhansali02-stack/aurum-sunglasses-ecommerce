"use client";

import { useState, useMemo } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { allProducts, BRANDS, COLORS, GENDERS } from "@/lib/data";

type SortOption = "featured" | "price-asc" | "price-desc" | "trending" | "new" | "rating";

export default function ShopPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleFilter = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) setList(list.filter((i) => i !== item));
    else setList([...list, item]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => p.brand && selectedBrands.includes(p.brand));
    }
    if (selectedGenders.length > 0) {
      result = result.filter(p => p.gender && selectedGenders.includes(p.gender));
    }
    if (selectedColors.length > 0) {
      result = result.filter(p => p.color && p.color.some(c => selectedColors.includes(c)));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "trending":
        result.sort((a, b) => (a.isTrending === b.isTrending ? 0 : a.isTrending ? -1 : 1));
        break;
      case "new":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "featured":
      default:
        // default order
        break;
    }

    return result;
  }, [selectedBrands, selectedColors, selectedGenders, sortBy]);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">The Collection</h1>
            <p className="text-gray-400 font-light max-w-xl">
              Explore our complete range of meticulously crafted luxury eyewear. Find your signature style.
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button 
              className="md:hidden flex items-center gap-2 text-white border border-white/20 px-4 py-2 hover:bg-white/5 transition-colors"
              onClick={() => setShowMobileFilters(true)}
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
            
            <div className="relative group min-w-[200px]">
              <select 
                className="w-full appearance-none bg-transparent border border-white/20 text-white px-4 py-3 pr-10 cursor-pointer focus:outline-none focus:border-gold-500 transition-colors"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="featured" className="bg-secondary text-white">Recommended</option>
                <option value="price-asc" className="bg-secondary text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-secondary text-white">Price: High to Low</option>
                <option value="trending" className="bg-secondary text-white">Trending</option>
                <option value="new" className="bg-secondary text-white">What's New</option>
                <option value="rating" className="bg-secondary text-white">Customer Rating</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-32 space-y-10">
              {/* Gender Filter */}
              <div>
                <h3 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Gender</h3>
                <div className="space-y-3">
                  {GENDERS.map(gender => (
                    <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedGenders.includes(gender) ? 'border-gold-500 bg-gold-500 text-black' : 'border-white/30 group-hover:border-white/60'}`}>
                        {selectedGenders.includes(gender) && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedGenders.includes(gender)}
                        onChange={() => toggleFilter(selectedGenders, setSelectedGenders, gender)}
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Brand</h3>
                <div className="space-y-3">
                  {BRANDS.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'border-gold-500 bg-gold-500 text-black' : 'border-white/30 group-hover:border-white/60'}`}>
                        {selectedBrands.includes(brand) && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h3 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Color</h3>
                <div className="space-y-3">
                  {COLORS.map(color => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedColors.includes(color) ? 'border-gold-500 bg-gold-500 text-black' : 'border-white/30 group-hover:border-white/60'}`}>
                        {selectedColors.includes(color) && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 text-sm text-gray-500">
              Showing {filteredAndSortedProducts.length} result{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            </div>
            
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
               <div className="py-20 text-center flex flex-col items-center justify-center border border-white/10 w-full h-[400px]">
                <p className="text-gray-400 mb-4">No products match your current filters.</p>
                <button 
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedColors([]);
                    setSelectedGenders([]);
                  }}
                  className="text-gold-500 hover:text-white border-b border-gold-500 pb-1 transition-colors uppercase tracking-widest text-xs font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="relative w-[300px] max-w-[80vw] bg-secondary h-full flex flex-col border-r border-white/10 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg font-serif text-white">Filters</h2>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowMobileFilters(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              {/* Gender Filter */}
              <div>
                <h3 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Gender</h3>
                <div className="space-y-4">
                  {GENDERS.map(gender => (
                    <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedGenders.includes(gender) ? 'border-gold-500 bg-gold-500 text-black' : 'border-white/30'}`}>
                        {selectedGenders.includes(gender) && <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedGenders.includes(gender)}
                        onChange={() => toggleFilter(selectedGenders, setSelectedGenders, gender)}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Brand</h3>
                <div className="space-y-4">
                  {BRANDS.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'border-gold-500 bg-gold-500 text-black' : 'border-white/30'}`}>
                        {selectedBrands.includes(brand) && <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h3 className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-4">Color</h3>
                <div className="space-y-4">
                  {COLORS.map(color => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedColors.includes(color) ? 'border-gold-500 bg-gold-500 text-black' : 'border-white/30'}`}>
                        {selectedColors.includes(color) && <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 flex gap-4 bg-secondary">
              <button 
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedColors([]);
                  setSelectedGenders([]);
                }}
                className="flex-1 py-3 border border-white/20 text-white text-sm font-semibold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-3 bg-white text-black text-sm font-semibold uppercase tracking-widest hover:bg-gold-500 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
