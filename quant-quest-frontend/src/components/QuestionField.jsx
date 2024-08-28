import React from "react";

const QuestionField = ({ questionData, onChange, qIndex }) => {
  const handleInputChange = (field, value) => {
    onChange(qIndex, field, value);
  };

  const handleOptionChange = (oIndex, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[oIndex] = value;
    handleInputChange("options", updatedOptions);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Question {qIndex + 1}</h3>
      <textarea
        placeholder="Question Text"
        value={questionData.questionText}
        onChange={(e) => handleInputChange("questionText", e.target.value)}
        style={styles.textarea}
      />
      <div style={styles.optionsContainer}>
        {questionData.options.map((option, oIndex) => (
          <input
            key={oIndex}
            type="text"
            placeholder={`Option ${oIndex + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(oIndex, e.target.value)}
            style={styles.input}
          />
        ))}
      </div>
      <div style={styles.row}>
        <input
          type="number"
          placeholder="Correct Option Index"
          value={questionData.correctOption}
          onChange={(e) =>
            handleInputChange("correctOption", parseInt(e.target.value))
          }
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Points Awarded"
          value={questionData.pointsAwarded}
          onChange={(e) =>
            handleInputChange("pointsAwarded", parseInt(e.target.value))
          }
          style={styles.input}
        />
      </div>
      <textarea
        placeholder="Explanation"
        value={questionData.explanation}
        onChange={(e) => handleInputChange("explanation", e.target.value)}
        style={styles.textarea}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "24px",
    padding: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#333",
    width: "100%", // Make sure it fills the available space
    maxWidth: "800px", // Control the maximum width for better readability
    margin: "0 auto", // Center the container
  },
  heading: {
    marginBottom: "16px",
    color: "#fff",
    textAlign: "left", // Align the text to the left
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    backgroundColor: "#444",
    color: "#fff",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    backgroundColor: "#444",
    color: "#fff",
  },
};

export default QuestionField;
