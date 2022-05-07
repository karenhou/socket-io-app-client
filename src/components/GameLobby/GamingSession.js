import React, { useEffect, useState } from "react";
import styled from "styled-components";

const QuitBtn = styled.button`
  padding: 8px;
  border-radius: 5px;
  background-color: orange;
  color: white;
`;

const GamingSession = ({
  gameSocket,
  setConfigState,
  roomInfo,
  setRoomInfo,
}) => {
  const handleQuitGameClicked = () => {
    console.log("quit game clicked");
    //emit quit game
    gameSocket.emit("quit_game", {
      roomNum: roomInfo.roomNum,
    });
  };

  useEffect(() => {
    gameSocket.on("quit_game_result", (data) => {
      console.log("quit_game_result", data);
      if (data.msg === "success") {
        setConfigState(0);
      }
    });

    gameSocket.on("gameroom_closed", (data) => {
      console.log("gameroom_closed received", data);
      setRoomInfo(null);
      setConfigState(0);
    });

    gameSocket.on("roomInfoUpdate", (data) => {
      console.log("roomInfoUpdate received", data);
    });

    return () => {
      gameSocket.off("quit_game_result");
      gameSocket.off("gameroom_closed");
      gameSocket.off("roomInfoUpdate");
    };
  }, [gameSocket]);

  return (
    <div>
      <div>GamingSession</div>
      <div>start game</div>
      <QuitBtn onClick={handleQuitGameClicked}>Quit</QuitBtn>
    </div>
  );
};

export default GamingSession;
