import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import BackDrop from "../../UIElements/BackDrop/BackDrop";
import AnswerCard from "../../UIElements/AnswerCard/AnswerCard";
import "./answerList.css";

const AnswersList = ({ answers, onClose, questionStateHandler }) => {
  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };
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
        <div className="answers-list">
          {!answers || answers.length === 0 ? (
            <p className="no-answer">
              No answers. Be the first to answer this question.
            </p>
          ) : (
            answers.map((answer) => (
              <AnswerCard
                key={answer._id}
                answerData={answer}
                questionStateHandler={questionStateHandler}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AnswersList;
