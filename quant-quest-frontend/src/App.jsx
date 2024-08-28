import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Quizes from "./components/Quizes";
import MakeQuizPage from "./components/MakeQuizPage";
import QuizPage from "./components/QuizPage";

function App() {
  const [walletAddress, setWalletAddress] = useState(null); // State for the user's wallet address

  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "70px", padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
              />
            }
          />
          <Route path="/learn" element={<Quizes />} />
          <Route
            path="/create"
            element={<MakeQuizPage walletAddress={walletAddress} />}
          />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
