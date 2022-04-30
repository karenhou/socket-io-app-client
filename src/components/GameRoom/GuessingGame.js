import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ActionButton, { Button } from "../ActionButton";
import InputComponent from "../InputComponent";

const GuessBtn = styled(Button)`
  margin-right: 8px;
  margin-left: 8px;
`;

const ResultTextWrapper = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const ResultText = ({ text }) => {
  return <ResultTextWrapper>{text}</ResultTextWrapper>;
};

const GuessingRecordContainer = styled.div`
  width: 320px;
  margin: auto;
  border: 2px solid black;
  padding: 8px;
  border-radius: 5px;

  li {
    list-style-type: none;
  }
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

const checkEndGame = (result) => {
  return result[0] === 4;
};

const GamingInfo = ({ hasWon, targetNumber, guessRecord }) => {
  if (hasWon === 1) {
    return <ResultText text="You won" />;
  }

  if (hasWon === 2) {
    return (
      <ResultText
        text={`You have used all your guesses. You lost, Answer is ${targetNumber.join(
          ""
        )}`}
      />
    );
  }

  return (
    <>
      <h4>Guess Count Left: {10 - guessRecord.length}</h4>
      {guessRecord.length > 0 && (
        <GuessingRecordContainer>
          {guessRecord.map((guess, index) => {
            return <li key={index}>{guess}</li>;
          })}
        </GuessingRecordContainer>
      )}
    </>
  );
};

const GuessingGame = ({ targetNumber, socket, roomId, alias }) => {
  const [guessRecord, setGuessRecord] = useState([]);
  const [inputGuess, setInputGuess] = useState("");
  const [hasWon, setHasWon] = useState(0);

  const handleGuess = (guess) => {
    const userGuess = guess.split("").map((x) => parseInt(x));

    let result = compareResult(userGuess, targetNumber);

    // console.log("result ", result);

    let checkWon = checkEndGame(result);

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
        roomId: roomId,
        guessCount: 1,
        socketId: socket.id,
        alias: alias,
      };

      if (guessRecord.length > 0) {
        resultObj.guessCount = guessRecord.length;
      }
      socket.emit("end_game", resultObj);
      setGuessRecord([]);
      setHasWon(1); //won
    }

    setInputGuess("");
  };

  useEffect(() => {
    socket.on("reset_game", () => {
      setInputGuess("");
      setGuessRecord([]);
      setHasWon(0);
    });

    return () => {
      socket.off("reset_game");
    };
  }, [socket]);

  const handleResetGame = () => {
    console.log("handleResetGame");
    socket.emit("reset_game", { roomId });
  };

  return (
    <>
      <div>
        <InputComponent
          placeholder="Guess"
          value={inputGuess}
          setValue={setInputGuess}
        />
        <GuessBtn
          disabled={inputGuess.length === 0}
          onClick={() => handleGuess(inputGuess)}
          buttonColor="green">
          Guess
        </GuessBtn>

        <ActionButton
          buttonColor="red"
          text="Reset"
          actionFn={handleResetGame}
        />
      </div>

      <GamingInfo
        hasWon={hasWon}
        targetNumber={targetNumber}
        guessRecord={guessRecord}
      />
    </>
  );
};

export default GuessingGame;
