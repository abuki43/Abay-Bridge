import react from "react";

import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify-modernize";
import { AuthContext } from "./utils/context-API";
import useAuth from "./utils/hooks/Auth-hook";

import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Profile from "./pages/Profile/Profile";
import "react-toastify-modernize/dist/ReactToastify.css";

function App() {
  const { userId, token, login, logout } = useAuth();
  return (
    <>
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
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Signup state={false} />} />
          <Route path="/signup" element={<Signup state={true} />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
