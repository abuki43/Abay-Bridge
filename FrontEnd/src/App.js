// import react from 'react'

import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Signup state={false} />} />
      <Route path="/signup" element={<Signup state={true} />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/ask" element={<AskQuestion />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
