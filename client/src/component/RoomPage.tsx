"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/utils/socket";
import { useRouter } from "next/navigation";
import { transformWithEsbuild } from "vite";

type UserListPayload = {
  users: string[];
  owner: string;
  ticket: number[][];
};

type RoomResponse = {
  success: boolean;
  message?: string;
  roomCode?: string;
  players?: string[];
};

export default function RoomPage() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");
  const name = searchParams.get("name");
  const [users, setUsers] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ name: string; message: string }[]>([]);

  const [roomOwner, setRoomOwner] = useState<string>("");

  const [IsTicketVisible, setIsTicketVisible] = useState<boolean>(false);
  const [ticket, setTicket] = useState<number[][]>([]);
  // const router = useRouter();

  useEffect(() => {
    if (!roomCode || !name) return;

    if (!socket.connected) {
      socket.connect();
      socket.emit("joinRoom", { roomCode, name }, () => {});
    }

    socket.on("userList", ({ users, owner }: UserListPayload) => {
      setUsers(users);
      setRoomOwner(owner);
    });

    return () => {
      socket.off("userList");
      socket.disconnect();
    };
  }, [roomCode, name]);

  useEffect(() => {
    socket.on("receiveMessage", (data: { name: string; message: string }) => {
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

  const startGame = () => {
    // console.log(`game start for room ${roomCode}`);

    socket.emit("startGame", { roomCode }, (res: RoomResponse): void => {
      // console.log(roomCode);
    });

    return () => {
      socket.off("startGame");
    };
  };

  useEffect(() => {
    socket.on("yourTicket", ({ ticket }) => {
      console.log("My Ticket:", ticket);
      setTicket(ticket);
    });

    return () => {
      socket.off("yourTicket");
    };
  }, []);

  // console.log("users : ", users);
  // console.log("owner : ", roomOwner);
  // console.log("is  : ", roomOwner in users);

  // console.log("is true : ", user === roomOwner);

  return (
    <div className="bg-slate-950 flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Room Code: {roomCode}</h1>
      <h2 className="text-shadow-orange-50 text-lg font-semibold">Players:</h2>

      {/* <h1>owner : {roomOwner}</h1> */}

      <ul className="list-disc">
        {users.map((users, iterations) => (
          <li
            key={iterations}
            className={users === roomOwner ? "text-yellow-200" : "text-white"}
          >
            {users}
          </li>
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
            className="flex-1 px-4 py-2 rounded-l-lg bg-gray-900 text-white border border-gray-600 focus:ring-1 focus:ring-blue-500"
            placeholder="Type your message..."
          />

          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 rounded-r-lg text-white font-semibold"
          >
            Send
          </button>
        </div>
        <div className="flex justify-center">
          {name === roomOwner ? (
            <button
              onClick={startGame}
              type="button"
              className="bg-blue-600 cursor-pointer mt-3 p-3 rounded-xl hover:bg-gray-700 text-white "
            >
              start game
            </button>
          ) : null}
        </div>
         <div>hello , game has begun on room {roomCode}</div>
        <div className="p-4 bg-white shadow-md rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-center mb-3">Your Ticket 🎟️</h2>
          <div className="grid grid-rows-3 gap-2">
            {ticket.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-9 gap-2">
                {row.map((num, colIndex) => (
                  <div
                    key={colIndex}
                    className={`flex items-center justify-center w-10 h-10 rounded-md text-lg font-semibold ${
                      num
                        ? "bg-yellow-200 border border-yellow-500"
                        : "bg-gray-100"
                    }`}
                  >
                    {num ?? ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
