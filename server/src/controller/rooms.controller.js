
import {
  createRoom,
  joinRoom,
  handleDisconnect,
  startGame,
} from "../services/roomServices.js";

const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {

    socket.on("createRoom", ({ name }, callback) => {
      createRoom(io, socket, name, callback);
    });

    socket.on("joinRoom", ({ roomCode, name }, callback) => {
      joinRoom(io, socket, roomCode, name, callback);
    });

    socket.on("startGame", ( {roomCode} )  => {
      // console.log('at socket and the roomCode is',roomCode)
      // console.log('roomCode',roomCode)
      startGame(io, socket ,roomCode);
    });

    socket.on("disconnect", () => {
      handleDisconnect(io, socket);
    });
    
  });
};

export default registerSocketHandlers;
