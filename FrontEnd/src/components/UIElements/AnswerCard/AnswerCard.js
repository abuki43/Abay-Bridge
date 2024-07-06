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
  const { sendRequest, isLoading } = useHttp();
  const { isLoggedIn, userId } = useContext(AuthContext);
  console.log(answerData);
  const {
    _id: answerId,
    content,
    date_posted,
    author,
    upVote: upvotes,
    downVote: downvotes,
    question,
    parentAnswer,
  } = answerData;

  // State for upvotes
  const [upvoteState, setUpvoteState] = useState({
    isUpvoted: upvotes.includes(userId),
    upvotesLength: upvotes.length,
  });

  // State for downvotes
  const [downvoteState, setDownvoteState] = useState({
    isDownvoted: downvotes.includes(userId),
    downvotesLength: downvotes.length,
  });

  const profileURL = `${process.env.REACT_APP_ASSETS_URL}${author.profile_image}`;

  useEffect(() => {
    setUpvoteState({
      isUpvoted: upvotes.includes(userId),
      upvotesLength: upvotes.length,
    });
    setDownvoteState({
      isDownvoted: downvotes.includes(userId),
      downvotesLength: downvotes.length,
    });
  }, [upvotes, downvotes, userId]);

  const handleUpvote = async () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/answer/upvote/${answerId}/${userId}`,
        "POST"
      );

      setUpvoteState((prevState) => ({
        ...prevState,
        isUpvoted: true,
        upvotesLength: prevState.upvotesLength + 1,
      }));

      // If already downvoted, toggle downvote
      if (downvoteState.isDownvoted) {
        setDownvoteState((prevState) => ({
          ...prevState,
          isDownvoted: false,
          downvotesLength: prevState.downvotesLength - 1,
        }));
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
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/answer/downvote/${answerId}/${userId}`,
        "POST"
      );

      // Update downvote state
      setDownvoteState((prevState) => ({
        ...prevState,
        isDownvoted: true,
        downvotesLength: prevState.downvotesLength + 1,
      }));

      // If already upvoted, toggle upvote
      if (upvoteState.isUpvoted) {
        setUpvoteState((prevState) => ({
          ...prevState,
          isUpvoted: false,
          upvotesLength: prevState.upvotesLength - 1,
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
            src={author.profile_image ? profileURL : avatar}
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
            <BiUpvote
              className={`answer-icon ${
                upvoteState.isUpvoted ? "upvoted" : ""
              }`}
            />
            <span>{upvoteState.upvotesLength}</span>
          </div>
          <div className="answer-action" onClick={handleDownvote}>
            <BiDownvote
              className={`answer-icon ${
                downvoteState.isDownvoted ? "downvoted" : ""
              }`}
            />
            <span>{downvoteState.downvotesLength}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
