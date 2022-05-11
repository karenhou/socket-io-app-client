import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../context/AuthContext";
import ToastNotification from "../../ToastNotification";
import GameRoomStats from "./GameRoomStats";
import GuessingNumber from "./GuessingNumber";

const GameSessionContainer = styled.div`
  width: 80%;
  margin: 0 5rem;
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 0.8rem;
`;

const GamingSession = ({ roomInfo, systemMsg }) => {
  const [targetNumber, setTargetNumber] = useState("");

  const { gameSocket } = useContext(SocketContext);

  useEffect(() => {
    gameSocket.on("targeted_number", (data) => {
      console.log("targeted_number received", data);
      setTargetNumber(data.targetNumber);
    });

    return () => {
      gameSocket.off("targeted_number");
    };
  }, [gameSocket]);

  const handleQuitGameClicked = () => {
    console.log("quit game clicked", roomInfo);
    gameSocket.emit("quit_game", {
      roomNum: roomInfo.roomNum,
    });
  };

  const handleStartGameClicked = () => {
    console.log("handleStartGameClicked", roomInfo);
    gameSocket.emit("start_game", {
      roomNum: roomInfo.roomNum,
    });
  };

  const handleKickPlayerClicked = (socketId) => {
    console.log("handleKickPlayerClicked", socketId);

    gameSocket.emit("kick_player", {
      roomNum: roomInfo.roomNum,
      userSocket: socketId,
    });
  };

  return (
    <>
      <ToastNotification msg={systemMsg} />
      <GameSessionContainer>
        <GameRoomStats
          startBtnOn={!targetNumber && roomInfo.host === gameSocket.id}
          userSocketId={gameSocket.id}
          roomInfo={roomInfo}
          quitGameFn={handleQuitGameClicked}
          startGameFn={handleStartGameClicked}
          kickPlayerFn={handleKickPlayerClicked}
        />

        {targetNumber && (
          <GuessingNumber roomInfo={roomInfo} targetNumber={targetNumber} />
        )}
      </GameSessionContainer>
    </>
  );
};

export default GamingSession;
