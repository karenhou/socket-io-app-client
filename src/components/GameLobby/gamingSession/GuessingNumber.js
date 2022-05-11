import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const GuessingNumber = ({ gameSocket, roomInfo, targetNumber }) => {
  const [hasWon, setHasWon] = useState(0);
  const [guessRecord, setGuessRecord] = useState([]);

  console.log("targetNumber ", targetNumber);

  useEffect(() => {
    gameSocket.on("reset_game", (data) => {
      console.log("reset_game received", data);
      // setInputGuess("");
      setGuessRecord([]);
      setHasWon(0);
    });

    return () => {
      gameSocket.off("reset_game");
    };
  }, [gameSocket]);

  return (
    <GuessingNumberContainer>
      <GuessTitle>GuessingNumber {targetNumber}</GuessTitle>
      <GuessInput
        roomInfo={roomInfo}
        gameSocket={gameSocket}
        hasWon={hasWon}
        setHasWon={setHasWon}
        targetNumber={targetNumber}
        guessRecord={guessRecord}
        setGuessRecord={setGuessRecord}
      />

      <GuessRecords hasWon={hasWon} guessRecord={guessRecord} />

      <GuessScores gameSocket={gameSocket} />
    </GuessingNumberContainer>
  );
};

export default GuessingNumber;
