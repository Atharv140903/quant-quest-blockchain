const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['participant', 'admin', 'quizmaker'], default: 'participant' },
    profilePicture: { type: String },  // Store URL or base64 data
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    dailyGoal: { type: Number, default: 20 },  // Example: 20 points/day
    streak: { type: Number, default: 0 },
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
    joinedDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    preferences: {
        notificationPreferences: { type: Map, of: Boolean },
        language: { type: String, default: 'en' },
        theme: { type: String, default: 'light' },
        learningMode: { type: String, default: 'casual' },
        privacySettings: { type: Map, of: Boolean }
    }
});

module.exports = mongoose.model('User', UserSchema);
