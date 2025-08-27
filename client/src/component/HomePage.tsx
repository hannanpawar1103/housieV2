"use client";
import React, { useState, ReactNode } from "react";
import Button from "@/component/ui/button";



export function HomePage() {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!playerName || !roomCode) {
      // In a real app, use a toast or modal instead of alert()
      console.error("Please enter your name and a room code to join.");
      return;
    }
    console.log("Attempting to join room...");
    console.log("Player Name:", playerName);
    console.log("Room Code:", roomCode);
  };

  const handleCreateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!playerName) {
      console.error("Please enter your name to create a room.");
      return;
    }
    console.log("Attempting to create a new room...");
    console.log("Creator Name:", playerName);
  };

  return (
    <div className="-mb-48">
      <div className="w-96 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-white font-serif font-bold text-5xl text-center mb-8">
          Housie 🎲
        </h1>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="playerName"
              className="text-gray-300 font-medium"
            >
              Your Name
            </label>
            <input
              id="playerName"
              name="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="e.g., John Doe"
              className="bg-gray-900 text-white w-full px-4 py-3 text-lg rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="roomCode"
              className="text-gray-300 font-medium"
            >
              Room Code
            </label>
            <input
              id="roomCode"
              name="roomCode"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="bg-gray-900 text-white w-full px-4 py-3 text-lg rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>
          <div className="pt-4 space-y-3">
            <Button
              className="w-full h-12 text-lg font-semibold"
              onClick={handleJoinRoom}
            >
              Join Room
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-lg font-semibold"
              onClick={handleCreateRoom}
            >
              Create Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
