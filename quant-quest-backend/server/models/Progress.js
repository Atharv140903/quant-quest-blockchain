const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessonID: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    completed: { type: Boolean, default: false },
    score: { type: Number },
    completionDate: { type: Date },
    attempts: { type: Number, default: 0 },
    streakContribution: { type: Boolean, default: false }
});

module.exports = mongoose.model('Progress', ProgressSchema);
