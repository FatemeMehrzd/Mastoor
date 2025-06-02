import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Rokhdad from "./components/Rokhdad";
import "./App.css";
import Security from "./components/Security";
import TrafficSystem from "./components/TrafficSystem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/rokhdad" replace />} />
        <Route path="/rokhdad/*" element={<Rokhdad />} />
        <Route path="/Security/*" element={<Security />} />
        <Route path="/TrafficSystem/*" element={<TrafficSystem />} />
      </Routes>
    </Router>
  );
}

export default App;
