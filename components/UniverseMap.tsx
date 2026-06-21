'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'motion/react';
import { Compass, Maximize2, Minimize2, Map } from 'lucide-react';
import GlowCard from '@/components/GlowCard';

const nodes = [
  { id: 1, cx: 200, cy: 300, size: 4, name: 'Alpha Centauri', color: 'bg-violet-400', shadow: 'shadow-[0_0_20px_#a78bfa]' },
  { id: 2, cx: 500, cy: 500, size: 6, name: 'Sirius Network', color: 'bg-fuchsia-400', shadow: 'shadow-[0_0_30px_#e879f9]' },
  { id: 3, cx: 700, cy: 200, size: 3, name: 'Pleiades Cluster', color: 'bg-blue-400', shadow: 'shadow-[0_0_15px_#60a5fa]' },
  { id: 4, cx: 800, cy: 600, size: 5, name: 'Orion Gateway', color: 'bg-cyan-400', shadow: 'shadow-[0_0_25px_#22d3ee]' },
  { id: 5, cx: 300, cy: 700, size: 3, name: 'Vega Hub', color: 'bg-indigo-400', shadow: 'shadow-[0_0_15px_#818cf8]' },
];

const paths = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 1, to: 5 },
];

export default function UniverseMap() {
  const containerRef = useRef<HTMLElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Create a global scroll progress for backdrop filter mapping globally
  const { scrollYProgress: globalScroll } = useScroll();
  const mapBlurValue = useTransform(globalScroll, [0, 1], [10, 48]);
  const dynamicBackdropFilter = useMotionTemplate`blur(${mapBlurValue}px)`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="fleet" ref={containerRef} className={`py-32 bg-black relative overflow-hidden flex items-center justify-center perspective-1000 ${isFullscreen ? 'z-[100] fixed inset-0 w-full h-full' : 'min-h-[120vh]'}`}>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black opacity-80" />
      
      <div className={`mx-auto px-6 relative z-10 w-full ${isFullscreen ? 'h-full flex flex-col p-6 max-w-[2000px]' : 'max-w-7xl'}`}>
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-indigo-400 font-mono text-sm mb-4"
            >
              <Compass className="w-4 h-4" /> ASTROMETRICS
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-outfit font-light text-white mb-2">Galaxy Network</h2>
            <p className="text-neutral-400 font-light max-w-xl">Interactive visualization of our connected sector pathways.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white relative z-50 group"
            >
               {isFullscreen ? <Minimize2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> : <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />}
            </button>
          </div>
        </div>

        <motion.div 
          style={isFullscreen ? { backdropFilter: dynamicBackdropFilter } : { scale, opacity, y, transformStyle: "preserve-3d", backdropFilter: dynamicBackdropFilter }}
          className={`relative w-full rounded-3xl border border-white/10 bg-black/50 overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.15)] group ${isFullscreen ? 'flex-1 h-full' : 'aspect-[16/9] lg:aspect-[21/9]'}`}
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [transform:rotateX(60deg)_translateY(-100px)] origin-top group-hover:[transform:rotateX(50deg)_translateY(-50px)] transition-transform duration-1000" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none" />
          </div>

          {/* Render Nodes within SVG viewBox coordinates context */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg viewBox="0 0 1000 1000" className="w-full h-full preserve-3d" preserveAspectRatio="xMidYMid slice">
              {nodes.map((node) => (
                <g key={node.id} transform={`translate(${node.cx}, ${node.cy})`} className="pointer-events-auto cursor-pointer group/node" style={{ pointerEvents: 'auto' }}>
                  <circle r={node.size * 2} className="fill-white opacity-50 group-hover/node:opacity-100 transition-opacity" />
                  <circle r={node.size * 4} className="fill-transparent stroke-white/20 group-hover/node:stroke-white/50 animate-ping" style={{ animationDuration: '3s' }} />
                  
                  {/* Tooltip Background */}
                  <rect x="15" y="-15" width="120" height="30" rx="4" className="fill-black/80 stroke-white/20 opacity-0 group-hover/node:opacity-100 transition-opacity" />
                  <text x="25" y="0" className="fill-white text-[12px] font-mono opacity-0 group-hover/node:opacity-100 transition-opacity" dy=".3em">{node.name}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Render Connections */}
          <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-700" preserveAspectRatio="xMidYMid slice">
             <path d="M 200 300 L 500 500 L 700 200" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="8 8" className="animate-[dash_20s_linear_infinite]" />
             <path d="M 500 500 L 800 600" fill="none" stroke="url(#gradient1)" strokeWidth="2" className="opacity-50" />
             <path d="M 500 500 L 300 700 L 200 300" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="4 12" className="animate-[dash_10s_linear_infinite]" />
             
             <defs>
               <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#a78bfa" />
                 <stop offset="100%" stopColor="#22d3ee" />
               </linearGradient>
             </defs>
          </svg>

        </motion.div>
      </div>

    </section>
  );
}
