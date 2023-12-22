import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import background_img from "/background.jpg";
import "./App.css";

function App() {
  return (
    <>
      <main className="main">
        <img
          src={background_img}
          alt="Background Image"
          className="background_img"
        />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
