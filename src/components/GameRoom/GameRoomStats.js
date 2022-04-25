import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ActionButton from "../ActionButton";

const GameRoomStatusRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 40px;
  margin-right: 40px;
  border: solid 2px #ffc200;
  padding: 10px;
  border-radius: 10px;
`;

const GameRoomStats = ({ socket, roomId }) => {
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("num_connection", (data) => {
      console.log("num_connection in this room", data);
      setUserCount(data.userCount);
    });
    console.log("roomId", roomId);
  }, [socket]);

  const handleLeaveRoom = () => {
    socket.emit("leave_room", { roomId });
    navigate("/");
  };

  return (
    <GameRoomStatusRow>
      <div>Gameroom ID: {roomId === undefined ? "N/A" : roomId}</div>
      <div>{userCount ? userCount : 0} users in the room</div>
      <ActionButton
        buttonColor="orange"
        text="Leave"
        actionFn={handleLeaveRoom}
      />
    </GameRoomStatusRow>
  );
};

export default GameRoomStats;
