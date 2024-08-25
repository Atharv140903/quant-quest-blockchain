const mongoose = require('mongoose');

module.exports = {
    async create(quizQuestion) {
        return mongoose.model('QuizQuestion').create(quizQuestion);
    },

    async findAll() {
        return mongoose.model('QuizQuestion').find();
    },

    async findById(id) {
        return mongoose.model('QuizQuestion').findById(id);
    },

    async update(id, quizQuestion) {
        return mongoose.model('QuizQuestion').findByIdAndUpdate(id, quizQuestion, { new: true });
    },

    async delete(id) {
        return mongoose.model('QuizQuestion').findByIdAndDelete(id);
    },

    async findAllByQuizId(quizId) {
        return mongoose.model('QuizQuestion').find({ quizID: quizId });
    },
};