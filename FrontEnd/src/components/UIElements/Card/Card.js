import React from "react";
import "./card.css";

const Card = (props) => {
  const {
    avatarImage,
    username,
    timestamp,
    location,
    postText,
    postImage,
    likes,
    comments,
    shares,
  } = props.data;

  return (
    <div className="card-container">
      <div className="header">
        <div>
          <a href={username}>
            <img src={avatarImage} alt="user" className="avatar" />
          </a>
        </div>
        <div className="user-info">
          <a href={username} className="username">
            {username}
          </a>
          <p className="timestamp">
            {timestamp} • {location}
          </p>
        </div>
        <img
          src="https://rawcdn.githack.com/MenaiAla/react-social-media-card/62fa92f435e5e06e484ef7be59a26b70573f72ec/src/assets/icons/more_24.png"
          alt="Options"
          className="options-icon"
        />
      </div>
      <div className="content">
        <div className="post-text">
          <p>{postText}</p>
        </div>
        <div className="image-container">
          <img src={postImage} alt={postImage} className="post-image" />
        </div>
      </div>
      <div className="card-footer">
        <span className="like-btn">
          <img
            src="https://rawcdn.githack.com/MenaiAla/react-social-media-card/62fa92f435e5e06e484ef7be59a26b70573f72ec/src/assets/icons/love_24.png"
            alt="icon"
            className="icon"
          />
          <p className="like-count">{likes}</p>
        </span>
        <span className="comment-btn">
          <img
            src="https://rawcdn.githack.com/MenaiAla/react-social-media-card/62fa92f435e5e06e484ef7be59a26b70573f72ec/src/assets/icons/comment_24.png"
            alt="icon"
            className="icon"
          />
          <p className="comment-count">{comments}</p>
        </span>
        <span className="share-btn">
          <img
            src="https://rawcdn.githack.com/MenaiAla/react-social-media-card/62fa92f435e5e06e484ef7be59a26b70573f72ec/src/assets/icons/share_24.png"
            alt="icon"
            className="icon"
          />
        </span>
      </div>
      <div className="comment-section">
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment"
        />
        <button className="send-btn">Send</button>
      </div>
    </div>
  );
};

export default Card;