import React from "react";
import { Link } from "react-router-dom";

import Button from "../../UIElements/Button/Button";
import "./landingHero.css";

const LandingHero = () => {
  return (
    <div className="landingHero">
      <h1>
        Cross the Bridge to Educational <br />
        Enlightenment
      </h1>
      <h4>Building Connections, Bridging Knowledge Gaps</h4>
      <div className="buttons">
        <Button color="black" padI="4.4">
          <Link to="/Signup">Get started</Link>
        </Button>
        <Button color="transparent" padI="4.4" padB="0.54">
          Guest mode
        </Button>
      </div>
    </div>
  );
};

export default LandingHero;
