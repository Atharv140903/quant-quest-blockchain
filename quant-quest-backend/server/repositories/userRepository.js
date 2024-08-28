const mongoose = require('mongoose');

module.exports = {
    async create(user) {
        return mongoose.model('User').create(user);
    },

    async findAll() {
        return mongoose.model('User').find();
    },

    async findById(id) {
        return mongoose.model('User').findById(id);
    },

    async update(id, user) {
        return mongoose.model('User').findByIdAndUpdate(id, user, { new: true });
    },

    async delete(id) {
        return mongoose.model('User').findByIdAndDelete(id);
    },

    async getUserByAddress(walletAddress) {
        return mongoose.model('User').findOne({ walletAddress });
    },
};