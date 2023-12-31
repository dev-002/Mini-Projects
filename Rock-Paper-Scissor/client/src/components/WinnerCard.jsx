import { Container } from "react-bootstrap";

export default function WinnerCard({ gameEnd }) {
  return (
    <>
      {/* <Container
        className=" position-absolute bg-success fs-2 fw-bold text-white d-flex align-self-center justify-center w-auto"
        style={{ height: "30%", width: "30%", top: "30%", left: "30%" }}
      >
        <div className="bg-warning w-full" style={{ height: "30%" }}></div>
        <div className="text-center h-auto">Winner</div>
      </Container> */}
      <span
        className="fs-3 fw-bold bg-success"
        style={{ padding: "0.5em 1em" }}
      >
        {gameEnd ? "You Win Game" : "You Win Round"}
      </span>
    </>
  );
}
