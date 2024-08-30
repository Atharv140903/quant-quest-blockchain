import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import '@fortawesome/fontawesome-free/css/all.min.css';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { name, description, questions } = location.state || {};

  const userPublicKey = "user-publickey-placeholder"; // Replace with actual user public key
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(() => {
    const savedTime = localStorage.getItem("quizTimeElapsed");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!quizCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("quizTimeElapsed", newTime);
          return newTime;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [quizCompleted]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (event.type === "beforeunload" && !event.returnValue) {
        localStorage.setItem("quizTimeElapsed", "0");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
        localStorage.setItem("quizTimeElapsed", "0");
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const nextQuestion = (answerStatus) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = {
      questionIndex: currentQuestionIndex,
      status: answerStatus,
    };
    setUserAnswers(newAnswers);

    if (answerStatus === "correct") {
      setScore(score + questions[currentQuestionIndex].pointsAwarded);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      localStorage.removeItem("quizTimeElapsed");
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerClick = (index) => {
    const answerStatus =
      index === questions[currentQuestionIndex].correctOption - 1
        ? "correct"
        : "wrong";
    nextQuestion(answerStatus);
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    localStorage.removeItem("quizTimeElapsed");

    const userSolvedQuiz = {
      userPublicKey,
      quizId: questions[0]?.quizId, // Assuming all questions belong to the same quiz
      answers: userAnswers,
      timeTaken: formatTime(timeElapsed),
      score,
    };
    console.log(JSON.stringify(userSolvedQuiz, null, 2));
  };

  const handleLearnMore = () => {
    navigate('/learn'); // Navigate to the /learn route
  };

  if (quizCompleted) {
    return (
      <div style={styles.container}>
        <h2>Quiz Completed!</h2>
        <p>Time Taken: {formatTime(timeElapsed)}</p>
        <p>Your Score: {score} points</p>
        <p>Thank you for participating.</p>
        <button onClick={handleLearnMore} style={styles.learnMoreButton}>
          Learn More
        </button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.questionContainer}>
        <div style={styles.timerContainer}>
          <i className="fas fa-clock" style={styles.clockIcon}></i>
          <div style={styles.timer}>{formatTime(timeElapsed)}</div>
        </div>
        <h2>{questions[currentQuestionIndex].questionText}</h2>
        <div style={styles.answersContainer}>
          {questions[currentQuestionIndex].options.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              style={styles.answerButton}
            >
              {answer}
            </button>
          ))}
        </div>
        <div style={styles.navigationContainer}>
          <button
            onClick={prevQuestion}
            style={styles.prevButton}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => handleAnswerClick(null)}
              style={styles.nextButton}
            >
              Next
            </button>
          ) : (
            <button onClick={handleSubmitQuiz} style={styles.submitButton}>
              Submit Quiz
            </button>
          )}
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
    zIndex: 10,
  },
  clockIcon: {
    marginRight: "8px",
  },
  timer: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  questionContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "30px",
    borderRadius: "10px",
    color: "#FFF",
    textAlign: "center",
    maxWidth: "400px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    marginTop: "50px",
  },
  answersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  prevButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginRight: "10px",
  },
  nextButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  learnMoreButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "20px",
  },
};

export default QuizPage;
