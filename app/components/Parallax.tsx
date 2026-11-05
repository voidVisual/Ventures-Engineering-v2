'use client';

import React, { useEffect, useRef } from 'react';

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  speed?: number; // e.g. 0.2 (gentle), 0.4 (medium), -0.2 (counter-motion)
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Universal Parallax container that shifts children vertically at 60/120fps
 * using direct transform3d updates in requestAnimationFrame for peak performance.
 */
export function Parallax({
  children,
  speed = 0.25,
  className = '',
  style = {},
  ...props
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const updatePosition = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if visible on screen (with 150px margins)
      if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        // Progress: -1 (at top) to +1 (at bottom)
        const progress = (elementCenter - viewportCenter) / (windowHeight / 2);
        const yOffset = progress * speed * 50;

        el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial positioning
    updatePosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // e.g. 0.25
  scale?: number; // e.g. 1.15 to prevent edge gaps
  containerClassName?: string;
  imgClassName?: string;
  containerStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

/**
 * Editorial Window Parallax Image
 * The outer container clips with overflow: hidden; the inner image moves
 * smoothly inside the viewport frame.
 */
export function ParallaxImage({
  src,
  alt,
  speed = 0.22,
  scale = 1.18,
  containerClassName = '',
  imgClassName = '',
  containerStyle = {},
  imgStyle = {},
}: ParallaxImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let ticking = false;

    const updateImage = () => {
      if (!container || !img) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const progress = (elementCenter - viewportCenter) / (windowHeight / 2);
        // Translate image opposite to scroll direction for depth window effect
        const yOffset = -progress * speed * 60;

        img.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0) scale(${scale})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateImage);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    updateImage();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed, scale]);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{
        overflow: 'hidden',
        position: 'relative',
        ...containerStyle,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={imgClassName}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          willChange: 'transform',
          transform: `scale(${scale})`,
          ...imgStyle,
        }}
      />
    </div>
  );
}
