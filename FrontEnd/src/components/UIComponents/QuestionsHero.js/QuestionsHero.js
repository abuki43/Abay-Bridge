import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

import "./questionsHero.css";

const QuestionsHero = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const onSearchHandler = () => {
    onSearch(query);
    setQuery("");
  };

  return (
    <div className="questionHero">
      <h1>
        Cross the Bridge to Educational <br />
        Enlightenment
      </h1>
      <h4>Building Connections, Bridging Knowledge Gaps</h4>
      <div className="searchBarContainer">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for questions..."
          onKeyPress={(e) => {
            if (e.key === "Enter") onSearchHandler(query);
          }}
        />
        <div onClick={() => onSearchHandler(query)}>
          <RiSearchLine />
        </div>
      </div>
    </div>
  );
};

export default QuestionsHero;
