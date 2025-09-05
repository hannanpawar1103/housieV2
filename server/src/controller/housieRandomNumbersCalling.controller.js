import {randomNumberCalled} from "../utils/randomNumberCalling.js";

// console.log(randomNumberCalled())

const housieRandomNumbersCallingSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        socket.on("startNumberCalling", ({ roomCode }) => {
        const randomNumber = randomNumberCalled();
      // console.log(roomCode)
      io.to(roomCode).emit("sendRandomNumber", {data:randomNumber});
    });
  });
};

export { housieRandomNumbersCallingSocketHandlers };
