import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rokhdad from "./components/Rokhdad";
import TrafficSystem from "./components/TrafficSystem";
import Security from "./components/Security";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Rokhdad />} />
        <Route path="/traffic" element={<TrafficSystem />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </Router>
  );
}

export default App;
