const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/authRoute', authRoute);
app.use('/userData', userRoute)

app.use((req, res, next) => {
    next();
});


app.get('/', (req, res) => {
    res.send('Welcome to the Backend');
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });

module.exports = app;