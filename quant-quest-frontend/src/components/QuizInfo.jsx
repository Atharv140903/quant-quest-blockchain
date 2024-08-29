import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, description } = location.state || {}; // Destructure the state

  const quizData = {
    quizId: "36ee54c0-9129-4895-bb71-1809069610d6",
    quizCreator: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    genre: "Quantitative Finance Basics",
    description: "Practice statistics and DSA",
    timeLimit: "12", // Time limit in minutes
    questions: [
      {
        questionId: 1,
        quizId: "36ee54c0-9129-4895-bb71-1809069610d6",
        questionText: "What is the name of Citadel's CEO?",
        options: ["Andrew Tate", "Elon Musk", "Donald Trump", "Ken Griffin"],
        correctOption: 4,
        explanation: "Ken Griffin is the CEO of Citadel.",
        pointsAwarded: 1,
      },
      // Add more questions as needed...
    ],
  };

  const handleStartQuiz = () => {
    navigate(`/quiz`, { state: { quizData } });
  };

  const handleBack = () => {
    navigate("/learn"); // Navigate back to the quizzes page
  };

  if (!name || !description) {
    return <p>No quiz information available.</p>; // Handle case where no state is passed
  }

  return (
    <div style={styles.container}>
      <div style={styles.quizCard}>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>
          <i className="fas fa-clock"></i> 7 min
        </p>
        <div style={styles.buttonContainer}>
          <button onClick={handleStartQuiz} style={styles.startButton}>
            Start
          </button>
          <button onClick={handleBack} style={styles.backButton}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(90deg, #1B1D36, #343D89)",
  },
  quizCard: {
    backgroundColor: "#11152C",
    padding: "30px",
    borderRadius: "10px",
    color: "#FFF",
    textAlign: "center",
    maxWidth: "400px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  startButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  backButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default QuizInfo;
