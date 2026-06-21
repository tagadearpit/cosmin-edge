import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    yOffset?: number;
  }
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const chars = ref.current?.querySelectorAll('.reveal-char');
      if (!chars || chars.length === 0) return;

      gsap.fromTo(
        chars,
        {
          y: options?.yOffset || 40,
          opacity: 0,
          rotateX: -45,
          scale: 0.9,
          filter: 'blur(10px)',
          transformOrigin: '50% 50% -20px'
        },
        {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: options?.stagger || 0.03,
          duration: options?.duration || 1,
          ease: 'back.out(1.2)',
          delay: options?.delay || 0,
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
}
