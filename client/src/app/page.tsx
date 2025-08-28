"use client";
import { HeroBackground } from "@/component/HeroBackground";
import { HomePage } from "@/component/HomePage";

export default function Home() {
  return (
    <HeroBackground>
      <HomePage />
    </HeroBackground>
  );
}
