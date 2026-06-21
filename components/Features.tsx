"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Orbit, Hexagon, Zap, ShieldAlert } from 'lucide-react';
import GlowCard from '@/components/GlowCard';
import TextReveal from '@/components/TextReveal';

const features = [
  {
    icon: <Orbit className="w-6 h-6 text-fuchsia-400" />,
    title: "Orbital Dynamics",
    desc: "Fluid motion sequences that guide users through nonlinear celestial pathways and smooth narrative arcs.",
  },
  {
    icon: <Hexagon className="w-6 h-6 text-violet-400" />,
    title: "Quantum Architecture",
    desc: "Built on next-generation edge infrastructure ensuring zero-gravity load times and infinite scalability.",
  },
  {
    icon: <Zap className="w-6 h-6 text-indigo-400" />,
    title: "Plasma Reactions",
    desc: "Instantaneous micro-interactions triggered by cognitive intent and subtle cursor movements.",
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-cyan-400" />,
    title: "Void Security",
    desc: "Impenetrable dark-matter encryption protocols wrapping your data in a singularity of safety.",
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 80%",
      }
    });

    tl.fromTo(cardsRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      rotationX: 15
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "all"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="technology" ref={containerRef} className="py-32 relative bg-black overflow-hidden perspective-1000">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-black to-black rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <TextReveal 
            text="Engineered for"
            className="text-3xl md:text-5xl font-outfit font-light mb-2 text-white block" 
          />
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] block mt-2"
          >
            Deep Space
          </motion.div>
          <p className="mt-8 max-w-2xl mx-auto text-neutral-400 font-light text-lg">
            Our systems utilize advanced cinematic paradigms to transform standard interfaces into immersive cosmic environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div key={i} ref={el => { cardsRef.current[i] = el; }}>
              <GlowCard className="h-full">
                <div className="flex flex-col gap-4">
                  {/* Icon Container with elegant glow */}
                  <div className="w-14 h-14 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] flex items-center justify-center mb-4 relative shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                    {feat.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-wide font-outfit">{feat.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
