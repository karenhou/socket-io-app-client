import React from "react";
import styled from "styled-components";

const UserItemContainer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const NameIcon = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
  color: black;
  height: 25px;
  width: 25px;
  text-align: center;
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
              {/* <NameIcon>{user.name[0]}</NameIcon> */}
              <NameIcon>Pix</NameIcon>
              <h4>{user.name}</h4>
              {/* <div>{user.socketId}</div> */}
            </UserItemContainer>
          );
        })}
    </>
  );
};

export default UsersInfoList;
