const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Question = require('../models/Question');

require('dotenv').config();

// Connect to the database
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Lesson.deleteMany({});
        await Question.deleteMany({});
        
        // Seed users
        const users = [
            { username: 'admin', email: 'admin@quantquest.com', password: 'admin', role: 'admin' },
            { username: 'quizmaker', email: 'quizmaker@quantquest.com', password: 'quizmaker', role: 'quizmaker' },
            { username: 'user01', email: 'user01@quantquest.com', password: 'user01' },
        ];
        
        await User.insertMany(users);

        // Seed lessons
        const lesson1 = new Lesson({
            title: 'Introduction to Probability',
            description: 'A basic introduction to probability theory.',
            content: '<h1>Probability</h1><p>Content goes here...</p>',
            difficultyLevel: 'Easy',
            topic: 'Probability',
        });

        await lesson1.save();

        // Seed questions
        const question1 = new Question({
            lessonID: lesson1._id,
            questionText: 'What is the probability of flipping a coin and getting heads?',
            options: [
                { optionText: '50%', isCorrect: true },
                { optionText: '25%', isCorrect: false },
                { optionText: '75%', isCorrect: false },
            ],
            correctAnswer: '50%',
            questionType: 'Multiple Choice',
            difficulty: 'Easy',
            points: 10,
        });

        await question1.save();

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase();
