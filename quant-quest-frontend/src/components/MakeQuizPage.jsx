import React, { useState, useEffect } from "react";
import QuestionField from "./QuestionField";
import QuizField from "./QuizField";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs

const MakeQuizPage = ({ walletAddress }) => {
  const [quizId, setQuizId] = useState(uuidv4()); // Generate a unique quiz ID
  const [quizCreator, setQuizCreator] = useState(walletAddress || ""); // Set to walletAddress if available
  const [questions, setQuestions] = useState([
    {
      questionId: 1,
      quizId: quizId,
      questionText: "",
      options: ["", "", "", ""],
      correctOption: 0,
      explanation: "",
      pointsAwarded: 0,
    },
  ]);

  const [quizGenre, setQuizGenre] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    // Update the quizId in all questions when quizId changes
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        quizId: quizId,
      }))
    );
  }, [quizId]);

  useEffect(() => {
    // Set quizCreator when walletAddress is available
    if (walletAddress) {
      setQuizCreator(walletAddress);
    }
  }, [walletAddress]);

  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const validateQuizFields = () => {
    // Check if any of the quiz fields are empty
    if (!quizGenre || !quizDescription || !timeLimit || !quizCreator) {
      setErrorMessage(
        "All quiz fields must be filled, including the Quiz Creator."
      );
      return false;
    }
    return true;
  };

  const validateQuestions = () => {
    // Check if all questions and their respective fields are filled
    for (let question of questions) {
      if (
        !question.questionText ||
        question.options.some((option) => option === "") ||
        question.correctOption === null ||
        question.explanation === "" ||
        question.pointsAwarded === 0
      ) {
        setErrorMessage("All fields in each question must be filled.");
        return false;
      }
    }
    return true;
  };

  const addQuestion = () => {
    if (!validateQuizFields() || !validateQuestions()) return; // Validate before adding a new question
    setErrorMessage(""); // Clear any previous error message

    const newQuestion = {
      questionId: questions.length + 1,
      quizId: quizId,
      questionText: "",
      options: ["", "", "", ""],
      correctOption: 0,
      explanation: "",
      pointsAwarded: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSubmit = () => {
    if (!validateQuizFields() || !validateQuestions()) return; // Validate before submitting the quiz
    setErrorMessage(""); // Clear any previous error message

    const quizData = {
      quizId: quizId,
      quizCreator: quizCreator, // Add quiz creator to the quiz data
      genre: quizGenre,
      description: quizDescription,
      timeLimit: timeLimit,
      questions: questions,
    };
    console.log(JSON.stringify(quizData, null, 2));
    setQuestions([
      {
        questionId: 1,
        quizId: quizId,
        questionText: "",
        options: ["", "", "", ""],
        correctOption: 0,
        explanation: "",
        pointsAwarded: 0,
      },
    ]);
    setQuizGenre("");
    setQuizDescription("");
    setTimeLimit("");
    setQuizCreator(""); // Reset the quiz creator field
  };

  return (
    <div style={styles.container}>
      <h2>Create Your Quiz</h2>

      {/* Display error message if any */}
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}

      <div style={styles.field}>
        <label>Quiz Creator (Ethereum Public Key):</label>
        <input
          type="text"
          value={quizCreator}
          placeholder="Ethereum Public Key"
          style={styles.input}
          readOnly // Make the input read-only since it's auto-filled
        />
      </div>

      {/* Button container positioned absolutely */}
      <div style={styles.buttonContainer}>
        <button onClick={addQuestion} style={styles.button}>
          Add Question
        </button>
        <button onClick={handleSubmit} style={styles.button}>
          Submit Quiz
        </button>
      </div>

      {/* Two-column layout */}
      <div style={styles.flexContainer}>
        <div style={styles.leftColumn}>
          <QuizField
            quizGenre={quizGenre}
            setQuizGenre={setQuizGenre}
            quizDescription={quizDescription}
            setQuizDescription={setQuizDescription}
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
          />
        </div>

        <div style={styles.rightColumn}>
          {questions.map((question, qIndex) => (
            <div key={qIndex} style={{ marginBottom: "20px" }}>
              <QuestionField
                qIndex={qIndex}
                questionData={question}
                onChange={handleQuestionChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative", // Ensure container is positioned relative for absolute positioning of buttonContainer
  },
  field: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#333", // Dark background color to match the theme
    color: "#fff", // Light text color for readability
  },
  flexContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "60px", // Ensure space at bottom for buttons
  },
  leftColumn: {
    flex: "1",
    paddingRight: "10px",
  },
  rightColumn: {
    flex: "1",
    paddingLeft: "10px",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "20px",
  },
};

export default MakeQuizPage;
