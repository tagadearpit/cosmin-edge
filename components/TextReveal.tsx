"use client";

import React, { useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  
  useScrollReveal(ref, { delay });

  // Split text into words, then characters
  const words = text.split(" ");

  return (
    <h1
      ref={ref}
      style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", perspective: "1000px" }}
      className={className}
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: "inline-flex", overflow: "hidden", marginRight: "0.25em" }}>
          {Array.from(word).map((letter, i) => (
            <span 
              className="reveal-char inline-block" 
              key={i} 
              style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
