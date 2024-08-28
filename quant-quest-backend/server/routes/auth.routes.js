const authController = require("../controllers/authController");
const router = require("express").Router();

module.exports = () => {
    router.post('/register', authController.registerUser);
    router.post('/nonce', authController.requestNonce);
    router.post('/verify', authController.verifySignature);

    return router;
};