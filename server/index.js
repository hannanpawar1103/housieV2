import { createServer } from "http";   
import { Server } from "socket.io";   

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",  // configure as needed
  }
});

const rooms = {}



io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("registerUsername" , (username) => {
    socket.username = username
    console.log("username is :" , username)
  })

  socket.on("chatMessage" , (data) => {
    const MessageWithUsername = {
      username : socket.username | "Anonymous",
      message : data.message
    }

    io.emit("chatMessage" , MessageWithUsername)
  })

  socket.on('disconnect', () => {
        console.log('user disconnected');
    });


});

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});