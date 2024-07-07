import React, { useState, useEffect, useCallback } from "react";
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

  const MemoizedFilterOptions = React.memo(FilterOptions);
  const levels = [
    "ALL",
    "Primary School",
    "Secondary School",
    "University(College)",
    "Other",
  ];
  const subjects = [
    "collaborate",
    "Advice",
    "Programming",
    "Tech",
    "Chemistry",
    "Physics",
    "Accounting",
    "Maths",
    "Biology",
    "Medicine",
    "Enginnering",
    "Art",
    "Law",
    "Social studies",
    "other",
  ];

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    fetchQuestions(1);
  }, []); // use efffect runs  when the page first reloads

  const fetchQuestions = async (
    page,
    searchQuery = "",
    levels = selectedLevels,
    subjects = selectedSubjects
  ) => {
    try {
      const filters = {
        levels: levels,
        subjects: subjects,
        search: searchQuery,
      };
      const queryParams = new URLSearchParams(filters);
      const url = `${process.env.REACT_APP_BACKEND_URL}/questions/${page}?${queryParams}`;
      const response = await sendRequest(url, "GET");
      if (error) {
        throw new Error(error);
      }
      setQuestions(response.questions);
    } catch (e) {
      console.log(e);
    }
  };

  const handleApplyFilters = useCallback((levels, subjects) => {
    setSelectedLevels(levels);
    setSelectedSubjects(subjects);
    setCurrentPage(1);
    fetchQuestions(1, "", levels, subjects);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedLevels([]);
    setSelectedSubjects([]);
    setCurrentPage(1);
    fetchQuestions(1);
  }, []);

  const handleSearch = useCallback((searchQuery) => {
    // setSelectedLevels([]);
    // setSelectedSubjects([]);
    setCurrentPage(1);
    fetchQuestions(currentPage, searchQuery);
  }, []);

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

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => clearError(),
      });
    }
  }, [error, clearError]);

  return (
    <div className="questionsPage">
      {isLoading && <Loader />}
      <NavBar />
      <QuestionsHero onSearch={handleSearch} />

      <div className="questionsContainer">
        <MemoizedFilterOptions
          levels={levels}
          subjects={subjects}
          selectedLevels={selectedLevels}
          selectedSubjects={selectedSubjects}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
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
