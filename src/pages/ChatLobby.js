import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import ActiveUserList from "../components/ChatLobby/ActiveUserList";
import MsgInputSection from "../components/ChatLobby/MsgInputSection";
import ContainerWrapper from "../components/ChatLobby/ContainerWrapper";
import MsgSection from "../components/ChatLobby/MsgSection";
import Sidebar from "../components/Sidebar/Sidebar";
import { AuthContext, SocketContext } from "../context/AuthContext";

const ChatLobbyContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 11fr 3fr;
`;

const ChattingContainer = styled(ContainerWrapper)`
  background-color: #fafafa;
  display: grid;
  grid-template-rows: 1fr 7fr 3fr;
  height: 100vh;

  h1 {
    padding: 12px;
    color: #1e590c;
  }
`;

const ChatLobby = () => {
  const {
    user: { user },
  } = useContext(AuthContext);

  const { chatSocket } = useContext(SocketContext);

  console.log("my chatSocket ", chatSocket.id);

  useEffect(() => {
    chatSocket.emit("addUser", {
      socketId: chatSocket.id,
      username: user.username,
    });
  }, [user]);

  return (
    <ChatLobbyContainer>
      <Sidebar />
      <ChattingContainer>
        <h1>Chat Lobby</h1>
        <MsgSection />
        <MsgInputSection />
      </ChattingContainer>
      <ActiveUserList />
    </ChatLobbyContainer>
  );
};

export default ChatLobby;
