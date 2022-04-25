import React, { useState, useEffect } from "react";
import GuessingGame from "./GuessingGame";
import Title from "../Title";
import ActionButton from "../ActionButton";
import styled from "styled-components";

const SubTitle = styled.div`
  color: gray;
  /* margin-bottom: 8px; */
`;

const ChartInfoContainer = styled.div`
  margin-bottom: 8px;
`;

const Game = ({ socket, roomId, alias }) => {
  const [targetNumber, setTargetNumber] = useState("");
  const [chartInfo, setChartInfo] = useState("");

  const handleStartGame = () => {
    socket.emit("start_game", { roomId });
  };

  useEffect(() => {
    socket.on("targeted_number", (data) => {
      console.log("targeted_number", data);
      setTargetNumber(data.targetNumber);
    });

    socket.on("game_result", (data) => {
      console.log("game_result", data);

      setChartInfo((old) => {
        let tmp = JSON.stringify(data);
        let mySet = new Set([...old, tmp]);
        return [...mySet];
      });
    });
  }, [socket]);

  return (
    <div>
      <Title title="Game" />

      {targetNumber === "" && (
        <>
          <SubTitle>
            Guess 4 numbers ranged from 0-9, no duplicates, 10 shots
          </SubTitle>
          <ActionButton
            text="Start"
            actionFn={handleStartGame}
            buttonColor="#227722"
          />
        </>
      )}

      {chartInfo && (
        <>
          <SubTitle> Score board </SubTitle>
          {chartInfo.map((item, index) => {
            const parsed = JSON.parse(item);
            return (
              <ChartInfoContainer
                key={
                  index
                }>{`User: ${parsed.alias}, used: ${parsed.guessCount} time to guess it`}</ChartInfoContainer>
            );
          })}
        </>
      )}

      {targetNumber && (
        <GuessingGame
          targetNumber={targetNumber}
          socket={socket}
          roomId={roomId}
          alias={alias}
          setChartInfo={setChartInfo}
        />
      )}
    </div>
  );
};

export default Game;
