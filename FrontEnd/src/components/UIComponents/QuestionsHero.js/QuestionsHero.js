import React from "react";
import { RiSearchLine } from "react-icons/ri";

import "./questionsHero.css";

const QuestionsHero = () => {
  return (
    <div className="questionHero">
      <h1>
        Cross the Bridge to Educational <br />
        Enlightenment
      </h1>
      <h4>Building Connections, Bridging Knowledge Gaps</h4>
      <div className="searchBarContainer">
        <input type="text" placeholder="Search for questions..." />
        <RiSearchLine />
      </div>
    </div>
  );
};

export default QuestionsHero;
