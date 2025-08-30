import { io } from "socket.io-client";

const renderUrl = "https://housiev2-server.onrender.com"
const localhostUrl = "http://localhost:3000/"

const socket = io(localhostUrl, {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;