import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizCard.css"; // Import the external CSS file

const QuizCard = ({ name, description, color, image,questions }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz-info`, {
      state: { name, description,questions }, // Pass the quiz data as state
    });
  };

  return (
    <div
      onClick={handleClick}
      className="quiz-card"
      style={{ backgroundColor: color }} // Use color prop for background color
    >
      <img src={image} alt={name} className="quiz-card-image" />
      <h3 className="quiz-card-title">{name}</h3>
      <p className="quiz-card-description">{description}</p>
    </div>
  );
};

export default QuizCard;
