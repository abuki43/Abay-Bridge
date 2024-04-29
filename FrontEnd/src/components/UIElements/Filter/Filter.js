import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../Button/Button";
import BackDrop from "../BackDrop/BackDrop";
import "./filter.css";

function FilterOptions({
  levels,
  subjects,
  selectedLevels,
  selectedSubjects,
  onApplyFilters,
}) {
  const [tempSelectedLevels, setTempSelectedLevels] = useState(selectedLevels);
  const [tempSelectedSubjects, setTempSelectedSubjects] =
    useState(selectedSubjects);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const [showLevels, setShowLevels] = useState(true);
  const [showSubjects, setShowSubjects] = useState(false);

  const [isFilterMobile, setIsFilterMobile] = useState(false);

  const ShowFilterMobile = () => {
    setIsFilterMobile(true);
  };

  const hideFilterMobile = () => {
    setIsFilterMobile(false);
  };

  const toggleSection = (section) => {
    if (section === "levels") {
      setShowLevels(!showLevels);
    } else if (section === "subjects") {
      setShowSubjects(!showSubjects);
    }
  };

  const handleLevelChange = (event) => {
    const level = event.target.value;
    if (tempSelectedLevels.includes(level)) {
      setTempSelectedLevels(tempSelectedLevels.filter((l) => l !== level));
    } else {
      setTempSelectedLevels([...tempSelectedLevels, level]);
    }
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    if (tempSelectedSubjects.includes(subject)) {
      setTempSelectedSubjects(
        tempSelectedSubjects.filter((s) => s !== subject)
      );
    } else {
      setTempSelectedSubjects([...tempSelectedSubjects, subject]);
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters(tempSelectedLevels, tempSelectedSubjects);
  };

  const handleShowMoreSubjects = () => {
    setShowAllSubjects(true);
  };

  return (
    <>
      <div className="desk-hide">
        <Button color="filter" padI="0" onClick={ShowFilterMobile}>
          <FaFilter className="filter-mob-icon" />
          {/* Filter */}
        </Button>
      </div>

      {isFilterMobile && (
        <BackDrop onClick={hideFilterMobile} className="desk-hide" />
      )}

      <div className={`filter-options ${isFilterMobile && "open"} `}>
        {isFilterMobile && (
          <div className="mobFilterClose desk-hide" onClick={hideFilterMobile}>
            <IoMdCloseCircleOutline />
          </div>
        )}
        <div className="filter-header">
          <FaFilter className="filter-icon" />
          <h2 className="filter-title">Filters</h2>
        </div>
        <div className="filter-section">
          <h3
            className="filter-section-title"
            onClick={() => toggleSection("levels")}
          >
            Level {showLevels ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {showLevels && (
            <div className="filter-checkbox-group">
              {levels.map((level) => (
                <label key={level} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    value={level}
                    checked={tempSelectedLevels.includes(level)}
                    onChange={handleLevelChange}
                    className="filter-checkbox"
                  />
                  {level}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="filter-section">
          <h3
            className="filter-section-title"
            onClick={() => toggleSection("subjects")}
          >
            Subject {showSubjects ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {showSubjects && (
            <div className="filter-checkbox-group">
              {subjects
                .slice(0, showAllSubjects ? subjects.length : 5)
                .map((subject) => (
                  <label key={subject} className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      value={subject}
                      checked={tempSelectedSubjects.includes(subject)}
                      onChange={handleSubjectChange}
                      className="filter-checkbox"
                    />
                    {subject}
                  </label>
                ))}
              {subjects.length > 5 && !showAllSubjects && (
                <button
                  className="show-more-button"
                  onClick={handleShowMoreSubjects}
                >
                  Show More
                </button>
              )}
            </div>
          )}
        </div>
        <div className="filter-action">
          <button className="apply-filters-button" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterOptions;
