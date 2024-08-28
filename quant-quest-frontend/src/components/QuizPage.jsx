import React, { useState, useEffect } from "react";

const QuizPage = () => {
  const userPublicKey = "user-public-key-placeholder"; // Replace with actual user public key
  const quizId = "quiz-id-placeholder"; // Replace with actual quiz ID

  const questions = [
    {
      question: "What is the largest ocean on Earth?",
      answers: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
      correctAnswer: 0,
    },
    // (Other questions...)
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

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

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
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
      quizId,
      answers: userAnswers,
      timeTaken: formatTime(timeElapsed), // Include the time taken to complete the quiz
    };
    console.log(JSON.stringify(userSolvedQuiz, null, 2)); // Log the JSON object

    return (
      <div style={styles.container}>
        <h2>Quiz Completed!</h2>
        <p>Time Taken: {formatTime(timeElapsed)}</p>
        <p>Thank you for participating.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.timer}>{formatTime(timeElapsed)}</div>
      <div style={styles.questionContainer}>
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
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    position: "relative",
  },
  timer: {
    position: "absolute",
    top: "20px", // Adjusted top margin to bring it further down
    right: "20px", // Adjusted right margin to move it left
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
  },
  questionContainer: {
    textAlign: "center",
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
