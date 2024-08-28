// QuizField.jsx
import React from "react";

const QuizField = ({
  quizGenre,
  setQuizGenre,
  quizDescription,
  setQuizDescription,
  timeLimit,
  setTimeLimit,
}) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Quiz Genre"
        value={quizGenre}
        onChange={(e) => setQuizGenre(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Quiz Description"
        value={quizDescription}
        onChange={(e) => setQuizDescription(e.target.value)}
        style={styles.textarea}
      />

      <input
        type="number"
        placeholder="Time Limit (in minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "100px",
  },
};

export default QuizField;
