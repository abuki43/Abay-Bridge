import React, { useState, useEffect } from "react";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import QuestionsHero from "../../components/UIComponents/QuestionsHero.js/QuestionsHero";
import FilterOptions from "../../components/UIElements/Filter/Filter";
import useHttp from "../../utils/hooks/http-hook";
import "./questions.css";
import Card from "../../components/UIElements/Card/Card";
import Loader from "../../components/UIElements/Loader/Loader";
import { toast } from "react-toastify-modernize";
import QuestionsList from "../../components/UIComponents/QuestionsList/QuestionsList";

const Questions = () => {
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const levels = [
    "ALL",
    "Primary School",
    "Secondary School",
    "University",
    "Other",
  ];
  const subjects = [
    "Chemistry",
    "Physics",
    "IT",
    "Accounting",
    "Maths",
    "Biology",
    "Medicine",
    "Enginnering",
  ];

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const data = {
    avatarImage: "",
    username: "Al-Abuki",
    timestamp: "11 hours ago",
    subject: "Biology",
    title: "Any one who can help me with my Biology assignment?",
    description:
      "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum 110 lorem epsumm lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
    postImage: "",
    likes: 50,
    answers: 11,
    shares: 20,
  };

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    fetchQuestions(1);
  }, [selectedLevels, selectedSubjects]); // use efffect runs when there is change on level , subject and when the page first reloads

  const fetchQuestions = async (page) => {
    try {
      console.log(selectedLevels, selectedSubjects);
      const filters = {
        levels: selectedLevels,
        subjects: selectedSubjects,
      };
      const queryParams = new URLSearchParams(filters);
      console.log(queryParams);
      const url = `${process.env.REACT_APP_BACKEND_URL}/questions/${page}?${queryParams}`;
      const response = await sendRequest(url, "GET");
      console.log(response);
      if (error) {
        throw new Error(error);
      }
      setQuestions(response.questions);
    } catch (e) {
      console.log(e);
    }
  };

  const handleApplyFilters = (selectedLevels, selectedSubjects) => {
    setSelectedLevels(selectedLevels);
    setSelectedSubjects(selectedSubjects);
    setCurrentPage(1);
    fetchQuestions(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchQuestions(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchQuestions(currentPage - 1);
    }
  };

  if (error) {
    toast.error(error, {
      onClose: () => clearError(),
    });
  }
  return (
    <div className="questionsPage">
      {isLoading && <Loader />}
      <NavBar />
      <QuestionsHero />

      <div className="questionsContainer">
        <FilterOptions
          levels={levels}
          subjects={subjects}
          selectedLevels={selectedLevels}
          selectedSubjects={selectedSubjects}
          onApplyFilters={handleApplyFilters}
        />
        <div className="listOfQuestions">
          <h2 className="header">Questions</h2>
          <QuestionsList data={questions} />
          <div className="btnContainer">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage} disabled={questions.length === 0}>
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
