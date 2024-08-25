const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    icon: { type: String },  // URL or base64 for the badge icon
    points: { type: Number, default: 0 },
    unlockedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
