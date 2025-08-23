import { createServer } from "http";   // <-- from Node.js http module
import { Server } from "socket.io";   // <-- from socket.io

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",  // configure as needed
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});