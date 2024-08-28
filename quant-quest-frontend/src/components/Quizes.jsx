import React from "react";
import QuizCard from "./QuizCard";

const quizzes = [
  {
    id: 1,
    name: "General Knowledge",
    description:
      "Test your general knowledge with this quiz covering a wide range of topics.",
  },
  {
    id: 2,
    name: "Science Quiz",
    description:
      "Challenge yourself with questions on physics, chemistry, and biology.",
  },
  {
    id: 3,
    name: "History Quiz",
    description:
      "How well do you know world history? Take this quiz to find out!",
  },
  // Add more quizzes as needed
];

const Quizes = () => {
  return (
    <div>
      <h2>Available Quizzes 2</h2>
      <div style={styles.quizContainer}>
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            name={quiz.name}
            description={quiz.description}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  quizContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
};

export default Quizes;
