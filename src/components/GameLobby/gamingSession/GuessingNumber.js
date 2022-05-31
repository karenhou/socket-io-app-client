import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../context/AuthContext";
import GuessInput from "./GuessInput";
import GuessRecords from "./GuessRecords";

const GuessingNumberContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const GuessInteractionContainer = styled.div`
  background-color: #1e590c;
  padding: 16px;
  border-radius: 8px;
  min-height: 100px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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
      <GuessInteractionContainer>
        <h4>Guess A Number</h4>
        <GuessInput
          roomInfo={roomInfo}
          hasWon={hasWon}
          setHasWon={setHasWon}
          targetNumber={targetNumber}
          guessRecord={guessRecord}
          setGuessRecord={setGuessRecord}
        />
      </GuessInteractionContainer>

      <GuessRecords hasWon={hasWon} guessRecord={guessRecord} />
    </GuessingNumberContainer>
  );
};

export default GuessingNumber;
