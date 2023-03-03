import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
