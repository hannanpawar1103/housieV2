"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/utils/socket";
import { ScrollArea } from "@/component/ui/scroll";
import NumbersCalled from "./ui/numberscalled";

type ChatMessage = {
  name: string;
  message: string;
};
type randomNumberType = {
  data: number[];
};

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
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [roomOwner, setRoomOwner] = useState<string>("");
  const [ticket, setTicket] = useState<number[][]>([]);
  const [randomNumber, setRandomNumber] = useState<any>([]);

  const [isGameScreenVisible, setIsGameScreenVisible] =
    useState<boolean>(false);
  // const router = useRouter();

  const chatRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

    socket.on("receiveMessage", (data: { name: string; message: string }) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("yourTicket", ({ ticket }) => {
      console.log("My Ticket:", ticket);
      setTicket(ticket);
      if (ticket) {
        setIsGameScreenVisible(true);
        console.log("is game screen visible  : ", isGameScreenVisible);
      }
    });

    socket.on("sendRandomNumber", ({ data }) => {
      console.log(data);
      const temp = data
      let i = 0;
      setInterval(() => {
        if (temp[i] < temp.lenght) {
          setRandomNumber(temp[i]);
        }
        i++;
      }, 5000);
      // setRandomNumber(data);
    });

    return () => {
      socket.off("sendRandomNumber");
      socket.off("userList");
      socket.disconnect();
      socket.off("receiveMessage");
      socket.off("yourTicket");
    };
  }, [roomCode, name]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { roomCode, name, message });
      setMessage("");
    }
  };

  const startRandomNumber = () => {
    socket.emit("startNumberCalling", { roomCode });
  };

  const startGame = () => {
    // console.log(`game start for room ${roomCode}`);

    socket.emit("startGame", { roomCode }, (res: RoomResponse): void => {
      if (res.success) {
        console.log("game has started");
      }
      // console.log(roomCode);
    });
    return () => {
      socket.off("startGame");
    };
  };
  // console.log("users : ", users);
  // console.log("owner : ", roomOwner);
  console.log("is game screen visible  : ", isGameScreenVisible);

  // console.log("is true : ", user === roomOwner);

  return (
    <>
      {isGameScreenVisible ? (
        <div className="h-screen w-screen flex flex-col text-white">
          <header className="p-4 justify-center text-center ">
            <h1 className="text-white font-serif font-bold text-5xl text-center">
              Housie 🎲
            </h1>
          </header>

          <main className="flex-1 grid grid-cols-12 grid-rows-6 gap-4 p-4">
            <aside className="col-span-2 row-span-6 bg-slate-900 rounded-xl p-3 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-3">Players</h2>
              <ul className="space-y-2">
                {users.map((u, i) => (
                  <li
                    key={i}
                    className={`p-2 rounded-md ${
                      u === roomOwner
                        ? "bg-yellow-600/40 text-yellow-300"
                        : "bg-slate-800"
                    }`}
                  >
                    {u}
                  </li>
                ))}
              </ul>
            </aside>
            <section className="col-span-8 row-span-4 bg-slate-800 rounded-xl p-6 flex flex-col items-center">
              <p className="text-3xl mb-6 font-serif">🎟️ YOUR TICKET</p>

              <div className="bg-amber-200 p-8 rounded-3xl shadow-xl">
                <div className="grid grid-rows-3 gap-6">
                  {ticket.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-9 gap-6">
                      {row.map((num, colIndex) => (
                        <div
                          key={colIndex}
                          className={`flex cursor-pointer items-center justify-center w-15 h-15 rounded-lg text-2xl font-bold shadow-md ${
                            num
                              ? "bg-neutral-700 text-yellow-200 border-2 border-yellow-400"
                              : "bg-white"
                          }`}
                        >
                          {num || "x"}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <aside className="col-span-2 row-span-4 flex flex-col items-center justify-center gap-4">
              <button onClick={startRandomNumber}>
                <NumbersCalled>
                  {/* {randomNumber} */}
                  13
                </NumbersCalled>
              </button>
              <button className="bg-green-600 px-6 py-3 rounded-xl hover:bg-green-700 font-semibold">
                Claim Win
              </button>
            </aside>{" "}
            <section className="col-span-10 row-span-2 bg-slate-900 rounded-xl p-3 flex flex-col">
              <ScrollArea className="rounded-md mb-4">
                <div className="flex-1 h-24 mb-2">
                  {chat.map((msg, i) => (
                    <div ref={chatRef} key={i} className="mb-1">
                      <span
                        className={`font-semibold ${
                          msg.name === name ? "text-green-600" : "text-white"
                        }`}
                      >
                        {msg.name}:{" "}
                      </span>
                      <span>{msg.message}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 px-3 py-1 rounded-l-lg bg-slate-800 border border-slate-600 focus:ring-1 focus:ring-blue-500"
                  placeholder="Type your message..."
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div className="h-screen w-screen bg-slate-950  flex flex-col text-white">
          <header className="p-4 justify-center text-center ">
            <h1 className="text-white font-serif font-bold text-5xl text-center">
              Housie 🎲
            </h1>
          </header>
          <main className="flex flex-1">
            <aside className="w-1/5 ml-10 border-r border-slate-950 p-4">
              <h2 className="text-white font-sans font-bold text-3xl">
                PLAYERS
              </h2>
              <ul className="space-y-2 mt-3 text-2xl">
                {users.map((user, i) => (
                  <li
                    key={i}
                    className={`p-2 rounded-md ${
                      user === roomOwner
                        ? "bg-yellow-600/40 text-yellow-300"
                        : "bg-slate-800"
                    }`}
                  >
                    {user}
                  </li>
                ))}
              </ul>
            </aside>

            <section className="flex-1 flex flex-col p-4 mr-10 ">
              <div className="mb-4 text-center">
                <p className="text-white text-left font-sans font-bold text-2xl">
                  Room Code:{" "}
                  <span className="px-2 py-1 bg-slate-800 rounded-md font-mono">
                    {roomCode}
                  </span>
                </p>
              </div>

              <ScrollArea className="rounded-md h-96 mb-4">
                <div className="flex-1 bg-slate-800 h-96 rounded-lg p-4 text-xl overflow-y-auto">
                  {chat.map((msg, i) => (
                    <div ref={chatRef} key={i} className="mb-2">
                      <span
                        className={`font-semibold ${
                          msg.name === name ? "text-green-600" : "text-white"
                        }`}
                      >
                        {msg.name}:{" "}
                      </span>
                      <span>{msg.message}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className=" flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 px-4 py-8 text-2xl font-bold font-asns rounded-l-lg bg-slate-800 "
                  placeholder="Type your message..."
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </section>
          </main>
          {name === roomOwner && (
            <footer className="p-4 -mt-10 text-center border-t border-slate-950">
              <button
                onClick={startGame}
                className="bg-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                Start Game
              </button>
            </footer>
          )}
        </div>
      )}
    </>
  );
}
