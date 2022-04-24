import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import styled from "styled-components";
import Chat from "./components/Chat";
import Games from "./components/Games";
import JoinRoom from "./components/JoinRoom";

const socket = io.connect("http://localhost:3001");

const DividedContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 0 24px;
`;

const AppContainer = styled.div`
  display: flex;
`;

function App() {
  const [roomId, setRoomId] = useState("");
  const [alias, setAlias] = useState("");

  return (
    <div className="App">
      <JoinRoom
        socket={socket}
        roomId={roomId}
        setRoomId={setRoomId}
        alias={alias}
        setAlias={setAlias}
      />
      <AppContainer>
        <DividedContainer>
          <Games socket={socket} roomId={roomId} setRoomId={setRoomId} />
        </DividedContainer>
        <DividedContainer>
          <Chat socket={socket} roomId={roomId} alias={alias}></Chat>
        </DividedContainer>
      </AppContainer>
    </div>
  );
}

export default App;
