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
          `${process.env.REACT_APP_BACKEND_URL}/users/me/6635fb708db8a9b32d6b53c9`,
          "GET"
        );
        console.log(response.user);
        setResult(response.user);
      } catch (e) {
        toast.error(e.message);
      }
    };

    fetchData();
  }, [true]);

  const [activeSection, setActiveSection] = useState("myQuestions");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const data = [
    {
      avatarImage:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAPABBAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQMEAgUG/9oACAEBAAAAANYACeuZInkATAAnuJjrnqJ46rAEwAAAAAmAAKCHdoAEwACuumB3rkAJgARlrAX6AAmACMfIB1psAEwARnpAOeNekAmACvILhNmHmfTAJgAz0N+6QceLT6XQCYAM9HqagDP4npdAJgAon1QA+f8ARAJgAqv1+bTq9BT53O7X4usAmADi/rnX5+yzBq78/wBLyNABMAFk6qPE+i56YcPuMKAEwAX298493HaqnWpp4ATABdf0KnfQrywAmACdVghIZKwCYAFuoDnpziAEwAGztXzC6WakATAAda+kJKM4ATAAJ02iM1QAJgADq+yeaqAAJgAC9BblgAEwABuVR3ZnoABMABGywDHwAEwAZstWjfpunijHgjRqtATAGPDyT1IiORf6NgJgGDEAADr1rAmAeJAAAG3eE//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMFBAb/2gAKAgIQAxAAAACeIALCwIUAAACusaxN8JzAAACnqw6uXtJr7PnLYAAARPj+lrsBp5PTw7ZAABT0+P6O+dqEq2052/JAADP2YdvTEAeTfkgABXbDvRaazFb2pfl6+AAAKerLsaUpdF60tPi25YAAV2y7KyRBfl6eIAACnSz96RFsdeIAAAJz6tPWTjryZyAAACvox7ppzNOaAAACc+rT2JnHXizQAAF3semL1sTFqvO8bEAB11wAAclmH//EADgQAAIBAgMGBgADBQkAAAAAAAECAwARBBIxECEyQEFREyAwYXGBFEJSBSIjU5EzQ1BiY3KSobH/2gAIAQEAAT8A9YAkgCithcMCKsd27WgrEXANAMbWGtBWOgqxtfpe1ZWAvblgbGvE9qL3INhXiHtQbeb6EWNFvcE5bC3ag9lt/T7pJMqgdQSRpSuACCNdaSTKAOxuNKuMhB1veiylbWJPv0/xp3ZHPUGvHH6TXjj9NeOf0ivH/wAtCZDru5syoOt/immvuyj7om/lRyh9u1AggEcuzBRc08jP7Dt6MLbyvLEgAk0zFzf0lOVgTSyxto3KkA6inlJ3LuHpMemyCUn9xvo8pK1k+d3kAJNgCT7UIJz/AHZr8NP/ACzX4ef+Wa/Dz/yzQw05/J/U0cFLl3Ot6dHRrOpB2A2IPY8pPquwAkgAXJqLB9Zf+NKqqLKAB7eeSNJVyuLipoWhfKdOh2Lwr8Dk59V+NmGg8MZm4z/16WJi8WJh1G8bF4V+Byc+i1hY88tzovqSLlkdezEcpNwfdYIfw3PdqZlRSzHcKkxcrcJyCvFmG/O9RYs3Ak077ZplhHcnQU+Jmc8ZHsKE0ynjb7qDEiQ5W3NslF8W4/1OUkF0asH/AGJ/3GsVG8iKE6HSsPhggzOBm/8AKPvU+FOa8S/VRKUjRWNyBsxMEskuZRcECooUiWw16mnRXFmFxX4WUSi3CG4thF8ZL7E8oiBr300rCC0RHZzsxMrQwO667gKTFzo4YyM3cE7G6bcfO8MaBDYudaweJm8dEZyyueu2JAZcST1ktRFjbk4+AUgABt1JOx0V1ZWFwRvqP9nwI4e7NbQHYeLbNCk6ZHFQYKKBs4JZuhO0KqlrDUkn5NScR5OM7rUunlNwazmlJOvlOppjdieTBINxUbZgfNYDp5ncm4HKxNZ/n0Aytexvba5yqTy6NnW+0iXoyn5FXn7R1/G6ugoRhuJmf50oADbK9zYaDl1YqbilYMLjbYHpWUdvJJJ0XmQSpuKSUNuO4+UkAXNPKW3DcObTWg5FBlPWrjvRcDSiSb85Ctwxogg+RF6mmFiRzQBJAGtKMoAogGihrK3agnfZMv5uZJC2uQL96jjCb9SfQlVYrXYAHQHlSQBckAdzT4uJeG7U2LlbSy/FZ76nfUWIlh4W3djvFJ+0EPGhHuKXEwPpKv3uoEHQg/B2NJGvFIg+6fG4ddGLfAqTHyNujASmYkksSSeppZpE4WIpMYfzp9ikmik4W39jyMuLA3R7/emdnN2Yk+QEis1ZhV1q4q4rMKzHyx4iSPrmHY1HKkouuvUetipiSYl0HFyasyMGU2IqKQSIGHqaAnsL0SSST15TBNvdfvz/AP/EACURAAIBAgUEAwEAAAAAAAAAAAECABEwAxASIUEgMTJRE0Bhcf/aAAgBAgEBPwD67MFFTPkT3PlT3AwbsbruE/sOKxzBINREbUoNsxu53r0o5WKwYVFrENEOQQzQJoE0CFaTB5tYvgYg56sHu1pxVWg8ZpY7kxdW4MYkDaaT7i15mENif205osHYQEAZgimWGdyLTColKdSLTc23HPSBU3StMwCYBS63iZWVic3mNcqQGhvEAzRNH7Ao+z//xAAtEQACAQMCBAUDBQEAAAAAAAABAgMABBEhMBASMVEFEyBBYRQyUyJSYnGRof/aAAgBAwEBPwD0gA9TWF/dQCcpoBNMsaCpplqwvf23YommYqmM4yBX0V1+Kvobr8f/AEVJFJEcOhG7b2sk/TRe9R2ECd2NAYGODosilWGQauITBKyf5try5HNnHvioM+WuYwg9l9NzapcEEkggVNE0LlG2rNA9xGDwMgHSvNbsK81uwoyNSvmvExpE21YnF1HUje3pBxXiR/TFtW7cs8R/kKbVznvRdRoFp+U4IpQCdTXOvTl0pwudK8QbMiL2Tas0DzDPsM0xyTRBJocCDnhfoCqPtQS+TIGpXVwGXoeAOKJHG7uFkwi9Bt2UuhjP9jhj5FY+eE8oijJ9zoNwEqQQcEVBdLJhW0bjNMkI16+wqWVpWy27ajM6fBzRUGuQV4gNYzugEnAFWsBiBZvuNAkUWNSxiVCpp42jbDDaSN3OFFJaKPvOaVET7VAoEiueuf4osaIB6jNPbRt00qSB4/kd9iNBGgUbUyckjL6P/9k=",
      username: "Al-Abuki",
      timestamp: "11 hours ago",
      subject: "Biology",
      title: "Any one who can help me with my Biology assignment?",
      description:
        "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum 110 lorem epsumm lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
      postImage:
        "https://media.istockphoto.com/id/689291632/photo/computer-programmer-working-at-home-on-complex-algorithms.jpg?b=1&s=612x612&w=0&k=20&c=gs96mbDKInzSf_D95LFyn7HPsApt1l1rBxAA1esJ4VE=",
      likes: 50,
      answers: 11,
      shares: 20,
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <div className="profile-page">
        <NavBar />
        <ProfileBanner
          username={result?.firstName || "Unknown"}
          score={30}
          questionsAsked={324}
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
