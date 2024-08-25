const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
  quizID: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questionText: { type: String, required: true },
  questionType: {
    type: String,
    enum: ['Multiple Choice', 'Single Choice', 'True/False', 'Short Answer'],
    required: true,
  },
  options: [{ type: String }], // Only for Multiple Choice/Single Choice questions
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true }, // Can be String or Boolean
  explanation: { type: String },
  points: { type: Number, default: 1 },
});

module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
