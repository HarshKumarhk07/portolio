"use client";

import React, { useRef, useEffect } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/data/projects";
import gsap from "gsap";

interface CardProps {
  project: ProjectCard;
  index: number;
  focused?: boolean;
}

export const GlassCard: React.FC<CardProps> = ({ project, index, focused }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // ⭐ MAGNETIC HOVER & TILT EFFECT
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(card, {
        rotateX: -y * 12,
        rotateY: x * 12,
        duration: 0.6,
        ease: "power2.out",
      });

      // Move the light sweep highlight
      if (lightRef.current) {
        gsap.to(lightRef.current, {
          x: (e.clientX - left) - 200,
          y: (e.clientY - top) - 200,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
      if (lightRef.current) {
        gsap.to(lightRef.current, { x: -200, y: -200, duration: 1 });
      }
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);
    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative w-full md:w-[85%] lg:w-[75%] aspect-[16/9] md:h-[480px] rounded-3xl overflow-hidden group transition-all duration-700 transform-gpu preserve-3d
        ${focused ? 'scale-[1.02] shadow-[0_40px_120px_rgba(0,0,0,0.8)]' : 'shadow-2xl opacity-60'}`}
      style={{ 
        perspective: "1200px",
        willChange: "transform, scale, opacity, box-shadow"
      }}
    >
      {/* ⭐ DARK GLASS BASE */}
      <div className="absolute inset-0 bg-[#0a0a0a]/65 backdrop-blur-2xl backdrop-saturate-[180%]" />
      
      {/* ⭐ VERTICAL REFLECTION GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent opacity-40 pointer-events-none" />

      {/* ⭐ NOISE / GRAIN TEXTURE */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ⭐ INNER LIGHT RIM */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] pointer-events-none" />

      {/* ⭐ ELECTRIC BORDER GLOW (ACTIVE) */}
      <div 
        className={`absolute inset-0 rounded-3xl p-[1px] pointer-events-none transition-opacity duration-1000 ${focused ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}
        style={{
          background: `conic-gradient(from 0deg, transparent, ${project.color}, transparent 40%)`,
          mask: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
          WebkitMask: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
        }}
      />

      {/* ⭐ RADIAL LIGHT SWEEP */}
      <div 
        ref={lightRef}
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`,
          left: 0, top: 0, transform: "translate(-200px, -200px)"
        }}
      />

      {/* ⭐ CONTENT LAYOUT */}
      <div className="relative h-full flex flex-col p-8 md:p-12 z-10 translate-z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-2">
            {project.badge && (
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit border border-white/10"
                style={{ color: project.color, backgroundColor: `${project.color.replace('0.8', '0.1')}` }}
              >
                {project.badge}
              </span>
            )}
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mt-2">
              {project.title}
            </h3>
            <p className="text-blue-400/80 font-medium text-xs md:text-sm tracking-widest uppercase">
              {project.subtitle}
            </p>
          </div>
          <span className="text-white/10 font-black text-6xl md:text-8xl select-none leading-none -mt-4">
            0{index + 1}
          </span>
        </div>

        <p className="text-white/50 text-sm md:text-lg font-light leading-relaxed max-w-xl mb-10">
          {project.description}
        </p>

        {/* ⭐ TECH TAGS */}
        <div className="flex flex-wrap gap-2 mt-auto mb-8">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-white/5 border border-white/10 text-white/40 text-[10px] md:text-xs px-3 py-1.5 rounded-full hover:border-white/20 hover:text-white/70 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ⭐ ACTIONS */}
        <div className="flex gap-4 md:gap-6">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
          >
            <Github size={18} className="text-white/40 group-hover/btn:text-white transition-colors" />
            <span className="text-white/50 group-hover/btn:text-white text-xs font-bold tracking-widest uppercase">View Code</span>
          </a>
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl"
            style={{ backgroundColor: project.color }}
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
            <span className={`relative z-10 text-white text-xs font-black tracking-widest uppercase ${focused ? 'animate-pulse' : ''}`}>Live Demo</span>
            <ArrowUpRight size={18} className="relative z-10 text-white/50 group-hover/btn:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* ⭐ REFLECTIONS */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </div>
  );
};
