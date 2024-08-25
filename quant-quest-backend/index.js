const express = require('express');
const connectDB = require('./server/config/mongodb.config');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! This is quant quest application');
});


// Define Routes
app.use('/api/v1/quiz', require('./server/routes/quiz.routes'));



// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});