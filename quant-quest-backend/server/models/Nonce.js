const mongoose = require('mongoose');

const NonceSchema = new mongoose.Schema({
    walletAddress: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nonce: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: '15m' // Auto-delete after 15 minutes (optional)
    }
});

module.exports = mongoose.model('Nonce', NonceSchema);
