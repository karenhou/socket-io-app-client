import React, { useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../context/AuthContext";

const GameRoomStatGrid = styled.div`
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

const GameRoomStatHeader = styled.h3`
  grid-area: header;
`;

const RoomUserInfoDiv = styled.div`
  grid-area: userInfo;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.2rem;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
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

export const Btn = styled.button`
  padding: 8px;
  border-radius: 5px;
  color: #fff;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
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

const KickBtn = styled(Btn)`
  background-color: hsl(36, 100%, 84.31%);
  margin-left: 0.5rem;
  padding: 4px;
  color: #333;
`;

const GameRoomStats = ({
  roomInfo,
  quitGameFn,
  startGameFn,
  startBtnOn,
  kickPlayerFn,
  userSocketId,
}) => {
  return (
    <GameRoomStatGrid>
      <GameRoomStatHeader>Room States</GameRoomStatHeader>
      <div>Room Number: {roomInfo.roomNum}</div>
      <div>Host: {roomInfo.host}</div>

      <RoomUserInfoDiv>
        {roomInfo.currentUser?.map((user) => {
          return (
            <div key={user.userSocket}>
              <DotDiv />
              {user.name} ({user.userSocket})
              {userSocketId === roomInfo.host &&
              userSocketId !== user.userSocket ? (
                <KickBtn
                  type="button"
                  onClick={() => kickPlayerFn(user.userSocket)}>
                  Kick
                </KickBtn>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </RoomUserInfoDiv>
      <ActionRow>
        {startBtnOn && (
          <StartBtn type="button" onClick={startGameFn}>
            Start
          </StartBtn>
        )}
        <QuitBtn type="button" onClick={quitGameFn}>
          Quit
        </QuitBtn>
      </ActionRow>
    </GameRoomStatGrid>
  );
};

export default GameRoomStats;
