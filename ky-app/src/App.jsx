import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Rokhdad from "./components/Rokhdad";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/rokhdad" replace />} />
        <Route path="/rokhdad/*" element={<Rokhdad />} />
      </Routes>
    </Router>
  );
}

export default App;
