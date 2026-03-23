"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const IconReact = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)"/>
  </svg>
)

const IconNodeJS = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#339933">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7.5 3.75v7.5L12 19.5l-7.5-3.75v-7.5L12 4.5z"/>
  </svg>
)

const IconMongoDB = (props: any) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M12 2C8 2 5 8 5 12c0 3.5 2 6.5 5 8l1 2 1-2c3-1.5 5-4.5 5-8 0-4-3-10-5-10z" fill="#47A248"/>
  </svg>
)

const IconJavaScript = (props: any) => (
  <svg {...props} viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
    <text x="4" y="19" fontSize="12" fontWeight="bold" fill="#000">JS</text>
  </svg>
)

const IconPython = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8 2 6 4 6 7v2h6v1H5C3 10 2 12 2 14s1 4 3 4h2v-3c0-2 2-3 4-3h6c2 0 3-1 3-3V7c0-3-2-5-8-5zm-1 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#3776AB"/>
    <path d="M12 22c4 0 6-2 6-5v-2h-6v-1h7c2 0 3-2 3-4s-1-4-3-4h-2v3c0 2-2 3-4 3H7c-2 0-3 1-3 3v3c0 3 2 5 8 5zm1-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FFD43B"/>
  </svg>
)

const IconTailwind = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#06B6D4">
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.27 10.8 14.33 12 16.5 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.23 7.2 14.17 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.27 16.8 9.33 18 11.5 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.23 13.2 9.17 12 7 12z"/>
  </svg>
)

const IconGitHub = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const IconGit = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#F05032">
    <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.103 1.099l-2.48-2.48v6.511a1.84 1.84 0 1 1-1.51-.043V9.927a1.836 1.836 0 0 1-.997-2.419L7.635 4.87 .45 12.053a1.55 1.55 0 0 0 0 2.187l10.478 10.478a1.55 1.55 0 0 0 2.188 0l10.43-10.43a1.55 1.55 0 0 0 0-2.188z"/>
  </svg>
)

const IconHTML = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#E34F26">
    <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4zm13 4H7.5l.25 2.5H16.5l-.75 7.5L12 18l-3.75-1-.25-2.5h2l.125 1.5L12 16.5l1.875-.5.25-2.5H7.125L6.5 7z"/>
  </svg>
)

const IconPHP = (props: any) => (
  <svg {...props} viewBox="0 0 24 24">
    <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4"/>
    <text x="5" y="16" fontSize="7" fontWeight="bold" fill="white">PHP</text>
  </svg>
)

const IconMySQL = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#4479A1">
    <path d="M12 3C7 3 3 5 3 8v8c0 3 4 5 9 5s9-2 9-5V8c0-3-4-5-9-5zm0 2c4.4 0 7 1.6 7 3s-2.6 3-7 3-7-1.6-7-3 2.6-3 7-3z"/>
  </svg>
)

const IconPostman = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#FF6C37">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="4" fill="white"/>
    <line x1="12" y1="12" x2="20" y2="8" stroke="white" strokeWidth="1.5"/>
  </svg>
)

const IconVSCode = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#007ACC">
    <path d="M17 2L3 9l4 3-4 3 14 7V2zm-2 3.5v13L6.5 15 11 12 6.5 9 15 5.5z"/>
  </svg>
)

const IconJava = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#ED8B00">
    <path d="M8.5 15.5s-.8.5.6.6c1.6.2 2.5.2 4.3-.2 0 0 .5.3 1.1.5-3.9 1.7-8.9-.1-6-1zM8 13.5s-.9.7.5.8c1.8.2 3.2.2 5.6-.3 0 0 .3.3.8.5-5 1.5-10.5.1-6.9-1z"/>
    <path d="M13 9.5c1 1.2-.3 2.2-.3 2.2s2.5-1.3 1.3-2.9c-1.1-1.5-1.9-2.3 2.6-4.8 0 0-7.1 1.8-3.6 5.5z" fill="#ED8B00"/>
    <path d="M19 17.3s.6.5-.6.9c-2.3.7-9.4.9-11.4.1-.7-.3.6-.7.9-.8h.6c-1.5-.5-9.5 2-4 2.9 14.7 2.3 26.8-1 13.5-3.1zM9 11.5s-4.2 1-1.5 1.4c1.1.2 3.4.1 5.4-.1 1.7-.1 3.4-.5 3.4-.5s-.6.2-1 .5c-4 1.1-11.8.6-9.6-.5 1.9-.9 3.3-.8 3.3-.8zM17 14.5c4.1-2.1 2.2-4.2 1-3.9-.3.1-.5.2-.5.2s.1-.2.4-.3c2.9-1 5.2 3-1 4.6 0 0 .1-.1.1-.6zM14.5 2s2.4 2.4-2.3 6.1c-3.8 3-1 4.7 0 6.6-2.2-2-3.8-3.7-2.7-5.4 1.5-2.5 5.8-3.7 5-7.3z"/>
    <path d="M9.5 21.8c3.9.3 9.9-.2 10-2.4 0 0-.3.7-3.2 1.2-3.3.6-7.3.5-9.7.1 0 0 .5.4 2.9 1.1z" fill="#ED8B00"/>
  </svg>
)

const IconExpress = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="white">
    <path d="M24 18.588a1.53 1.53 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.138-.63zm1.126-.066h9.584c-.054-1.147-.235-2.199-.953-3.008-1.776-1.993-5.02-1.992-6.84.058-.845.972-1.304 2.308-1.791 2.95z"/>
  </svg>
)

const IconCpp = (props: any) => (
  <svg {...props} viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#00599C"/>
    <text x="3" y="16" fontSize="10" fontWeight="bold" fill="white">C++</text>
  </svg>
)

const IconCSS = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="#1572B6">
    <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4zm13 4H7.5l.25 2.5H16.5l-.5 5H11l-.25-2.5h3.5l.25-2.5H8.5 l.75 7.5L12 18l3.25-.5.5-4.5H9.5l-.25-2.5H17l-.5-5z"/>
  </svg>
)

const techIcons = [
  { id: 1,  icon: IconJava,       name: 'Java',       
    className: 'top-[8%] left-[15%]' },
  { id: 2,  icon: IconPython,     name: 'Python',     
    className: 'top-[5%] left-[42%]' },
  { id: 3,  icon: IconCpp,        name: 'C++',        
    className: 'top-[10%] left-[65%]' },
  { id: 4,  icon: IconPHP,        name: 'PHP',        
    className: 'top-[8%] left-[85%]' },
  { id: 5,  icon: IconReact,      name: 'React',      
    className: 'top-[28%] left-[8%]' },
  { id: 6,  icon: IconJavaScript, name: 'JavaScript', 
    className: 'top-[22%] left-[32%]' },
  { id: 7,  icon: IconTailwind,   name: 'Tailwind',   
    className: 'top-[18%] left-[55%]' },
  { id: 8,  icon: IconHTML,       name: 'HTML5',      
    className: 'top-[30%] left-[75%]' },
  { id: 9,  icon: IconNodeJS,     name: 'Node.js',    
    className: 'top-[45%] left-[20%]' },
  { id: 10, icon: IconExpress,    name: 'Express',    
    className: 'top-[40%] left-[45%]' },
  { id: 11, icon: IconMongoDB,    name: 'MongoDB',    
    className: 'top-[48%] left-[68%]' },
  { id: 12, icon: IconMySQL,      name: 'MySQL',      
    className: 'top-[35%] left-[88%]' },
  { id: 13, icon: IconGit,        name: 'Git',        
    className: 'top-[65%] left-[12%]' },
  { id: 14, icon: IconGitHub,     name: 'GitHub',     
    className: 'top-[62%] left-[35%]' },
  { id: 15, icon: IconPostman,    name: 'Postman',    
    className: 'top-[68%] left-[58%]' },
  { id: 16, icon: IconVSCode,     name: 'VS Code',    
    className: 'top-[60%] left-[80%]' },
  { id: 17, icon: IconCSS,        name: 'CSS3',       
    className: 'top-[82%] left-[25%]' },
  { id: 18, icon: IconJavaScript, name: 'Scripting',  
    className: 'top-[78%] left-[52%]' },
];

const FloatingIcon = ({ item, mouseX, mouseY }: { item: any, mouseX: React.MutableRefObject<number>, mouseY: React.MutableRefObject<number> }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  
  // Random float params
  const floatOffset = useRef(Math.random() * 1000);
  const floatSpeed = useRef(0.001 + Math.random() * 0.001);
  const floatAmp = useRef(10 + Math.random() * 20);

  useAnimationFrame((t) => {
    if (!iconRef.current) return;
    
    // 1. Get base position from className (rough center of the screen-percentages)
    // For simplicity, we track the 'delta' from its CSS position
    
    const rect = iconRef.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;
    
    const dx = iconCenterX - mouseX.current;
    const dy = iconCenterY - mouseY.current;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const repelRadius = 200;
    const repelStrength = 0.5;
    
    let targetX = 0;
    let targetY = 0;
    
    if (dist < repelRadius) {
      const force = (repelRadius - dist) / repelRadius;
      targetX = (dx / dist) * force * 50 * repelStrength;
      targetY = (dy / dist) * force * 50 * repelStrength;
    }
    
    // Smooth lerp to target (repel)
    pos.current.x += (targetX - pos.current.x) * 0.1;
    pos.current.y += (targetY - pos.current.y) * 0.1;
    
    // Add floating ambient motion
    const floatY = Math.sin(t * floatSpeed.current + floatOffset.current) * floatAmp.current;
    
    iconRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + floatY}px, 0)`;
  });

  const Icon = item.icon;
  return (
    <div
      ref={iconRef}
      className={`absolute ${item.className} group z-10 will-change-transform`}
    >
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/25 hover:bg-blue-500/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300 cursor-default">
          <Icon className="w-8 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
        </div>
        <span className="text-white/50 text-[10px] tracking-[0.15em] font-medium uppercase whitespace-nowrap">
          {item.name}
        </span>
      </div>
    </div>
  );
};

export function FloatingIconsHero({ className = "" }: { className?: string }) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  
  // FIX 3 — THROTTLE MOUSEMOVE
  let ticking = false;
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ticking) return;
    requestAnimationFrame(() => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      ticking = false;
    });
    ticking = true;
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Desktop Floating Layout */}
      <div className="hidden md:block w-full h-full relative">
        {techIcons.map((item) => (
          <FloatingIcon 
            key={item.id} 
            item={item} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>

      {/* Mobile Grid Layout Fallback */}
      <div className="md:hidden flex flex-wrap justify-center gap-6 pt-12 relative z-20 h-full content-start px-6">
         {techIcons.slice(0, 16).map((item, index) => {
           const Icon = item.icon;
           return (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.05 }}
               className="flex flex-col items-center gap-1.5"
             >
               <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/25">
                 <Icon className="w-8 h-8 opacity-80" />
               </div>
               <span className="text-white/50 text-[10px] tracking-[0.15em] font-medium uppercase">
                 {item.name}
               </span>
             </motion.div>
           )
         })}
      </div>
    </div>
  );
}
