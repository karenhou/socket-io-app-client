import React, { useEffect } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import Game from "./Game";
import StatsBar from "./StatsBar";
import { useLocation } from "react-router-dom";

const DividedContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 0 24px;
`;

const GameRoomContainer = styled.div`
  display: flex;
`;

const GameRoom = ({ socket, roomId, setRoomId, alias, setAlias }) => {
  const location = useLocation();

  useEffect(() => {
    let room, currentAlias;
    if (alias) {
      currentAlias = alias;
      localStorage.setItem("alias", alias);
    } else {
      if (localStorage.getItem("alias")) {
        currentAlias = localStorage.getItem("alias");
      }
    }

    if (!roomId) {
      room = location.pathname.split(":")[1];
      setRoomId(room);
    } else {
      room = roomId;
    }

    setAlias(currentAlias);
    console.log("gameroom b4 joinroom", currentAlias);
    socket.emit("join_room", {
      roomId: room,
      alias: currentAlias,
    });
  }, []);

  return (
    <>
      <StatsBar socket={socket} roomId={roomId} />
      <GameRoomContainer>
        <DividedContainer>
          <Game socket={socket} roomId={roomId} alias={alias} />
        </DividedContainer>
        <DividedContainer>
          <Chat socket={socket} roomId={roomId} alias={alias}></Chat>
        </DividedContainer>
      </GameRoomContainer>
    </>
  );
};

export default GameRoom;
