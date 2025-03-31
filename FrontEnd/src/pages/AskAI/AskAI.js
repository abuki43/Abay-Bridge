import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import "./AskAI.css";
import NavBar from './../../components/UIComponents/Navbar/Navbar';

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text;
};

export default function AskAI() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [response]);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleClear = () => {
        setUserInput('');
        setResponse([]);
        setIsLoading(false);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleSubmit = async () => {
        if (!userInput.trim()) {
            setResponse([{ type: "system", message: "Please enter a prompt.." }]);
            return;
        }

        setIsLoading(true);
        try {
            const res = await generateContent(userInput);
            setResponse(prevResponse => [
                ...prevResponse,
                { type: "user", message: userInput },
                { type: "bot", message: res() },
            ]);
            setUserInput('');
        } catch (err) {
            console.error("Error generating response:", err);
            setResponse(prevResponse => [
                ...prevResponse,
                { type: "system", message: "Failed to generate response" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="askAIPage">
            {response.length === 0 ? (
                <div className="introContainer">
                    <h1>Got Questions? Chatty's Got Answers.</h1>
                </div>
            ) : (
                <div className="chatContainer" ref={chatContainerRef}>
                    <div className="chat">
                        {response.map((msg, index) => (
                            <div key={index} className={`message ${msg.type}`}>
                                <div className="textContainer" style={{paddingBlock:0}}>
                                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                                    <button className="copyButton" onClick={() => handleCopy(msg.message)}>
                                        <FaRegCopy />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {isLoading && <p className="loading-text">Generating response...</p>}
                    </div>
                </div>
            )}

            <div className="inputContainer">
                <button onClick={handleClear} className="clearButton">Clear</button>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    className="chatInput"
                />
                <button onClick={handleSubmit} className="sendButton">
                    <IoIosSend />
                </button>
            </div>
        </div>
    );
}
