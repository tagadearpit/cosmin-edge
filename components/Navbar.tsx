"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { Menu, X, Hexagon } from 'lucide-react';
import Magnetic from '@/components/Magnetic';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const navBlurValue = useTransform(scrollYProgress, [0, 1], [10, 48]);
  const dynamicBackdropFilter = useMotionTemplate`blur(${navBlurValue}px)`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let mostVisibleSection = "";

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' } // Triggers when section is in the middle 20% of the viewport
    );

    const sectionIds = ["mission", "fleet", "technology", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = ["Mission", "Fleet", "Technology", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backdropFilter: scrolled ? dynamicBackdropFilter : undefined,
        WebkitBackdropFilter: scrolled ? dynamicBackdropFilter : undefined,
      }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/40 border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <Hexagon className="w-6 h-6 text-white group-hover:text-violet-400 transition-colors" />
          <span className="font-outfit font-bold text-xl tracking-wider text-white">COSMIC<span className="text-violet-400">EDGE</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium transition-colors relative group ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                {link}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-violet-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <Magnetic>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all duration-300 backdrop-blur-md">
              Initiate Link
            </button>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`}
                    className={`text-lg font-medium transition-colors ${isActive ? 'text-violet-400' : 'text-neutral-300 hover:text-white'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                );
              })}
              <hr className="border-white/10" />
              <div className="flex">
                <Magnetic>
                  <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="px-5 py-3 text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors">
                    Initiate Link
                  </button>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
