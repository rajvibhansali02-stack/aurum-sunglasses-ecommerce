"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag, Heart, Star, ShieldCheck, Truck, UserCircle2, Trash2, Edit2 } from "lucide-react";
import { useAppContext } from "@/app/providers";
import { allProducts } from "@/lib/data";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = allProducts.find((p) => p.id === resolvedParams.id);
  const { addToCart, toggleLike, likedItems } = useAppContext();

  const [reviews, setReviews] = useState<Review[]>([
    { id: "rev_1", user: "Eleanor V.", rating: 5, comment: "Absolutely stunning. The quality is exceptional and they feel incredibly luxurious.", date: "Oct 12, 2025" },
    { id: "rev_2", user: "Marcus T.", rating: 4, comment: "Great fit and beautiful design. The shipping was surprisingly fast.", date: "Sep 28, 2025" }
  ]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const handleSaveEdit = (id: string) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, comment: editComment, rating: editRating } : r
    ));
    setEditingReviewId(null);
  };

  if (!product) {
    notFound();
  }

  const isLiked = likedItems.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors mb-8 text-sm uppercase tracking-widest font-semibold">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/5] bg-secondary w-full">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4 z-10 bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2">
                New Arrival
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-gold-500 uppercase tracking-widest text-sm font-bold">
                {product.brand || product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif">{product.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-light">${product.price.toFixed(2)}</span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-gold-500 text-sm">
                    <Star size={16} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-400 font-light leading-relaxed">
              Experience the pinnacle of luxury with the {product.name}. Carefully crafted for a flawless fit, these {product.category.toLowerCase()} sunglasses redefine modern elegance. Perfect for making a bold statement while protecting your eyes with premium lenses.
            </p>
            
            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-white text-black py-4 uppercase tracking-widest font-semibold hover:bg-gold-500 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button 
                onClick={() => toggleLike(product)}
                className={`w-14 h-14 border flex items-center justify-center transition-colors ${isLiked ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' : 'border-white/20 text-white hover:border-gold-500 hover:text-gold-500'}`}
              >
                <Heart size={20} className={isLiked ? "fill-current" : ""} />
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <ShieldCheck className="text-gold-500" size={20} />
                <span className="text-sm font-light">2-Year International Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="text-gold-500" size={20} />
                <span className="text-sm font-light">Free Express Shipping Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32 border-t border-white/10 pt-16">
          <h2 className="text-3xl font-serif mb-12 text-white">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Review List */}
            <div className="flex flex-col gap-8">
              {reviews.length === 0 ? (
                <p className="text-gray-400 font-light">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="pb-8 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <UserCircle2 className="text-gray-500" size={32} />
                        <div>
                          <p className="font-semibold">{review.user}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={star <= review.rating ? "text-gold-500 fill-gold-500" : "text-gray-600"} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    {editingReviewId === review.id ? (
                      <div className="mt-4 bg-black/50 p-4 border border-white/10 rounded">
                        <div className="flex items-center gap-2 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} onClick={() => setEditRating(star)} type="button">
                              <Star size={18} className={star <= editRating ? "text-gold-500 fill-gold-500" : "text-gray-600"} />
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 text-white p-2 focus:outline-none focus:border-gold-500 min-h-[80px]"
                        />
                        <div className="flex gap-4 mt-4">
                          <button onClick={() => handleSaveEdit(review.id)} className="text-xs uppercase tracking-widest text-gold-500 hover:text-white transition-colors">Save</button>
                          <button onClick={() => setEditingReviewId(null)} className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-400 font-light leading-relaxed">{review.comment}</p>
                        {review.user === "Current User" && (
                          <div className="flex gap-4 mt-4 text-xs font-semibold uppercase tracking-widest">
                            <button 
                              onClick={() => {
                                setEditingReviewId(review.id);
                                setEditComment(review.comment);
                                setEditRating(review.rating);
                              }}
                              className="text-gray-500 hover:text-gold-500 transition-colors flex items-center gap-1"
                            >
                              <Edit2 size={12} /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Write a Review */}
            <div className="bg-secondary/50 p-8 border border-white/5">
              <h3 className="text-xl font-serif mb-6">Write a Review</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newComment.trim()) return;
                  setIsSubmitting(true);
                  setTimeout(() => {
                    const newRev: Review = {
                      id: `rev_${Date.now()}`,
                      user: "Current User",
                      rating: newRating,
                      comment: newComment,
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    };
                    setReviews([newRev, ...reviews]);
                    setNewComment("");
                    setNewRating(5);
                    setIsSubmitting(false);
                  }, 600);
                }}
                className="flex flex-col gap-6"
              >
                <div>
                  <p className="text-sm text-gray-400 mb-3 uppercase tracking-widest">Rate this product</p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          size={24} 
                          className={star <= newRating ? "text-gold-500 fill-gold-500" : "text-gray-600 hover:text-gold-500/50"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm text-gray-400 mb-3 uppercase tracking-widest">Your Review</label>
                  <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="What did you like or dislike?"
                    required
                    className="w-full bg-black border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors min-h-[120px] resize-y"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="bg-white text-black py-4 uppercase tracking-widest font-semibold hover:bg-gold-500 hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center h-[56px]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
