import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../context/AuthContext";

const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const GuessScores = () => {
  const [chartInfo, setChartInfo] = useState([]);
  const { gameSocket } = useContext(SocketContext);

  useEffect(() => {
    gameSocket.on("reset_game", (data) => {
      console.log("reset_game received", data);
      setChartInfo([]);
    });

    gameSocket.on("game_result", (data) => {
      console.log("game_result", data);

      setChartInfo((old) => {
        let tmp = JSON.stringify(data);
        let mySet = new Set([...old, tmp]);
        return [...mySet];
      });
    });

    return () => {
      gameSocket.off("reset_game");
      gameSocket.off("game_result");
    };
  }, [gameSocket]);

  return (
    <>
      {chartInfo &&
        chartInfo.map((item, index) => {
          const parsed = JSON.parse(item);
          return (
            <ScoreRow key={index}>
              <div>{parsed.username}</div>
              <div>{parsed.guessCount} times</div>
            </ScoreRow>
          );
        })}
    </>
  );
};

export default GuessScores;
