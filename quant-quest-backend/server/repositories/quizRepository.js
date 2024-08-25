const mongoose = require('mongoose');

module.exports = {
    async create(quiz) {
        return mongoose.model('Quiz').create(quiz);
    },

    async findAll() {
        return mongoose.model('Quiz').find();
    },

    async findById(id) {
        return mongoose.model('Quiz').findById(id);
    },

    async update(id, quiz) {
        return mongoose.model('Quiz').findByIdAndUpdate(id, quiz, { new: true });
    },

    async delete(id) {
        return mongoose.model('Quiz').findByIdAndDelete(id);
    },
};