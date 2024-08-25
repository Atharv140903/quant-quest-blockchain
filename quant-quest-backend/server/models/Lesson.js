const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  difficultyLevel: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  prerequisiteLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  topic: { type: String, required: true },
  estimatedTime: { type: Number }, // in minutes
  status: { type: String, enum: ['Active', 'Inactive', 'Coming Soon'], default: 'Active' },
});

module.exports = mongoose.model('Lesson', LessonSchema);