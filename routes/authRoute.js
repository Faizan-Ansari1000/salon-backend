const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const authRoute = express.Router();

// SignUpUser
authRoute.post('/signUpUser', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ isSuccessfully: false, message: 'Validation error' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ isSuccessfully: false, message: 'This email already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        return res.status(201).json({ isSuccessfully: true, message: 'Account created successfully', data: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message });
    }
});

//get all signUpUser
authRoute.get('/signUpUser', async (req, res) => {
    try {
        const result = await User.find()
        if (result.length == 0) {
            return res.status(400).json({ message: 'No data found' })
        }
        return res.status(200).json({ isSuccessfully: true, message: 'Successfully get', data: result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message })
    }
})

//get signUpUser
authRoute.get('/signUpUser/:userId', async (req, res) => {
    const id = req.params.userId;

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ isSuccessfully: false, message: 'User not found' });
        }
        res.json({ isSuccessfully: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error' });
    }
});


// Login
authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ isSuccessfully: false, message: 'Validation error' });
        }

        if (email === 'salonAdmin@gmail.com' && password === 'salonAdmin') {
            return res.status(201).json({ isSuccessfully: true, message: 'Successfully Admin Logged In', role: 'admin' })
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ isSuccessfully: false, message: 'Email not found' });
        }

        const isMatchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!isMatchedPassword) {
            return res.status(401).json({ isSuccessfully: false, message: 'Invalid password' });
        }

        return res.status(201).json({ isSuccessfully: true, message: 'Successfully logged in' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message });
    }
});

module.exports = authRoute;
