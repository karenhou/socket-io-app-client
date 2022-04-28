import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ActionButton from "../ActionButton";

const GameRoomStatusRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 40px;
  margin-right: 40px;
  border: solid 2px #ffc200;
  padding: 10px;
  border-radius: 10px;
`;

const StatsBar = ({ socket, roomId, alias, roomDetails }) => {
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    localStorage.removeItem("alias");
    socket.emit("leave_room", { roomId, alias, socketId: socket.id });
    navigate("/");
  };

  const handleCloseRoom = () => {
    socket.emit("close_room", { roomId });
  };

  return (
    <GameRoomStatusRow>
      <div>Gameroom ID: {!roomId ? "N/A" : roomId}</div>
      <div>Your Name: {!alias ? "N/A" : alias}</div>
      <div>
        {roomDetails && roomDetails.userCount ? roomDetails.userCount : 0} users
        in the room
      </div>
      {socket.id === roomDetails.roomHost ? (
        <ActionButton
          buttonColor="black"
          text="Close"
          actionFn={handleCloseRoom}
        />
      ) : (
        <ActionButton
          buttonColor="orange"
          text="Leave"
          actionFn={handleLeaveRoom}
        />
      )}
    </GameRoomStatusRow>
  );
};

export default StatsBar;
