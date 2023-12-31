import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Container } from "react-bootstrap";

import ControlContainer from "../components/ButtonContainer";
import TopProfile from "../components/TopProfile";
import PlayerWait from "../components/PlayerWait";
import WinnerCard from "../components/WinnerCard";
import LoserCard from "../components/LoserCard";

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
  const [winner, setWinner] = useState(null);
  const [gameEnd, setGameEnd] = useState(false);
  const [controlAccess, setControlAccess] = useState(false);

  const handlePlayerControl = (e) => {
    setPlayerControl(e.target.name);
    // Emit the move event to the server
    setControlAccess(true);
    socket.current.emit("game-move", { roomId: roomID, move: e.target.name });
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
    const newSocket = io("http://localhost:5000");
    socket.current = newSocket;

    // Socket event emit
    newSocket.emit(`${roomType}-room`, { roomId });

    // Create Room
    newSocket.on("room-created", ({ roomId }) => {
      setRoomId(roomId);
      console.log("Room Created");
    });

    // Socket listeners
    newSocket.on("start-game", ({ roomId }) => {
      console.log(roomId);
      setRoomId(roomId);
      setPlayerWait(false);
      console.log("Game Started");
    });

    newSocket.on("room-full", () => {
      navigate = useNavigate();
      navigate("/", { state: { roomFull: true } });
    });

    newSocket.on(
      "game-round",
      ({
        room: {
          players: [player1, player2],
        },
        winner,
      }) => {
        console.log("Player", player1, player2);
        setMethod(newSocket.id, player1, player2);

        console.log("Winner", winner, newSocket.id);
        if (newSocket.id == player1.id) {
          setPoints(player1.point);
        } else {
          setPoints(player2.point);
        }
        if (winner == newSocket.id) {
          setWinner(true);
        } else {
          setWinner(false);
        }

        if (points === 3) {
          setTimeout(() => {
            newSocket.emit("game-end", { roomId: roomID });
            setControlAccess(true);
            setGameEnd(true);
            navigator("/");
          }, 5000);
        } else {
          setTimeout(() => {
            setControlAccess(false);
            setOppositeControl(null);
            setPlayerControl(null);
          }, 3000);
        }
      }
    );

    newSocket.on("round-complete", ({ room }) => {
      setMethod(newSocket.id, ...room.players);
    });

    newSocket.on("");
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
        <br />
        {winner !== null ? (
          winner ? (
            <WinnerCard gameEnd={gameEnd} />
          ) : (
            <LoserCard gameEnd={gameEnd} />
          )
        ) : (
          ""
        )}
      </div>
      <Container className="h-100 w-100 d-flex justify-around">
        {/* Left Side */}
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

        {/* V/S Line */}
        <hr
          className="h-100 border-3 border-black bg-black"
          style={{ zIndex: "1" }}
        />

        {/* Right Side */}
        <div className="w-100 my-0 mx-1">
          {playerWait ? (
            <PlayerWait />
          ) : (
            <>
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
            </>
          )}
        </div>
        <ControlContainer
          handleControl={handlePlayerControl}
          controlAccess={controlAccess}
        />
      </Container>
    </>
  );
};

export default Room;
