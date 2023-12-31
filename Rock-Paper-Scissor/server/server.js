const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer();
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// custom function
const { GameLogic } = require("./utility/GameLogic");
const makeRoomId = require("./utility/MakeRoomId");
// Room Data
const exportRoom = require("./data/Room");

io.on("connection", (socket) => {
  console.log("New Connection: ", socket.id);

  // Create Room
  socket.on("create-room", ({ roomId }) => {
    // To get a unique id
    if (!roomId) {
      roomId = makeRoomId();
    }
    // while (exportRoom.id.includes(roomId)) {
    //   roomId = makeRoomId();
    // }
    exportRoom.id.push(roomId);
    roomId = String(roomId);

    socket.join(roomId);
    exportRoom.data.push({
      id: roomId,
      vacant: true,
      players: [{ id: socket.id, move: [], point: 0 }],
    });

    console.log("Room Data-Room Creation: ", exportRoom.data);
    socket.emit("room-created", { roomId });
  });

  // Join Room with Code
  socket.on("join-room", ({ roomId }) => {
    const room = exportRoom.data.find((room) => room.id === roomId);
    if (room && room.vacant) {
      room.vacant = false;
      room.players.push({ id: socket.id, move: [], point: 0 });
      socket.join(roomId);

      console.log(roomId);
      io.to(roomId).emit("start-game", { roomId });
    } else {
      // By default the socket joins default room by id name
      // We can send the message that room is full
      io.to(socket.id).emit("room-full");
    }
  });

  // Join Random Room
  socket.on("join-random-room", () => {
    console.log("Random Available Room Join: ");
  });

  // Game Events
  socket.on("game-move", ({ roomId, move }) => {
    const room = exportRoom.data.find((r) => r.id == roomId);
    room.players.forEach((player) => {
      if (player.id == socket.id) {
        player.move.push(move);
      }
    });

    // to check if there are 2 player in room
    if (
      // room.players.length == 2 &&
      !room.vacant &&
      room.players[0].move.length == room.players[1].move.length
    ) {
      const winner = GameLogic(room.players);
      room.players.map((player) => {
        if (player.id == winner) player.point++;
      });
      io.to(roomId).emit("game-round", { room, winner });
    }
  });

  socket.on("game-end", ({ roomId }) => {
    exportRoom.data.filter((room) => {
      if (room.id !== roomId) return room;
    });
    exportRoom.id.filter((id) => id !== roomId);
  });

  socket.on("disconnect", () => console.log("Connection Disconnected"));
});

server.listen(5000, () => console.log(`Server Started \nPort: 5000`));
