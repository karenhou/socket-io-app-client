import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../context/AuthContext";
import ContainerWrapper from "./ContainerWrapper";

const ActiveUserContainer = styled(ContainerWrapper)`
  background-color: #bcecac;
  padding: 12px;
  color: #3aaa16;

  h3 {
    text-align: center;
    font-size: 24px;
    text-decoration: underline;
    margin-bottom: 12px;
    color: #333333;
    font-weight: 400;
  }
`;

const UserRow = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  padding: 8px;
  border-radius: 100px;
  background-color: #fff;
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  :hover {
    cursor: pointer;
  }
`;

const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3aaa16;
  column-gap: 8px;
  align-self: center;
  margin-left: 8px;
`;

const UserNameText = styled.div`
  margin-left: 8px;
`;

const ActiveUserList = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { chatSocket } = useContext(SocketContext);

  useEffect(() => {
    chatSocket.on("getUsers", (data) => {
      console.log("getUsers", data);
      const filteredRes = data.filter(
        (user) => user.socketId !== chatSocket.id
      );
      setOnlineUsers(filteredRes);
    });

    return () => {
      chatSocket.off("getUsers");
    };
  }, [chatSocket]);

  return (
    <ActiveUserContainer>
      <h3>Active Users</h3>
      {onlineUsers &&
        onlineUsers.map((user) => {
          return (
            <UserRow key={user.socketId}>
              <OnlineDot />
              <UserNameText>{user.username}</UserNameText>
            </UserRow>
          );
        })}
    </ActiveUserContainer>
  );
};

export default ActiveUserList;
