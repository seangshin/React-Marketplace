import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile"
import "./styles/app.css";

function App() {

  return (
    <div className="bg">
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
