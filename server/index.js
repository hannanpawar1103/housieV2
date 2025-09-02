
import express from "express";
import http from "http";
import { Server } from "socket.io";
import registerSocketHandlers from "./src/socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Attach socket logic
registerSocketHandlers(io);

server.listen(3000, () => console.log("Server running on port 3000"));
