import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./Components/Home.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import Create from "./Components/Create.jsx";
import Details from "./Components/Details";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/recipes" element={<Create />} />
          <Route path="/recipes/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
