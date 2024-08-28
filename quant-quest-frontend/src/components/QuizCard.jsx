import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ name, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz`);
  };

  return (
    <div onClick={handleClick} style={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#444",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer", // Make it clear that the card is clickable
    transition: "transform 0.2s ease-in-out",
  },
  cardHover: {
    transform: "scale(1.05)", // Slightly enlarge the card on hover
  },
};

export default QuizCard;
