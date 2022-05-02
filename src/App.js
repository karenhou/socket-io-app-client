import "./App.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import GameRoom from "./pages/GameRoom";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const socket = io.connect("http://localhost:3001");

function App() {
  const [roomId, setRoomId] = useState("");
  const [alias, setAlias] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomDetails, setRoomDetails] = useState("");

  useEffect(() => {
    socket.on("current_room_info", (data) => {
      console.log("current_room_info", data);
      setRoomDetails(data);
    });

    return () => {
      socket.off("current_room_info");
    };
  }, [socket]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatRoom socket={socket} />} />
        <Route path="*" element={<div>404</div>} />
        <Route
          path="/join-room"
          element={
            <JoinRoom
              socket={socket}
              roomId={roomId}
              setRoomId={setRoomId}
              alias={alias}
              setAlias={setAlias}
              roomPassword={roomPassword}
              setRoomPassword={setRoomPassword}
            />
          }
        />
        <Route
          path="/game-room:roomId"
          element={
            <GameRoom
              socket={socket}
              roomId={roomId}
              setRoomId={setRoomId}
              alias={alias}
              setAlias={setAlias}
              roomPassword={roomPassword}
              roomDetails={roomDetails}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
