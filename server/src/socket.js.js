import {
  createRoom,
  joinRoom,
  handleDisconnect,
} from "./services/roomServices.js";

const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    socket.on("createRoom", ({ name }, callback) => {
      createRoom(io, socket, name, callback);
    });

    socket.on("joinRoom", ({ roomCode, name }, callback) => {
      joinRoom(io, socket, roomCode, name, callback);
    });

    socket.on("disconnect", () => {
      handleDisconnect(io, socket);
    });
  });
};

export default registerSocketHandlers;
