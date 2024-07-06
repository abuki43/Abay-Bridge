import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import BackDrop from "../../UIElements/BackDrop/BackDrop";
import AnswerCard from "../../UIElements/AnswerCard/AnswerCard";
import ClipLoader from "react-spinners/ClipLoader";
import "./answerList.css";

const AnswersList = ({ answers, onClose, submitAnswer, isLoading }) => {
  const [answerInput, setAnswerInput] = useState("");

  const onSubmit = () => {
    submitAnswer(answerInput);
    setAnswerInput("");
    onClose();
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  console.log(isLoading);
  return (
    <>
      <BackDrop className="answers-backdrop" onClick={handleClose}></BackDrop>
      <div className="answers-container">
        <button className="answers-close-btn" onClick={handleClose}>
          <IoMdCloseCircleOutline className="answers-close-icon" />
        </button>
        <div className="answers-header">
          <h2 className="answers-title">Answers</h2>
        </div>
        {isLoading ? (
          <SimpleLoader />
        ) : (
          <div className="answers-list">
            {!answers || answers.answers.length === 0 ? (
              <p className="no-answer">
                No answers. Be the first to answer this question.
              </p>
            ) : (
              answers.answers.map((answer) => (
                <AnswerCard key={answer._id} answerData={answer} />
              ))
            )}
          </div>
        )}
        <div className="comment-section">
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment"
            value={answerInput}
            onChange={(e) => {
              setAnswerInput(e.target.value);
            }}
          />
          <button
            className="send-btn"
            disabled={!answerInput}
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

const SimpleLoader = () => {
  return (
    <div style={{ alignSelf: "center" }}>
      <ClipLoader
        color="blue"
        loading={true}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default AnswersList;
