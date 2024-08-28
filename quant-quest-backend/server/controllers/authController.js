const authService = require('../services/authService');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { walletAddress, username, email } = req.body;
            const token = await authService.registerUser(walletAddress, username, email);
            res.status(200).json({
                status: 'success',
                data: { token },
            });
        } catch (error) {
            res.status(400).json({ 
                status: 'error',
                message: error.message 
            });
        }
    },

    requestNonce: async (req, res) => {
        try {
            const { walletAddress } = req.body;
            const nonce = await authService.requestNonce(walletAddress);
            res.status(200).json({
                status: 'success',
                data: { nonce },
            });
        } catch (error) {
            res.status(400).json({ 
                status: 'error',
                message: error.message 
            });
        }
    },

    verifySignature: async (req, res) => {
        try{
            const { walletAddress, signature } = req.body;
            const token = await authService.verifySignature(walletAddress, signature);
            res.status(200).json({
                status: 'success',
                data: { token },
            });
        } catch (error) {
            res.status(400).json({ 
                status: 'error',
                message: error.message 
            });
        }
    },
};