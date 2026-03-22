"use client";

import { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

export const InfiniteGridBackground = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState(0);

  const speed = 0.3;
  const gridSize = 50;

  useAnimationFrame((t, delta) => {
    setOffset((prev) => (prev + speed * (delta / 16)) % gridSize);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-transparent" 
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid Layer (Dim) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0.1 }}
      >
        <GridPattern offset={offset} gridSize={gridSize} />
      </div>

      {/* Foreground Grid Layer (Mouse Reveal Flashlight) */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.6,
          maskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
        }}
      >
        <GridPattern offset={offset} gridSize={gridSize} />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

const GridPattern = ({ offset, gridSize }: { offset: number; gridSize: number }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="absolute inset-0 w-full h-full" style={{ color: 'rgba(59,130,246,0.8)' }}>
        <defs>
          <pattern
            id="infinite-grid-pattern"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${offset}, ${offset})`}
          >
            <path
              d={`M.5 ${gridSize}V.5H${gridSize}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#infinite-grid-pattern)" />
      </svg>
    </div>
  );
};
