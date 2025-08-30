import { roomCodeGenerator } from "../utils/roomCodeGenerator.js";

const rooms = {};

const createRoom = (io, socket, name, callback) => {
  const roomCode = roomCodeGenerator();

  rooms[roomCode] = {
    users: {},
    ownerId: socket.id,
  };

  rooms[roomCode].users[socket.id] = name;

  socket.join(roomCode);
  callback({ success: true, roomCode });

  io.to(roomCode).emit("userList", {
    users: Object.values(rooms[roomCode].users),
    owner: rooms[roomCode].users[rooms[roomCode].ownerId],
  });

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

  room.users[socket.id] = name;
  socket.join(roomCode);

  callback({ success: true, roomCode });

  io.to(roomCode).emit("userList", {
    users: Object.values(room.users),
    owner: room.users[room.ownerId],
  });

  console.log(`${name} joined room ${roomCode}`);
};

const handleDisconnect = (io, socket) => {
  for (const [roomCode, room] of Object.entries(rooms)) {
    if (room.users[socket.id]) {
      const name = room.users[socket.id];
      delete room.users[socket.id];
      socket.leave(roomCode);

      console.log(`${name} left room ${roomCode}`);

      setTimeout(() => {
        if (
          rooms[roomCode] &&
          Object.keys(rooms[roomCode].users).length === 0
        ) {
          delete rooms[roomCode];
          console.log(`Room ${roomCode} deleted`);
        } else if(rooms[roomCode]){
          
          io.to(roomCode).emit(
            "userList",
            Object.values(rooms[roomCode].users)
          );
        }
      }, 3000);
    }
  }
};

export { createRoom, joinRoom, handleDisconnect };
