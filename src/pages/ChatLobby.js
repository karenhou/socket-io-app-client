import React, { useEffect, useState, useCallback, useContext } from "react";
import styled from "styled-components";
import ActiveUserList from "../components/ChatLobby/ActiveUserList";
import ContainerWrapper from "../components/ChatLobby/ContainerWrapper";
import MsgItem from "../components/ChatLobby/MsgItem";
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

const MsgContainer = styled.div`
  padding: 12px;
  display: flex;
  width: inherit;
  flex-direction: column;
  max-height: 400px;
  overflow-y: scroll;
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
  const [inputText, setInputText] = useState("");
  const [receivedMsg, setReceivedMsg] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const {
    user: { user },
  } = useContext(AuthContext);

  const handleTextOnChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMsgBtnClicked = () => {
    console.log("handleSendMsgBtnClicked");

    socket.emit("send_message_all", {
      socketId: socket.id,
      msg: inputText,
      timestamp: new Date().getTime(),
      username: user.username,
    });

    setInputText("");
  };

  const handleReceiveMsgAll = useCallback((data) => {
    console.log("receive_message_all data", data); //socketId, msg,timestamp,username

    setReceivedMsg((prev) => {
      return [...prev, data];
    });
  }, []);

  useEffect(() => {
    socket.emit("addUser", {
      socketId: socket.id,
      username: user.username,
    });
  }, [user]);

  useEffect(() => {
    socket.on("receive_message_all", (data) => handleReceiveMsgAll(data));

    socket.on("getUsers", (data) => {
      console.log("getUsers", data);
      const filteredRes = data.filter((user) => user.socketId !== socket.id);
      setOnlineUsers(filteredRes);
    });

    return () => {
      socket.off("receive_message_all");
    };
  }, [socket, receivedMsg]);

  return (
    <ChatLobbyContainer>
      <Sidebar />
      <ChattingContainer>
        <h1>Chat Lobby</h1>
        <MsgContainer>
          {receivedMsg && <MsgItem receivedMsg={receivedMsg} user={user} />}
        </MsgContainer>
        <TextAreaContainer>
          <WordOfTheDay
            onChange={handleTextOnChange}
            value={inputText}
            placeholder="Say something to everyone..."></WordOfTheDay>
          <BtnRow onClick={handleSendMsgBtnClicked}>
            <Btn>Say</Btn>
          </BtnRow>
        </TextAreaContainer>
      </ChattingContainer>
      <ActiveUserList onlineUsers={onlineUsers} />
    </ChatLobbyContainer>
  );
};

export default ChatLobby;
