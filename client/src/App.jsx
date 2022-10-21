import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./Components/Home.jsx";
import LandingPage from "./Components/LandingPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
