import React from "react";
import styled from "styled-components";
import Title from "./Title";

const JoinRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const RowContainer = styled.div`
  display: grid;
  gap: 2px;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  padding: 4px;
  background-color: ${(props) => props.buttonColor || "flex-start"};
  border-radius: 5px;
  color: white;
  border: none;
`;

const JoinRoom = ({ socket, roomId, setRoomId, alias, setAlias }) => {
  const handleJoinRoom = () => {
    socket.emit("join_room", { roomId });
  };
  const handleLeaveRoom = () => {
    socket.emit("leave_room", { roomId });
  };
  return (
    <JoinRoomContainer>
      <Title title="Join Room" />
      <RowContainer>
        <input
          placeholder="Your Names..."
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <input
          placeholder="Rooms#..."
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </RowContainer>
      <RowContainer>
        <ActionButton buttonColor="green" onClick={() => handleJoinRoom()}>
          Join
        </ActionButton>
        <ActionButton buttonColor="pink" onClick={() => handleLeaveRoom()}>
          Leave
        </ActionButton>
      </RowContainer>
    </JoinRoomContainer>
  );
};

export default JoinRoom;
