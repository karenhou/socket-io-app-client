import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

const GamingSession = ({
  gameSocket,
  setConfigState,
  roomInfo,
  setRoomInfo,
}) => {
  const [targetNumber, setTargetNumber] = useState("");
  const [systemMsg, setSystemMsg] = useState("");

  useEffect(() => {
    gameSocket.on("quit_game_result", (data) => {
      console.log("quit_game_result", data);
      if (data.msg === "success") {
        setConfigState(0);
      }
    });

    gameSocket.on("gameroom_closed", (data) => {
      console.log("gameroom_closed received", data);
      setRoomInfo(null);
      setConfigState(0);
    });

    gameSocket.on("roomInfoUpdate", (data) => {
      console.log("roomInfoUpdate received", data);
      setSystemMsg(data.msg);
    });

    gameSocket.on("targeted_number", (data) => {
      console.log("targeted_number received", data);
      setTargetNumber(data.targetNumber);
    });

    return () => {
      gameSocket.off("quit_game_result");
      gameSocket.off("gameroom_closed");
      gameSocket.off("roomInfoUpdate");
      gameSocket.off("targeted_number");
    };
  }, [gameSocket]);

  useEffect(() => {
    setTimeout(() => {
      setSystemMsg("");
    }, 2500);
  }, [systemMsg]);

  return (
    <>
      <ToastNotification msg={systemMsg} />
      <GameSessionContainer>
        <GameRoomStats
          roomInfo={roomInfo}
          gameSocket={gameSocket}
          targetNumber={targetNumber}
        />

        {targetNumber && (
          <GuessingNumber
            gameSocket={gameSocket}
            roomInfo={roomInfo}
            targetNumber={targetNumber}
          />
        )}
      </GameSessionContainer>
    </>
  );
};

export default GamingSession;
