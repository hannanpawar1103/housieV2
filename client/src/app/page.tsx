"use client";

import { useState } from "react";
import { HeroBackground } from "@/component/HeroBackground";
import Home from "@/component/Home";

import { Button } from "@/component/ui/button";
import { Socket } from "socket.io-client";

export default function Home() {
  const [name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Player Name:", name);
  };

  return (
    <HeroBackground>
      <Home />
    </HeroBackground>
  );
}
