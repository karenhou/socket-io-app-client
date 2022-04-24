import React, { useState, useEffect } from "react";

const generateRandomNum = () => {
  let arr = new Set();
  while (arr.size !== 4) {
    let ranNum = Math.floor(Math.random() * 9);
    arr.add(ranNum);
  }
  return [...arr];
};

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

const GuessingGame = ({ resultNum, socket, roomId }) => {
  const [randomNum, setRandomNum] = useState([]);
  const [guessRecord, setGuessRecord] = useState([]);
  const [inputGuess, setInputGuess] = useState("");
  const [hasWon, setHasWon] = useState(0);

  useEffect(() => {
    setRandomNum(resultNum);
  }, []);

  const handleGuess = (guess) => {
    const userGuess = guess.split("").map((x) => parseInt(x));
    // console.log("useGuess", userGuess);

    let result = compareResult(userGuess, randomNum);

    // console.log("result ", result);

    let hasWon = checkEndGame(result);

    // console.log("result ", hasWon);
    if (!hasWon) {
      setGuessRecord((oldRecord) => {
        if (oldRecord.length === 9) {
          console.log("oldRecord", oldRecord.length);
          setHasWon(2);
          return [];
        } else {
          return [...oldRecord, `${inputGuess} ${result[0]}A ${result[1]}B`];
        }
      });
    } else {
      let resultObj = {
        roomId: roomId,
        guessCount: 1,
        socketId: socket.id,
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

  const handleResetGame = () => {
    setRandomNum(generateRandomNum());
    setInputGuess("");
    setGuessRecord([]);
    setHasWon(0);
  };

  return (
    <div className="text-center">
      <div className="text-center border-2 border-slate-300 w-16 h-8 rounded-md text-white hover:text-red-200 mx-auto">
        {randomNum}
      </div>
      <div>
        <input
          type="text"
          className="border-2 rounded p-2 text-black mt-2"
          value={inputGuess}
          onChange={(e) => setInputGuess(e.target.value)}
        />
        <button
          className="ml-2 rounded bg-green-500 text-white p-2 disabled:hover:cursor-not-allowed"
          disabled={inputGuess.length === 0}
          onClick={() => handleGuess(inputGuess)}>
          Guess
        </button>
        <button
          className="ml-2 rounded bg-orange-500 text-white p-2"
          onClick={() => handleResetGame()}>
          Reset
        </button>
      </div>

      <h4>Guesses Log, Guess Count:{guessRecord.length}</h4>
      <span className="text-gray-400">
        You have up to 10 guess before game over
      </span>

      {hasWon === 2 ? (
        <div>You lose, answer:{randomNum}</div>
      ) : (
        <>
          {hasWon === 1 ? (
            <div>You won</div>
          ) : (
            <ul>
              {guessRecord.map((guess, index) => {
                return <li key={index}>{guess}</li>;
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default GuessingGame;
