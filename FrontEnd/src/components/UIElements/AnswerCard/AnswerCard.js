import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify-modernize";
import { MdOutlineThumbsUpDown, MdOutlineReply } from "react-icons/md";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { AuthContext } from "../../../utils/context-API";
import useHttp from "../../../utils/hooks/http-hook";
import avatar from "../../../assets/avatar.webp";
import "./AnswerCard.css";

const AnswerCard = ({ answerData, questionStateHandler }) => {
  const { sendRequest, error, clearError } = useHttp();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const {
    _id: answerId,
    content,
    date_posted,
    author,
    upVote,
    downVote,
    question,
    parentAnswer,
  } = answerData;
  const [isUpvoted, setUpvoted] = useState(upVote.includes(userId));
  const [isDownvoted, setDownvoted] = useState(downVote.includes(userId));

  useEffect(() => {
    setUpvoted(upVote.includes(userId));
    setDownvoted(downVote.includes(userId));
  }, [upVote, downVote]);
  const handleUpvote = async () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    try {
      let response;

      response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/answer/upvote/${answerId}/${userId}`,
        "POST"
      );
      toast.success(response.message);
      questionStateHandler("upvote", question, { answerId: answerId });
    } catch (error) {
      toast.error("Failed to upvote. Please try again.");
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    try {
      let response;

      response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/answer/downvote/${answerId}/${userId}`,
        "POST"
      );
      console.log(response);
      setDownvoted(false);

      toast.success(response.message);
      questionStateHandler("downvote", question, { answerId: answerId });
    } catch (error) {
      toast.error("Failed to downvote. Please try again.");
      console.log(error);
    }
  };

  const date = new Date(date_posted).toLocaleString();

  return (
    <div className="answer-container">
      <div className="answer-header">
        <div className="answer-author">
          <img
            src={author.profile_image || avatar}
            alt="user"
            className="answer-avatar"
          />
          <p className="answer-username">{author.firstName}</p>
        </div>
        <p className="answer-timestamp">{date}</p>
      </div>
      <div className="answer-content">
        <p>{content}</p>
      </div>
      <div className="answer-footer">
        <div className="answer-actions">
          <div className="answer-action" onClick={handleUpvote}>
            <BiUpvote className={`answer-icon ${isUpvoted ? "upvoted" : ""}`} />
            <span>{upVote.length}</span>
          </div>
          <div className="answer-action" onClick={handleDownvote}>
            <BiDownvote
              className={`answer-icon ${isDownvoted ? "downvoted" : ""}`}
            />
            <span>{downVote.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
