// import react from 'react'

import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import Questions from "./pages/Questions/Questions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Signup state={false} />} />
      <Route path="/signup" element={<Signup state={true} />} />
      <Route path="/questions" element={<Questions />} />
    </Routes>
  );
}

export default App;
