import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./Components/Home.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import Create from "./Components/Create.jsx";
import Details from "./Components/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exac path="/recipes" element={<Create />} />
          <Route exac path="/recipes/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
