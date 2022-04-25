import React, { useState, useEffect } from "react";
import GuessingGame from "./GuessingGame";
import Title from "../Title";

const Games = ({ socket, roomId }) => {
  const [guessNum, setGuessNum] = useState("");
  const [chartInfo, setChartInfo] = useState("");

  const handleStartGame = () => {
    socket.emit("start_game", { roomId });
  };

  useEffect(() => {
    socket.on("guessingNum", (data) => {
      console.log("guessingNum", data);
      setGuessNum(data.guessNum);
    });

    socket.on("game_result", (data) => {
      console.log("game_result", data, new Date().getTime());

      setChartInfo((old) => {
        let mySet = new Set([...old, data]);
        return [...mySet];
      });
    });
  }, [socket]);

  return (
    <div>
      <Title title="Game" />
      <button onClick={() => handleStartGame()}>Start</button>

      {chartInfo &&
        chartInfo.map((item) => (
          <div
            key={
              item.sockeId
            }>{`socketId: ${item.socketId}, used: ${item.guessCount} time to guess`}</div>
        ))}

      {guessNum && (
        <GuessingGame resultNum={guessNum} socket={socket} roomId={roomId} />
      )}
    </div>
  );
};

export default Games;
