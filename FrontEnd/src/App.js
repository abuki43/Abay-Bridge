import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify-modernize";
import ScrollToTop from "react-scroll-to-top";
import { AuthContext } from "./utils/context-API";
import useAuth from "./utils/hooks/Auth-hook";

import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Profile from "./pages/Profile/Profile";
import "react-toastify-modernize/dist/ReactToastify.css";
import AskAI from "./pages/AskAI/AskAI";
import AboutPage from "./pages/About/About";
import SingleQuestionPage from "./pages/SingleQuestion/SingleQuestion";
import PrivateRoute from "./utils/PrivateRoute";
import RedirectLoggedIn from "./utils/RedirectLoggedIn";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  const { userId, token, login, logout } = useAuth();

  return (
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, token, userId, login, logout }}
      >
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<RedirectLoggedIn><LandingPage /></RedirectLoggedIn>} />
          <Route path="/login" element={<RedirectLoggedIn><Signup state={false} /></RedirectLoggedIn>} />
          <Route path="/signup" element={<RedirectLoggedIn><Signup state={true} /></RedirectLoggedIn>} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/ask" element={<PrivateRoute><AskQuestion /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/question/:questionId" element={<SingleQuestionPage />} />
          <Route path="/askAI" element={<AskAI />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContext.Provider>
   
  );
}

export default App;
