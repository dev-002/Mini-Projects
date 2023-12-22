const shortid = require("shortid");

const roomHandler = (id, socket, rooms) => {
  const create = (payload, callback) => {
    if (payload.type === "stranger") {
      const index = rooms.findIndex((room) => room.vacant === true);
      if (index > 0) {
        const room = rooms[index];
        room.players[socket.id] = {
          option: null,
          optionLock: false,
          score: 0,
        };
        room.vacant = false;
        socket.join(room.roomId);
        io.to(room.roomId).emit("room:get", room);
        callback(null, room.roomId);
      } else {
        const room = {
          roomId: shortid.generate(),
          players: {
            [socket.id]: {
              option: null,
              optionLock: false,
              score: 0,
            },
          },
          vacant: true,
        };
        rooms.push(room);
        socket.join(room.roomId);
        io.to(room.roomId).emit("room:get", room);
        callback(null, room.roomId);
      }
    }
  };
  socket.on("room:create", create);
};
