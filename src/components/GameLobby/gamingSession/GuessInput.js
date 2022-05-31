import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext, SocketContext } from "../../../context/AuthContext";
import { Btn } from "./GameRoomStats";

const GuessInputRow = styled.div`
  border-radius: 8px;
  display: flex;
  gap: 0.8rem;

  input {
    display: flex;
    padding: 0.3rem 0.6rem;
    height: 24px;
    border-radius: 8px;
    width: -webkit-fill-available;
  }
`;

const GuessBtn = styled(Btn)`
  background-color: #3aaa16;
`;

const compareResult = (userGuess, answer) => {
  let rightNumCount = 0; //for B
  let rightAnswerCount = 0; //for A

  for (let i = 0; i < answer.length; i++) {
    if (userGuess[i] === answer[i]) {
      rightAnswerCount++;
    } else {
      if (answer.includes(userGuess[i])) {
        rightNumCount++;
      }
    }
  }

  return [rightAnswerCount, rightNumCount];
};

const GuessInput = ({
  roomInfo,
  hasWon,
  setHasWon,
  targetNumber,
  setGuessRecord,
  guessRecord,
}) => {
  const [inputGuess, setInputGuess] = useState("");
  const {
    user: { user },
  } = useContext(AuthContext);
  const { gameSocket } = useContext(SocketContext);

  useEffect(() => {
    gameSocket.on("reset_game", (data) => {
      console.log("reset_game received", data);
      setInputGuess("");
    });

    return () => {
      gameSocket.off("reset_game");
    };
  }, [gameSocket]);

  const handleGuess = (guess) => {
    const userGuess = guess.split("").map((x) => parseInt(x));

    let result = compareResult(userGuess, targetNumber);

    // console.log("result ", result);

    let checkWon = result[0] === 4;

    // console.log("result ", checkWon);
    if (!checkWon) {
      setGuessRecord((oldRecord) => {
        if (oldRecord.length === 9) {
          setHasWon(2); //lost
          return [];
        }
        return [...oldRecord, `${inputGuess}, ${result[0]}A ${result[1]}B`];
      });
    } else {
      let resultObj = {
        roomNum: roomInfo.roomNum,
        guessCount: 1,
        socketId: gameSocket.id,
        username: user.username,
      };

      if (guessRecord.length > 0) {
        resultObj.guessCount = guessRecord.length;
      }
      gameSocket.emit("end_game", resultObj);
      setGuessRecord([]);
      setHasWon(1); //won
    }

    setInputGuess("");
  };

  return (
    <GuessInputRow>
      <GuessBtn
        disabled={inputGuess.length === 0 || hasWon !== 0}
        onClick={() => handleGuess(inputGuess)}
        buttonColor="green">
        Guess
      </GuessBtn>
      <input
        placeholder="Enter your guess"
        type="text"
        value={inputGuess}
        onChange={(e) => setInputGuess(e.target.value)}
      />
    </GuessInputRow>
  );
};

export default GuessInput;
