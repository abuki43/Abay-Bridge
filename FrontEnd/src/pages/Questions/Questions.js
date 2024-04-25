import React, { useState } from "react";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import QuestionsHero from "../../components/UIComponents/QuestionsHero.js/QuestionsHero";
import FilterOptions from "../../components/UIElements/Filter/Filter";

import "./questions.css";

const Questions = () => {
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

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleApplyFilters = (selectedLevels, selectedSubjects) => {
    setSelectedLevels(selectedLevels);
    setSelectedSubjects(selectedSubjects);
  };
  return (
    <div className="questionsPage">
      <NavBar />
      <QuestionsHero />
      <h2 className="header">Questions</h2>
      <div className="questionsContainer">
        <FilterOptions
          levels={levels}
          subjects={subjects}
          selectedLevels={selectedLevels}
          selectedSubjects={selectedSubjects}
          onApplyFilters={handleApplyFilters}
        />
        <div className="listOfQuestions">
          {/* Render the list of questions */}
        </div>
      </div>
    </div>
  );
};

export default Questions;
