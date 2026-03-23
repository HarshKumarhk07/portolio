"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion, useMotionValueEvent, MotionValue, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const FRAME_COUNT = 102;

const remapProgress = (p: number): number => {
  if (p < 0.6) {
    // First 60% of scroll = first 70% of frames — slightly faster at start
    return p * (0.70 / 0.6);
  } else if (p < 0.85) {
    // 60%-85% of scroll = frames 70%-82% — normal speed middle section
    const t = (p - 0.6) / 0.25;
    return 0.70 + t * 0.12;
  } else {
    // 85%-100% of scroll = frames 82%-100% — VERY SLOW, user sees hands closing
    const t = (p - 0.85) / 0.15;
    return 0.82 + t * 0.18;
  }
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
    start: 0,
    end: 0.20,
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
    )
  },
  {
    label: "Frontend Engineering",
    title: "ENGINEERED\nINTERFACES",
    body: "Responsive, accessible UI systems built with React and Tailwind CSS. Every pixel intentional — every component reusable.",
    start: 0.25,
    end: 0.45,
    extra: (
      <div className="flex flex-wrap gap-2 mt-6 max-w-[280px] md:max-w-sm pointer-events-auto">
        {["React", "JavaScript", "Tailwind CSS", "HTML5", "Framer Motion"].map(tech => (
          <span key={tech} className="bg-transparent border border-blue-500/40 text-blue-400 text-xs px-3 py-1.5 rounded-full inline-flex tracking-wide hover:bg-blue-500/10 transition-colors cursor-default">
            {tech}
          </span>
        ))}
      </div>
    )
  },
  {
    label: "Backend & Data",
    title: "BACKEND\nINTELLIGENCE",
    body: "Node.js + Express APIs, MongoDB data modelling, Python ML service integration. REST architecture designed for performance and clarity.",
    start: 0.50,
    end: 0.70,
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
    )
  },
  {
    label: "Let's Collaborate",
    title: "BUILD\nWITH ME",
    body: "Open to internships, freelance projects, and full-time roles. Let's build something people actually use.",
    start: 0.75,
    end: 1.0,
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
    )
  }
];

function TextBeat({ beat, progress }: { beat: typeof BEATS[0], progress: MotionValue<number> }) {
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
      
      {/* SMALL LABEL */}
      <motion.div style={{ opacity: opacity0, y: y0 }} className="mb-3">
        <span className="text-blue-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-md">
          {beat.label}
        </span>
      </motion.div>

      {/* MAIN HEADING */}
      <motion.div style={{ opacity: opacity1, y: y1 }} className="mb-6">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white whitespace-pre-line leading-[1] drop-shadow-2xl">
          {beat.title}
        </h2>
      </motion.div>

      {/* BODY */}
      <motion.div style={{ opacity: opacity2, y: y2 }} className="mb-2">
        <p className="text-white/60 text-base md:text-lg max-w-[380px] leading-relaxed font-light tracking-wide text-shadow-sm">
          {beat.body}
        </p>
      </motion.div>

      {/* DYNAMIC EXTRA CONTENT / STATS / PILLS / CARDS */}
      <motion.div style={{ opacity: opacity3, y: y3 }} className="pointer-events-auto">
        {beat.extra}
      </motion.div>

    </div>
  );
}

interface CharacterScrollSceneProps {
  onAnimationComplete?: () => void;
  scrollYProgress?: MotionValue<number>;
}

export default function CharacterScrollScene({ onAnimationComplete }: CharacterScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | ImageBitmap)[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const lastFrameIndex = useRef<number>(-1);
  // FIX 1 — Scroll-driven RAF state
  const isActiveRef = useRef(false);
  const lastRenderedFrameRef = useRef(-1);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const rafIdRef = useRef<number>(0);
  // FIX 4 — JS scroll hold at final pose
  const hasHeldRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // FIX 2 — Cinematic spring: heavy damping kills micro-drift & overshoot
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 90,
    restDelta: 0.0003
  });

  const indicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const endIndicatorOpacity = useTransform(smoothProgress, [0.85, 0.92], [0, 1]);

  useEffect(() => {
    let unmounted = false;
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(FRAME_COUNT);

    const loadImages = async () => {
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
          img.onerror = () => {
             loadedCount++;
             resolve(true);
          };
        }));
      }
      
      await Promise.all(promises);
      
      if (!unmounted) {
        // Convert to ImageBitmaps for high-performance drawing
        const bitmaps = await Promise.all(
          imgArray.map(img => img ? createImageBitmap(img) : null)
        );
        setImages(bitmaps.filter((b): b is ImageBitmap => b !== null));
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cropPercent = 0.08; 
    const sourceHeight = img1.height * (1 - cropPercent);

    const hRatio = canvas.width / img1.width;
    const vRatio = canvas.height / sourceHeight;
    const ratio = Math.min(hRatio, vRatio);
    
    const centerShift_x = (canvas.width - img1.width * ratio) / 2;
    const centerShift_y = (canvas.height - sourceHeight * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw first frame
    ctx.globalAlpha = 1;
    ctx.drawImage(
      img1,
      0, 0, img1.width, sourceHeight, 
      centerShift_x, centerShift_y, img1.width * ratio, sourceHeight * ratio 
    );

    // Draw second frame with alpha if needed for cross-fade smoothing
    if (alpha > 0.01 && index1 !== index2) {
      ctx.globalAlpha = alpha;
      ctx.drawImage(
        img2,
        0, 0, img2.width, sourceHeight, 
        centerShift_x, centerShift_y, img2.width * ratio, sourceHeight * ratio 
      );
    }
  };

  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => drawImage(Math.floor(smoothProgress.get() * (FRAME_COUNT - 1)));
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, images, smoothProgress]);

  // Notify parent when animation is effectively complete (95%+)
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest >= 0.95 && onAnimationComplete) {
        onAnimationComplete();
      }
    });
    return unsubscribe;
  }, [smoothProgress, onAnimationComplete]);

  // FIX 1 — Scroll-driven RAF: only renders while scroll is active, completely idles otherwise
  useEffect(() => {
    if (!loaded || images.length === 0) return;

    const scheduleRender = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const rawProgress = smoothProgress.get();
        const exactFrame = rawProgress * (FRAME_COUNT - 1);
        const frameIndex = getDisplayFrame(rawProgress);
        const nextFrameIndex = Math.min(FRAME_COUNT - 1, frameIndex + 1);

        // FIX 5 — Velocity-aware alpha: crisp at high speed, smooth at low speed
        const velocity = Math.abs(scrollYProgress.getVelocity());
        const maxAlpha = velocity > 0.8 ? 0.3 : 1.0;
        const alpha = Math.min(exactFrame - Math.floor(exactFrame), maxAlpha);

        // Only redraw if frame actually changed — eliminates jitter
        if (frameIndex !== lastRenderedFrameRef.current) {
          drawImage(frameIndex, nextFrameIndex, alpha);
          lastRenderedFrameRef.current = frameIndex;
        }
      });
    };

    // Wake up renderer on every scroll change, then settle after 350ms of idle
    const wakeUp = (v: number) => {
      isActiveRef.current = true;
      clearTimeout(settleTimerRef.current);
      scheduleRender();

      // FIX 4 — JS scroll hold: lock scroll for 700ms at final hero pose
      if (v >= 0.90 && !hasHeldRef.current) {
        hasHeldRef.current = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => { document.body.style.overflow = ''; }, 700);
      }

      settleTimerRef.current = setTimeout(() => {
        isActiveRef.current = false;
      }, 350);
    };

    const unsubscribe = smoothProgress.on('change', wakeUp);
    // Draw current frame immediately on mount
    scheduleRender();

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafIdRef.current);
      clearTimeout(settleTimerRef.current);
      document.body.style.overflow = '';
    };
  }, [loaded, images, smoothProgress, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[550vh] bg-[#050505] snap-y snap-mandatory">
      {/* FIX 3 — Snap points redistributed across full 550vh for meaningful story-beat pauses */}
      <div className="absolute top-0 w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[110vh] w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[220vh] w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[350vh] w-full h-screen pointer-events-none snap-start" />
      <div className="absolute top-[460vh] w-full h-screen pointer-events-none snap-start" />

      {/* Loading Overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-1000">
          <div className="text-white/80 text-sm tracking-[0.3em] uppercase mb-8 font-light">
            Loading Experience
          </div>
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-blue-400 transition-all duration-300 ease-out shadow-[0_0_10px_#3b82f6]"
               style={{ width: `${loadProgress}%` }}
             />
          </div>
          <div className="mt-4 text-xs font-mono text-white/30">
            {loadProgress}%
          </div>
        </div>
      )}

      {/* Sticky Segment */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* The 3D Render Canvas */}
        <canvas
          ref={canvasRef}
          className={`relative z-[5] w-full md:w-[65vw] h-full object-cover md:object-contain md:translate-x-[25%] transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Edge Blending Gradients to seamlessly merge the image background with #050505 */}
        <div className="absolute top-0 inset-x-0 h-12 md:h-24 bg-gradient-to-b from-[#050505]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 md:h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-10" />

        {/* Scroll Indicator */}
        {loaded && (
          <motion.div 
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Scroll To Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent rounded-full animate-pulse" />
          </motion.div>
        )}
        {loaded && (
          <motion.div
            style={{ opacity: endIndicatorOpacity }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-50"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="w-px h-8 bg-gradient-to-b from-blue-400/50 to-transparent"
            />
          </motion.div>
        )}

        {/* Text Beats Overlay - Left Side Positioning */}
        {loaded && BEATS.map((beat, idx) => (
          <TextBeat key={idx} beat={beat} progress={smoothProgress} />
        ))}
      </div>
    </div>
  );
}
