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
const { makeRoomId } = require("./utility/MakeRoomId");

io.on("connection", (socket) => {
  console.log("New Connection: ", socket.id);

  socket.on("create-room", () => {
    const roomId = makeRoomId();
    // console.log("Create Room Id: ", roomId);
    socket.emit("room-created", { roomId });
  });

  socket.on("join-room", () => {
    console.log("Join Room: ");
  });

  socket.on("disconnect", () => console.log("Connection Disconnected"));
});

server.listen(5000, () => console.log(`Server Started \nPort: 5000`));
