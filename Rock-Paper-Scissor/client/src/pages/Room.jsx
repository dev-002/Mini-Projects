import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { Container } from "react-bootstrap";

import makeRoomId from "../utility/makeRoomId";

import ControlContainer from "../components/Room/ButtonContainer";
import TopProfile from "../components/Room/TopProfile";

const Room = () => {
  const location = useLocation();
  let { room: roomType, id: roomId } = location.state;
  // 3 values roomType: create (friend) or join (code) or join-random (stranger)

  const [roomID, setRoomId] = useState(NaN);
  // Socket
  const socket = useRef();

  // control States
  const [playerWait, setPlayerWait] = useState(true);
  const [playerControl, setPlayerControl] = useState(null);
  const [oppositeControl, setOppositeControl] = useState(null);
  const [points, setPoints] = useState(0);

  const handlePlayerControl = (e) => {
    setPlayerControl(e.target.name);
    socket.current.emit("game-move", { roomID, move: e.target.name });
  };

  function setMethod(id, player1, player2) {
    if (id == player1.id) {
      setPoints(player1.point);
      setPlayerControl(player1.move[player1.move.length - 1]);

      setOppositeControl(player2.move[player2.move.length - 1]);
    } else {
      setPoints(player2.point);
      setPlayerControl(player2.move[player2.move.length - 1]);

      setOppositeControl(player1.move[player1.move.length - 1]);
    }
  }

  useEffect(() => {
    if (roomId) {
      setRoomId(roomId);
    } else {
      const id = makeRoomId();
      setRoomId(id);
      roomId = id;
    }

    const newSocket = io("http://localhost:5000");
    socket.current = newSocket;

    // Socket event emit
    newSocket.emit(`${roomType}-room`, { roomId });

    // Create Room
    newSocket.on("room-created", () => {
      setPlayerWait(true);
      console.log("Room Created");
    });

    // Socket listeners
    newSocket.on("start-game", () => {
      setPlayerWait(false);
      console.log("Game Started");
    });

    newSocket.on("game-round", ({ players: [player1, player2] }) => {
      console.log("Player", player1, player2);
      setMethod(socket.id, player1, player2);

      newSocket.emit("game-round-end", { roomID });
    });

    newSocket.on("round-complete", ({ room }) => {
      setMethod(socket.id, ...room.players);
    });

    // To close the prev Connection on every new reload
    return () => newSocket.close();
  }, [roomType]);

  return (
    <>
      <div
        className="w-100 fw-bold fs-4 position-absolute text-center my-1 text-white"
        style={{ zIndex: "3" }}
      >
        Room Id: {roomID}
      </div>
      <Container className="h-100 w-100 d-flex justify-around">
        <div className="w-100 my-0 mx-3">
          <TopProfile right={false} points={points} />

          {playerControl ? (
            <img
              src={`/${playerControl}.png`}
              alt="Control Hand"
              className="w-auto"
              style={{
                height: "70%",
                transform: "rotate(90deg) translateY(-190px)",
                filter: "drop-shadow(20px 20px 10px black)",
              }}
            />
          ) : (
            <div></div>
          )}
        </div>

        <hr
          className="h-100 border-3 border-black bg-black"
          style={{ zIndex: "1" }}
        />

        {/* Right Side */}
        <div className="w-100 my-0 mx-1">
          <TopProfile right={true} />

          {oppositeControl ? (
            <img
              src={`/${oppositeControl}.png`}
              alt="Control Hand"
              className="w-auto"
              style={{
                height: "70%",
                transform: "rotate(270deg) translateY(200px)",
                filter: "drop-shadow(-20px -20px 10px black)",
              }}
            />
          ) : (
            <div></div>
          )}
        </div>
        <ControlContainer handleControl={handlePlayerControl} />
      </Container>
    </>
  );
};

export default Room;
