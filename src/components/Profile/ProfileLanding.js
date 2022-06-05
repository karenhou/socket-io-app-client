import React, { useContext } from "react";
import styled from "styled-components";
import BannerImg from "../../assets/images/denis-degioanni-9wH624ALFQA-unsplash.jpeg";
import CircleImg from "../../assets/images/hello-i-m-nik-Oklzj82ffsQ-unsplash.jpeg";
import { AuthContext } from "../../context/AuthContext";
import VentHistoryList from "./VentHistoryList";
import VentInput from "./VentInput";

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
  left: 8rem;
  top: 7.5rem;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-image: url(${CircleImg});
  background-position: center center;
  background-size: cover;
`;

const ProfileBodyContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 9fr;
`;

const ProfileLeftContainer = styled.div`
  margin-top: 140px;
`;

const ProfileWidthDiv = styled.div`
  width: 60%;
  margin: auto;

  div {
    font-size: 1.5rem;
    color: gray;
  }
`;

const ProfileRightContainer = styled.div`
  padding: 0 64px;
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
        <ProfileLeftContainer>
          <ProfileWidthDiv>
            <div>Name: {user.username}</div>
            <div>Job</div>
            <div>Hobby</div>
          </ProfileWidthDiv>
        </ProfileLeftContainer>

        <ProfileRightContainer>
          <VentInput />
          <VentHistoryList />
        </ProfileRightContainer>
      </ProfileBodyContainer>
    </HomeContainer>
  );
};

export default ProfileLanding;
