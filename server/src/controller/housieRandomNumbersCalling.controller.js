import { Socket } from "socket.io";
import { randomNumberCalling } from "../services/roomServices.js";

const housieRandomNumbersCallingSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    socket.on("startNumberCalling", (io, socket, roomCode) => {
      randomNumberCalling(io, socket, roomCode);
    });
  });
};

export { housieRandomNumbersCallingSocketHandlers };
