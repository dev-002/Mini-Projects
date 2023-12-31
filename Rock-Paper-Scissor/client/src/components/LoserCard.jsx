import { Container } from "react-bootstrap";

export default function LoserCard({ gameEnd }) {
  return (
    <>
      {/* <Container className="position-absolute w-50 h-40 bg-danger fs-2 fw-bold text-white">
        <div>Loser</div>
      </Container> */}
      <span className="fs-3 fw-bold bg-danger" style={{ padding: "0.5em 1em" }}>
        {gameEnd ? "You Lose Game" : "You Lose Round"}
      </span>
    </>
  );
}
