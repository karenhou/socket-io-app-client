import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../context/AuthContext";
import ContainerWrapper from "./ContainerWrapper";

const ActiveUserContainer = styled(ContainerWrapper)`
  background-color: #98dc83;
  padding: 12px;
  color: #124b00;
`;

const UserRow = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  padding: 12px;
  opacity: 0.8;

  :hover {
    cursor: pointer;
  }
`;

const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  column-gap: 8px;
  align-self: center;
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
              <OnlineDot></OnlineDot>
              <div>{user.username}</div>
            </UserRow>
          );
        })}
    </ActiveUserContainer>
  );
};

export default ActiveUserList;
