'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Activity, Cpu, Database, Radio, Satellite, Shield, Target, Zap } from 'lucide-react';
import GlowCard from '@/components/GlowCard';

const telemetryData = [
  { label: 'C-CORE TEMP', value: '42.8°C', icon: Zap },
  { label: 'Q-ENTANGLEMENT', value: '99.9%', icon: Activity },
  { label: 'ORBITAL DRIFT', value: '0.002%', icon: Target },
  { label: 'SHIELD INTEGRITY', value: 'OPTIMAL', icon: Shield },
];

export default function CommandCenter() {
  const containerRef = useRef<HTMLElement>(null);
  const [pulse, setPulse] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -10]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p === 0 ? 1 : 0);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} id="mission" className="py-32 relative z-20 px-6 min-h-screen flex items-center perspective-1000">
      <motion.div 
        style={{ scale, opacity, rotateX, transformStyle: "preserve-3d" }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        
        {/* Left Column - Radar */}
        <GlowCard className="p-8 flex flex-col items-center justify-center min-h-[400px] border border-violet-500/20 bg-black/40 shadow-[0_0_50px_rgba(139,92,246,0.1)] rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h3 className="text-violet-400 font-mono text-sm mb-8 tracking-widest absolute top-8 left-8 flex items-center gap-2">
            <Radio className="w-4 h-4" /> SCANNING SECTOR
          </h3>

          {/* Radar Animation */}
          <div className="relative w-64 h-64 rounded-full border border-violet-500/30 flex items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-violet-500/20" />
            <div className="absolute inset-12 rounded-full border border-violet-500/10" />
            <div className="w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_#a78bfa]" />
            
            {/* Spinning Radar Line */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-violet-500/50"
              style={{ background: 'conic-gradient(from 0deg, rgba(167, 139, 250, 0.4) 0deg, transparent 60deg)' }}
            />
            
            {/* Blips */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute top-12 right-16 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#e879f9]"
            />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
              className="absolute bottom-20 left-12 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
            />
          </div>
        </GlowCard>

        {/* Middle Column - Main Telemetry */}
        <GlowCard className="lg:col-span-1 p-8 min-h-[400px] border border-fuchsia-500/20 bg-black/40 shadow-[0_0_50px_rgba(232,121,249,0.1)] rounded-3xl relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-fuchsia-400 font-mono text-xs"
            >
              <div className="w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#e879f9]" />
              SYSTEM ONLINE
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-outfit font-light text-white mb-2">Command Node</h2>
            <p className="text-neutral-400 font-light text-sm max-w-[200px]">Real-time synchronization with orbital platforms.</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {telemetryData.map((data, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <data.icon className="w-4 h-4 text-neutral-400 mb-2" />
                <p className="text-white/50 text-[10px] font-mono mb-1">{data.label}</p>
                <p className="text-white font-mono text-sm">{data.value}</p>
              </motion.div>
            ))}
          </div>
        </GlowCard>

        {/* Right Column - Status */}
        <GlowCard className="p-8 min-h-[400px] border border-cyan-500/20 bg-black/40 shadow-[0_0_50px_rgba(34,211,238,0.1)] rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <h3 className="text-cyan-400 font-mono text-sm mb-8 tracking-widest flex items-center gap-2">
              <Database className="w-4 h-4" /> DATA STREAM
            </h3>

            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 1.5 + (i * 0.3), repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      className="w-full h-full bg-cyan-400"
                    />
                  </div>
                  <div className="flex-1 h-[1px] bg-white/5" />
                  <span className="text-xs font-mono text-neutral-500">0x{((i + 1) * 48271).toString(16).substr(0, 6).toUpperCase()}0</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
               <div className="flex -space-x-2">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-black backdrop-blur-sm flex items-center justify-center">
                     <Satellite className="w-3 h-3 text-white/50" />
                   </div>
                 ))}
               </div>
               <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                 NODES LINKED
               </span>
            </div>
        </GlowCard>

      </motion.div>
    </section>
  );
}
