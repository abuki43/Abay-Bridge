import React from "react";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import Footer from "../../components/UIComponents/Footer/Footer";
import "./CommingSoon.css";

const AskAI = () => {
  return (
    <>
      <div className="commingSoonPage">
        <NavBar />
        <div className="comingSoonContainer">
          <h1 className="comingSoonTitle">Coming Soon!</h1>
          <p className="comingSoonText">
            Exciting new features are on their way. Stay tuned!
          </p>
        </div>
        <div className="footerContainer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AskAI;
