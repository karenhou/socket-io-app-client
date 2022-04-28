import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import ActionButton from "../ActionButton";
import InputComponent from "../InputComponent";

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
  margin-bottom: 8px;
`;

const ErrorText = styled.div`
  color: red;
`;

const Join = ({
  socket,
  roomId,
  setRoomId,
  alias,
  setAlias,
  roomPassword,
  setRoomPassword,
}) => {
  const navigate = useNavigate();
  const [systemMsg, setSystemMsg] = useState("");

  const handleJoinRoom = () => {
    setSystemMsg("");
    let tmpRoomId = roomId;
    if (tmpRoomId === "") {
      tmpRoomId = 3; //default room #3
      setRoomId(tmpRoomId);
    }

    socket.emit("join_room", {
      roomId: tmpRoomId,
      alias,
      roomPassword,
      socketId: socket.id,
    });
  };

  useEffect(() => {
    socket.on("join_result", (data) => {
      console.log("join_result", data);
      if (data.msg === "Wrong password") {
        setSystemMsg(data.msg);
      } else {
        navigate(`/game-room:${data.roomId}`);
      }
    });
  }, [socket]);

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
        <InputComponent
          placeholder="Password for the room..."
          value={roomPassword}
          setValue={setRoomPassword}
        />
      </RowContainer>
      <ActionButton buttonColor="green" text="Join" actionFn={handleJoinRoom} />
      {systemMsg && <ErrorText>{systemMsg}</ErrorText>}
    </JoinRoomContainer>
  );
};

export default Join;
