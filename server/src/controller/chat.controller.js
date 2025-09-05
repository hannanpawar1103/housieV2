

const chatSocketHandlers = (io) => {
  io.on("connection", (socket) => {

    socket.on("sendMessage", ({ roomCode, name, message }) => {
      io.to(roomCode).emit("receiveMessage", { name, message });
    });

  });
};

export default chatSocketHandlers;
