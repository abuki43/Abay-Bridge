import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify-modernize";
import { CiMenuKebab, CiSaveDown1, CiEdit } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import {
  MdOutlineReportProblem,
  MdOutlineDeleteSweep,
  MdOutlineInsertComment,
} from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { AuthContext } from "../../../utils/context-API";
// import questionImage from "../../../assets/image 3.png";
import { getRelativeTimestamp } from "../../../utils/timeChange";
import useHttp from "../../../utils/hooks/http-hook";
import avatar from "../../../assets/avatar.webp";
import "./card.css";
import Loader from "../Loader/Loader";
import AnswerCard from "../AnswerCard/AnswerCard";
import AnswersList from "../../UIComponents/AnswerList/AnswerList";
import SharePopup from "../../UIElements/SharePopUp/SharePopup";

const Card = (props) => {
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    _id: id,
    author, // this object populates and brings the firstname and profile picture
    date_posted,
    level,
    subject,
    title,
    description,
    postImage,
    isEdited,
    answers,
    image: questionImage,
  } = props.data;

  const { questionStateHandler } = props;
  const [isMine, setIsMine] = useState(false); // check if the question belongs to the person logged in
  const [showCardOptions, setCardOptions] = useState(false);
  const [isDescripExpanded, setIsDescripExpanded] = useState(false);
  const [isAnswersOpen, setIsAnswerOpen] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [showSharePopup, setShowSharePopup] = useState(false); // State for share popup

  const imageURL = `${process.env.REACT_APP_ASSETS_URL}${questionImage}`;
  const profileImage = `${process.env.REACT_APP_ASSETS_URL}${author.profile_image}`;
  const shareUrl = `${process.env.REACT_APP_URL}/question/${id}`;

  useEffect(() => {
    if (author._id == userId) {
      setIsMine(true);
    }
  }, []);

  const toggleSharePopup = () => setShowSharePopup((prev) => !prev); // Toggle share popup

  const toggleCardOptions = () => {
    setCardOptions((prev) => !prev);
  };
  const toggleDescrip = () => {
    setIsDescripExpanded((prev) => !prev);
  };

  const toggleAnswer = () => {
    setIsAnswerOpen((prev) => !prev);
    fetchAnswer();
  };

  const date = getRelativeTimestamp(date_posted);

  const handleDelete = async () => {
    console.log(isMine, "isminee");
    toggleCardOptions()
    if (window.confirm("Are you sure you want to delete this question?")) {
      
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/questions/${props.data._id}`,
          "DELETE"
        );

        if (response.message === "successfully deleted!") {
          questionStateHandler("delete", props.data._id);
          toast.success("Question deleted successfully!");
        }
      } catch (error) {
        toast.error("Failed to delete question. Please try again.");
        console.log(error);
      }
    }
  };

  const handleEdit = () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    navigate(
      `/ask?edit=true&id=${id}&title=${title}&description=${description}&level=${level}&subject=${subject}&image=${questionImage}`
    );
  };

  const handleSaveQuestion = async () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/questions/save/${props.data._id}/${userId}`,
        "GET"
      );
      toggleCardOptions()

      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to save question. Please try again.");
      console.log(error);
      toggleCardOptions()
    }
    
  };

  const submitAnswer = async (answer, QID = props.data._id) => {
    console.log("submitted", answer);
    if (!isLoggedIn) {
      toast.info("Please login to answer a question!");
      return;
    }

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/answer/${userId}/${QID}`,
        "POST",
        JSON.stringify({ content: answerInput || answer }),
        { "Content-Type": "application/json" }
      );
      console.log(response);
      toast.success("Question Answered!");
      setAnswerInput("");
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAnswer = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/answer/${props.data._id}`,
        "GET"
      );
      setQuestionAnswers(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card-container">
      {isAnswersOpen && (
        <AnswersList
          answers={questionAnswers}
          onClose={toggleAnswer}
          isLoading={isLoading}
          submitAnswer={submitAnswer}
        />
      )}

      {showCardOptions && isLoggedIn && (
        <CardOptions
          toggle={toggleCardOptions}
          isMine={isMine}
          deleteHandler={handleDelete}
          saveHandler={handleSaveQuestion}
          editHandler={handleEdit}
        />
      )}

      {showSharePopup && (
        <SharePopup
          shareUrl={shareUrl}
          title={title}
          description={description}
          toggleSharePopup={toggleSharePopup}
        />
      )}

      {isLoading && <Loader />}
      <div className="header">
        <div className="authorProfileImage">
          <img src={author.profile_image? profileImage : avatar} alt="user" className="avatar" />
        </div>
        <div className="user-info">
          <a href="" className="username">
            {author.firstName}
          </a>
          <p className="timestamp">{date} </p>
          <p className="level-subj">
            {level} • {subject}
          </p>
        </div>
        <div className="options-icon" onClick={toggleCardOptions}>
          <CiMenuKebab />
        </div>
      </div>
      <div className="content">
        <div className="post-title">
          <p>{title}</p>
        </div>

        <div className="post-description">
          <p>
            {isDescripExpanded ? description : description.slice(0, 150)}
            {description.length > 150 && (
              <span onClick={toggleDescrip}>
                {!isDescripExpanded ? "... More" : "Less"}
              </span>
            )}
          </p>
        </div>

        {questionImage && (
          <div className="image-container">
            <img src={imageURL} alt="questionImage" className="post-image" />
          </div>
        )}
      </div>
      <div className="card-footer">
        {/* <span className="like-btn">
          <FcLike />
          <p className="like-count">{likes}</p>
        </span> */}
        <span className="comment-btn" onClick={toggleAnswer}>
          <MdOutlineInsertComment />
          <p className="comment-count">
            {answers ? answers.length : ""} answers
          </p>
        </span>
        <span className="share-btn" onClick={toggleSharePopup}>
          <FaShareSquare />
        </span>
      </div>
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
          onClick={submitAnswer}
        >
          Send
        </button>
      </div>

      <p className="isEdited">{isEdited && "Edited"}</p>
    </div>
  );
};

const CardOptions = ({
  toggle,
  isMine,
  deleteHandler,
  saveHandler,
  editHandler,
}) => {
  return (
    <div className="cardOptions">
      <div className="overlay">
        <div className="content">
          <div className="action-button" onClick={saveHandler}>
            <CiSaveDown1 />
            <p>Save/Unsave</p>
          </div>
          {isMine && (
            <>
              <div className="action-button" onClick={editHandler}>
                <CiEdit />
                <p>Edit</p>
              </div>
              <div className="action-button report-button">
                <MdOutlineDeleteSweep />
                <p onClick={deleteHandler}>Delete</p>
              </div>
            </>
          )}
          {!isMine && (
            <div className="action-button report-button">
              <MdOutlineReportProblem />
              <p>Report</p>
            </div>
          )}
          <hr className="divider" />
          <p className="cancel-button" onClick={toggle}>
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
