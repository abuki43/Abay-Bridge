import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify-modernize";
import useHttp from "../../utils/hooks/http-hook";
import Card from "../../components/UIElements/Card/Card";
import AnswerCard from "../../components/UIElements/AnswerCard/AnswerCard";
import Loader from "../../components/UIElements/Loader/Loader";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import "./SingleQuestion.css";

const SingleQuestionPage = () => {
  const { questionId } = useParams(); // Get questionId from URL params
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/questions/single/${questionId}`,
          "GET"
        );
        console.log(response);
        setQuestion(response?.question);
        setAnswers(response?.question?.answers);
      } catch (error) {
        toast.error("Failed to fetch question. Please try again.");
        console.error(error);
      }
    };

    fetchQuestion();
  }, [questionId, sendRequest]);

  return (
    <div className="singleQuestionPage">
      {isLoading && <Loader />}
      <NavBar />
      {question ? (
        <div className="question-container">
          <div className="q-card">
            <Card data={question} />
          </div>
          <div className="answersContainer">
            {answers.map((answer) => (
              <AnswerCard key={answer._id} answerData={answer} />
            ))}
          </div>
        </div>
      ) : (
        <p className="no-question">No question found with ID: {questionId}</p>
      )}
    </div>
  );
};

export default SingleQuestionPage;
