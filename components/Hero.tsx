"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Rocket, Sparkles, Globe2 } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import TextReveal from '@/components/TextReveal';

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current && videoRef.current && contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Video scales up and darkens
      tl.to(videoRef.current, {
        scale: 1.15,
        filter: "brightness(0.3) blur(4px)",
        ease: "none"
      }, 0);

      // Content moves down slightly and fades out
      tl.to(contentRef.current, {
        y: 200,
        opacity: 0,
        ease: "none"
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100svh] overflow-hidden flex items-center justify-center bg-black">
      {/* Cinematic Lighting & FX */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/40 via-transparent to-transparent" />
      

      {/* Video Background */}
      <div 
        ref={videoRef}
        className="absolute inset-0 w-full h-full z-0 transform-gpu"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#030014] z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop"
          className="w-full h-full object-cover scale-[1.05]"
        >
          <source src="https://cdn.pixabay.com/video/2020/03/10/33458-397441221_large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium tracking-wide text-violet-100 uppercase font-mono">
            V 2.0 Digital Frontier
          </span>
        </motion.div>

        <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 font-outfit leading-tight drop-shadow-2xl">
          <TextReveal text="Beyond the" delay={0.4} /> <br/>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 drop-shadow-[0_0_30px_rgba(167,139,250,0.4)]"
          >
            Known Universe
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-neutral-300 max-w-2xl font-light mb-12 leading-relaxed"
        >
          A cinematic journey through space and time. Experience the universe through unparalleled design, volumetric lighting, and fluid motion.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center"
        >
          <Magnetic>
            <button onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500 flex items-center justify-center gap-2 group">
              <Globe2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
              Explore Universe
            </button>
          </Magnetic>
          <Magnetic>
            <button onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-500 backdrop-blur-xl flex items-center justify-center gap-2 group">
              <Rocket className="w-4 h-4 text-violet-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-500" />
              Initialize Launch
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 1, ease: "easeOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono">Scroll</span>
        <motion.div 
          animate={{
            height: [10, 48, 10],
            opacity: [0.3, 1, 0.3],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-[1px] h-12 bg-gradient-to-b from-violet-400 to-transparent" 
        />
      </motion.div>
    </div>
  );
}
