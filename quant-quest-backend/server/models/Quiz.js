const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  associatedLessonIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  timeLimit: { type: Number }, // in minutes
  numberOfQuestions: { type: Number, required: true },
  passingScore: { type: Number, required: true },
  attemptsAllowed: { type: Number, default: Infinity },
  creationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});
