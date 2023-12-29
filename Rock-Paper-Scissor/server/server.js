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
// Room Data
const exportRoom = require("./data/Room");

io.on("connection", (socket) => {
  console.log("New Connection: ", socket.id);

  // Create Room
  socket.on("create-room", ({ roomId }) => {
    // // To get a unique id
    // let roomId = makeRoomId();
    // while (exportRoom.id.includes(roomId)) {
    //   roomId = makeRoomId();
    // }
    // exportRoom.id.push(roomId);

    // roomID = String(roomID);
    console.log(roomId);

    console.log("Create Room Id: ", roomId, typeof roomId);
    socket.join(roomId);
    exportRoom.data.push({
      id: roomId,
      vacant: true,
      players: [{ id: socket.id, move: [], point: 0 }],
    });
    socket.emit("room-created");
  });

  // Join Room with Code
  socket.on("join-room", ({ roomID }) => {
    console.log("join room");
    const room = exportRoom.data.find((room) => room.id === roomID);
    if (room && room.vacant) {
      room.vacant = false;
    }

    room.players.push({ id: socket.id, move: [], point: 0 });
    socket.join(roomID);

    console.log("Join Room: ", roomID, typeof roomID);
    io.to(roomID).emit("start-game");
  });

  // Join Random Room
  socket.on("join-random-room", () => {
    console.log("Random Available Room Join: ");
  });

  // Game Events
  socket.on("game-move", ({ roomID, move }) => {
    const room = exportRoom.data.find((r) => r.id == roomID);
    room.players.forEach((player) => {
      if (player.id == socket.id) {
        player.move.push(move);
      }
    });
    console.log(room);
    if (
      // to check if there are 2 player in room
      // room.players.length == 2 &&
      !room.vacant &&
      room.players[0].move.length == room.players[1].move.length
    ) {
      io.to(roomID).emit("game-round", room);
    }
  });

  socket.on("game-round-end", ({ roomID }) => {
    console.log(roomID);
    const room = exportRoom.data.find((r) => (r.id = roomID));
    const winner = GameLogic(room.players);
    room.players.map((player) => {
      if (player.id == winner) player.point++;
    });
    io.to(roomID).emit("round-complete", { room });
  });
  socket.on("disconnect", () => console.log("Connection Disconnected"));
});

server.listen(5000, () => console.log(`Server Started \nPort: 5000`));
