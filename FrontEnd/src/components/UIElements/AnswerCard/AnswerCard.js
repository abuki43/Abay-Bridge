import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify-modernize";
import { MdOutlineThumbsUpDown, MdOutlineReply } from "react-icons/md";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { AuthContext } from "../../../utils/context-API";
import useHttp from "../../../utils/hooks/http-hook";
import avatar from "../../../assets/avatar.webp";
import "./AnswerCard.css";

const AnswerCard = ({ answerData }) => {
  const { sendRequest, error, clearError } = useHttp();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const {
    _id: answerId,
    content,
    date_posted,
    author,
    upVote,
    downVote,
    parentAnswer,
  } = answerData;
  const [isUpvoted, setUpvoted] = useState(upVote.includes(userId));
  const [isDownvoted, setDownvoted] = useState(downVote.includes(userId));

  const [data, setData] = useState({});

  useEffect(() => {
    setData(answerData);
  }, []);

  const handleUpvote = async () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    try {
      let response;
      if (isUpvoted) {
        response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/answer/upvote/${answerId}/${userId}`,
          "POST"
        );
        setUpvoted(false);
        setData((prev) => ({
          ...prev,
          upVote: [...prev.upVote, userId],
        }));
      } else {
        response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/answer/upvote/${answerId}/${userId}`,
          "POST"
        );
        setUpvoted(true);
        setData((prev) => ({
          ...prev,
          upVote: prev.upVote.filter((id) => id != userId),
        }));
        if (isDownvoted) {
          setDownvoted(false);
        }
      }

      toast.success(response.message);
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
      if (isDownvoted) {
        response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/answer/downvote/${answerId}/${userId}`,
          "POST"
        );
        setDownvoted(false);
        setData((prev) => ({
          ...prev,
          downVote: [...prev.downVote, userId],
        }));
      } else {
        response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/answer/downvote/${answerId}/${userId}`,
          "POST"
        );
        setDownvoted(true);
        if (isUpvoted) {
          setUpvoted(false);
        }
        setData((prev) => ({
          ...prev,
          downVote: prev.downVote.filter((id) => id != userId),
        }));
      }

      toast.success(response.message);
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
