import React from "react";
import styled from "styled-components";

const UserItemContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const UsersInfoList = ({ users, handleUserClicked }) => {
  return (
    <>
      <h3>Online Users</h3>
      {users &&
        users.map((user, index) => {
          return (
            <UserItemContainer
              key={index}
              onClick={() => handleUserClicked(user)}>
              <div>{user.name}</div>
              <div>{user.socketId}</div>
            </UserItemContainer>
          );
        })}
    </>
  );
};

export default UsersInfoList;
