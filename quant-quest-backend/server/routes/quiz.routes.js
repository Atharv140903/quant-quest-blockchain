const quizController = require("../controllers/quizController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = require("express").Router();

module.exports = () => {
    router.post('/register', authMiddleware, quizController.registerQuiz);
    router.post('/:quizId/add-question', authMiddleware, quizController.addQuestion);
    router.get('/:quizId/get-quiz', authMiddleware, quizController.getQuizById);
    router.post('/add-quiz-question', authMiddleware, quizController.addQuizAlongWithQuestions);

    return router;
};
