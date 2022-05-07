import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import ActiveUserList from "../components/ChatLobby/ActiveUserList";
import MsgInputSection from "../components/ChatLobby/MsgInputSection";
import ContainerWrapper from "../components/ChatLobby/ContainerWrapper";
import MsgSection from "../components/ChatLobby/MsgSection";
import Sidebar from "../components/Sidebar/Sidebar";
import { AuthContext } from "../context/AuthContext";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const ChatLobbyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 11fr 3fr;
`;

const ChattingContainer = styled(ContainerWrapper)`
  background-color: #fafafa;
  display: grid;
  grid-template-rows: 1fr 7fr 3fr;
  height: 100vh;

  h1 {
    padding: 12px;
    color: #124b00;
  }
`;

const ChatLobby = () => {
  const {
    user: { user },
  } = useContext(AuthContext);

  console.log("my socket ", socket.id);

  useEffect(() => {
    socket.emit("addUser", {
      socketId: socket.id,
      username: user.username,
    });
  }, [socket, user]);

  return (
    <ChatLobbyContainer>
      <Sidebar socket={socket} />
      <ChattingContainer>
        <h1>Chat Lobby</h1>
        <MsgSection socket={socket} />
        <MsgInputSection socket={socket} />
      </ChattingContainer>
      <ActiveUserList socket={socket} />
    </ChatLobbyContainer>
  );
};

export default ChatLobby;
