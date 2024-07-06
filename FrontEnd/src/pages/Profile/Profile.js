import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/context-API";
import useHttp from "../../utils/hooks/http-hook";
import ProfileBanner from "../../components/UIComponents/ProfileBanner/ProfileBanner";
import NavBar from "../../components/UIComponents/Navbar/Navbar";

import Button from "../../components/UIElements/Button/Button";
import "./profile.css";
import QuestionsList from "../../components/UIComponents/QuestionsList/QuestionsList";
import EditProfile from "../../components/UIComponents/EditProfile/EditProfile";
import { toast } from "react-toastify-modernize";
import Loader from "../../components/UIElements/Loader/Loader";

const Profile = () => {
  const { userId } = useContext(AuthContext);
  console.log(userId);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [result, setResult] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/me/${userId}`,
          "GET"
        );
        console.log(response.user);
        setResult(response.user);
        console.log(result);
      } catch (e) {
        toast.error(e.message);
        console.log(e);
      }
    };

    fetchData();
  }, [true]);

  const [activeSection, setActiveSection] = useState("myQuestions");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="profile-page">
        <NavBar />
        <ProfileBanner
          username={result?.firstName || "Unknown"}
          score={result?.score}
          questionsAsked={result?.questions?.length}
          profilePic={result.profile_image}
        />
        <div className="menu">
          <div></div>
          <div className="menu-item">
            <Button
              color="white-small"
              className={activeSection === "myQuestions" ? "active" : ""}
              onClick={() => handleSectionChange("myQuestions")}
            >
              My Questions
            </Button>
            {activeSection === "myQuestions" && (
              <div className="indicator"></div>
            )}
          </div>
          <div className="menu-item">
            <Button
              color="white-small"
              className={activeSection === "editProfile" ? "active" : ""}
              onClick={() => handleSectionChange("editProfile")}
            >
              Edit Profile
            </Button>
            {activeSection === "editProfile" && (
              <div className="indicator"></div>
            )}
          </div>

          <div className="menu-item">
            <Button
              color="white-small"
              className={activeSection === "editProfile" ? "active" : ""}
              onClick={() => handleSectionChange("saved")}
            >
              Saved questions
            </Button>
            {activeSection === "saved" && <div className="indicator"></div>}
          </div>
        </div>

        <div className="profile-section">
          {activeSection === "myQuestions" && (
            <QuestionsList data={result.questions} />
          )}
          {activeSection === "editProfile" && <EditProfile data={result} />}

          {activeSection === "saved" && (
            <QuestionsList data={result.savedQuestions} />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
