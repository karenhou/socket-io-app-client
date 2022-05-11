import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../context/AuthContext";
import { Btn } from "./GameRoomStats";

const GuessInputRow = styled.div`
  grid-area: input;
  background-color: hsl(50, 100%, 80%);
  border-radius: 10px;
  padding: 12px;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  input {
    padding: 0.3rem;
  }
`;

const BtnGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.fullWidth ? "1fr 1fr" : "1fr")};
  gap: 0.5rem;
`;

const GuessBtn = styled(Btn)`
  background-color: hsl(50, 100%, 30%);
`;

const ResetBtn = styled(Btn)`
  background-color: hsl(15, 80%, 50%);
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
  // inputGuess,
  // setInputGuess,
  roomInfo,
  gameSocket,
  // handleGuess,
  // handleResetGame,
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

  const handleResetGame = () => {
    console.log("handleResetGame");
    gameSocket.emit("reset_game", { roomNum: roomInfo.roomNum });
  };

  return (
    <GuessInputRow>
      <input
        placeholder="Enter your guess"
        type="text"
        value={inputGuess}
        onChange={(e) => setInputGuess(e.target.value)}
      />

      <BtnGrid fullWidth={roomInfo.host === gameSocket.id}>
        <GuessBtn
          disabled={inputGuess.length === 0 || hasWon !== 0}
          onClick={() => handleGuess(inputGuess)}
          buttonColor="green">
          Guess
        </GuessBtn>

        {roomInfo.host === gameSocket.id && (
          <ResetBtn type="button" onClick={handleResetGame}>
            Reset
          </ResetBtn>
        )}
      </BtnGrid>
    </GuessInputRow>
  );
};

export default GuessInput;
