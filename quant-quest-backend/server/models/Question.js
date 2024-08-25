const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    lessonID: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    questionText: { type: String, required: true },
    options: [{
        optionText: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    correctAnswer: { type: String },
    explanation: { type: String },
    questionType: { type: String, enum: ['Multiple Choice', 'True/False', 'Short Answer'], default: 'Multiple Choice' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    points: { type: Number, default: 10 }  // Default points awarded
});

module.exports = mongoose.model('Question', QuestionSchema);
