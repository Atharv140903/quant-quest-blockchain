const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number },
    timePeriod: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], default: 'Daily' }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
