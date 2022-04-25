import React from "react";
import styled from "styled-components";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

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

const InputComponent = ({ placeholder, value, setValue }) => {
  return (
    <input
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

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

    navigate(`/game-room:${tmpRoomId}`);
  };

  return (
    <JoinRoomContainer>
      <Title title="Join Room" />
      <RowContainer>
        <InputComponent
          placeholder="Your name.."
          value={alias}
          setValue={setAlias}
        />
        <InputComponent
          placeholder="Room ID..."
          value={roomId}
          setValue={setRoomId}
        />
      </RowContainer>
      <RowContainer>
        <ActionButton
          buttonColor="green"
          text="Join"
          actionFn={handleJoinRoom}
        />
      </RowContainer>
    </JoinRoomContainer>
  );
};

export default JoinRoom;
