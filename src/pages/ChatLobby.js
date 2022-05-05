import React, { useEffect, useState, useCallback, useContext } from "react";
import styled from "styled-components";
import ActiveUserList from "../components/ChatLobby/ActiveUserList";
import MsgInputSection from "../components/ChatLobby/MsgInputSection";
import ContainerWrapper from "../components/ChatLobby/ContainerWrapper";
import MsgSection from "../components/ChatLobby/MsgSection";
import Sidebar from "../components/Sidebar/Sidebar";
import { AuthContext } from "../context/AuthContext";

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

const ChatLobby = ({ socket }) => {
  const {
    user: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    socket.emit("addUser", {
      socketId: socket.id,
      username: user.username,
    });
  }, [user]);

  return (
    <ChatLobbyContainer>
      <Sidebar />
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
