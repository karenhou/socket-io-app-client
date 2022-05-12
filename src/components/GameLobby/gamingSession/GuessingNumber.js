import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../context/AuthContext";

import GuessInput from "./GuessInput";
import GuessRecords from "./GuessRecords";
import GuessScores from "./GuessScores";

const GuessingNumberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 0.5fr 5fr;
  grid-template-areas: "title title" "input input" "guessRecord scores";
  grid-gap: 1rem;
`;

const GuessTitle = styled.h3`
  grid-area: title;
  text-align: center;
  align-self: center;
`;

const GuessingNumber = ({ roomInfo, targetNumber }) => {
  const [hasWon, setHasWon] = useState(0);
  const [guessRecord, setGuessRecord] = useState([]);

  const { gameSocket } = useContext(SocketContext);

  useEffect(() => {
    gameSocket.on("reset_game", (data) => {
      console.log("reset_game received", data);
      setGuessRecord([]);
      setHasWon(0);
    });

    return () => {
      gameSocket.off("reset_game");
    };
  }, [gameSocket]);

  return (
    <GuessingNumberContainer>
      <GuessTitle>GuessingNumber</GuessTitle>
      <GuessInput
        roomInfo={roomInfo}
        hasWon={hasWon}
        setHasWon={setHasWon}
        targetNumber={targetNumber}
        guessRecord={guessRecord}
        setGuessRecord={setGuessRecord}
      />

      <GuessRecords hasWon={hasWon} guessRecord={guessRecord} />

      <GuessScores />
    </GuessingNumberContainer>
  );
};

export default GuessingNumber;
