
import express from "express";
import http from "http";
import { Server } from "socket.io";
import registerSocketHandlers from "./src/controller/rooms.controller.js";
import chatSocketHandlers from "./src/controller/chat.controller.js";
import {housieRandomNumbersCallingSocketHandlers} from "./src/controller/housieRandomNumbersCalling.controller.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Attach socket logic
registerSocketHandlers(io);
chatSocketHandlers(io);
housieRandomNumbersCallingSocketHandlers(io)

server.listen(3000, () => console.log("Server running on port 3000"));
