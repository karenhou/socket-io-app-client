import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import JoinRoom from "./components/JoinPage/Join";
import { Routes, Route } from "react-router-dom";
import GameRoom from "./components/GameRoom/GameRoom";

const socket = io.connect("http://localhost:3001");

function App() {
  const [roomId, setRoomId] = useState("");
  const [alias, setAlias] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <JoinRoom
              socket={socket}
              roomId={roomId}
              setRoomId={setRoomId}
              alias={alias}
              setAlias={setAlias}
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
