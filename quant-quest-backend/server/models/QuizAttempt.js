const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizID: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  attemptNumber: { type: Number, required: true },
  score: { type: Number, default: 0 },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  answers: [
    {
      questionID: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion', required: true },
      selectedOption: mongoose.Schema.Types.Mixed, // Can be String, Array, or Boolean depending on the question type
      timeTaken: { type: Number, required: true }, // Time taken in seconds for this question
      pointsAwarded: { type: Number, default: 0 }, // Points awarded for this question
      isCorrect: { type: Boolean, required: true },
    },
  ],
  passed: { type: Boolean, default: false },
});

module.exports = mongoose.model('QuizAttempt', QuizAttemptSchema);
