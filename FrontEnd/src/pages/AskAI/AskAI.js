import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import useHttp from "../../utils/hooks/http-hook";
import "./AskAI.css";
import { CgProfile } from "react-icons/cg";
import { GiArtificialHive } from "react-icons/gi";
import { toast } from "react-toastify-modernize";

const AskAI = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [responseData, setResponseData] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when responseData updates
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [responseData]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendRequest = async () => {
    if (input.trim() === "") return;
    try {
      const response = await sendRequest(
        `https://chatgpt.apinepdev.workers.dev/?question=${input}`,
        "GET"
      );
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      setResponseData((prevData) => [
        ...prevData,
        {
          type: "user",
          text: input,
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          type: "ai",
          text: response.answer,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("copied!");
  };

  return (
    <>
      <NavBar />
      <div className="askAIPage">
        <div className="chatContainer" ref={chatContainerRef}>
          <div className="chat">
            <div
              className={`message ai`}
              title={new Date().toLocaleTimeString()}
            >
              <GiArtificialHive className="icon" />

              <div className="textContainer">
                <p className="messageText">Hey, How can I assist you today?</p>
              </div>
            </div>
            {responseData.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type}`}
                title={message.timestamp}
              >
                {message.type === "user" ? (
                  <CgProfile className="icon" />
                ) : (
                  <GiArtificialHive className="icon" />
                )}
                <div className="textContainer">
                  <p className="messageText">{message.text}</p>
                  <span
                    className="copyButton"
                    onClick={() => handleCopy(message.text)}
                  >
                    Copy
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message loading">
                <div className="loading-dots"></div>
                <div className="loading-dots"></div>
                <div className="loading-dots"></div>
              </div>
            )}
          </div>

          <div className="inputContainer">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendRequest();
              }}
            />
            <button onClick={handleSendRequest} disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskAI;
