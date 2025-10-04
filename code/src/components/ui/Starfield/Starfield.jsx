import React, { useEffect, useRef, memo, useCallback } from "react";
import "./Starfield.css";

const STAR_COUNT = 100;
const MIN_ANIMATION_DURATION = 2;
const MAX_ANIMATION_DURATION = 5;
const MIN_SIZE = 1;
const MAX_SIZE = 3;

const Starfield = memo(() => {
  const containerRef = useRef(null);

  const createStar = useCallback(() => {
    const star = document.createElement("div");
    star.className = "star";
    
    const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
    const animationDelay = Math.random() * 3;
    const animationDuration = MIN_ANIMATION_DURATION + Math.random() * (MAX_ANIMATION_DURATION - MIN_ANIMATION_DURATION);
    
    // Set styles efficiently using style object
    Object.assign(star.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${animationDelay}s`,
      animationDuration: `${animationDuration}s`,
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: '50%',
      opacity: Math.random() * 0.8 + 0.2,
      animation: 'twinkle 3s ease-in-out infinite'
    });
    
    return star;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create all stars at once
    for (let i = 0; i < STAR_COUNT; i++) {
      fragment.appendChild(createStar());
    }
    
    container.appendChild(fragment);

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [createStar]);

  return (
    <div 
      ref={containerRef} 
      className="starfield-container"
      role="presentation"
      aria-hidden="true"
    />
  );
});

Starfield.displayName = 'Starfield';

export default Starfield;