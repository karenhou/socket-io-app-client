import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UsersInfoList from "./UsersInfoList";
import moment from "moment";
const ChatRoomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: 100vh;
`;

const SideMenuContainer = styled.div`
  background-color: green;
  padding: 12px;
  display: grid;
  grid-template-rows: 11fr 1fr;
`;

const MsgContainer = styled.div`
  display: grid;
  grid-template-rows: 4fr 1fr;
  max-height: 100vh;

  h3 {
    padding: 12px;
  }
`;

const InputBoxContainer = styled.div`
  display: flex;
  border-top: solid 1px black;

  textarea {
    width: 80%;
    padding: 12px;
    resize: none;
    border: none;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: end;
  justify-content: flex-end;
  padding: 12px;
`;

const SendMsgButton = styled.button`
  background-color: ${(props) => props.bgColor || "gray"};
  border: none;
  height: 30px;
  padding: 4px 8px;
  border-radius: 5px;
  width: 100%;
  color: ${(props) => props.textColor || "black"};

  &:hover {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      background-color: #e7b71b;
    }
  }
`;

const SideMenuActionContainer = styled.div`
  align-self: flex-end;
`;

const EmptySelectedSocketContainer = styled.div`
  margin: auto;
  height: 300px;
  display: flex;
  align-items: center;

  h3 {
    color: gray;
    font-style: italic;
  }
`;

const ChatRecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 8px;

  max-height: 80vh;
  overflow-y: scroll;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.flexDirection || "flex-start"};
  margin-bottom: 8px;
  padding: 0 12px;
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

const NameCircleContainer = styled.div`
  width: 45px;
`;

const MsgDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.left || "flex-end"}; ;
`;

const TextBgColor = styled.div`
  background-color: green;
  color: white;
  padding: 8px;
  border-radius: 12px;
`;

const TimestampRow = styled.div`
  font-size: 10px;
  margin-top: 4px;
  color: gray;
`;
const MsgItems = ({ flexDirection, msg, inputColor, noNameCircle, left }) => {
  return (
    <FlexBox flexDirection={flexDirection}>
      {noNameCircle ? (
        ""
      ) : (
        <NameCircleContainer>
          <NameCircle inputColor={inputColor}>
            {msg.fromUser.charAt(0)}
          </NameCircle>
        </NameCircleContainer>
      )}

      <MsgDetailsContainer left={left}>
        <TextBgColor>{msg.message}</TextBgColor>
        <TimestampRow>{moment(msg.timestamp).format("LTS")}</TimestampRow>
      </MsgDetailsContainer>
    </FlexBox>
  );
};

const ChatRoom = ({ socket }) => {
  const [inputMsg, setInputMsg] = useState("");
  const [chatRecord, setChatRecord] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedSocket, setSelectedSocket] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handleLogout");
    socket.emit("logout", {
      socketId: socket.id,
    });
  };

  const handleUserClicked = (user) => {
    console.log("handleUserClicked ", user);
    setSelectedSocket([user.name, user.socketId]);
  };

  const handleSendMsg = () => {
    console.log("handleSendMsg", inputMsg);
    const msgData = {
      message: inputMsg,
      from: socket.id,
      fromUser: selectedSocket[0],
      timestamp: new Date().getTime(),
      to: selectedSocket[1],
    };
    socket.emit("send_message_private", msgData);
    delete msgData.to;
    setChatRecord((oldMsg) => {
      let tmp = JSON.stringify(msgData);
      let mySet = new Set([...oldMsg, tmp]);
      console.log("setChatRecord ", mySet);
      return [...mySet];
    });

    setInputMsg("");
  };
  const handleChatRecord = useCallback((data) => {
    console.log("chat_record", data);
    setChatRecord(data);
  }, []);

  const handleLogoutResult = useCallback((data) => {
    console.log("logout_result", data); //msg
    if (data.msg === "success") {
      navigate("/");
    }
  }, []);

  const handleCurrentUsersResult = useCallback((data) => {
    console.count("get_current_users_result");
    console.log("get_current_users_result", data, socket.id); //users

    let checkMeExist = data.users.findIndex(
      (user) => user.socketId === socket.id
    );

    //i don't exist in current users, which means I reloaded, should be kicked to login page
    if (checkMeExist === -1) {
      navigate("/");
    }
    //filter out the oneself
    let temp = data.users.filter((user) => user.socketId !== socket.id);
    setUserList([...temp]);
  }, []);

  const handleReceiveMsgPrivate = useCallback((data) => {
    console.count("receive_message_private");
    console.log("receive_message_private data", data, chatRecord); //msg, from, timestamp

    setChatRecord((oldMsg) => {
      let tmp = JSON.stringify(data);
      let mySet = new Set([...oldMsg, tmp]);
      console.log("setChatRecord ", mySet);
      return [...mySet];
    });
  }, []);

  useEffect(() => {
    console.count("chatroom");
    socket.emit("get_current_users", {
      socketId: socket.id,
    });
  }, []);

  useEffect(() => {
    socket.on("chat_record", (data) => handleChatRecord(data));

    socket.on("logout_result", (data) => handleLogoutResult(data));

    socket.on("get_current_users_result", (data) =>
      handleCurrentUsersResult(data)
    );

    socket.on("receive_message_private", (data) =>
      handleReceiveMsgPrivate(data)
    );

    return () => {
      socket.off("chat_record");
      socket.off("logout_result");
      socket.off("get_current_users_result");
      socket.off("receive_message_private");
    };
  }, [socket, chatRecord, userList]);

  return (
    <ChatRoomContainer>
      <SideMenuContainer>
        <div>
          <UsersInfoList
            users={userList}
            handleUserClicked={handleUserClicked}
          />
        </div>

        <SideMenuActionContainer>
          <SendMsgButton
            bgColor="gray"
            textColor="white"
            onClick={() => handleLogout()}>
            Logout
          </SendMsgButton>
        </SideMenuActionContainer>
      </SideMenuContainer>

      <MsgContainer>
        {selectedSocket.length === 0 ? (
          <EmptySelectedSocketContainer>
            <h3>Select a user to chat</h3>
          </EmptySelectedSocketContainer>
        ) : (
          <ChatRecordContainer>
            <h3>{selectedSocket[0]}</h3>
            {chatRecord && (
              <>
                {chatRecord.map((chat) => {
                  const parsed = JSON.parse(chat);
                  console.log("chat ", parsed, socket.id);
                  if (parsed.from === socket.id) {
                    //i said
                    return (
                      <MsgItems
                        key={parsed.timestamp}
                        flexDirection="flex-end"
                        msg={parsed}
                        noNameCircle
                      />
                    );
                  } else
                    return (
                      <MsgItems
                        key={parsed.timestamp}
                        inputColor="orange"
                        msg={parsed}
                        left="baseline"
                      />
                    );
                })}
              </>
            )}
          </ChatRecordContainer>
        )}

        <InputBoxContainer>
          <textarea
            type="text"
            placeholder="Type your message here..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
          />
          <ButtonContainer>
            <SendMsgButton
              bgColor="#ffc200"
              onClick={() => handleSendMsg()}
              textColor="white"
              disabled={selectedSocket.length === 0}>
              Send
            </SendMsgButton>
          </ButtonContainer>
        </InputBoxContainer>
      </MsgContainer>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
