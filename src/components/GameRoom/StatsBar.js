import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ActionButton from "../ActionButton";

const GameRoomStatusRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 40px;
  margin-right: 40px;
  border: solid 2px #ffc200;
  padding: 10px;
  border-radius: 10px;
`;

const StatsBar = ({ socket, roomId, alias }) => {
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("num_connection", (data) => {
      setUserCount(data.userCount);
    });
  }, [socket]);

  const handleLeaveRoom = () => {
    localStorage.removeItem("alias");
    socket.emit("leave_room", { roomId });
    navigate("/");
  };

  return (
    <GameRoomStatusRow>
      <div>Gameroom ID: {!roomId ? "N/A" : roomId}</div>
      <div>Your Name: {!alias ? "N/A" : alias}</div>
      <div>{userCount ? userCount : 0} users in the room</div>
      <ActionButton
        buttonColor="orange"
        text="Leave"
        actionFn={handleLeaveRoom}
      />
    </GameRoomStatusRow>
  );
};

export default StatsBar;
