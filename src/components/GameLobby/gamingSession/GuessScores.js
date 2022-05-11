import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../context/AuthContext";

const ScoreBoardContainer = styled.div`
  grid-area: scores;
  background-color: hsl(67, 80%, 50%);
  padding: 1rem;
  border-radius: 12px;

  h3 {
    margin-bottom: 0.5rem;
  }
`;

const ScoreRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  div {
    border: 1px solid white;
    padding: 0.5rem;

    :nth-child(2) {
      text-align: end;
    }
  }
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
    <ScoreBoardContainer>
      <h3>Score Board</h3>
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
    </ScoreBoardContainer>
  );
};

export default GuessScores;
