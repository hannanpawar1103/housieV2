"use client";
import { HeroBackground } from "@/component/layout/HeroBackground";
import { HomePage } from "@/component/home/HomePage";

export default function Home() {
  return (
    <HeroBackground>
      <HomePage />
    </HeroBackground>
  );
}
