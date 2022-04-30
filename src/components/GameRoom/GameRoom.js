import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GameChat from "./GameChat";
import Game from "./Game";
import StatsBar from "./StatsBar";
import { useLocation, useNavigate } from "react-router-dom";

const DividedContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 0 24px;
`;

const GameRoomContainer = styled.div`
  display: flex;
`;

const GameRoom = ({
  socket,
  roomId,
  setRoomId,
  alias,
  setAlias,
  roomPassword,
  roomDetails,
}) => {
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("closed_room", (data) => {
      console.log("first closed_room", data);
      navigate("/");
    });

    return () => {
      socket.off("closed_room");
    };
  }, [socket]);

  useEffect(() => {
    //comment off, until better solution for reconnecting
    // let room, currentAlias, password;
    // if (alias) {
    //   currentAlias = alias;
    //   localStorage.setItem("alias", alias);
    // }
    // if (roomPassword) {
    //   password = roomPassword;
    //   localStorage.setItem("password", roomPassword);
    // }
    // if (localStorage.getItem("alias")) {
    //   currentAlias = localStorage.getItem("alias");
    // }
    // if (localStorage.getItem("password")) {
    //   password = localStorage.getItem("password");
    // }
    // if (!roomId) {
    //   room = location.pathname.split(":")[1];
    //   setRoomId(room);
    // } else {
    //   room = roomId;
    // }
    // setAlias(currentAlias);
    // socket.emit("join_room", {
    //   roomId: room,
    //   alias: currentAlias,
    //   roomPassword: password,
    //   socketId: socket.id,
    // });
  }, []);

  return (
    <>
      <StatsBar
        socket={socket}
        roomId={roomId}
        alias={alias}
        roomDetails={roomDetails}
      />
      <GameRoomContainer>
        <DividedContainer>
          <Game socket={socket} roomId={roomId} alias={alias} />
        </DividedContainer>
        <DividedContainer>
          <GameChat socket={socket} roomId={roomId} alias={alias} />
        </DividedContainer>
      </GameRoomContainer>
    </>
  );
};

export default GameRoom;
