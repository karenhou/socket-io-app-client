import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogoutBtnClicked = (e) => {
    dispatch({ type: "LOGOUT_START" });

    try {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT_SUCCESS" });
      navigate("/", { replace: true });
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error });
    }
  };

  return (
    <>
      <div>Profile - Logged in</div>
      <button onClick={handleLogoutBtnClicked}>Logout</button>
    </>
  );
};

export default Profile;
