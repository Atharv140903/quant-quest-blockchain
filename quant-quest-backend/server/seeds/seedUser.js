const mongoose = require('mongoose');
const User = require('../models/User');

const seedUser = async ( ) => {
    try {
        // Clear existing data
        await User.deleteMany({});
        
        // Seed users
        const users = [
            { username: 'admin', email: 'admin@quantquest.com', password: 'admin', role: 'admin' },
            { username: 'quizmaker', email: 'quizmaker@quantquest.com', password: 'quizmaker', role: 'quizmaker' },
            { username: 'user01', email: 'user01@quantquest.com', password: 'user01' },
        ];
        
        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
}