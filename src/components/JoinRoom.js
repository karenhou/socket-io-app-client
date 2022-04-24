import React from "react";
import styled from "styled-components";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const JoinRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const RowContainer = styled.div`
  display: grid;
  gap: 2px;
  grid-template-columns: 1fr;
  margin-top: 8px;
`;

export const ActionButton = styled.button`
  padding: 4px;
  background-color: ${(props) => props.buttonColor || "flex-start"};
  border-radius: 5px;
  color: white;
  border: none;
  width: 80px;
`;

const JoinRoom = ({ socket, roomId, setRoomId, alias, setAlias }) => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    let tmpRoomId = roomId;
    console.log("tmpRoomId ", tmpRoomId);
    if (tmpRoomId === "") {
      tmpRoomId = 3; //default room #3
      setRoomId(tmpRoomId);
    }

    socket.emit("join_room", {
      roomId: tmpRoomId,
      alias,
    });

    setRoomId("");
    navigate(`/game-room:${tmpRoomId}`);
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
      </RowContainer>
    </JoinRoomContainer>
  );
};

export default JoinRoom;
