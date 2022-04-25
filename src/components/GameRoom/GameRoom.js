import React from "react";
import styled from "styled-components";
import Chat from "../Chat";
import Game from "./Game";
import GameRoomStats from "./GameRoomStats";
import { useLocation } from "react-router-dom";

const DividedContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 0 24px;
`;

const GameRoomContainer = styled.div`
  display: flex;
`;

const GameRoom = ({ socket, roomId, setRoomId, alias }) => {
  console.log("first", roomId);
  const location = useLocation();
  console.log("location", location);
  return (
    <>
      <GameRoomStats socket={socket} roomId={roomId} />
      <GameRoomContainer>
        <DividedContainer>
          <Game socket={socket} roomId={roomId} setRoomId={setRoomId} />
        </DividedContainer>
        <DividedContainer>
          <Chat socket={socket} roomId={roomId} alias={alias}></Chat>
        </DividedContainer>
      </GameRoomContainer>
    </>
  );
};

export default GameRoom;
