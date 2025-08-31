import {
  createRoom,
  joinRoom,
  handleDisconnect,
  startGame,
} from "./services/roomServices.js";

const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    
    socket.on("createRoom", ({ name }, callback) => {
      createRoom(io, socket, name, callback);
    });

    socket.on("joinRoom", ({ roomCode, name }, callback) => {
      joinRoom(io, socket, roomCode, name, callback);
    });

    socket.on("sendMessage", ({ roomCode, name, message }) => {
      io.to(roomCode).emit("receiveMessage", { name, message });
    });

    socket.on("startGame", ({ roomCode }, callback) => {
      startGame(io, socket, roomCode, callback);
    });

    socket.on("disconnect", () => {
      handleDisconnect(io, socket);
    });
  });
};

export default registerSocketHandlers;
