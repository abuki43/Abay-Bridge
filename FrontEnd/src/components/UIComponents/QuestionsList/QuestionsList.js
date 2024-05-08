import React, { useState, useEffect, useContext } from "react";
import Card from "../../UIElements/Card/Card";

import "./QuestionsList";
import { AuthContext } from "../../../utils/context-API";

const QuestionsList = ({ data }) => {
  const { userId } = useContext(AuthContext);

  const [filteredData, setFilteredData] = useState([]); // this contains all questions with their answers and other info

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  function updateQuestionState(type, QID, data) {
    // This function is used to update the question list based on some actions (delete, newanswer, up/downvote)

    const questionIndex = filteredData.findIndex(
      (question) => question._id === QID
    );

    if (questionIndex === -1) {
      console.error("Question not found");
      return;
    }

    const updatedQuestions = [...filteredData];

    // Perform actions based on the given type
    switch (type) {
      case "delete":
        updatedQuestions.splice(questionIndex, 1);
        break;

      case "upvote":
        const answer1 = updatedQuestions[questionIndex].answers.find(
          (answer) => answer._id === data.answerId
        );

        if (answer1.upVote.includes(userId)) {
          answer1.upVote = answer1.upVote.filter((id) => id !== userId);
        } else {
          answer1.upVote.push(userId);
          answer1.downVote = answer1.downVote.filter((id) => id !== userId);
        }
        break;

      case "downvote":
        const answer2 = updatedQuestions[questionIndex].answers.find(
          (answer) => answer._id === data.answerId
        );

        if (answer2.downVote.includes(userId)) {
          answer2.downVote = answer2.downVote.filter((id) => id !== userId);
        } else {
          answer2.downVote.push(userId);
          answer2.upVote = answer2.upVote.filter((id) => id !== userId);
        }
        break;

      case "addanswer":
        updatedQuestions[questionIndex].answers.push(data);
        break;

      default:
        console.error("Invalid type");
        return;
    }

    setFilteredData(updatedQuestions);
  }

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
              // onDeleteQuestion={handleQuestionDelete}
              questionStateHandler={updateQuestionState}
            />
          );
        })
      )}
    </div>
  );
};

export default QuestionsList;
