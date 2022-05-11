import React, { useEffect, useState, useCallback, useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { AuthContext, SocketContext } from "../../context/AuthContext";

const MsgContainer = styled.div`
  padding: 12px;
  display: flex;
  width: inherit;
  flex-direction: column;
  max-height: 400px;
  overflow-y: scroll;
`;

const MsgRowRight = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: flex-end;
`;

const LeftMsgRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const PersonLabel = styled.div`
  font-size: 10px;
  padding: 8px;
  border-radius: 12px;
  color: green;
`;

const MsgBody = styled.div`
  display: flex;
  border-radius: 8px;
  border: solid 1px #ccc;
  padding: 8px;
  margin-right: ${(props) => (props.right ? "0" : "8px")};
  word-wrap: break-word;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const MsgBodyLeft = styled.div`
  display: flex;
`;

const MsgNested = styled.div`
  max-width: 75%;
  min-width: 20%;
  color: #124b00;
  border-radius: 8px;
  border: solid 1px #ccc;
  padding: 8px;
  margin-right: ${(props) => (props.right ? "0" : "8px")};
  word-wrap: break-word;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const TimestampDiv = styled.div`
  align-self: flex-end;
  color: gray;
  font-size: 10px;
  margin-right: ${(props) => (props.right ? "8px" : "0")};
`;

const MyOwnMsg = ({ msg }) => {
  return (
    <MsgRowRight key={msg.timestamp}>
      <TimestampDiv right>{moment(msg.timestamp).format("LTS")}</TimestampDiv>
      <MsgBody right>{msg.msg}</MsgBody>
    </MsgRowRight>
  );
};

const MsgFromOthers = ({ msg }) => {
  return (
    <LeftMsgRow key={msg.timestamp}>
      <PersonLabel>{msg.username}</PersonLabel>
      <MsgBodyLeft>
        <MsgNested>{msg.msg}</MsgNested>
        <TimestampDiv>{moment(msg.timestamp).format("LTS")}</TimestampDiv>
      </MsgBodyLeft>
    </LeftMsgRow>
  );
};

const MsgSection = () => {
  const [receivedMsg, setReceivedMsg] = useState([]);
  const {
    user: { user },
  } = useContext(AuthContext);

  const { chatSocket } = useContext(SocketContext);

  const handleReceiveMsgAll = useCallback((data) => {
    console.log("receive_message_all data", data); //socketId, msg,timestamp,username

    setReceivedMsg((prev) => {
      return [...prev, data];
    });
  }, []);

  useEffect(() => {
    chatSocket.on("receive_message_all", (data) => handleReceiveMsgAll(data));

    return () => {
      chatSocket.off("receive_message_all");
    };
  }, [chatSocket, receivedMsg]);

  return (
    <MsgContainer>
      {receivedMsg &&
        receivedMsg.map((msg) => {
          return msg.username === user.username ? (
            <MyOwnMsg key={msg.timestamp} msg={msg} />
          ) : (
            <MsgFromOthers key={msg.timestamp} msg={msg} />
          );
        })}
    </MsgContainer>
  );
};

export default MsgSection;
