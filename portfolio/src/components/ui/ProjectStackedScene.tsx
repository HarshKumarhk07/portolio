"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PROJECTS } from "@/data/projects";
import { GlassCard } from "./GlassCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectStackedScene: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic Height Formula: (cards * 65vh) + 140vh
  // Mobile: reduce by ~25%
  const baseHeight = PROJECTS.length * 65 + 140;
  const totalHeight = isMobile ? baseHeight * 0.75 : baseHeight;

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    // Mobile Strategy: max 2 cards or reduce depth
    const visibleCards = isMobile ? cards.slice(0, 2) : cards;

    const ctx = gsap.context(() => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalHeight}vh`,
          pin: true,
          scrub: isMobile ? 0.8 : 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const entryZone = 0.1; // Reduced from 0.15
            const exitZone = 0.95; // Increased from 0.9
            
            if (progress < entryZone) {
               setActiveIndex(0);
            } else if (progress > exitZone) {
               setActiveIndex(cards.length - 1);
            } else {
               const adjustedProgress = (progress - entryZone) / (exitZone - entryZone);
               setActiveIndex(Math.min(cards.length - 1, Math.floor(adjustedProgress * cards.length)));
            }
          }
        }
      });

      // 1. SCENE ENTRY: Immediate Phase
      tl.fromTo(containerRef.current, 
        { perspective: isMobile ? 800 : 1200, translateZ: isMobile ? 30 : 60, opacity: 0 },
        { translateZ: 0, opacity: 1, duration: 1, ease: "power2.out" },
        0
      );

      // Initial card states (Immediate Entry)
      tl.fromTo(cards,
        { 
          scale: 1.04, 
          opacity: 0, 
          y: 40,
          rotateX: 4
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 0.8, 
          ease: "power2.out",
          stagger: 0.05
        },
        0 // ⭐ START AT 0
      );

      // 2. SIMULTANEOUS STACKING MOTION (Starts earlier)
      const stackStart = 0.15; // Shifted from 0.2
      const stackEnd = 0.85;
      const step = (stackEnd - stackStart) / (cards.length - 1);

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          // Current card moves to the background
          tl.to(card, {
            scale: 0.86,
            y: -40,
            zIndex: cards.length - i,
            duration: step,
            ease: "power2.inOut",
            onStart: () => { 
                if (!isMobile) card.style.filter = "blur(6px)"; 
                card.style.opacity = isMobile ? "0" : "0.4";
            },
            onReverseComplete: () => { 
                if (!isMobile) card.style.filter = "blur(0px)"; 
                card.style.opacity = "1";
            }
          }, stackStart + (i * step));

          // Next card comes to front
          const nextCard = cards[i+1];
          if (nextCard) {
             tl.to(nextCard, {
               scale: 1.02,
               y: 0,
               zIndex: cards.length,
               duration: step,
               ease: "power2.inOut",
               onStart: () => { nextCard.style.opacity = "1"; }
             }, stackStart + (i * step));
          }
        }
      });

      // 3. EXIT RELEASE: "Scroll Unlock"
      tl.to(cards, {
        y: (i) => -((cards.length - 1 - i) * 10), 
        scale: (i) => 0.86 + (i * 0.02), 
        opacity: (i: number) => isMobile ? (i === cards.length - 1 ? 1 : 0) : 0.6, 
        stagger: 0.03,
        duration: 0.4,
        ease: "power2.out"
      }, 0.92);

    }, sectionRef);

    return () => ctx.revert();
  }, [totalHeight, isMobile]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: `${totalHeight}vh` }}
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-[1400px] h-[80vh] flex items-center justify-center px-4">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
              style={{ 
                zIndex: PROJECTS.length - index,
                transformStyle: "preserve-3d"
              }}
            >
              <GlassCard 
                project={project} 
                index={index} 
                focused={activeIndex === index}
              />
            </div>
          ))}
        </div>

        {/* SECTION BACKGROUND ACCENT */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] blur-[120px] opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default ProjectStackedScene;
