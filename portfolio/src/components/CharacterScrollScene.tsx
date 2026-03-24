"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Navbar } from "./ui/navbar";

const FRAME_COUNT = 102;

const remapProgress = (p: number): number => {
  // 1. INTRO ZONE (0-15%): High sensitivity reveal
  if (p < 0.15) {
    return p * 1.5; 
  }
  
  // 2. STORY ZONE (15-45%): Stable linear progression
  if (p < 0.45) {
    const base = 0.15 * 1.5; // 0.225
    const t = (p - 0.15) / 0.30;
    return base + t * 0.35; // Linear climb to 0.575
  }
  
  // 3. HAND-MOVE ZONE (45-85%): Non-linear power easing (t^1.4)
  // Helping return path feel "lighter" because of the gradual curve
  if (p < 0.85) {
    const base = 0.575;
    const t = (p - 0.45) / 0.40;
    const eased = Math.pow(t, 1.4);
    return base + eased * 0.35; // Climb to 0.925
  }
  
  // 4. FINAL ZONE (85-100%): Cubic ease-out compression
  // Closing is heavy on scroll-down, but releases quickly on scroll-up
  const base = 0.925;
  const t = (p - 0.85) / 0.15;
  const eased = 1 - Math.pow(1 - t, 3);
  return base + eased * 0.075; // Reach 1.0 (100%)
};

const FINAL_FRAME = FRAME_COUNT - 1;

const getDisplayFrame = (p: number): number => {
  if (p >= 0.88) return FINAL_FRAME;
  const remapped = remapProgress(p);
  return Math.min(Math.floor(remapped * FRAME_COUNT), FINAL_FRAME);
};

const BEATS = [
  {
    label: "Full Stack Developer",
    title: "FULL STACK\nIDENTITY",
    body: "Harsh Kumar Singh — B.Tech CSE student at Lovely Professional University, building production-grade MERN applications that scale.",
    start: 0, end: 0.20,
    extra: (
      <div className="flex flex-row mt-6 pointer-events-auto w-full max-w-[380px]">
        <div className="flex flex-col pr-6 border-r border-white/10">
          <span className="text-white font-black text-4xl leading-none">7.52</span>
          <span className="text-white/40 text-[10px] tracking-widest block mt-1 uppercase font-semibold">CGPA</span>
        </div>
        <div className="flex flex-col px-6 border-r border-white/10">
          <span className="text-white font-black text-4xl leading-none">3</span>
          <span className="text-white/40 text-[10px] tracking-widest block mt-1 uppercase font-semibold">PROJECTS</span>
        </div>
        <div className="flex flex-col pl-6">
          <span className="text-white font-black text-4xl leading-none">5+</span>
          <span className="text-white/40 text-[10px] tracking-widest block mt-1 uppercase font-semibold">CERTS</span>
        </div>
      </div>
    ),
  },
  {
    label: "Frontend Engineering",
    title: "ENGINEERED\nINTERFACES",
    body: "Responsive, accessible UI systems built with React and Tailwind CSS. Every pixel intentional — every component reusable.",
    start: 0.25, end: 0.45,
    extra: (
      <div className="flex flex-wrap gap-2 mt-6 max-w-[280px] md:max-w-sm pointer-events-auto">
        {["React", "JavaScript", "Tailwind CSS", "HTML5", "Framer Motion"].map((tech) => (
          <span key={tech} className="bg-transparent border border-blue-500/40 text-blue-400 text-xs px-3 py-1.5 rounded-full inline-flex tracking-wide hover:bg-blue-500/10 transition-colors cursor-default">
            {tech}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: "Backend & Data",
    title: "BACKEND\nINTELLIGENCE",
    body: "Node.js + Express APIs, MongoDB data modelling, Python ML service integration. REST architecture designed for performance and clarity.",
    start: 0.50, end: 0.70,
    extra: (
      <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 max-w-sm shadow-xl pointer-events-auto hover:border-white/20 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🚀</span>
          <h4 className="text-white font-semibold text-sm tracking-wide">Project Cost & Timeline Predictor</h4>
        </div>
        <p className="text-white/50 text-xs mt-1 mb-4 leading-relaxed">MERN + Python scikit-learn ML model for real-time predictions.</p>
        <div className="flex gap-5">
          <a href="#" className="text-blue-400 text-xs tracking-wider uppercase font-semibold underline underline-offset-4 hover:text-blue-300 transition-colors">GitHub</a>
          <a href="#" className="text-blue-400 text-xs tracking-wider uppercase font-semibold underline underline-offset-4 hover:text-blue-300 transition-colors">Live Demo</a>
        </div>
      </div>
    ),
  },
  {
    label: "Let's Collaborate",
    title: "BUILD\nWITH ME",
    body: "Open to internships, freelance projects, and full-time roles. Let's build something people actually use.",
    start: 0.75, end: 1.0,
    extra: (
      <div className="flex flex-col gap-8 mt-6 pointer-events-auto max-w-sm">
        <div className="flex flex-col gap-4">
          <a href="mailto:harshkumarhk525@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-blue-400 transition-colors text-sm font-light tracking-wide group">
            <Mail size={18} className="text-white/30 group-hover:text-blue-400 transition-colors" /> harshkumarhk525@gmail.com
          </a>
          <a href="https://linkedin.com/in/harsh-kumar-01/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-blue-400 transition-colors text-sm font-light tracking-wide group">
            <Linkedin size={18} className="text-white/30 group-hover:text-blue-400 transition-colors" /> linkedin.com/in/harsh-kumar-01/
          </a>
          <a href="https://github.com/HarshKumarhk07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-blue-400 transition-colors text-sm font-light tracking-wide group">
            <Github size={18} className="text-white/30 group-hover:text-blue-400 transition-colors" /> github.com/HarshKumarhk07
          </a>
        </div>
        <button className="w-full md:w-auto self-start flex items-center justify-center gap-3 px-8 py-4 bg-[#0a0a0a] hover:bg-[#151515] border border-blue-400/30 hover:border-blue-400 rounded-full text-white/90 tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] text-xs font-bold group">
          VIEW PROJECTS <ArrowRight size={16} className="text-white/50 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    ),
  },
];

function TextBeat({ beat, progress }: { beat: (typeof BEATS)[0]; progress: MotionValue<number> }) {
  const getTransforms = (delayIdx: number) => {
    const startStrata = beat.start + (delayIdx * 0.01);
    const fadeDuration = 0.03; 
    const isFirstBeat = beat.start === 0;
    const isLastBeat = beat.end >= 0.99;
    const actualStart = isFirstBeat ? -0.05 : startStrata;
    const fullyVisibleStart = isFirstBeat ? 0 : startStrata + fadeDuration;
    const fullyVisibleEnd = Math.max(fullyVisibleStart, beat.end - fadeDuration);
    const opacityInput = [actualStart, fullyVisibleStart, fullyVisibleEnd, beat.end];
    const opacityOutput = isLastBeat ? [0, 1, 1, 1] : [0, 1, 1, 0];
    const yOutput = isLastBeat ? [24, 0, 0, 0] : [24, 0, 0, -16];
    return { opacityInput, opacityOutput, yOutput };
  };

  const t0 = getTransforms(0);
  const opacity0 = useTransform(progress, t0.opacityInput, t0.opacityOutput);
  const y0 = useTransform(progress, t0.opacityInput, t0.yOutput);
  const t1 = getTransforms(1);
  const opacity1 = useTransform(progress, t1.opacityInput, t1.opacityOutput);
  const y1 = useTransform(progress, t1.opacityInput, t1.yOutput);
  const t2 = getTransforms(2);
  const opacity2 = useTransform(progress, t2.opacityInput, t2.opacityOutput);
  const y2 = useTransform(progress, t2.opacityInput, t2.yOutput);
  const t3 = getTransforms(3);
  const opacity3 = useTransform(progress, t3.opacityInput, t3.opacityOutput);
  const y3 = useTransform(progress, t3.opacityInput, t3.yOutput);

  return (
    <div className="absolute left-0 top-1/2 -translate-y-[50%] z-20 pointer-events-none flex flex-col justify-center px-6 md:px-0 md:pl-[6vw] w-full md:max-w-[42vw]">
      <motion.div style={{ opacity: opacity0, y: y0 }} className="mb-3">
        <span className="text-blue-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-md">{beat.label}</span>
      </motion.div>
      <motion.div style={{ opacity: opacity1, y: y1 }} className="mb-6">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white whitespace-pre-line leading-[1] drop-shadow-2xl">{beat.title}</h2>
      </motion.div>
      <motion.div style={{ opacity: opacity2, y: y2 }} className="mb-2">
        <p className="text-white/60 text-base md:text-lg max-w-[380px] leading-relaxed font-light tracking-wide">{beat.body}</p>
      </motion.div>
      <motion.div style={{ opacity: opacity3, y: y3 }} className="pointer-events-auto">{beat.extra}</motion.div>
    </div>
  );
}

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 origin-left z-[9999] shadow-[0_0_20px_rgba(34,211,238,0.8)] rounded-r-full"
      style={{ scaleX }}
    />
  );
};

interface CharacterScrollSceneProps {
  onAnimationComplete?: () => void;
}

export default function CharacterScrollScene({ onAnimationComplete }: CharacterScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | ImageBitmap | null)[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
  const isActiveRef = useRef(false);
  const lastRenderedFrameRef = useRef(-1);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rafIdRef = useRef<number>(0);
  const hasHeldRef = useRef(false);
  const lastProgressRef = useRef(0);


  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // PRO CINEMATIC SPRING — Asymmetric physics for lighter reverse scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 55,
    mass: 0.7,
    restSpeed: 0.0008,
    restDelta: 0.00025
  });

  const indicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // ⭐ CINEMATIC BREATHING TRANSFORMATIONS (Absolute Polish)
  const finalPoseStrength = useTransform(smoothProgress, [0.92, 0.96, 1.0], [0, 1, 0]);
  const breathingScale = useTransform(finalPoseStrength, [0, 1], [1, 1.03]);
  const glowOpacity = useTransform(finalPoseStrength, [0, 1], [0, 0.6]);
  const endIndicatorOpacity = useTransform(smoothProgress, [0.85, 0.92], [0, 1]);

  useEffect(() => {
    let unmounted = false;
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(FRAME_COUNT);

    const loadImages = async () => {
      // PRO — Reset scroll on mount to ensure cinematic start
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      const promises = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        promises.push(new Promise((resolve) => {
          const img = new Image();
          img.src = `/character-sequence/character_${i}.webp`;
          img.onload = () => {
            loadedCount++;
            if (!unmounted) setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
            imgArray[i] = img;
            resolve(true);
          };
          img.onerror = () => { loadedCount++; resolve(true); };
        }));
      }
      await Promise.all(promises);
      if (!unmounted) {
        const bitmaps = await Promise.all(imgArray.map(img => img ? createImageBitmap(img) : null));
        setImages(bitmaps);
        setTimeout(() => setLoaded(true), 500);
      }
    };
    loadImages();
    return () => { unmounted = true; };
  }, []);

  const drawImage = (index1: number, index2: number = index1, alpha: number = 0) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img1 = images[index1];
    const img2 = images[index2];
    if (!img1 || !img2) return;

    // FIX 4 — Removed resize from draw loop (was causing thrashes)
    // FIX 4 — Removed resize from draw loop (was causing thrashes)
    const cropPercent = 0.08; 
    const sourceHeight = img1.height * (1 - cropPercent);
    const hRatio = canvas.width / img1.width;
    const vRatio = canvas.height / sourceHeight;
    const ratio = Math.min(hRatio, vRatio);
    const centerShift_x = (canvas.width - img1.width * ratio) / 2;
    const centerShift_y = (canvas.height - sourceHeight * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.drawImage(img1, 0, 0, img1.width, sourceHeight, centerShift_x, centerShift_y, img1.width * ratio, sourceHeight * ratio);
    
    if (alpha > 0.01 && index1 !== index2) {
      ctx.globalAlpha = alpha;
      ctx.drawImage(img2, 0, 0, img2.width, sourceHeight, centerShift_x, centerShift_y, img2.width * ratio, sourceHeight * ratio);
    }
  };

  // FIX 4 — Stabilized resize effect
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = window.innerWidth * dpr;
      canvasRef.current.height = window.innerHeight * dpr;
      if (loaded) drawImage(getDisplayFrame(smoothProgress.get()));
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, images, smoothProgress]);

  // FIX 1 & 2 — True Gated RAF rendering
  useEffect(() => {
    if (!loaded || images.length === 0) return;

    const render = () => {
      if (!isActiveRef.current) return;

      const rawProgress = smoothProgress.get();

      // FIX 3 — Accurate alpha from remapped progress
      const remappedProgress = remapProgress(rawProgress);
      const exactFrame = remappedProgress * (FRAME_COUNT - 1);
      const frameIndex = getDisplayFrame(rawProgress);
      const nextFrameIndex = Math.min(FRAME_COUNT - 1, frameIndex + 1);

      const velocity = Math.abs(scrollYProgress.getVelocity());
      const maxAlpha = velocity > 0.8 ? 0.3 : 1.0;
      
      // FIX — Subpixel flicker clamp (removes last 1% shimmer)
      const frac = exactFrame - Math.floor(exactFrame);
      const alpha = frac < 0.06 ? 0 : Math.min(frac, maxAlpha);

      if (frameIndex !== lastRenderedFrameRef.current) {
        drawImage(frameIndex, nextFrameIndex, alpha);
        lastRenderedFrameRef.current = frameIndex;
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    const wakeUp = (v: number) => {
      clearTimeout(settleTimerRef.current);
      
      const current = smoothProgress.get();
      const velocity = Math.abs(scrollYProgress.getVelocity());
      const delta = Math.abs(current - lastProgressRef.current);

      // PRO REST GUARD — Prevent RAF start spam near absolute rest
      if (velocity < 0.005 && delta < 0.001) return;

      let retries = 0; // FIX — Scoped retries for fresh lifecycle
      
      // PRO GATING — Wakeup on significant velocity OR tiny delta changes
      if ((velocity > 0.01 || delta > 0.002) && !isActiveRef.current) {
        isActiveRef.current = true;
        rafIdRef.current = requestAnimationFrame(render);
      }
      
      lastProgressRef.current = current;

      // PRO — Storytelling sync
      if (v >= 0.95 && onAnimationComplete) {
        onAnimationComplete();
      }

      const checkSettle = () => {
        const vel = Math.abs(scrollYProgress.getVelocity());
        if (vel < 0.02 || retries > 8) {
          isActiveRef.current = false;
          cancelAnimationFrame(rafIdRef.current);
        } else {
          retries++;
          settleTimerRef.current = setTimeout(checkSettle, 100);
        }
      };

      settleTimerRef.current = setTimeout(checkSettle, 180); 
    };

    // FIX — First frame ref synchronization
    const firstFrame = getDisplayFrame(smoothProgress.get());
    drawImage(firstFrame);
    lastRenderedFrameRef.current = firstFrame;

    // FIX — Visibility change safety
    const handleVisibility = () => {
      if (document.hidden) {
        isActiveRef.current = false;
        cancelAnimationFrame(rafIdRef.current);
        clearTimeout(settleTimerRef.current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const unsubscribe = smoothProgress.on("change", wakeUp);
    
    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafIdRef.current);
      clearTimeout(settleTimerRef.current);
      document.body.style.overflow = "";
    };
  }, [loaded, images, smoothProgress, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[440vh] bg-[#050505]">
      {loaded && <ScrollProgress />}
      {loaded && <Navbar />}
      
      <div className="absolute top-0 w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[88vh] w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[176vh] w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[290vh] w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[380vh] w-full h-screen pointer-events-none snap-start" />
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-1000">
          <div className="text-white/80 text-sm tracking-[0.3em] uppercase mb-8 font-light">Loading Experience</div>
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-blue-400 transition-all duration-300 ease-out shadow-[0_0_10px_#3b82f6]" style={{ width: `${loadProgress}%` }} />
          </div>
          <div className="mt-4 text-xs font-mono text-white/30">{loadProgress}%</div>
        </div>
      )}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* ⭐ RADIAL GLOW HIGHLIGHT (Aura) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{ 
            opacity: glowOpacity,
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
          }}
        />

        {/* ⭐ BREATHING CANVAS WRAPPER */}
        <motion.div 
          className="relative z-[5] w-full md:w-[65vw] h-full"
          style={{ scale: breathingScale }}
        >
          <canvas 
            ref={canvasRef} 
            className={`w-full h-full object-cover md:object-contain md:translate-x-[25%] transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`} 
          />
        </motion.div>
        <div className="absolute top-0 inset-x-0 h-12 md:h-24 bg-gradient-to-b from-[#050505]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 md:h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-10" />
        {loaded && (
          <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-20">
            <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Scroll To Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent rounded-full animate-pulse" />
          </motion.div>
        )}
        {loaded && (
          <motion.div style={{ opacity: endIndicatorOpacity }} className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-50">
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-px h-8 bg-gradient-to-b from-blue-400/50 to-transparent" />
          </motion.div>
        )}
        {loaded && BEATS.map((beat, idx) => <TextBeat key={idx} beat={beat} progress={smoothProgress} />)}
      </div>
    </div>
  );
}
