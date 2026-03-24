"use client";

import { Github, Linkedin, Mail, Code2, Phone, ArrowRight, Download } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import CharacterScrollScene from "@/components/CharacterScrollScene";
import { InfiniteGridBackground } from "@/components/ui/infinite-grid";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { PROJECTS } from "@/data/projects";

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main id="home" className="relative w-full bg-[#050505] text-[#ededed] scroll-smooth">
      {/* 3D Cinematic Scroll Experience (Untouched) */}
      <div className="w-full">
        <CharacterScrollScene />
      </div>
      
      {/* Global Wrapper */}
      <InfiniteGridBackground>
        <div className="relative z-10 w-full bg-transparent">
          <div className="relative z-10 flex flex-col items-center">
            
          {/* SECTION 1: ABOUT / IDENTITY */}
          <section id="about" className="pt-[120px] pb-[120px] w-full relative">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-24 relative">
              <Reveal className="w-full md:w-[40%] relative flex flex-col justify-start items-start md:h-full min-h-[160px] gap-8 md:gap-10">
                 <div className="relative">
                   <span className="absolute left-0 top-16 -translate-x-[60%] -rotate-90 text-white/10 tracking-[0.4em] text-[10px] uppercase font-semibold whitespace-nowrap hidden md:block">
                     ABOUT
                   </span>
                   <span className="font-black text-8xl md:text-[140px] select-none pointer-events-none leading-none -ml-4 md:-ml-8 text-blue-500/[0.25]">
                     01
                   </span>
                 </div>
                 
                 <div className="relative w-full md:w-[90%] max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl group bg-[#050505] transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                   <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                   <img 
                     src="/profile.jpg" 
                     alt="Harsh Kumar Singh" 
                     className="w-full h-full object-cover object-[center_68%] grayscale opacity-90 scale-[1.8] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.95] transition-all duration-700 ease-out"
                   />
                 </div>
              </Reveal>
              <div className="w-full md:w-[60%] flex flex-col">
                <Reveal delay={0.1}>
                  <span className="text-blue-400 tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold mb-6 block">
                    WHO I AM
                  </span>
                  <h2 className="text-white font-black text-5xl md:text-6xl tracking-tighter leading-none whitespace-pre-line mb-8">
                    {"The Developer\nBehind the Identity."}
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-white/55 text-lg leading-[1.85] max-w-xl font-light">
                    B.Tech Computer Science undergraduate at Lovely Professional University
                    with a CGPA of <span className="text-white">7.52</span>. I build full-stack MERN applications that are 
                    fast, scalable, and built to last.
                    <br /><br />
                    Before I wrote code, I wore a uniform — 3 years in the NCC Army Wing, 
                    holding B & C Certificates. That discipline lives in every architecture 
                    decision I make.
                  </p>
                </Reveal>
                <Reveal delay={0.3} className="mt-12 flex gap-6 flex-wrap border-b border-white/5 pb-12">
                   {[
                     { icon: Mail, text: "Email", href: "mailto:harshkumarhk525@gmail.com" },
                     { icon: Linkedin, text: "LinkedIn", href: "https://linkedin.com/in/harsh-kumar-01/" },
                     { icon: Github, text: "GitHub", href: "https://github.com/HarshKumarhk07" },
                     { icon: Code2, text: "LeetCode", href: "https://leetcode.com/u/harsh_kr07" },
                     { icon: Phone, text: "+91 9779152271", href: "tel:+919779152271" }
                   ].map((c, i) => (
                     <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 interactive group cursor-pointer text-white/50 hover:text-white transition-colors duration-300">
                       <div className="p-2 rounded-full border border-white/10 group-hover:bg-white/5 transition-all duration-300">
                         <c.icon size={16} className="text-white/30 group-hover:text-white transition-colors" />
                       </div>
                       <span className="text-sm font-light tracking-wide">{c.text}</span>
                     </a>
                   ))}
                </Reveal>
                
                <Reveal delay={0.4} className="w-full flex flex-wrap gap-12 md:gap-24 pt-12">
                  {[
                    { num: "7.52", label: "CGPA" },
                    { num: "3+", label: "Projects Built" },
                    { num: "6+", label: "Certifications" }
                  ].map((stat, i) => (
                     <div key={i} className="flex flex-col">
                       <span className="font-black text-5xl tracking-tighter text-white/80">{stat.num}</span>
                       <span className="text-white/40 text-[10px] tracking-widest uppercase mt-2 font-medium">{stat.label}</span>
                     </div>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>

          {/* SECTION 2: SKILLS */}
          <section id="skills" className="relative py-[60px] md:py-[80px] border-t border-white/[0.05] w-full overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-4">
              <Reveal className="flex flex-col md:flex-row gap-8 md:gap-24 items-start w-full relative mb-12">
                <div className="w-full md:w-[40%] relative flex items-start md:h-full min-h-[160px]">
                   <span className="font-black text-8xl md:text-[140px] text-blue-500/[0.15] select-none pointer-events-none leading-none -ml-4 md:-ml-8">
                     02
                   </span>
                </div>
                <div className="w-full md:w-[60%] pt-4">
                  <span className="text-blue-400 tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold mb-6 block">
                    CAPABILITIES
                  </span>
                  <h2 className="text-white font-black text-5xl md:text-6xl tracking-tighter leading-[1.1] whitespace-pre-line">
                    {"Technology\nArsenal."}
                  </h2>
                  <p className="text-white/40 text-sm md:text-base mt-6 font-light">
                    Hover to interact — these are the core tools and languages I build with.
                  </p>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.2} className="relative h-[450px] md:h-[600px] w-full max-w-[1400px] mx-auto">
              <FloatingIconsHero className="h-full bg-transparent" />
            </Reveal>
          </section>

          {/* SECTION 3: PROJECTS (Dark Glass Carousel) */}
          <section id="projects" className="bg-[#050505] py-28 md:py-36 border-t border-white/[0.05] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative mb-20">
              <Reveal className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-24 relative">
                <div className="relative flex-1">
                  <span className="text-blue-400 tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold mb-6 block">
                    SELECTED WORK
                  </span>
                  <h2 className="text-white font-black text-5xl md:text-7xl tracking-tighter leading-none mb-4">
                    {"Things I\nActually Built."}
                  </h2>
                </div>
                
                <div className="relative hidden md:block">
                   <span className="font-black text-[140px] md:text-[200px] text-white/[0.08] select-none pointer-events-none leading-none translate-y-8">
                     03
                   </span>
                </div>
              </Reveal>
            </div>
            
            <div className="relative z-10 font-sans">
              <ProjectCarousel projects={PROJECTS} />
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
          </section>

          {/* SECTION 4: TRAINING & CREDENTIALS */}
          <section id="training" className="py-[60px] md:py-[80px] w-full border-t border-white/[0.05]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-start relative mb-20">
               <Reveal className="absolute top-0 right-12 z-0 hidden lg:block">
                 <span className="font-black text-[240px] text-blue-500/[0.08] select-none pointer-events-none leading-none origin-bottom translate-y-[-20%]">
                   04
                 </span>
               </Reveal>
               
               <div className="flex flex-col lg:flex-row w-full gap-24 relative z-10">
                 <div className="flex flex-col w-full lg:w-1/2">
                   <Reveal>
                     <span className="text-blue-400 tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold mb-6 block">TRAINING</span>
                     <h2 className="text-white font-black text-5xl md:text-6xl tracking-tighter leading-[1.1] whitespace-pre-line mb-16">
                       {"Structured\nLearning."}
                     </h2>
                     
                     <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-colors duration-500">
                       <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase block mb-4">Splen Technologies | Jun–Jul 2025</span>
                       <h3 className="text-white font-bold text-2xl leading-[1.3] tracking-tight mb-6">
                         Fundamentals of Data Structures and Algorithms in Java
                       </h3>
                       <ul className="text-white/55 text-[14px] leading-relaxed flex flex-col gap-3 font-light">
                         <li className="flex items-start gap-3"><span className="text-blue-500/50 mt-1">●</span> Arrays, linked lists, stacks, queues, trees, graphs, hash tables</li>
                         <li className="flex items-start gap-3"><span className="text-blue-500/50 mt-1">●</span> Dynamic programming, recursion, backtracking, greedy algorithms</li>
                         <li className="flex items-start gap-3"><span className="text-blue-500/50 mt-1">●</span> OOP principles and Java Collections Framework</li>
                       </ul>
                     </div>
                   </Reveal>
                 </div>
                 
                 <div className="flex flex-col w-full lg:w-1/2 pt-0 lg:pt-0">
                   <Reveal delay={0.2}>
                     <span className="text-blue-400 tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold mb-6 block">CERTIFICATES</span>
                     <h2 className="text-white font-black text-5xl md:text-6xl tracking-tighter leading-[1.1] whitespace-pre-line mb-16">
                       {"Verified\nCredentials."}
                     </h2>
                     
                     <div className="flex flex-col mt-4">
                       {[
                         { name: "Master Generative AI & Tools — Udemy", year: "2025" },
                         { name: "Computer Networking — Coursera", year: "2025" },
                         { name: "AI Agent With MongoDB — MongoDB", year: "2025" },
                         { name: "RAG With MongoDB — MongoDB", year: "2025" },
                         { name: "ChatGPT-4 Prompt Engineering — Infosys", year: "2024" },
                         { name: "Cloud Computing — NPTEL", year: "2024" }
                       ].map((cert, cIdx) => (
                         <div key={cIdx} className="flex justify-between items-center border-b border-white/5 py-4 group hover:bg-white/[0.02] px-4 -mx-4 transition-colors">
                           <span className="text-white/80 text-[13px] md:text-sm font-medium tracking-wide transition-colors pr-4">{cert.name}</span>
                           <span className="bg-blue-500/10 text-blue-400 text-[11px] font-bold tracking-widest px-2 py-1 rounded uppercase min-w-fit">{cert.year}</span>
                         </div>
                       ))}
                     </div>
                   </Reveal>
                 </div>
               </div>
            </div>
          </section>

          {/* SECTION 5: NCC / BEYOND CODE */}
          <section id="activities" className="py-[120px] md:py-[160px] w-full border-t border-white/[0.05] relative overflow-hidden">
            <Reveal className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center relative">
               <span className="absolute top-[-60px] md:top-[-80px] left-4 md:left-24 font-black text-[180px] md:text-[240px] leading-none select-none pointer-events-none font-serif text-blue-500/[0.15]">
                 05
               </span>
              <span className="text-blue-400 tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold mb-10 relative z-10 text-center">BEYOND THE CODE</span>
              <p className="text-white/70 text-2xl md:text-4xl font-light leading-[1.8] md:leading-[1.7] max-w-4xl text-center italic relative z-10 tracking-wide">
                Three years in the NCC Army Wing. B &amp; C Certificate holder. 
                Two CATC camps. Ten community service events. 
                Discipline isn&apos;t a soft skill — it&apos;s infrastructure.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 mt-16 text-white/40 text-[11px] tracking-[0.25em] font-medium uppercase relative z-10 bg-blue-500/[0.06] border border-blue-500/20 px-8 py-4 rounded-full">
                <span>3 Yrs NCC</span>
                <span className="text-white/20">·</span>
                <span>B &amp; C Cert</span>
                <span className="text-white/20">·</span>
                <span>10+ Events</span>
              </div>
            </Reveal>
          </section>

          {/* SECTION 6: CONTACT CTA */}
           <section id="contact" className="min-h-[70vh] w-full flex flex-col items-center justify-center relative border-t border-white/[0.08]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10 pointer-events-none select-none">
               <span className="font-black text-[200px] md:text-[300px] text-white/[0.05]">
                 06
               </span>
             </div>
             <div className="flex flex-col items-center justify-center w-full px-6 z-10 mt-16 pb-32">
              <Reveal>
                <span className="text-blue-400 tracking-[0.4em] text-[10px] md:text-xs uppercase font-bold mb-8 block text-center">READY TO BUILD</span>
              </Reveal>
              
              <h2 className="text-white font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-center whitespace-pre-line drop-shadow-2xl flex flex-wrap justify-center max-w-5xl overflow-hidden mt-4">
                Let&apos;s Build Something Real.
              </h2>
              
              <Reveal delay={0.2}>
                <p className="text-white/40 text-lg md:text-xl text-center mt-12 max-w-md mx-auto font-light leading-relaxed">
                  Open to internships, freelance projects, and full-time roles. Fast replies. No fluff.
                </p>
                <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-md mx-auto">
                  <a href="mailto:harshkumarhk525@gmail.com" className="w-full sm:w-auto bg-white text-black font-semibold text-sm tracking-widest uppercase px-10 py-5 rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-3">
                    Get in Touch <ArrowRight size={18} />
                  </a>
                  <a href="/cv.pdf" download className="w-full sm:w-auto border border-white/20 text-white/70 text-sm tracking-widest uppercase px-10 py-5 rounded-full hover:border-white/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group">
                    <Download size={18} className="text-white/40 group-hover:text-white transition-all" /> Download CV
                  </a>
                </div>
              </Reveal>
            </div>
            
            <motion.div 
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              whileInView={{ letterSpacing: "0.4em", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute bottom-10 w-full text-center text-white/15 hover:text-white/30 transition-colors text-[9px] md:text-[10px] uppercase font-medium z-10 px-6 cursor-default"
            >
              HARSH KUMAR SINGH <span className="mx-2 md:mx-4">·</span> MERN DEVELOPER <span className="mx-2 md:mx-4">·</span> LPU <span className="mx-2 md:mx-4">·</span> 2025
            </motion.div>
          </section>
          </div>
        </div>
      </InfiniteGridBackground>
    </main>
  );
}
