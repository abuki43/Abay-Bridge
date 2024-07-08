import React from "react";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import Footer from "../../components/UIComponents/Footer/Footer";
import { FaTelegramPlane } from "react-icons/fa";

import "./about.css";
const AboutPage = () => {
  return (
    <div className="about-page">
      <NavBar />

      <section className="hero">
        <div className="container">
          <h1 className="title">Welcome to Abay-bride Q&A</h1>
          <p className="subtitle">
            An Educational Q&A Platform for Knowledge Sharing
          </p>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <h2>About Abay-bride</h2>
          <p>
            Abay-bride is an innovative Q&A platform designed to facilitate
            knowledge sharing, collaboration on projects, and seeking advice
            among educators, students, and enthusiasts. Our mission is to create
            a vibrant community where individuals can ask questions, provide
            answers, vote on the best responses, collaborate with others on
            projects, seek valuable advice, and engage in meaningful
            discussions.
          </p>
          <p>
            Whether you need help with a challenging assignment, want to explore
            new subjects, or simply have a burning curiosity, Abay-bride is the
            go-to place for acquiring knowledge, connecting with like-minded
            individuals, collaborating on projects, and gaining valuable advice
            to enhance your learning journey.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <h3 className="feature-title">Ask Questions</h3>
              <p className="feature-description">
                Post your questions and get answers from the community of
                knowledgeable individuals.
              </p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✏️</span>
              <h3 className="feature-title">Provide & Vote on Answers</h3>
              <p className="feature-description">
                Share your expertise and contribute to the community by
                providing well-thought-out answers and voting on helpful
                answers.
              </p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤝</span>
              <h3 className="feature-title">Collaborate & Seek Advice</h3>
              <p className="feature-description">
                Connect with other learners, collaborate on projects, and expand
                your knowledge through teamwork.Gain valuable insights to
                enhance your learning journey.
              </p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <h3 className="feature-title">Explore Topics</h3>
              <p className="feature-description">
                Discover a wide range of topics and expand your knowledge in
                various fields.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="instructions">
        <div className="container">
          <h2>Instructions</h2>
          <p>
            In order to ask, vote, or answer questions, you must be logged in to
            your account.
          </p>
        </div>
      </section>

      <section className="contact-developer">
        <div className="container">
          <h2>Contact the Developer</h2>
          <p>
            If you have any questions or feedback, feel free to contact the
            developer: Abubeker
          </p>
          <a
            href="https://t.me/Abking1"
          >
            <FaTelegramPlane className="telegram-icon" />
            Telegram: @Abking1
          </a>
        </div>
      </section>

      <section className="special-thanks">
  <div className="container">
    <h2>Special Thanks</h2>
    <p className="thanks-text">
  Special thanks to UI Designer{" "}
  <a
    href="https://www.linkedin.com/in/mehret-merid/"
    className="designer-link"
  >
    Miheret
  </a>{" "}
  for her exceptional contributions to the Abay-bride project. 
</p>

    <p>Another Special thanks to developer {" "}
  <a
    href="https://t.me/KeO_coder"
    className="designer-link"
  >
    Kena
  </a>{" "}.</p>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default AboutPage;
