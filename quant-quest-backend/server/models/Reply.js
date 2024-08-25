const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    threadID: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reply', ReplySchema);
