import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">Oops!</h1>
        <p className="error-message">We can't seem to find the page you're looking for.</p>
        <button className="error-button" onClick={handleRedirect}>Go to Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;
