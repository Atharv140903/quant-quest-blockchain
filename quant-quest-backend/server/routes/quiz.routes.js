const quizController = require("../controllers/quizController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = require("express").Router();

module.exports = (app) => {
    router.post('/register', authMiddleware, roleMiddleware(['quizmaker', 'admin']), quizController.registerQuiz);
    router.post('/:quizId/add-question', authMiddleware, roleMiddleware(['quizmaker', 'admin']), quizController.addQuestion);
    router.get('/:quizId/get-quiz', authMiddleware, roleMiddleware(['participant', 'quizmaker', 'admin']), quizController.getQuizById);
};
