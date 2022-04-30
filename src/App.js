import "./App.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import JoinRoom from "./components/JoinPage/Join";
import { Routes, Route } from "react-router-dom";
import GameRoom from "./components/GameRoom/GameRoom";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Login from "./components/Login/Login";

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
    <div className="App">
      <Routes>
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
        <Route path="/chat" element={<ChatRoom socket={socket} />} />
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
