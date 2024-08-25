const mongoose = require('mongoose');

const UserQuizProgressSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizID: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, default: 0 },
  completionDate: { type: Date, default: Date.now },
  attempts: { type: Number, default: 0 },
  passed: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserQuizProgress', UserQuizProgressSchema);