const mongoose = require('mongoose');

module.exports = {
    async create(nonce, walletAddress) {
        return mongoose.model('Nonce').create({ nonce, walletAddress });
    },

    async getNonce(walletAddress) {
        return mongoose.model('Nonce').findOne({ walletAddress });
    },

    async deleteNonce(walletAddress) {
        return mongoose.model('Nonce').deleteOne({ walletAddress });
    }
};