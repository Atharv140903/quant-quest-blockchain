import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ name, description, color, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz-info`, {
      state: { name, description }, // Pass the quiz data as state
    });
  };

  const cardStyle = {
    ...styles.card,
    backgroundColor: color, // Use color prop for background color
  };

  return (
    <div onClick={handleClick} style={cardStyle}>
      {/* Render SVG Image using the path */}
      <img src={image} alt={name} style={styles.image} />
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
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer", // Make it clear that the card is clickable
    transition: "transform 0.2s ease-in-out",
    textAlign: "center", // Center the content including the image
  },
  image: {
    width: "100px", // Adjust the size as needed
    height: "100px",
    marginBottom: "10px", // Add some spacing between the image and the text
  },
  cardHover: {
    transform: "scale(1.05)", // Slightly enlarge the card on hover
  },
};

export default QuizCard;
