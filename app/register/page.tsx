"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/app/providers";

export default function RegisterPage() {
  const { login } = useAppContext();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && phone && password) setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      login({
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}@example.com`,
        phone: phone,
        balance: 0 // New users start with 0
      });
      window.location.href = "/profile";
    } else {
      alert("Invalid OTP (hint: use 123456)");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-row-reverse">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary">
        <Image 
          src="/sunglass-3.jpg" 
          alt="Luxury Experience" 
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
        <div className="absolute bottom-20 right-20 z-10 max-w-md text-right">
          <h2 className="text-4xl font-serif text-white mb-4">Join the Elite</h2>
          <p className="text-gray-300 font-light text-lg">Create an account to manage your collection and unlock lifetime styling services.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-md w-full">
          {step === "credentials" ? (
            <>
              <h1 className="text-3xl font-serif text-white mb-2">Create Account</h1>
              <p className="text-gray-400 mb-10">Become an exclusive Aurum member today.</p>

              <form className="space-y-6" onSubmit={handleCredentialsSubmit}>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gold-500 uppercase tracking-widest font-bold mb-3">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="First name"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gold-500 uppercase tracking-widest font-bold mb-3">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gold-500 uppercase tracking-widest font-bold mb-3">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-gold-500 uppercase tracking-widest font-bold mb-3 block">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Create a password"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black font-semibold uppercase tracking-widest text-xs px-10 py-5 mt-4 hover:bg-gold-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Verify Number
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </>
          ) : (
             <>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={24} className="text-gold-500" />
              </div>
              <h1 className="text-3xl font-serif text-white mb-2">Identity Verification</h1>
              <p className="text-gray-400 mb-10">We've sent a 6-digit code to {phone}.</p>

              <form className="space-y-6" onSubmit={handleOtpSubmit}>
                <div>
                  <label className="block text-xs text-gold-500 uppercase tracking-widest font-bold mb-3">Verification Code</label>
                  <input 
                    type="text" 
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 text-2xl tracking-[1em] text-center focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="------"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black font-semibold uppercase tracking-widest text-xs px-10 py-5 mt-8 hover:bg-gold-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Confirm Account
                </button>
                <div className="text-center mt-4">
                  <button type="button" onClick={() => setStep("credentials")} className="text-gray-500 text-xs uppercase hover:text-white transition-colors">
                    Go Back
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "credentials" && (
            <div className="mt-12 text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:text-gold-500 border-b border-white hover:border-gold-500 transition-colors pb-0.5">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
