"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/utils/socket";

export default function RoomPage() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");
  const name = searchParams.get("name");
  const [users, setUsers] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ name: string; message: string }[]>([]);

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

  useEffect(() => {
    // 🟢 Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { roomCode, name, message });
      setMessage("");
    }
  };

  return (
    <div className="bg-slate-950 flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Room Code: {roomCode}</h1>
      <h2 className="text-shadow-orange-50 text-lg font-semibold">Players:</h2>

      <ul className="text-white list-disc">
        {users.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>

      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-gray-800 text-white h-80 p-4 rounded-lg overflow-y-auto">
          {chat.map((msg, i) => (
            <div key={i} className="mb-2">
              <span className="font-semibold">{msg.name}: </span>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="mt-4 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-lg bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 rounded-r-lg text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
