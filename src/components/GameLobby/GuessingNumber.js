import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

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

const GuessingNumberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.5fr 4fr;
  grid-template-areas: "title title" "input input" "guessRecord scores";
  grid-gap: 1rem;
`;

const GuessTitle = styled.h3`
  grid-area: title;
  text-align: center;
  align-self: center;
`;

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

const Btn = styled.button`
  padding: 8px;
  border-radius: 5px;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

const GuessBtn = styled(Btn)`
  background-color: hsl(50, 100%, 30%);
  color: white;
`;

const ResetBtn = styled(Btn)`
  background-color: hsl(15, 80%, 50%);
  color: white;
`;

const RecordContainer = styled.div`
  grid-area: guessRecord;
  background-color: hsl(59, 100%, 80%);
  padding: 1rem;
  border-radius: 12px;
`;

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

const RecordComponents = ({ guessRecord }) => {
  return (
    <>
      <h3>Guess Records</h3>
      {guessRecord.map((guess, index) => {
        console.log("guess ", guess);
        return <div key={index}>{guess}</div>;
      })}
    </>
  );
};

const GuessingNumber = ({ gameSocket, roomInfo, targetNumber }) => {
  const [guessRecord, setGuessRecord] = useState([]);
  const [inputGuess, setInputGuess] = useState("");
  const [hasWon, setHasWon] = useState(0);
  const [chartInfo, setChartInfo] = useState([]);
  const {
    user: { user },
  } = useContext(AuthContext);

  console.log("targetNumber ", targetNumber);

  useEffect(() => {
    gameSocket.on("reset_game", (data) => {
      console.log("reset_game received", data);
      setInputGuess("");
      setGuessRecord([]);
      setHasWon(0);
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
        // alias: alias,
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
    <GuessingNumberContainer>
      <GuessTitle>GuessingNumber {targetNumber}</GuessTitle>
      {/* <HasWonComponent hasWon={hasWon} /> */}
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
      <RecordContainer>
        {hasWon === 1 && <h3>You won!</h3>}
        {hasWon === 2 && <h3>You lost!</h3>}
        {hasWon === 0 && guessRecord && (
          <RecordComponents guessRecord={guessRecord} />
        )}
      </RecordContainer>
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
    </GuessingNumberContainer>
  );
};

export default GuessingNumber;
