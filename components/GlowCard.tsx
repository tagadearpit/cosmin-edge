"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, useSpring } from 'motion/react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export default function GlowCard({ children, className = "", innerClassName = "p-8" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic blur based on global scroll depth
  const { scrollYProgress } = useScroll();
  const blurValue = useTransform(scrollYProgress, [0, 1], [10, 48]); // from 10px to 48px blur
  const dynamicBackdropFilter = useMotionTemplate`blur(${blurValue}px)`;

  // Tilt vars (normalized 0 to 1 relative to card dimensions)
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);

  const rotateX = useTransform(yPct, [0, 1], [5, -5]);
  const rotateY = useTransform(xPct, [0, 1], [-5, 5]);

  // Smooth springs for tilt
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    xPct.set(x / width);
    yPct.set(y / height);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    xPct.set(0.5);
    yPct.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* Animated glow on border */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(139, 92, 246, 0.4),
                transparent 80%
              )
            `,
            transform: "translateZ(-1px)",
          }}
        />
        
        {/* Card Content with Inner Glow and Dynamic Blur */}
        <motion.div 
          className="relative h-full w-full rounded-2xl bg-[#030014]/40 overflow-hidden border border-white/5"
          style={{ backdropFilter: dynamicBackdropFilter, transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(139, 92, 246, 0.05),
                  transparent 80%
                )
              `,
            }}
          />
          <div 
            className={`relative z-10 h-full ${innerClassName}`}
            style={{ transform: "translateZ(20px)" }}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
