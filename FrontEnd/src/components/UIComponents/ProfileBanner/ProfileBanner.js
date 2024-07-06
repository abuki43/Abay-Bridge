import React, { useContext } from "react";
import { IoIosStar } from "react-icons/io";
import avatar from "../../../assets/avatar.webp";
import { AuthContext } from "../../../utils/context-API";

import "./ProfileBanner.css";

function ProfileBanner({ username, questionsAsked, score, profilePic }) {
  const { logout } = useContext(AuthContext);
  const imageURL = `${process.env.REACT_APP_ASSETS_URL}${profilePic}`;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-banner">
      <div className="profile-info">
        <img
          src={profilePic ? imageURL : avatar}
          alt="Profile"
          className="profile-image"
        />
        <div className="user-details">
          <h2>{username}</h2>
          <div className="stats-box">
            <p>{questionsAsked} Questions asked</p>
            <p>
              {score} <IoIosStar />
            </p>
          </div>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default ProfileBanner;
