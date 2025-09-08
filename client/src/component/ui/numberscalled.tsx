import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/utils/socket";

type RoomResponse = {
  success: boolean;
  message?: string;
  roomCode?: string;
  players?: string[];
};

export default function NumbersCalled() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");
  const name = searchParams.get("name");

  const [randomNumber, setRandomNumber] = useState<number[]>([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState<number>(0);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  useEffect(() => {
    if (randomNumber.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNumberIndex((prev) => {
        const next = prev + 1;
        if (next < randomNumber.length) {
          setCurrentNumber(randomNumber[next]);
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [randomNumber]);

  useEffect(() => {
    if (randomNumber.length > 0) {
      setCurrentNumber(randomNumber[currentNumberIndex]);
    }
    console.log("random num", randomNumber);
    console.log("current num", currentNumber);
    console.log("current num index ", currentNumberIndex);
  }, [currentNumberIndex, randomNumber]);

  const startRandomNumber = () => {
    socket.emit("startNumberCalling", { roomCode });
    socket.on("sendRandomNumber", ({ data }) => {
      setRandomNumber(data);
      setCurrentNumberIndex(0);
      setCurrentNumber(data[0]);
    });
  };

  return (
    <button onClick={startRandomNumber}>
      {/* <NumbersCalled>{currentNumber}</NumbersCalled> */}
      <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
        {currentNumber}
      </div>
    </button>
  );
}
