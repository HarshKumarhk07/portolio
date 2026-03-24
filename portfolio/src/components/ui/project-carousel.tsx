"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/data/projects";

interface ProjectCarouselProps {
  projects: ProjectCard[];
}

const ProjectCardItem = ({ 
  project, 
  isActive, 
  isNext, 
  isPrev 
}: { 
  project: ProjectCard, 
  isActive: boolean,
  isNext: boolean,
  isPrev: boolean
}) => {
  return (
    <motion.div
      initial={false}
      animate={{ 
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
        z: isActive ? 0 : -100,
        rotateY: isNext ? -15 : isPrev ? 15 : 0,
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative w-full max-w-[450px] mx-auto rounded-[2.5rem] overflow-hidden flex flex-col group backdrop-blur-3xl border border-white/10 bg-[#0a0a0c]/80 shadow-2xl h-full`}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      {/* Featured Badge */}
      {project.isFeatured && (
        <div className="absolute top-6 right-6 z-20">
          <span className="bg-[#10b981] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">
            Featured
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative w-full aspect-[16/7] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex-1 p-5 md:p-6 flex flex-col">
        <div className="mb-2">
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-0.5 uppercase">
            {project.title}
          </h3>
          <p className="text-blue-400 text-[9px] font-bold tracking-[0.2em] uppercase">
            {project.badge || project.subtitle}
          </p>
        </div>

        <p className="text-white/50 text-[11px] md:text-xs font-light leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded border border-white/10 text-white/60 font-medium bg-white/[0.02]">
              {tag}
            </span>
          ))}
        </div>

        {/* Features List */}
        {project.features && (
          <div className="space-y-1 mb-4">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[#ef4444] font-bold text-sm leading-none mt-0.5">↳</span>
                <span className="text-white/60 text-[11px] leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA - Code Button */}
        <div className="mt-auto">
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white/80 text-[9px] font-bold uppercase tracking-[0.2em] py-3 rounded-lg hover:bg-white hover:text-black hover:border-white transition-all duration-500 group/btn"
          >
            <Github size={14} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  return (
    <div className="relative w-full overflow-hidden py-8 px-4">
      <div className="max-w-7xl mx-auto relative h-[500px] md:h-[550px] flex items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, i) => {
              // Calculate relative position
              let position = i - activeIndex;
              if (position < -1) position += projects.length;
              if (position > 1) position -= projects.length;

              const isActive = position === 0;
              const isNext = position === 1;
              const isPrev = position === -1;

              // Hide cards that are not active or adjacent
              if (Math.abs(position) > 1) return null;

              return (
                <motion.div
                  key={project.id}
                  className="absolute w-[80%] md:w-[420px]"
                  initial={false}
                  animate={{
                    x: `${position * 105}%`,
                    zIndex: isActive ? 10 : 5,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                    if (swipe && offset.x > 0) prev();
                    else if (swipe && offset.x < 0) next();
                  }}
                >
                  <ProjectCardItem 
                    project={project} 
                    isActive={isActive}
                    isNext={isNext}
                    isPrev={isPrev}
                  />
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-4 mt-6 items-center">
        <button
          onClick={prev}
          className="group w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Progress Indicators */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-6 bg-blue-500" : "w-1 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="group w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
