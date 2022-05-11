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

const GamingSession = ({ setConfigState, roomInfo, setRoomInfo }) => {
  const [targetNumber, setTargetNumber] = useState("");
  const [systemMsg, setSystemMsg] = useState("");

  const { gameSocket } = useContext(SocketContext);

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

  return (
    <>
      <ToastNotification msg={systemMsg} />
      <GameSessionContainer>
        <GameRoomStats
          startBtnOn={!targetNumber && roomInfo.host === gameSocket.id}
          roomInfo={roomInfo}
          quitGameFn={handleQuitGameClicked}
          startGameFn={handleStartGameClicked}
        />

        {targetNumber && (
          <GuessingNumber roomInfo={roomInfo} targetNumber={targetNumber} />
        )}
      </GameSessionContainer>
    </>
  );
};

export default GamingSession;
