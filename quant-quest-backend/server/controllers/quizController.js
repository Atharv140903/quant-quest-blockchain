const quizService = require('../services/quizService');

module.exports = {
    registerQuiz: async (req, res) => {
        try {
            const quizData = req.body;
            quizData.userId = req.user._id;
            const quiz = await quizService.registerQuiz(quizData);
            res.status(201).json({
                status: 'success',
                data: quiz,
            });
        } catch (error) {
            res.status(400).json({ 
                status: 'error',
                message: error.message 
            });
        }
    },

    addQuestion: async (req, res) => {
        try {
            const quizId = req.params.quizId;
            const questionData = req.body;
            await quizService.addQuestion(quizId, questionData);
            res.status(201).json({
                status: 'success'
            });
        } catch (error) {
            res.status(400).json({ 
                status: 'error',
                message: error.message 
            });
        }
    },

    getQuizzes: async (req, res) => {
        try {
            const quizzes = await quizService.getQuizzes();
            res.status(200).json({
                status: 'success',
                data: quizzes,
            });
        } catch (error) {
            res.status(400).json({ 
                status: 'error',
                message: error.message 
            });
        }
    },

    getQuizById: async (req, res) => {
        try {
            const quizId = req.params.quizId;
            const quiz = await quizService.getQuizById(quizId);
            res.status(200).json({
                status: 'success',
                data: quiz,
            });
        } catch (error) {
            res.status(400).json({ 
                status: 'error',
                message: error.message 
            });
        }
    },
};