import { io } from "socket.io-client";

const socket = io("https://housiev2-server.onrender.com", {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;