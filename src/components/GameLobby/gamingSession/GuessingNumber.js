import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../context/AuthContext";
import GuessInput from "./GuessInput";
import GuessRecords from "./GuessRecords";

const GuessingNumberContainer = styled.div`
  display: grid;
  grid-template-rows: 30px 200px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "title title" "input guessRecord";
  gap: 1rem;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-top: 1.5rem;
  padding: 1rem;
`;

const GuessTitle = styled.h3`
  grid-area: title;
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
    </GuessingNumberContainer>
  );
};

export default GuessingNumber;
