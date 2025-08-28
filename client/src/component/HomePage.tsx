"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/component/ui/button";
import socket from "@/utils/socket";

export function HomePage() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const createRoom = () => {
    socket.emit("createRoom", { name }, (res: any) => {
      if (res.success) {
        router.push(`/room?code=${res.roomCode}&name=${name}`);
      } else {
        alert(res.message);
      }
    });
  };

  const joinRoom = () => {
    socket.connect();
    socket.emit("joinRoom", { roomCode, name }, (res: any) => {
      if (res.success) {
        router.push(`/room?code=${roomCode}&name=${name}`);
      } else {
        alert(res.message);
      }
    });
  };




  return (
    <div className="-mb-48">
      <div className="w-96 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-white font-serif font-bold text-5xl text-center mb-8">
          Housie 🎲
        </h1>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-300 font-medium">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Doe"
              className="bg-gray-900 text-white w-full px-4 py-3 text-lg rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="roomCode" className="text-gray-300 font-medium">
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
              onClick={(e) => {
                e.preventDefault();
                joinRoom();
              }}
            >
              Join Room
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-lg font-semibold"
              onClick={(e) => {
                e.preventDefault();
                createRoom();
              }}
            >
              Create Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
