"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/utils/socket";

export default function RoomPage() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");
  const name = searchParams.get("name");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!roomCode || !name) return;

    if (!socket.connected) {
      socket.connect();
      // rejoin if user entered directly with URL
      socket.emit("joinRoom", { roomCode, name }, () => {});
    }

    socket.on("userList", (list: string[]) => {
      setUsers(list);
    });

    return () => {
      socket.off("userList");
      socket.disconnect();
    };
  }, [roomCode, name]);

  return (
    <div className="bg-slate-950 flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Room: {roomCode}</h1>
      <h2 className="text-shadow-orange-50 text-lg font-semibold">Players:</h2>

      <ul className="text-white list-disc">
        {users.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    </div>
  );
}
