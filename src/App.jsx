import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/React/user/Home";
import Adminhome from "./components/React/admin/Adminhome";
import Signup from "./components/React/Signup";
import Login from "./components/React/Login";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<Home />} />
        <Route path="/admin" element={<Adminhome />} />
      </Routes>
    </Router>
  );
}

export default App;
