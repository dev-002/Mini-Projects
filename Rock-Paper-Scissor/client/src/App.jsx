import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import background_img from "/background.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";

function App() {
  return (
    <main className="h-100">
      <img
        src={background_img}
        alt="Background Image"
        className="position-absolute h-100 w-100"
        style={{ zIndex: "-1", backgroundSize: "contain" }}
      />

      <Container
        className="position-absolute d-flex overflow-hidden p-0"
        style={{
          height: "80vh",
          width: "80%",
          left: "10%",
          margin: "5em auto",
          backgroundColor: "rgba(255, 255, 255, 0.242)",
          borderRadius: "1%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;
