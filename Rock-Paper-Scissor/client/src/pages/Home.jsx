import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// Icons
import Logo from "/Logo.png";
import Scissor from "/Scissor.png";
import Rock from "/Rock.png";

const Home = () => {
  const roomIdRef = useRef();
  const navigate = useNavigate();

  function handleClick(room) {
    navigate("/room", { state: { room } });
  }

  function joinARoom(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="w-100">
        <img
          src={Logo}
          alt="Logo"
          className="h-100"
          style={{ zIndex: "2", width: "90%" }}
        />
      </div>
      <div className="w-100 h-100">
        <img
          src={Scissor}
          alt="Scissor Hand"
          className="position-absolute"
          style={{
            zIndex: "1",
            height: "40em",
            left: "72%",
            top: "-25%",
            filter:
              "drop-shadow(1px 1px 0 rgb(255, 255, 255)) drop-shadow(-1px -1px 0 rgb(255, 255, 255))",
            transform: "rotate(0.65turn)",
          }}
        />
        <img
          src={Rock}
          alt="Rock Hand"
          className="position-absolute"
          style={{
            zIndex: "1",
            height: "30em",
            left: "40%",
            top: "41%",
            filter:
              "drop-shadow(1px 1px 0 rgb(255, 255, 255)) drop-shadow(-1px -1px 0 rgb(255, 255, 255))",
            transform: "skew(150deg, 30deg)",
          }}
        />

        <div
          className="w-max h-100 pb-5 pe-3 position-relative d-flex align-items-end flex-column justify-content-end"
          style={{ zIndex: "2" }}
        >
          <Button
            className="d-block my-3 fw-bold text-white fs-3 p-3 border-5 border-white"
            onClick={() => handleClick("join")}
            style={{
              background:
                "linear-gradient(40deg, rgb(229, 14, 161), rgb(162, 0, 255))",
              cursor: "pointer",
            }}
          >
            Play with Stranger
          </Button>
          <Button
            className="d-block my-3 fw-bold text-white fs-3 p-3 border-5 border-white"
            onClick={() => handleClick("create")}
            style={{
              background:
                "linear-gradient(40deg, rgb(229, 14, 161), rgb(162, 0, 255))",
              cursor: "pointer",
            }}
          >
            Create a Room
          </Button>
          <Form className="my-3" onSubmit={joinARoom}>
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                className="fs-5 rounded-0 rounded-start me-0"
                ref={roomIdRef}
                placeholder="RoomID"
              />
              <Button
                type="submit"
                required
                className="fs-4 rounded-0 rounded-end ms-0"
                style={{
                  background:
                    "linear-gradient(40deg, rgb(229, 14, 161), rgb(162, 0, 255))",
                  cursor: "pointer",
                }}
              >
                Join
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
