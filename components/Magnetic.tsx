"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;
}

export default function Magnetic({ children, intensity = 0.18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 18,
        mass: 0.12,
      }}
      style={{ display: 'inline-flex', willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
