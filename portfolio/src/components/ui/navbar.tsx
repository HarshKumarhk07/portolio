"use client";

import React from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "01", label: "HOME", href: "#home" },
  { id: "02", label: "ABOUT", href: "#about" },
  { id: "03", label: "SKILLS", href: "#skills" },
  { id: "04", label: "PROJECTS", href: "#projects" },
  { id: "05", label: "CERTS", href: "#certs" },
  { id: "06", label: "TRAINING", href: "#training" },
  { id: "07", label: "ACTIVITIES", href: "#activities" },
  { id: "08", label: "LIFE", href: "#activities" },
  { id: "09", label: "CONTACT", href: "#contact" },
];

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 20, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-fit max-w-[calc(100vw-2rem)] md:max-w-none"
    >
      <div className="relative flex items-center justify-center gap-1 overflow-x-auto no-scrollbar md:overflow-visible px-6 md:px-8 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg group/nav">
        {/* Creative Side Accents (Hidden on mobile to prevent overflow) */}
        <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-8 lg:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/15 hidden md:block" />
        <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-8 lg:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/15 hidden md:block" />
        
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center shrink-0 px-3 md:px-4 py-2 text-[10px] font-bold tracking-[0.15em] text-white/70 hover:text-white transition-colors duration-300 relative group"
          >
            <span className="text-[8px] text-white/20 font-medium mr-2 mt-[1px] group-hover:text-white/40 transition-colors">
              {item.id}
            </span>
            {item.label}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-1/2 opacity-0 group-hover:opacity-50" />
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};
