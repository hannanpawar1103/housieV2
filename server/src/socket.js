import {
  createRoom,
  joinRoom,
  handleDisconnect,
  startGame,
  getTicket
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

    socket.on("startGame", ( {roomCode} )  => {
      // console.log('at socket and the roomCode is',roomCode)
      // console.log('roomCode',roomCode)
      startGame(io, socket ,roomCode);
    });

    socket.on("getTicket",({roomCode , name} , callback) => {
      getTicket(io , socket , roomCode , name , callback)
    })

    socket.on("disconnect", () => {
      handleDisconnect(io, socket);
    });
  });
};

export default registerSocketHandlers;
