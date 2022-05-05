import React from "react";
import styled from "styled-components";
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

const ActiveUserList = ({ onlineUsers }) => {
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
