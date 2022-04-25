import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const SendButton = styled.button`
  padding: 4px;
  background-color: green;
  color: white;
  border: none;
  height: 100%;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.flexDirection || "flex-start"};
  align-items: center;
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

const Chat = ({ socket, roomId, alias }) => {
  const [message, setMessage] = useState("");
  const [msgReceived, setMsgReceived] = useState([]);
  const [systemMsg, setSystemMsg] = useState("");

  const sendMessage = () => {
    console.log("messge clicked");
    if (msgReceived.length === 0) {
      let obj = { message, socketId: socket.id, alias };
      let tmp = [obj];

      setMsgReceived([...tmp]);
    } else {
      setMsgReceived((oldMsg) => {
        let temp = [];
        temp.push({ message, socketId: socket.id, alias });
        console.log("before ", oldMsg, temp);
        return [...oldMsg, ...temp];
      });
    }
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
      console.log("incoming msg ", data);

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
                <FlexBox key={index} flexDirection="flex-end">
                  <NameCircle inputColor="orange">{msg.alias}</NameCircle>
                  <div>{msg.message}</div>
                </FlexBox>
              ) : (
                <FlexBox key={index}>
                  <NameCircle inputColor="#83d883">{msg.alias}</NameCircle>
                  <div>{msg.message}</div>
                </FlexBox>
              );
            })}
        </MsgContainer>
        <InputRow>
          <InputBox>
            <input
              placeholder="Message..."
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </InputBox>
          <div>
            <SendButton type="button" onClick={() => sendMessage()}>
              Send msg
            </SendButton>
          </div>
        </InputRow>
      </ChatBoxContainer>
    </ChatContainer>
  );
};

export default Chat;
