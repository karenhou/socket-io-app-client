import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ActionButton from "../ActionButton";
import InputComponent from "../InputComponent";
import Title from "../Title";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

const ChatBoxContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const MsgContainer = styled.div`
  flex-grow: 1;
  border: solid 2px gray;
  border-radius: 10px;
  margin: 0px 24px 10px 24px;
  padding: 10px;
  text-align: left;
`;

const InputRow = styled.div`
  display: flex;
  margin: 0 24px;
`;

const InputBox = styled.div`
  flex: 1;
  display: flex;
  input {
    flex-grow: 1;
    padding: 2px;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.flexDirection || "flex-start"};
  align-items: center;
  margin-bottom: 8px;
`;

const NameCircle = styled.div`
  background-color: ${(props) => props.inputColor || "palevioletred"};
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
  color: white;
  height: 25px;
  width: 25px;
  text-align: center;
`;

const MsgItems = ({ flexDirection, alias, message, inputColor }) => {
  return (
    <FlexBox flexDirection={flexDirection}>
      <NameCircle inputColor={inputColor}>{alias}</NameCircle>
      <div>{message}</div>
    </FlexBox>
  );
};

const Chat = ({ socket, roomId, alias }) => {
  const [message, setMessage] = useState("");
  const [msgReceived, setMsgReceived] = useState([]);
  const [systemMsg, setSystemMsg] = useState("");

  const sendMessage = () => {
    console.log("messge clicked");
    setMsgReceived((oldMsg) => {
      let temp = [];
      temp.push({ message, socketId: socket.id, alias });
      return [...oldMsg, ...temp];
    });
    socket.emit("send_message", {
      message,
      roomId,
      socketId: socket.id,
      alias,
    });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive_message ", data);

      setMsgReceived((oldMsg) => {
        let mySet = new Set([...oldMsg, data]);
        return [...mySet];
      });
    });

    socket.on("who_join", (data) => {
      setSystemMsg(`${data.alias} joined the room`);

      setTimeout(() => {
        setSystemMsg("");
      }, 2000);
    });
  }, [socket]);

  return (
    <ChatContainer>
      <Title title="Chat" />
      <ChatBoxContainer>
        {systemMsg && <div>{systemMsg}</div>}
        <MsgContainer>
          {msgReceived &&
            msgReceived.map((msg, index) => {
              return msg.socketId === socket.id ? (
                <MsgItems
                  key={index}
                  flexDirection="flex-end"
                  alias={msg.alias}
                  inputColor="orange"
                  message={msg.message}
                />
              ) : (
                <MsgItems
                  key={index}
                  alias={msg.alias}
                  inputColor="#83d883"
                  message={msg.message}
                />
              );
            })}
        </MsgContainer>
        <InputRow>
          <InputBox>
            <InputComponent
              placeholder="Message"
              value={message}
              setValue={setMessage}
            />
          </InputBox>
          <ActionButton text="Send" actionFn={sendMessage} buttonColor="blue" />
        </InputRow>
      </ChatBoxContainer>
    </ChatContainer>
  );
};

export default Chat;
