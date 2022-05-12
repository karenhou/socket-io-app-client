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
  const [systemMsg, setSystemMsg] = useState("");

  const { gameSocket } = useContext(SocketContext);

  useEffect(() => {
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
      console.log("GameLobby roomInfoUpdate received", data);
      const { roomInfo, msg } = data;
      setRoomInfo(roomInfo);
      setSystemMsg(msg);
    });

    gameSocket.on("you_been_kicked", (data) => {
      console.log("you_been_kicked", data);
      setRoomInfo(null);
      setConfigState(0);
      alert(data.msg);
    });

    gameSocket.on("gameroom_closed", (data) => {
      console.log("gameroom_closed received", data);
      setRoomInfo(null);
      setConfigState(0);
    });

    gameSocket.on("kick_player_result", (data) => {
      console.log("kick_player_result", data);
    });

    gameSocket.on("quit_game_result", (data) => {
      console.log("quit_game_result", data);
      setRoomInfo(null);
      setConfigState(0);
    });

    return () => {
      gameSocket.off("create_game_result");
      gameSocket.off("join_game_result");
      gameSocket.off("quit_game_result");
      gameSocket.off("roomInfoUpdate");
      gameSocket.off("you_been_kicked");
      gameSocket.off("gameroom_closed");
      gameSocket.off("kick_player_result");
    };
  }, [gameSocket]);

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 1500);
  }, [errMsg]);

  useEffect(() => {
    setTimeout(() => {
      setSystemMsg("");
    }, 2500);
  }, [systemMsg]);

  return (
    <GameLobbyContainer>
      <Sidebar roomInfo={roomInfo} />
      <GameContainer>
        {configState === 0 && <ConfigGame errMsg={errMsg} />}
        {configState === 1 && roomInfo && (
          <GamingSession roomInfo={roomInfo} systemMsg={systemMsg} />
        )}
      </GameContainer>
    </GameLobbyContainer>
  );
};

export default GameLobby;
