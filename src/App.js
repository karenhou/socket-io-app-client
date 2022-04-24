import "./App.css";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import GuessingGame from "./components/GuessingGame";
const socket = io.connect("http://localhost:3001");

const tempObj = {
  guessCount: 1,
  roomId: "111",
  socketId: "EuNtGX8vbkl4l3jFAAAJ",
  timestamp: 1650778057221,
};

function App() {
  const [message, setMessage] = useState("");
  const [msgReceived, setMsgReceived] = useState("");
  const [roomId, setRoomId] = useState("");
  const [guessNum, setGuessNum] = useState("");
  const [chartInfo, setChartInfo] = useState("");

  const sendMessage = () => {
    console.log("messge clicked");
    socket.emit("send_message", { message, roomId });
  };

  const handleJoinRoom = () => {
    socket.emit("join_room", { roomId });
  };
  const handleLeaveRoom = () => {
    socket.emit("leave_room", { roomId });
  };
  const handleStartGame = () => {
    socket.emit("start_game", { roomId });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgReceived(data.message);
    });
    socket.on("guessingNum", (data) => {
      console.log("guessingNum", data);
      setGuessNum(data.guessNum);
    });

    socket.on("game_result", (data) => {
      console.log("game_result", data, new Date().getTime());

      setChartInfo((old) => {
        console.log("old ", old, data);

        let mySet = new Set([...old, data]);

        return [...mySet];
      });
    });
  }, [socket]);

  return (
    <div className="App">
      <div>
        <input
          placeholder="Message..."
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={() => handleJoinRoom()}>Join Room</button>
        <button onClick={() => handleLeaveRoom()}>Leave Room</button>
      </div>

      <div>
        <input
          placeholder="Message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => sendMessage()}>Send msg</button>
      </div>

      <button onClick={() => handleStartGame()}>Start</button>

      <h1>Message:</h1>
      {msgReceived}
      {chartInfo &&
        chartInfo.map((item) => (
          <div
            key={
              item.sockeId
            }>{`socketId: ${item.socketId}, used: ${item.guessCount} time to guess`}</div>
        ))}

      {/* <div>{guessNum}</div> */}
      {guessNum && (
        <GuessingGame resultNum={guessNum} socket={socket} roomId={roomId} />
      )}
    </div>
  );
}

export default App;
