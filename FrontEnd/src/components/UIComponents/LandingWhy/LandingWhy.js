import React from "react";

import whyImage from "../../../assets/OBJECTS.svg";
import "./landingWhy.css";

const LandingWhy = () => {
  return (
    <div className="landing-why">
      <h2>
        Why should you <span>Join us?</span>
      </h2>
      <div className="why-container">
        <div className="img-container">
          <img src={whyImage} alt="why" />
        </div>

        <div className="why-lists">
          <div className="why-list">
            <h3>Knowledge Sharing</h3>
            <p>
              Empower yourself with the ability to ask and answer questions on
              diverse educational topics.
            </p>
          </div>
          <div className="why-list">
            <h3>Community Engagement</h3>
            <p>
              Join a vibrant community passionate about learning and sharing
              knowledge.
            </p>
          </div>
          <div className="why-list">
            <h3>Accessible Learning</h3>
            <p>
              Enjoy a user-friendly web platform accessible to anyone with an
              internet connection.
            </p>
          </div>
          <div className="why-list">
            <h3>Enhanced Understanding</h3>
            <p>
              Gain deeper insights through interactive Q&A sessions with fellow
              learners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingWhy;
