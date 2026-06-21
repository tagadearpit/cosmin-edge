"use client";

import React from 'react';
import { Hexagon } from 'lucide-react';
import Magnetic from '@/components/Magnetic';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black pt-32 pb-10 relative overflow-hidden text-neutral-400">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-white/10">
              <Hexagon className="w-5 h-5 text-violet-400" />
            </div>
            <span className="font-outfit font-bold text-2xl tracking-wider text-white">COSMICEDGE</span>
          </div>
          <p className="max-w-sm font-light leading-relaxed">
            Pioneering the next era of digital architecture. We build experiences that transcend the ordinary and explore boundaries of the web.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-violet-400" />
            Coordinates
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li><Magnetic intensity={0.1}><a href="#" className="hover:text-violet-300 transition-colors inline-block">Sector 7G, Local Orbit</a></Magnetic></li>
            <li><Magnetic intensity={0.1}><a href="#" className="hover:text-violet-300 transition-colors inline-block">contact@cosmicedge.net</a></Magnetic></li>
            <li><Magnetic intensity={0.1}><a href="#" className="hover:text-violet-300 transition-colors inline-block">Quantum Channel 42.1</a></Magnetic></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-violet-400" />
            Systems
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li><Magnetic intensity={0.1}><a href="#" className="hover:text-white transition-colors inline-block">Telemetry Analysis</a></Magnetic></li>
            <li><Magnetic intensity={0.1}><a href="#" className="hover:text-white transition-colors inline-block">Hyperspace Routes</a></Magnetic></li>
            <li><Magnetic intensity={0.1}><a href="#" className="hover:text-white transition-colors inline-block">Security Protocols</a></Magnetic></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 relative z-10">
        <p className="font-mono">© 2026 COSMIC EDGE / ALL RIGHTS RESERVED / V 2.0</p>
        <div className="flex gap-6 mt-4 md:mt-0 font-mono">
          <Magnetic intensity={0.1}><a href="#" className="hover:text-white transition-colors block">PRIVACY</a></Magnetic>
          <Magnetic intensity={0.1}><a href="#" className="hover:text-white transition-colors block">TERMS</a></Magnetic>
        </div>
      </div>
    </footer>
  );
}
