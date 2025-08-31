"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/utils/socket";

type getTicketResponse = {
  success: boolean;
  message?: string;
  roomCode?: string;
  players?: string[];
  ticket: number[][] | null;
};

function page() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");
  const name = searchParams.get("name");
  const [ticket, setTicket] = useState<number[][] | null>(null);

  useEffect(() => {
    socket.on("getTicket", ({ roomCode, name }, res: getTicketResponse) => {
      if (res) {
        console.log("Got ticket:", res.ticket);
        setTicket(res.ticket);
      } else {
        alert("ticket not found");
      }
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-9 gap-2">
        {ticket &&
          ticket.flat().map((num, idx) => (
            <div
              key={idx}
              className="w-10 h-10 flex items-center justify-center border rounded"
            >
              {num ?? ""}
            </div>
          ))}
      </div>
    </>
  );
}

export default page;
