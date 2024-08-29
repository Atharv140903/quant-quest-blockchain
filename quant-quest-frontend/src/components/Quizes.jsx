import React from "react";
import QuizCard from "./QuizCard";
import './Quizes.css'; // Import the CSS file

const quizzes = [
  {
    id: 1,
    name: "General Knowledge",
    description:
      "Test your general knowledge with this quiz covering a wide range of topics.",
    color: "#38F3FF",
    image: "/penguin.svg", // Use image path from the public folder
  },
  {
    id: 2,
    name: "Science Quiz",
    description:
      "Challenge yourself with questions on physics, chemistry, and biology.",
    color: "transparent",
    image: "/pig.svg", // Use image path from the public folder
  },
  {
    id: 3,
    name: "History Quiz",
    description:
      "How well do you know world history? Take this quiz to find out!",
    color: "#6DE24F",
    image: "/graph.svg", // Use image path from the public folder
  },
  {
    id: 4,
    name: "Finance Quiz",
    description: "Lets see how much finance do you know!",
    color: "#F83C3C",
    image: "/phone.svg", // Use image path from the public folder
  },
  // Add more quizzes as needed
];

const Quizes = () => {
  return (
    <div>
      <h2>Welcome, User! let’s learn Quant with experts....</h2>
      <div className="quiz-container">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            name={quiz.name}
            description={quiz.description}
            color={quiz.color}
            image={quiz.image} // Pass image path to QuizCard
          />
        ))}
      </div>
    </div>
  );
};

export default Quizes;
