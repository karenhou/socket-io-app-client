import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ConfigGame from "../components/GameLobby/configGame/ConfigGame";
import GamingSession from "../components/GameLobby/gamingSession/GamingSession";
import Sidebar from "../components/Sidebar/Sidebar";
import { SocketContext } from "../context/AuthContext";

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

  const { gameSocket } = useContext(SocketContext);

  useEffect(() => {
    console.log("gameSocket ", gameSocket.id);

    gameSocket.on("create_game_result", (data) => {
      console.log("create_game_result", data);
      if (data.msg === "success") {
        const { roomInfo } = data;
        setRoomInfo(roomInfo);
        setConfigState(1);
      } else {
        console.log("room number exist failed");
        setErrMsg("Room number exist");
      }
    });

    gameSocket.on("join_game_result", (data) => {
      console.log("join_game_result", data);
      if (data.msg === "success") {
        const { roomInfo } = data;
        setRoomInfo(roomInfo);
        setConfigState(1);
      } else {
        console.log(data.msg);
        setErrMsg(data.msg);
      }
    });

    gameSocket.on("roomInfoUpdate", (data) => {
      console.log("roomInfoUpdate received", data);
      if (data.msg === "success") {
        const { roomInfo } = data;
        setRoomInfo(roomInfo);
      } else {
        console.log(data.msg);
        setErrMsg(data.msg);
      }
    });

    return () => {
      gameSocket.off("create_game_result");
      gameSocket.off("join_game_result");
      gameSocket.off("roomInfoUpdate");
    };
  }, [gameSocket]);

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 1500);
  }, [errMsg]);

  return (
    <GameLobbyContainer>
      <Sidebar roomInfo={roomInfo} />
      <GameContainer>
        {configState === 0 && <ConfigGame errMsg={errMsg} />}
        {configState === 1 && roomInfo && (
          <GamingSession
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
