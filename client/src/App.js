import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile"
import "./styles/app.css";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg">
    <Router>
      <Navigation setSearchTerm={setSearchTerm}/>
      <Routes>
        <Route path="/" element={<Homepage searchTerm={searchTerm} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
