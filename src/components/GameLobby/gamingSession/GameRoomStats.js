import React from "react";
import styled from "styled-components";

const GameRoomStatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "header header"
    "actionRow actionRow"
    "scores userInfo";
  background: hsl(105, 55%, 27%);
  color: #fff;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  gap: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const GameRoomStatHeader = styled.h3`
  grid-area: header;
`;

const GameRoomActionDiv = styled.div`
  grid-area: actionRow;
  background-color: #fff;
  border-radius: 5px;
  color: #333;
  padding: 12px 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ActionRow = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: auto;
`;

export const Btn = styled.button`
  padding: 4px 8px;
  border-radius: 5px;
  color: #fff;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

const StartBtn = styled(Btn)`
  background-color: hsl(105, 43%, 27%);
`;

const ResetBtn = styled(Btn)`
  background-color: hsl(105, 43%, 56%);
`;

const QuitBtn = styled(Btn)`
  background-color: hsl(105, 43%, 58%);
  opacity: 0.5;
`;

const ScoresBox = styled.div`
  grid-area: scores;
  background: #fff;
  color: #333;
  border-radius: 5px;
  padding: 1rem;
  min-height: 70px;

  div {
    padding-bottom: 0.5rem;
    :first-child {
      border-bottom: solid 1px gray;
    }
  }
`;

const RoomUserInfoDiv = styled.div`
  grid-area: userInfo;
  border-radius: 5px;
  background-color: #fff;
  padding: 1rem;
  color: #333;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const HostInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px gray;
  padding-bottom: 0.5rem;
`;

const HostLabel = styled.div`
  padding: 4px 8px;
  border-radius: 5px;
  background-color: hsl(105, 77%, 38%);
  font-size: 12px;
  color: #fff;
`;

const UserInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const KickBtn = styled(Btn)`
  background-color: hsl(105, 43%, 58%);
  opacity: 0.5;
`;

const GameRoomStats = ({
  startBtnOn,
  isHost,
  userSocketId,
  roomInfo,
  startGameFn,
  resetGameFn,
  quitGameFn,
  kickPlayerFn,
}) => {
  return (
    <GameRoomStatGrid>
      <GameRoomStatHeader>Room States</GameRoomStatHeader>

      <GameRoomActionDiv>
        <div>
          <div>Room Number: {roomInfo.roomNum}</div>
          <div>Max Player: {roomInfo.maxPlayerCount}</div>
        </div>

        <ActionRow>
          {startBtnOn && (
            <StartBtn type="button" onClick={startGameFn}>
              Start Game
            </StartBtn>
          )}

          {isHost && (
            <ResetBtn type="button" onClick={resetGameFn}>
              Reset Game
            </ResetBtn>
          )}

          <QuitBtn type="button" onClick={quitGameFn}>
            Quit Game
          </QuitBtn>
        </ActionRow>
        <div></div>
      </GameRoomActionDiv>

      <ScoresBox>
        <div>Scores</div>
      </ScoresBox>

      <RoomUserInfoDiv>
        {roomInfo.currentUser?.map((user) => {
          if (
            user.userSocket === userSocketId &&
            userSocketId === roomInfo.host
          ) {
            return (
              <HostInfoDiv>
                <div>{user.name}</div>
                <HostLabel>Host</HostLabel>
              </HostInfoDiv>
            );
          } else
            return (
              <UserInfoDiv key={user.userSocket}>
                <div>{user.name}</div>
                <KickBtn
                  type="button"
                  onClick={() => kickPlayerFn(user.userSocket)}>
                  Kick
                </KickBtn>
              </UserInfoDiv>
            );
        })}
      </RoomUserInfoDiv>
    </GameRoomStatGrid>
  );
};

export default GameRoomStats;
