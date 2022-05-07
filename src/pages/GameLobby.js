import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import ConfigGame from "../components/GameLobby/ConfigGame";
import GamingSession from "../components/GameLobby/GamingSession";
import Sidebar from "../components/Sidebar/Sidebar";

const gameSocket = io("http://localhost:3001/game");

const GameLobbyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 11fr;
`;

const GameContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const GameLobby = () => {
  // 0 = config, 1 = created game, 2 = joined game
  const [configState, setConfigState] = useState(0);
  const [roomInfo, setRoomInfo] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    console.log("gameSocket ", gameSocket.id);
    gameSocket.on("game_connected", (data) => {
      console.log("game_connected", data);
    });

    gameSocket.on("create_game_result", (data) => {
      console.log("create_game_result", data);
      if (data.msg === "success") {
        setRoomInfo({
          roomNum: data.roomNum,
          host: data.host,
          password: data.password,
        });
        setConfigState(1);
      } else {
        console.log("room number exist failed");
        setErrMsg("Room number exist");
      }
    });

    gameSocket.on("join_game_result", (data) => {
      console.log("join_game_result", data);
      if (data.msg === "success") {
        setRoomInfo({
          roomNum: data.roomNum,
          host: data.host,
          password: data.password,
        });
        setConfigState(1);
      } else {
        console.log("room number doesn't exist");
        setErrMsg("Room number doesn't exist");
      }
    });

    return () => {
      gameSocket.off("game_connected");
      gameSocket.off("create_game_result");
      gameSocket.off("join_game_result");
    };
  }, [gameSocket]);

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 1500);
  }, [errMsg]);

  return (
    <GameLobbyContainer>
      <Sidebar gameSocket={gameSocket} roomInfo={roomInfo} />
      <GameContainer>
        {configState === 0 && (
          <ConfigGame gameSocket={gameSocket} errMsg={errMsg} />
        )}
        {configState === 1 && (
          <GamingSession
            gameSocket={gameSocket}
            roomInfo={roomInfo}
            setRoomInfo={setRoomInfo}
            setConfigState={setConfigState}
          />
        )}
      </GameContainer>
    </GameLobbyContainer>
  );
};

export default GameLobby;
