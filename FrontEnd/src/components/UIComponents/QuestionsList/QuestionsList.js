import React from "react";
import Card from "../../UIElements/Card/Card";

import "./QuestionsList";

const QuestionsList = ({ data }) => {
  return (
    <div className="questionsList">
      {data.map((d) => {
        return <Card data={d} />;
      })}
    </div>
  );
};

export default QuestionsList;
