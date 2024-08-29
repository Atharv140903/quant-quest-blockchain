const authController = require("../controllers/authController");
const router = require("express").Router();

module.exports = () => {
    router.post('/register', authController.registerUser); //signup
    router.post('/nonce', authController.requestNonce);
    router.post('/verify', authController.verifySignature);
    router.post('/simple-login', authController.loginUser); //login

    return router;
};