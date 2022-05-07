import "./App.css";
// import io from "socket.io-client";
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import GameRoom from "./pages/GameRoom";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/AuthContext";
import ChatLobby from "./pages/ChatLobby";
import GameLobby from "./pages/GameLobby";

// const socket = io.connect("http://localhost:3001");

function App() {
  // const [roomId, setRoomId] = useState("");
  // const [alias, setAlias] = useState("");
  // const [roomPassword, setRoomPassword] = useState("");
  // const [roomDetails, setRoomDetails] = useState("");

  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("App user ", user);
  //   socket.on("current_room_info", (data) => {
  //     console.log("current_room_info", data);
  //     setRoomDetails(data);
  //   });

  //   return () => {
  //     socket.off("current_room_info");
  //   };
  // }, [socket]);

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

        {/* <Route
          path="/chat"
          element={
            user ? <ChatRoom socket={socket} /> : <Navigate to="/" replace />
          }
        /> */}
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>404</div>} />
        {/* <Route
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
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
