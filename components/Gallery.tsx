"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import TextReveal from '@/components/TextReveal';

const images = [
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1000&auto=format&fit=crop"
];

function InteractiveImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(el, {
        rotationY: x * 15,
        rotationX: -y * 15,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.8)] ${className}`}
    >
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
        referrerPolicy="no-referrer" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-violet-500/10 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}

export default function ParallaxGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="fleet" ref={targetRef} className="py-40 bg-black relative overflow-hidden flex flex-col justify-center items-center perspective-1000">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-900/10 via-black to-black opacity-60" />

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10 w-full">
         <div className="text-4xl md:text-6xl font-outfit font-bold text-white mb-4">
           <TextReveal text="Stellar Exhibition" />
         </div>
         <motion.p 
           initial={{ opacity: 0, filter: "blur(10px)" }}
           whileInView={{ opacity: 1, filter: "blur(0px)" }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.5 }}
           className="text-neutral-400 font-light max-w-xl mx-auto"
         >
           Browse the archives of the known universe, crystallized into moment and memory.
         </motion.p>
      </div>

      <div className="flex justify-center gap-6 px-6 max-w-[1400px] w-full mx-auto h-[80vh] md:h-[700px] relative z-10">
        
        {/* Left Column */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-6 w-1/3 mt-20">
          <InteractiveImage src={images[0]} alt="Space Sector 1" className="h-[300px] md:h-[400px]" />
        </motion.div>

        {/* Center Column */}
        <motion.div style={{ y: y3 }} className="flex flex-col gap-6 w-1/3 -mt-10">
           <InteractiveImage src={images[2]} alt="Space Sector 3" className="h-[400px] md:h-[500px]" />
        </motion.div>

        {/* Right Column */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-6 w-1/3 pt-32">
          <InteractiveImage src={images[1]} alt="Space Sector 2" className="h-[250px] md:h-[350px]" />
          <InteractiveImage src={images[3]} alt="Space Sector 4" className="h-[300px] md:h-[400px]" />
        </motion.div>

      </div>
    </section>
  );
}
