import React from "react";
import styled from "styled-components";
import ActiveUserList from "../components/ChatLobby/ActiveUserList";
import ContainerWrapper from "../components/ChatLobby/ContainerWrapper";
import Sidebar from "../components/Sidebar/Sidebar";

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

const MsgContainer = styled.div`
  padding: 12px;
  display: flex;
  width: inherit;
`;

const TextAreaContainer = styled.div`
  padding: 12px;
  margin: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 12px;
`;

const WordOfTheDay = styled.textarea`
  padding: 8px;
  resize: none;
  width: inherit;
  display: block;
  box-sizing: border-box;
  border: none;
  color: #124b00;
  width: 100%;
  min-height: 75%;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Btn = styled.button`
  padding: 8px;
  background-color: #59bf39;
  border: none;
  border-radius: 8px;
  color: #fff;
  width: 100px;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

const ChatLobby = ({ socket }) => {
  return (
    <ChatLobbyContainer>
      <Sidebar />
      <ChattingContainer>
        <h1>Chat Lobby</h1>
        <MsgContainer>actual msgs</MsgContainer>
        <TextAreaContainer>
          <WordOfTheDay>Say something...</WordOfTheDay>
          <BtnRow>
            <Btn>Say</Btn>
          </BtnRow>
        </TextAreaContainer>
      </ChattingContainer>
      <ActiveUserList />
    </ChatLobbyContainer>
  );
};

export default ChatLobby;
