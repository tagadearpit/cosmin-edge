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
  baseX: number;
  baseY: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 5000], [0, -1000]); // Moves up as you scroll down
  const rotateX = useTransform(scrollY, [0, 5000], [0, 30]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let scrollOffset = 0;
    
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 150
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    const handleMouseLeave = () => {
      // mouse.x = -1000;
      // mouse.y = -1000;
    };

    const handleScroll = () => {
        scrollOffset = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 4000, 300); // More particles!
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Z property gives depth (parallax layer)
        const z = Math.random() * 3 + 0.5;
        const size = (Math.random() * 1.5 + 0.2) * (z / 2);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.2;
        const speedY = (Math.random() - 0.5) * 0.2;
        const opacity = Math.random() * 0.5 + 0.1;
        
        particlesArray.push({
          x, y, z, size, speedX, speedY, baseX: x, baseY: y, opacity
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        
        ctx.beginPath();
        
        // Simulated scroll position (p.y minus scroll offset scaled by p.z depth)
        let renderY = p.y - (scrollOffset * 0.2 * p.z);
        // wrap Y
        renderY = ((renderY % canvas.height) + canvas.height) % canvas.height;
        
        ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2);
        
        // Vary color slightly based on z-depth
        ctx.fillStyle = `rgba(${167 + p.z*10}, ${139 + p.z*20}, 250, ${p.opacity * (p.z/2)})`;
        ctx.fill();
        
        // Update positions
        p.x += p.speedX;
        p.y += p.speedY; // actual y moves slowly
        
        // Mouse interaction (subtle repel)
        const dx = mouse.x - p.x;
        const dy = mouse.y - renderY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const moveX = forceDirectionX * force * 1.5;
          const moveY = forceDirectionY * force * 1.5;
          
          p.x -= moveX;
          p.y -= moveY;
        }
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      }
      
      // Connect nearby particles with lines for a constellation effect
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          // Calculate render Y positions
          let renderYa = ((particlesArray[a].y - (scrollOffset * 0.2 * particlesArray[a].z)) % canvas.height + canvas.height) % canvas.height;
          let renderYb = ((particlesArray[b].y - (scrollOffset * 0.2 * particlesArray[b].z)) % canvas.height + canvas.height) % canvas.height;

          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = renderYa - renderYb;
          const distance = dx * dx + dy * dy;
          
          if (distance < 15000) {
            // Only connect if same relative layer
            if (Math.abs(particlesArray[a].z - particlesArray[b].z) < 1.0) {
              const opacity = 1 - distance / 15000;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.15})`;
              ctx.lineWidth = 0.5 * (particlesArray[a].z / 2);
              ctx.moveTo(particlesArray[a].x, renderYa);
              ctx.lineTo(particlesArray[b].x, renderYb);
              ctx.stroke();
            }
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
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none mix-blend-screen perspective-1000" style={{ y: yOffset, rotateX }}>
      <canvas 
        ref={canvasRef} 
        className="block w-full h-[120vh]"
      />
    </motion.div>
  );
}
