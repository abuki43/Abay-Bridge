import React from "react";
import { Link } from "react-router-dom";

import Button from "../../UIElements/Button/Button";
import "./landingHero.css";

const LandingHero = () => {
  return (
    <div className="landingHero">
      <h1>Cross the Bridge to Educational Enlightenment</h1>
      <h4>Building Connections, Bridging Knowledge Gaps</h4>
      <div className="buttons">
        <Button color="black" padI="3.5">
          <Link to="/login">Get started</Link>
        </Button>
        <Button color="transparent" padI="3.5" padB="0.54">
          <Link to="/questions">Guest mode</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingHero;
