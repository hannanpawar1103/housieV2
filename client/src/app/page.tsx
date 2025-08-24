"use client";

import { useState } from "react";
import { HeroBackground } from "@/component/HeroBackground";
import { Button } from "@/component/ui/button";

export default function Home() {

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Player Name:", name);
  };

  return (
    <HeroBackground>
      <div>
        <h1 className="text-white font-serif font-semibold text-4xl text-center -mt-40">
          Housie
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            name="enter name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter your name"
            className="bg-black text-white text-center my-4 w-64 h-10 text-xl rounded-xl z-10"
            required
          />

          <Button className="" onClick={handleSubmit}>Send message</Button>
        </form>
      </div>
    </HeroBackground>
  );
}
