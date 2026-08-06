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
          y: options?.yOffset ?? 32,
          opacity: 0,
          rotateX: -30,
          scale: 0.94,
          filter: 'blur(8px)',
          transformOrigin: '50% 50% -15px',
        },
        {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: options?.stagger ?? 0.025,
          duration: options?.duration ?? 0.95,
          ease: 'power3.out',
          delay: options?.delay ?? 0,
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
}
