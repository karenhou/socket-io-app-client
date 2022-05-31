import React from "react";
import styled from "styled-components";
import GuessScores from "./GuessScores";
import playIcon from "../../../assets/icons/play.png";
import quitIcon from "../../../assets/icons/quit.png";
import resetIcon from "../../../assets/icons/replay.png";
import adminIcon from "../../../assets/icons/admin.png";
import userIcon from "../../../assets/icons/user.png";

const GameRoomStatGrid = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "infoCard scoresCard usersCard";
  background: #1e590c;
  color: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  gap: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const GameRoomStatHeader = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`;

const IconActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const BtnCircle = styled.button`
  width: 32px;
  height: 32px;
  padding: 6px;
  border-radius: 50%;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const CardDiv = styled.div`
  background-color: #fff;
  border-radius: 8px;
  color: #333;
  padding: 12px 1rem;
`;

const InfoCardDiv = styled(CardDiv)`
  grid-area: infoCard;
`;

const InfoItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const ScoresCardDiv = styled(CardDiv)`
  grid-area: scoresCard;
  /* min-height: 70px; */
`;

const TitleUnderlineDiv = styled.div`
  font-size: 1.2rem;
  text-decoration: underline;
  margin-bottom: 8px;
`;

const RoomUserInfoDiv = styled(CardDiv)`
  grid-area: usersCard;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const HostInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    width: 16px;
    height: 16px;
  }
`;

const UserInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  img {
    width: 16px;
    height: 16px;
  }
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
      <GameRoomStatHeader>
        <h3>Room States</h3>
        <IconActionContainer>
          <BtnCircle type="button" onClick={quitGameFn}>
            <img src={quitIcon} alt="quitIcon" />
          </BtnCircle>

          {startBtnOn && (
            <BtnCircle type="button" onClick={startGameFn}>
              <img src={playIcon} alt="playIcon" />
            </BtnCircle>
          )}

          {isHost && (
            <BtnCircle type="button" onClick={resetGameFn}>
              <img src={resetIcon} alt="resetIcon" />
            </BtnCircle>
          )}
        </IconActionContainer>
      </GameRoomStatHeader>

      <InfoCardDiv>
        <TitleUnderlineDiv>Info</TitleUnderlineDiv>
        <InfoItemRow>
          <div>Room#</div>
          <div>{roomInfo.roomNum}</div>
        </InfoItemRow>

        <InfoItemRow>
          <div>Max Player</div>
          <div>{roomInfo.maxPlayerCount}</div>
        </InfoItemRow>
      </InfoCardDiv>

      <ScoresCardDiv>
        <TitleUnderlineDiv>Scores</TitleUnderlineDiv>
        <GuessScores />
      </ScoresCardDiv>

      <RoomUserInfoDiv>
        <TitleUnderlineDiv>Players</TitleUnderlineDiv>
        {roomInfo.currentUser?.map((user) => {
          if (user.userSocket === roomInfo.host) {
            return (
              <HostInfoDiv key={user.userSocket}>
                <img src={adminIcon} alt="adminIcon" />
                <div>{user.name}</div>
              </HostInfoDiv>
            );
          } else
            return (
              <UserInfoDiv key={user.userSocket}>
                <img src={userIcon} alt="userIcon" />
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
