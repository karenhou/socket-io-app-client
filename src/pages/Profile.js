import React from "react";
import styled from "styled-components";
import ProfileLanding from "../components/Profile/ProfileLanding";
import Sidebar from "../components/Sidebar/Sidebar";

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 16fr;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <Sidebar />
      <ProfileLanding />
    </ProfileContainer>
  );
};

export default Profile;
