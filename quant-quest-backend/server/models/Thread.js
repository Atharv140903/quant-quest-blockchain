const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    topic: { type: String },
    creationDate: { type: Date, default: Date.now },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
});

module.exports = mongoose.model('Thread', ThreadSchema);
