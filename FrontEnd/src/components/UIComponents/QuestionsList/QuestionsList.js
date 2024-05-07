import React, { useState, useEffect } from "react";
import Card from "../../UIElements/Card/Card";

import "./QuestionsList";

const QuestionsList = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]); // this contains all questions with their answers and other info

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleQuestionDelete = (deletedQuestionId) => {
    // this function used when question is deleted to update questions list on the frontend
    const updatedData = filteredData.filter(
      (question) => question._id !== deletedQuestionId
    );
    setFilteredData(updatedData);
  };

  return (
    <div className="questionsList">
      {filteredData == null || filteredData.length === 0 ? (
        <h2>Nothing found!</h2>
      ) : (
        filteredData.map((d) => {
          return (
            <Card
              key={d._id}
              data={d}
              onDeleteQuestion={handleQuestionDelete}
            />
          );
        })
      )}
    </div>
  );
};

export default QuestionsList;
