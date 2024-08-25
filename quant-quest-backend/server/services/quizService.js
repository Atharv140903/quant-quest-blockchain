const quizRepository = require('../repositories/quizRepository');
const quizQuestionRepository = require('../repositories/quizQuestionRepository');
const { create } = require('../models/QuizQuestion');

module.exports = {
    async registerQuiz (quizData) { // Register new quiz
        return await quizRepository.create(quizData);
    },

    async getQuizzes () {
        return await quizRepository.findAll();
    },

    async getQuizById (quizId) { // Get quiz by ID
        try {
            const quizData = await quizRepository.findById(quizId);
            const quizQuestions = await quizQuestionRepository.findAllByQuizId(quizId);
            if (!quiz) {
                throw new Error('Quiz not found');
            }
            return {
                ...quizData,
                questions: quizQuestions
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateQuiz (quizId, quizData) {
        return await quizRepository.update(quizId, quizData);
    },

    async deleteQuiz (quizId) {
        return await quizRepository.delete(quizId);
    },

    async addQuestion (quizId, questionData) { // Add question to quiz
        return await quizQuestionRepository.create({
            quizID: quizId,
            ...questionData
        });
    },

    async updateQuestion (questionId, questionData) {
        return await quizQuestionRepository.update(questionId, questionData);
    },

    async deleteQuestion (questionId) {
        return await quizQuestionRepository.delete(questionId);
    },

    async getAllQuizQuestions (quizId) { // Get all questions of a quiz
        return await quizQuestionRepository.findAllByQuizId({ quizId });
    },
};