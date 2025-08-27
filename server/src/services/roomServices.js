import { roomCodeGenerator } from "../utils/roomCodeGenerator";

const rooms = {};

const createRoom = (io, socket, name, callback) => {
  const roomCode = roomCodeGenerator();

  rooms[roomCode] = {
    users: {},
  };

  rooms[roomCode].users[socket.id] = name;

  socket.join(roomCode);
  callback({ success: true, roomCode });

  console.log(`${name} created room ${roomCode}`);
};

const joinRoom = (io, socket, roomCode, name, callback) => {
  const room = rooms[roomCode];

  if (!room) {
    return callback({ success: false, message: "room does not exist" });
  }

  if (Object.values(room.users).includes(name)) {
    return callback({ success: false, message: "Name already taken!" });
  }

  room.users[socket.id] = name 
  socket.join(roomCode)

  callback({ success: true, roomCode });

  io.to(roomCode).emit('userList' , Object.values(room.users))

  console.log(`${name} joined room ${roomCode}`);

}

const handleDisconnect = (io, socket, roomCode, name, callback) => {
    for (const [roomCode, room] of Object.entries(rooms)) {
    if (room.users[socket.id]) {
      const userName = room.users[socket.id];
      delete room.users[socket.id];
      io.to(roomCode).emit("userList", Object.values(room.users));

      console.log(`${userName} left room ${roomCode}`);

      if (Object.keys(room.users).length === 0) {
        delete rooms[roomCode];
        console.log(`Room ${roomCode} deleted`);
      }
    }
  }
}


export { createRoom, joinRoom , handleDisconnect };
