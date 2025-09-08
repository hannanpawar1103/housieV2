"use client";
import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/component/ui/lamp";

type typeOfChidlren = {
  children : ReactNode
}

export function HeroBackground({children} : typeOfChidlren) {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        // className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center tracking-tight"
      >
        {children}
      </motion.h1>
    </LampContainer>
  );
}
