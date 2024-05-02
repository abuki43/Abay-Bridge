import React from "react";
import "./ProfileBanner.css";

function ProfileBanner({ username, followers, following, questionsAsked }) {
  return (
    <div className="profile-banner">
      <div className="profile-info">
        <img
          src="data:image/jpeg;base64,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"
          alt="Profile"
          className="profile-image"
        />
        <div className="user-details">
          <h2>{username}</h2>
          <div className="stats-box">
            <p>
              {followers} Followers · {following} Following · {questionsAsked}{" "}
              Questions asked
            </p>
          </div>
        </div>
      </div>
      {/* <button className="follow-button">Follow</button> */}
    </div>
  );
}

export default ProfileBanner;
