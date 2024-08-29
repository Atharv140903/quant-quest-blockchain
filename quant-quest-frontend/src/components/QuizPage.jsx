import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const QuizPage = () => {
  const location = useLocation();
  const { quizData } = location.state || {};

  const userPublicKey = "user-publickey-placeholder"; // Replace with actual user public key

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(() => {
    // Retrieve time from localStorage or default to 0
    const savedTime = localStorage.getItem("quizTimeElapsed");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0); // New state to track the user's score

  useEffect(() => {
    if (quizData && quizData.questions) {
      const formattedQuestions = quizData.questions.map((q) => ({
        question: q.questionText,
        answers: q.options,
        correctAnswer: q.correctOption - 1, // Adjusting to 0-based index
        points: q.pointsAwarded, // Track points for each question
      }));
      setQuestions(formattedQuestions);
    }
  }, [quizData]);

  useEffect(() => {
    if (!quizCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("quizTimeElapsed", newTime); // Save time to localStorage
          return newTime;
        });
      }, 1000);

      // Cleanup the timer when component unmounts or when quiz is completed
      return () => clearInterval(timer);
    }
  }, [quizCompleted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const nextQuestion = (answerStatus) => {
    setUserAnswers([
      ...userAnswers,
      { questionIndex: currentQuestionIndex, status: answerStatus },
    ]);

    if (answerStatus === "correct") {
      setScore(score + questions[currentQuestionIndex].points); // Add points if the answer is correct
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      localStorage.removeItem("quizTimeElapsed"); // Clear the saved time when quiz is completed
    }
  };

  const handleAnswerClick = (index) => {
    const answerStatus =
      index === questions[currentQuestionIndex].correctAnswer
        ? "correct"
        : "wrong";
    nextQuestion(answerStatus);
  };

  const handleSkipClick = () => {
    nextQuestion("unattempted");
  };

  if (quizCompleted) {
    const userSolvedQuiz = {
      userPublicKey,
      quizId: quizData.quizId,
      answers: userAnswers,
      timeTaken: formatTime(timeElapsed), // Include the time taken to complete the quiz
      score, // Include the user's score
    };
    console.log(JSON.stringify(userSolvedQuiz, null, 2)); // Log the JSON object

    return (
      <div style={styles.container}>
        <h2>Quiz Completed!</h2>
        <p>Time Taken: {formatTime(timeElapsed)}</p>
        <p>Your Score: {score} points</p> {/* Display the user's score */}
        <p>Thank you for participating.</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>; // Show a loading message while questions are being loaded
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.questionContainer}>
        <div style={styles.timerContainer}>
          <i className="fas fa-clock" style={styles.clockIcon}></i>
          <div style={styles.timer}>{formatTime(timeElapsed)}</div>
        </div>
        <h2>{questions[currentQuestionIndex].question}</h2>
        <div style={styles.answersContainer}>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              style={styles.answerButton}
            >
              {answer}
            </button>
          ))}
          <button onClick={handleSkipClick} style={styles.skipButton}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    color: "#fff",
    zIndex: 10, // Ensure it's above other elements
  },
  clockIcon: {
    marginRight: "8px",
  },
  timer: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  questionContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent black for glass effect
    padding: "30px",
    borderRadius: "10px",
    color: "#FFF",
    textAlign: "center",
    maxWidth: "400px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)", // Blur effect for the glassy look
    border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border to enhance glass effect
    position: "relative", // Ensure correct stacking context
    marginTop: "50px", // Adjusted top margin
  },
  answersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },
  answerButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  skipButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#d9534f", // Different color for the skip button
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "20px", // Add some distance from the options
    transition: "background-color 0.3s",
  },
};

export default QuizPage;
