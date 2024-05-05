import React from "react";
import Card from "../../UIElements/Card/Card";

import "./QuestionsList";

const QuestionsList = ({ data }) => {
  return (
    <div className="questionsList">
      {data == null || data.length == 0 ? (
        <h2>Nothing found!</h2>
      ) : (
        data.map((d) => {
          return <Card data={d} />;
        })
      )}
    </div>
  );
};

export default QuestionsList;
