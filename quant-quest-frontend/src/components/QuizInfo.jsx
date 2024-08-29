import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <div>
    <img
    src="/smallLogo.svg"xx
    alt="Small Logo"
    style={styles.logo}
  />
  <div>
      <div style={styles.quizCard}>
        <h1 style={styles.title}>{name}</h1>
        <p style={styles.description}>{description}</p>
        <p style={styles.timeInfo}>
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
    </div>
  );
};

const styles = {
  logo: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "150px",
    height: "150px",
  },
  quizCard: {
    width: "100%",
    height: "60%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Lighter semi-transparent black for a lighter glass effect
    padding: "30px",
    borderRadius: "10px",
    color: "#FFF",
    textAlign: "left", // Align text to the left
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)", // Blur effect for the glassy look
    border: "1px solid rgba(255, 255, 255, 0.4)", // Slightly more prominent border to enhance the glass effect
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingRight: "50px", // Add some space on the right for button alignment
  },
  title: {
    margin: 0,
  },
  description: {
    margin: "10px 0",
  },
  timeInfo: {
    margin: "20px 0",
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start", // Align buttons to the start (left)
    gap: "10px",
  },
  startButton: {
    backgroundColor: "#00FFA3",
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
