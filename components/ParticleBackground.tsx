"use client";

import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 5000], [0, -600]);
  const rotateX = useTransform(scrollY, [0, 5000], [0, 15]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let scrollOffset = 0;
    let isVisible = true;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    // Detect mobile to reduce particle count
    const isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleScroll = () => {
      scrollOffset = window.scrollY;
    };

    // Pause animation when tab is not visible (better performance)
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) draw();
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    const init = () => {
      particlesArray = [];
      const area = canvas.width * canvas.height;
      // Fewer particles on mobile for smoothness
      const numberOfParticles = isMobile
        ? Math.min(Math.floor(area / 18000), 80)
        : Math.min(Math.floor(area / 9000), 180);

      for (let i = 0; i < numberOfParticles; i++) {
        const z = Math.random() * 2.5 + 0.5;
        const size = (Math.random() * 1.4 + 0.3) * (z / 2);
        particlesArray.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z,
          size,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.45 + 0.15,
        });
      }
    };

    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];

        let renderY = p.y - scrollOffset * 0.15 * p.z;
        renderY = ((renderY % window.innerHeight) + window.innerHeight) % window.innerHeight;

        ctx.beginPath();
        ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${167 + p.z * 8}, ${139 + p.z * 15}, 250, ${p.opacity * (p.z / 2.2)})`;
        ctx.fill();

        // Gentle movement
        p.x += p.speedX;
        p.y += p.speedY;

        // Soft mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - renderY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          p.x -= (dx / distance) * force * 1.1;
          p.y -= (dy / distance) * force * 1.1;
        }

        // Wrap edges
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
      }

      // Lighter constellation lines (performance friendly)
      for (let a = 0; a < particlesArray.length; a += 2) {
        for (let b = a + 1; b < particlesArray.length; b += 3) {
          const pa = particlesArray[a];
          const pb = particlesArray[b];

          if (Math.abs(pa.z - pb.z) > 0.9) continue;

          let ya = ((pa.y - scrollOffset * 0.15 * pa.z) % window.innerHeight + window.innerHeight) % window.innerHeight;
          let yb = ((pb.y - scrollOffset * 0.15 * pb.z) % window.innerHeight + window.innerHeight) % window.innerHeight;

          const dx = pa.x - pb.x;
          const dy = ya - yb;
          const distSq = dx * dx + dy * dy;

          if (distSq < 12000) {
            const opacity = 1 - distSq / 12000;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.12})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(pa.x, ya);
            ctx.lineTo(pb.x, yb);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
      style={{ y: yOffset, rotateX, willChange: 'transform' }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-[120vh]"
        style={{ willChange: 'transform' }}
      />
    </motion.div>
  );
}
