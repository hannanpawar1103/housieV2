"use client";

import { useState } from "react";
import { HeroBackground } from "@/component/HeroBackground";
import {HomePage} from "@/component/HomePage";


export default function Home() {
  const [name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Player Name:", name);
  };

  return (
    <HeroBackground>
      <HomePage />
    </HeroBackground>
  );
}
