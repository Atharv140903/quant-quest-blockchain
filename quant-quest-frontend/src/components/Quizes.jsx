import React from "react";
import QuizCard from "./QuizCard";
import "./Quizes.css"; // Import the CSS file

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
];

const companyQuizes = [
  {
    id: 1,
    name: "Citadel",
    description:
      "Explore quantitative finance concepts that drive Citadel's trading strategies.",
    color: "#007bff",
    image: "/citadel.svg", // Use image path from the public folder (replace with actual image)
  },
  {
    id: 2,
    name: "DE Shaw",
    description:
      "Delve into the mathematical models and algorithms used at DE Shaw.",
    color: "#28a745",
    image: "/deshaw.svg", // Use image path from the public folder (replace with actual image)
  },
  {
    id: 3,
    name: "Jane Street",
    description:
      "Understand the complex trading techniques employed by Jane Street.",
    color: "#ffc107",
    image: "/janeStreet.svg", // Use image path from the public folder (replace with actual image)
  },
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
      {/* <h2 className="company-heading">Prepare for Top Quant Firms</h2>
      <div className="company-quiz-container">
        {companyQuizes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            name={quiz.name}
            description={quiz.description}
            color={quiz.color}
            image={quiz.image} // Pass image path to QuizCard
          />
        ))}
      </div> */}
    </div>
  );
};

export default Quizes;
