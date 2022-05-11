import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext, SocketContext } from "../../context/AuthContext";

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

const ChatBoxSection = () => {
  const [inputText, setInputText] = useState("");

  const {
    user: { user },
  } = useContext(AuthContext);

  const { chatSocket } = useContext(SocketContext);

  const handleTextOnChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMsgBtnClicked = () => {
    console.log("handleSendMsgBtnClicked");

    chatSocket.emit("send_message_all", {
      socketId: chatSocket.id,
      msg: inputText,
      timestamp: new Date().getTime(),
      username: user.username,
    });

    setInputText("");
  };

  return (
    <TextAreaContainer>
      <WordOfTheDay
        onChange={handleTextOnChange}
        value={inputText}
        placeholder="Say something to everyone..."></WordOfTheDay>
      <BtnRow onClick={handleSendMsgBtnClicked}>
        <Btn>Say</Btn>
      </BtnRow>
    </TextAreaContainer>
  );
};

export default ChatBoxSection;
