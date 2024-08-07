import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { FaTimes, FaClipboard } from "react-icons/fa";
import BackDrop from "../BackDrop/BackDrop";
import "./SharePop.css";
import { toast } from "react-toastify-modernize";

const SharePopup = ({ shareUrl, title, description, toggleSharePopup }) => {
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          toast.success("URL copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
          toast.error("Copy to clipboard failed. Please copy manually.");
        });
    }
  }

  const handleCloseClick = (event) => {
    event.stopPropagation();
    toggleSharePopup();
  };

  return (
    <BackDrop onClick={toggleSharePopup}>
      <div className="share-popup" onClick={(e) => e.stopPropagation()}>
        <div className="share-header">
          <h3>Share This Question</h3>
          <button className="close-btn" onClick={handleCloseClick}>
            <FaTimes size={20} />
          </button>
        </div>
        <div className="share-icons">
          <EmailShareButton url={shareUrl} subject={title} body={description}>
            <EmailIcon size={48} round />
          </EmailShareButton>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            summary={description}
          >
            <LinkedinIcon size={48} round />
          </LinkedinShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
          <TelegramShareButton url={shareUrl} title={title}>
            <TelegramIcon size={48} round />
          </TelegramShareButton>
          <button className="clipboard-btn" onClick={copyToClipboard}>
            <FaClipboard size={48} />
          </button>
        </div>
      </div>
    </BackDrop>
  );
};

export default SharePopup;
