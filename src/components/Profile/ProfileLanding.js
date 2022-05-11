import React, { useContext } from "react";
import styled from "styled-components";
import BannerImg from "../../assets/images/denis-degioanni-9wH624ALFQA-unsplash.jpeg";
import CircleImg from "../../assets/images/hello-i-m-nik-Oklzj82ffsQ-unsplash.jpeg";
import { AuthContext } from "../../context/AuthContext";

const HomeContainer = styled.div`
  background-color: #fff;
  justify-content: center;
  min-height: 150vh;
  display: grid;
  grid-template-rows: 3fr 10fr;
  grid-auto-columns: 1fr;
  width: 100%;
`;

const ProfileImgContainer = styled.div`
  background-image: url(${BannerImg});
  background-size: cover;
`;

const ProfileCircleContainer = styled.div`
  position: absolute;
  right: 3rem;
  top: 4rem;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(${CircleImg});
  background-position: center center;
  background-size: cover;
`;

const ProfileBodyContainer = styled.div`
  padding: 48px 240px;
`;

const TextAreaContainer = styled.div`
  padding: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 12px;
  margin-top: 24px;
`;

const WordOfTheDay = styled.textarea`
  padding: 8px;
  resize: none;
  width: inherit;
  display: block;
  box-sizing: border-box;
  border: none;
  color: #124b00;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.button`
  padding: 8px;
  background-color: #59bf39;
  border: none;
  border-radius: 8px;
  color: #fff;
  width: 100px;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

const VentHistoryContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

const ProfileLanding = () => {
  const {
    user: { user },
  } = useContext(AuthContext);
  return (
    <HomeContainer>
      <ProfileImgContainer>
        <ProfileCircleContainer />
      </ProfileImgContainer>
      <ProfileBodyContainer>
        <h2>Hello, {user.username}</h2>
        <TextAreaContainer>
          <WordOfTheDay defaultValue="What's on your mind?"></WordOfTheDay>

          <BtnRow>
            <Btn>Vent</Btn>
          </BtnRow>
        </TextAreaContainer>

        <VentHistoryContainer>
          <h3>Vent History</h3>
        </VentHistoryContainer>
      </ProfileBodyContainer>
    </HomeContainer>
  );
};

export default ProfileLanding;
