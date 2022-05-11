import React from "react";
import styled from "styled-components";

const GameRoomStatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "header header"
    "actionRow actionRow"
    "userInfo userInfo";
  background-color: hsl(40, 100%, 50%);
  border-radius: 12px;
  padding: 0.75rem;
  margin-top: 1rem;
  color: hsl(0, 100%, 12.94%);
`;

const GameRoomStatHeader = styled.h3`
  grid-area: header;
  color: hsl(21.29, 100%, 18.24%);
`;

const RoomUserInfoDiv = styled.div`
  grid-area: userInfo;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  opacity: 0.7;
  border-radius: 8px;
  border: solid 3px hsl(36, 100%, 88.24%);
  margin-top: 0.5rem;
  padding: 4px 8px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ActionRow = styled.div`
  grid-area: actionRow;
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  div {
    :first-child {
      display: flex;
      justify-content: space-between;
    }

    :nth-child(2) {
      display: flex;
      justify-content: flex-end;
    }
  }
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
  background-color: hsl(36, 100%, 88.24%);
  color: #333;
  width: 100%;
`;

const StartBtn = styled(Btn)`
  background-color: hsl(21.29, 100%, 18.24%);
  margin-right: 0.5rem;
  width: 100%;
`;

const KickBtn = styled(Btn)`
  background-color: hsl(32.46, 25.74%, 53.53%);
  margin-left: 0.5rem;
  padding: 4px;
  color: #fff;
`;

const HostLabel = styled.div`
  padding: 4px;
  border-radius: 5px;
  color: black;
  background-color: white;
  font-size: 12px;
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
      <ActionRow>
        <div>
          <div>Room Number: {roomInfo.roomNum}</div>
          <div>Max Player: {roomInfo.maxPlayerCount}</div>
        </div>

        <div>
          {startBtnOn && (
            <StartBtn type="button" onClick={startGameFn}>
              Start
            </StartBtn>
          )}
          <QuitBtn type="button" onClick={quitGameFn}>
            Quit
          </QuitBtn>
        </div>
      </ActionRow>

      <RoomUserInfoDiv>
        {roomInfo.currentUser?.map((user) => {
          return (
            <div key={user.userSocket}>
              {user.name}
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
              {user.userSocket === userSocketId ? (
                <HostLabel>Host</HostLabel>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </RoomUserInfoDiv>
    </GameRoomStatGrid>
  );
};

export default GameRoomStats;
