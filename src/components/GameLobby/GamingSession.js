import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import GuessingNumber from "./GuessingNumber";

const NotificationAnimation = keyframes`
  0%   {
    bottom: -80px;
  }
  50%  {
    bottom: 0;
  }
  75%  {
    bottom: 0.4rem;
  }
  100% {
    bottom: 0.5rem;
  }
`;

const NotificationBox = styled.div`
  width: 300px;
  border-radius: 12px;
  background-color: #fff;
  position: fixed;
  padding: 1rem;
  right: 0.5rem;
  opacity: 0.7;
  border: 1px gray solid;
  animation: ${NotificationAnimation} 2.5s ease-in-out infinite;
`;
const GameSessionContainer = styled.div`
  width: 80%;
  margin: 0 5rem;
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 0.8rem;
`;

const Btn = styled.button`
  padding: 8px;
  border-radius: 5px;
  color: #fff;

  :hover {
    cursor: pointer;
  }
`;

const QuitBtn = styled(Btn)`
  background-color: hsl(40, 100%, 80%);
  color: #333;
`;

const StartBtn = styled(Btn)`
  background-color: hsl(130, 67%, 40%);
  margin-right: 0.5rem;
`;

const GameRoomInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "header header"
    "subtitle subtitle"
    "userInfo userInfo"
    "actionRow actionRow";
  background-color: hsl(40, 100%, 50%);
  border-radius: 12px;
  padding: 0.75rem;
  margin-top: 1rem;
`;

const GameRoomInfoHeader = styled.h3`
  grid-area: header;
`;

const RoomUserInfoDiv = styled.div`
  grid-area: userInfo;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.2rem;

  div {
    display: flex;
  }
`;

const DotDiv = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  column-gap: 8px;
  align-self: center;
  margin-right: 0.5rem;
`;

const ActionRow = styled.div`
  grid-area: actionRow;
  text-align: end;
  margin-top: 0.5rem;
`;

const GamingSession = ({
  gameSocket,
  setConfigState,
  roomInfo,
  setRoomInfo,
}) => {
  const [targetNumber, setTargetNumber] = useState("");
  const [systemMsg, setSystemMsg] = useState("");

  const handleQuitGameClicked = () => {
    console.log("quit game clicked", roomInfo);
    gameSocket.emit("quit_game", {
      roomNum: roomInfo.roomNum,
    });
  };

  const handleStartGameClicked = () => {
    console.log("handleStartGameClicked", roomInfo);
    gameSocket.emit("start_game", {
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
      setSystemMsg(data.msg);
    });

    gameSocket.on("targeted_number", (data) => {
      console.log("targeted_number received", data);
      setTargetNumber(data.targetNumber);
    });

    return () => {
      gameSocket.off("quit_game_result");
      gameSocket.off("gameroom_closed");
      gameSocket.off("roomInfoUpdate");
      gameSocket.off("targeted_number");
    };
  }, [gameSocket]);

  useEffect(() => {
    setTimeout(() => {
      setSystemMsg("");
    }, 2500);
  }, [systemMsg]);

  return (
    <>
      {systemMsg && <NotificationBox>{systemMsg}</NotificationBox>}
      <GameSessionContainer>
        <GameRoomInfoGrid>
          <GameRoomInfoHeader>Room States</GameRoomInfoHeader>
          <div>Room Number: {roomInfo.roomNum}</div>
          <div>Host: {roomInfo.host}</div>

          <RoomUserInfoDiv>
            {roomInfo.currentUser?.map((user) => {
              return (
                <div key={user.userSocket}>
                  <DotDiv />
                  {user.name} ({user.userSocket})
                </div>
              );
            })}
          </RoomUserInfoDiv>
          <ActionRow>
            {!targetNumber && roomInfo.host === gameSocket.id && (
              <StartBtn type="button" onClick={handleStartGameClicked}>
                Start
              </StartBtn>
            )}
            <QuitBtn onClick={handleQuitGameClicked}>Quit</QuitBtn>
          </ActionRow>
        </GameRoomInfoGrid>

        {targetNumber && (
          <GuessingNumber
            gameSocket={gameSocket}
            roomInfo={roomInfo}
            targetNumber={targetNumber}
          />
        )}
      </GameSessionContainer>
    </>
  );
};

export default GamingSession;
