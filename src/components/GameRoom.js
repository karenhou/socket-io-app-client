import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import GuessGame from "./GuessGame";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "./JoinRoom";

const DividedContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 0 24px;
`;

const GameRoomContainer = styled.div`
  display: flex;
`;

const GameRoomStatusRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`;

const GameRoom = ({ socket, roomId, setRoomId, alias }) => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);

  const handleLeaveRoom = () => {
    socket.emit("leave_room", { roomId });
    navigate("/");
  };

  useEffect(() => {
    socket.on("num_connection", (data) => {
      console.log("num_connection in this room", data);
      setUserCount(data.userCount);
    });
  }, [socket]);

  return (
    <>
      <GameRoomStatusRow>
        <div>Gameroom ID: {roomId}</div>
        <div>{userCount ? userCount : 0} users in the room</div>
        <ActionButton buttonColor="pink" onClick={() => handleLeaveRoom()}>
          Leave
        </ActionButton>
      </GameRoomStatusRow>

      <GameRoomContainer>
        <DividedContainer>
          <GuessGame socket={socket} roomId={roomId} setRoomId={setRoomId} />
        </DividedContainer>
        <DividedContainer>
          <Chat socket={socket} roomId={roomId} alias={alias}></Chat>
        </DividedContainer>
      </GameRoomContainer>
    </>
  );
};

export default GameRoom;
