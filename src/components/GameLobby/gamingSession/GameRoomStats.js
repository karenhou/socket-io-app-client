import React from "react";
import styled from "styled-components";
import GuessScores from "./GuessScores";

const GameRoomStatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "header header"
    "actionRow actionRow"
    "scores userInfo";
  background: hsl(105, 55%, 27%);
  color: #fff;
  border-radius: 8px;
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
  border-radius: 8px;
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
  border-radius: 8px;
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
  border-radius: 8px;
  padding: 1rem;
  min-height: 70px;
`;

const ScoreTitle = styled.div`
  padding-bottom: 0.5rem;
  border-bottom: solid 1px gray;
`;

const RoomUserInfoDiv = styled.div`
  grid-area: userInfo;
  border-radius: 8px;
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
  border-radius: 8px;
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
        <ScoreTitle>Scores</ScoreTitle>
        <GuessScores />
      </ScoresBox>

      <RoomUserInfoDiv>
        {roomInfo.currentUser?.map((user) => {
          if (user.userSocket === roomInfo.host) {
            return (
              <HostInfoDiv key={user.userSocket}>
                <div>{user.name}</div>
                <HostLabel>Host</HostLabel>
              </HostInfoDiv>
            );
          } else
            return (
              <UserInfoDiv key={user.userSocket}>
                <div>{user.name}</div>
                {userSocketId === roomInfo.host && (
                  <KickBtn
                    type="button"
                    onClick={() => kickPlayerFn(user.userSocket)}>
                    Kick
                  </KickBtn>
                )}
              </UserInfoDiv>
            );
        })}
      </RoomUserInfoDiv>
    </GameRoomStatGrid>
  );
};

export default GameRoomStats;
