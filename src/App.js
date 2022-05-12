import "./App.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ChatLobby from "./pages/ChatLobby";
import GameLobby from "./pages/GameLobby";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Profile /> : <Home />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/chat-lobby"
          element={user ? <ChatLobby /> : <Navigate to="/" replace />}
        />
        <Route
          path="/game-lobby"
          element={user ? <GameLobby /> : <Navigate to="/" replace />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
}

export default App;
