import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import BannerImg from "../../assets/images/denis-degioanni-9wH624ALFQA-unsplash.jpeg";
import CircleImg from "../../assets/images/hello-i-m-nik-Oklzj82ffsQ-unsplash.jpeg";
import { AuthContext } from "../../context/AuthContext";
import VentHistoryList from "./VentHistoryList";
import VentInput from "./VentInput";
import axios from "axios";
import moment from "moment";

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

  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const fetchUserInfo = async () => {
      console.log("first", userData);

      try {
        const res = await axios.get(
          "http://localhost:8900/api/auth/get-profile",
          {
            headers: {
              authorization: `Bearer ${userData.id_token}`,
            },
          }
        );

        console.log("RES ", res);
      } catch (error) {
        console.log("Opps ", error);
      }
    };

    const fetchThoughts = async () => {
      const configs = {
        method: "get",
        url: "http://localhost:8900/api/user/get-thoughts",
        headers: {
          authorization: `Bearer ${userData.id_token}`,
        },
        params: {
          email: userData.user.email,
        },
      };

      try {
        const res = await axios(configs);

        console.log("fetchThoughts RES ", res);

        if (res.status === 200) {
          setThoughts([...res.data.thoughts]);
        }
      } catch (error) {
        console.log("Opps ", error);
      }
    };

    if (userData && userData.id_token) {
      // fetchUserInfo();
      fetchThoughts();
    } else {
      console.log("NO TOKEN");
      // TODO need to handle
    }
  }, [user]);

  return (
    <HomeContainer>
      <ProfileImgContainer>
        <ProfileCircleContainer />
      </ProfileImgContainer>

      <ProfileBodyContainer>
        <ProfileLeftContainer>
          <ProfileWidthDiv>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{moment(user.lastLoginAt).format("L")}</div>
          </ProfileWidthDiv>
        </ProfileLeftContainer>

        <ProfileRightContainer>
          <VentInput setThoughts={setThoughts} />
          <VentHistoryList thoughts={thoughts} />
        </ProfileRightContainer>
      </ProfileBodyContainer>
    </HomeContainer>
  );
};

export default ProfileLanding;
